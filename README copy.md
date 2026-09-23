# Tushar Kashyap — Official Portfolio Website

Official portfolio for **Tushar Kashyap** (Product Owner & Senior AI Data Engineer).

## 🚀 GitHub Pages Automated Deployment

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### How to Host on GitHub Pages

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy portfolio to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages in your Repository Settings**:
   - Go to your GitHub repository: `Settings` > `Pages`.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

3. **Automatic Live Deployment**:
   - Every `git push` to `main` or `master` branch will trigger the workflow and automatically build & publish your website live to `https://<your-username>.github.io/<repo-name>/`.

---

## 🛠 Local Development & Build Commands

- **Start Live Local Server**:
  ```bash
  pnpm run dev
  ```
  Open `http://localhost:5173`

- **Build Static Production Bundle**:
  ```bash
  pnpm run build
  ```
