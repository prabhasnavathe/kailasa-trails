#!/usr/bin/env bash
set -e

# ==============================================================================
# Kailasa Trails - Automated Ubuntu VPS Production Deployment Script
# Supports: Ubuntu 20.04 / 22.04 / 24.04 LTS
# ==============================================================================

echo "=========================================================="
echo "🏔️  Kailasa Trails - Production VPS Deployment"
echo "=========================================================="

# 1. Update system packages
echo "📦 Updating system packages..."
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y curl git build-essential nginx unzip ufw

# 2. Install Node.js 20 LTS (if not installed)
if ! command -v node &> /dev/null; then
    echo "⚡ Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# 3. Install pnpm & pm2 globally
echo "🚀 Installing pnpm and pm2..."
sudo npm install -g pnpm pm2

# 4. Install project dependencies
echo "📦 Installing project dependencies..."
pnpm install

# 5. Build production bundle (Vite + esbuild)
echo "🔨 Building frontend and backend bundles..."
pnpm run build

# 6. Ensure data and uploads directories exist with proper permissions
mkdir -p data dist/public/uploads client/public/uploads
chmod -R 775 data dist/public/uploads client/public/uploads

# 7. Start or reload with PM2
echo "⚡ Starting application with PM2 process manager..."
pm2 stop kailasa-trails || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -n 1 | bash || true

# 8. Configure firewall (UFW)
echo "🛡️ Configuring UFW firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo "=========================================================="
echo "✅ Kailasa Trails deployed successfully!"
echo "Server is running on http://127.0.0.1:3000"
echo "=========================================================="
echo ""
echo "Next steps:"
echo "1. Edit /etc/nginx/sites-available/kailasa-trails with your domain name."
echo "2. Run: sudo cp nginx/kailasa-trails.conf /etc/nginx/sites-available/kailasa-trails"
echo "3. Run: sudo ln -s /etc/nginx/sites-available/kailasa-trails /etc/nginx/sites-enabled/"
echo "4. Run: sudo nginx -t && sudo systemctl reload nginx"
echo "5. For free SSL: sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx"
echo ""
