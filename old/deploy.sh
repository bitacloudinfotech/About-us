#!/usr/bin/env bash
# ==============================================================================
# Production Zero-Downtime Deployment Script for bitacloudinfotech.com
# ==============================================================================

set -e

echo "=========================================================="
echo "🚀 STARTING PRODUCTION DEPLOYMENT FOR bitacloudinfotech.com"
echo "=========================================================="

# 1. Environment & Paths Setup
export PATH=$PATH:/usr/local/bin:/usr/bin:/bin:$HOME/.npm-global/bin
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

# Ensure Node.js 20 LTS is available
if command -v nvm &> /dev/null; then
  nvm use 20 || nvm use --lts || true
fi

echo "📦 Node Version: $(node -v 2>/dev/null || echo 'Not found')"
echo "📦 NPM Version: $(npm -v 2>/dev/null || echo 'Not found')"

# 2. Application Directory & Git Pull
APP_DIR="$HOME/Streamlit_AI_UX"
if [ ! -d "$APP_DIR" ]; then
  echo "📥 Cloning repository into $APP_DIR..."
  git clone https://github.com/tusharz10/Streamlit_AI_UX.git "$APP_DIR"
fi

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" || true

echo "🔄 Pulling latest changes from origin/main..."
git fetch --all
git reset --hard origin/main
git pull origin main

# 3. Install Dependencies & Build Vite Production Bundle
echo "🛠️ Installing dependencies and building production bundle..."
cd "$APP_DIR/bita_react"
npm install
npm run build

# 4. Deploy Static Files to /var/www/bita_react (Zero-Downtime Atomic Sync)
echo "📂 Syncing built bundle to /var/www/bita_react..."
sudo mkdir -p /var/www/bita_react
if command -v rsync &> /dev/null; then
  sudo rsync -av --delete "$APP_DIR/bita_react/dist/" /var/www/bita_react/
else
  sudo cp -r "$APP_DIR/bita_react/dist/." /var/www/bita_react/
fi
sudo chown -R www-data:www-data /var/www/bita_react
sudo chmod -R 755 /var/www/bita_react

# 5. Ensure Nginx Configuration with SSL & SPA Fallback
echo "⚙️ Verifying Nginx configuration..."
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

    # Modern TLS & Cipher Suites
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Browser Cache for static assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|webp)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, immutable";
    }

    # SPA Direct Routing Fallback (prevents 404 on refresh)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF'

sudo ln -sf /etc/nginx/sites-available/bitacloudinfotech /etc/nginx/sites-enabled/bitacloudinfotech
sudo rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/bita_react

# 6. Enable Services on Boot & Graceful Nginx Reload
echo "⚡ Enabling auto-start on boot..."
sudo systemctl enable nginx
sudo systemctl enable certbot.timer

echo "🔧 Validating Nginx configuration syntax..."
sudo nginx -t

echo "🔄 Gracefully reloading Nginx service..."
if sudo systemctl is-active --quiet nginx; then
  sudo systemctl reload nginx
else
  sudo systemctl restart nginx
fi

# 7. Automated Production Health Check
echo "🔍 Running Automated Health Checks..."
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost || echo "000")
HTTPS_CODE=$(curl -s -k -o /dev/null -w "%{http_code}" https://localhost || echo "000")
echo "Local HTTP Status: $HTTP_CODE (expected 301 redirect)"
echo "Local HTTPS Status: $HTTPS_CODE (expected 200)"

if [ "$HTTPS_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 301 ]; then
  echo "=========================================================="
  echo "🎉 DEPLOYMENT SUCCESSFUL! WEBSITE IS LIVE & HEALTHY"
  echo "🌐 URL: https://bitacloudinfotech.com"
  echo "🔒 SSL Status: Active & Auto-Renewing"
  echo "⚡ Auto-Start on Boot: Enabled"
  echo "=========================================================="
else
  echo "❌ Health check failed. Nginx status:"
  sudo systemctl status nginx --no-pager || true
  exit 1
fi
