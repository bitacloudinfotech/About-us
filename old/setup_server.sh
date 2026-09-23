#!/usr/bin/env bash
# ==============================================================================
# Production Setup & Deployment Script for bitacloudinfotech.com (React SPA + HTTPS)
# ==============================================================================

set -e

echo "🚀 [1/6] Updating System & Installing Essentials (Nginx, Certbot, Git, Curl, Node.js)..."
sudo apt-get update -y
sudo apt-get install -y nginx git curl build-essential certbot python3-certbot-nginx rsync

# Install Node.js 20 LTS if node is not found or outdated
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "✅ Node Version: $(node -v)"
echo "✅ NPM Version: $(npm -v)"

# Set working directory
APP_DIR="$HOME/Streamlit_AI_UX"

if [ ! -d "$APP_DIR" ]; then
    echo "📥 [2/6] Cloning repository into $APP_DIR..."
    git clone https://github.com/tusharz10/Streamlit_AI_UX.git "$APP_DIR"
    cd "$APP_DIR"
else
    echo "🔄 [2/6] Updating repository in $APP_DIR..."
    cd "$APP_DIR"
    git fetch --all
    git reset --hard origin/main
    git pull origin main
fi

# Build Frontend Bundle
echo "🛠️ [3/6] Installing dependencies and building production bundle..."
cd "$APP_DIR/bita_react"
npm install
npm run build

# Deploy Built Assets to /var/www/bita_react
echo "📂 [4/6] Deploying static bundle to /var/www/bita_react..."
sudo mkdir -p /var/www/bita_react
if command -v rsync &> /dev/null; then
    sudo rsync -av --delete "$APP_DIR/bita_react/dist/" /var/www/bita_react/
else
    sudo cp -r "$APP_DIR/bita_react/dist/." /var/www/bita_react/
fi
sudo chown -R www-data:www-data /var/www/bita_react
sudo chmod -R 755 /var/www/bita_react

# Configure Nginx for React SPA (HTTP & HTTPS)
echo "⚙️ [5/6] Configuring Nginx web server..."
sudo bash -c 'cat > /etc/nginx/sites-available/bitacloudinfotech << "EOF"
server {
    listen 80;
    listen [::]:80;
    server_name bitacloudinfotech.com www.bitacloudinfotech.com;

    location /.well-known/acme-challenge/ {
        root /var/www/bita_react;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name bitacloudinfotech.com www.bitacloudinfotech.com;

    root /var/www/bita_react;
    index index.html;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/bitacloudinfotech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bitacloudinfotech.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|webp)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF'

sudo ln -sf /etc/nginx/sites-available/bitacloudinfotech /etc/nginx/sites-enabled/bitacloudinfotech
sudo rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/bita_react

# Enable Nginx & Certbot Timer on Boot
echo "⚡ [6/6] Enabling Auto-Start on System Boot & Starting Nginx..."
sudo systemctl enable nginx
sudo systemctl enable certbot.timer
sudo nginx -t

if sudo systemctl is-active --quiet nginx; then
    sudo systemctl reload nginx
else
    sudo systemctl restart nginx
fi

# Verify Health
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://bitacloudinfotech.com || echo "000")

if [ "$HTTP_STATUS" -eq 200 ] || [ "$HTTP_STATUS" -eq 301 ] || [ "$HTTP_STATUS" -eq 302 ]; then
    echo "================================================================"
    echo "🎉 CONGRATULATIONS! YOUR WEBSITE IS NOW LIVE & HEALTHY!"
    echo "🌐 URL: https://bitacloudinfotech.com"
    echo "🔒 HTTPS & SSL: Active & Auto-Renewing"
    echo "⚡ Auto-Start on Reboot: ENABLED (systemctl enabled)"
    echo "================================================================"
else
    echo "⚠️ Warning: HTTPS status was $HTTP_STATUS. Please check Nginx logs: sudo tail -n 20 /var/log/nginx/error.log"
fi
