# Kailasa Trails — Production VPS Deployment Guide

This guide walks you through deploying **Kailasa Trails** to an Ubuntu VPS (DigitalOcean, AWS EC2, Linode, Hetzner, Hostinger, etc.).

---

## Method 1: Docker Compose (Recommended & Fastest)

If your server has Docker installed, you can launch the entire stack with a single command:

### 1. Upload files to your server
```bash
# Upload kailasa-trails-complete.zip to your server
scp C:\Users\pavil\Downloads\kailasa-trails-complete.zip root@YOUR_SERVER_IP:/root/
```

### 2. SSH into your server
```bash
ssh root@YOUR_SERVER_IP
```

### 3. Unzip and start with Docker Compose
```bash
unzip kailasa-trails-complete.zip -d kailasa-trails
cd kailasa-trails

# Build & launch container in the background
docker compose up -d --build
```

### 4. Verify
Open `http://YOUR_SERVER_IP:3000` in your browser. The site is live!

---

## Method 2: Standard Node.js + PM2 + Nginx with Free SSL (Let's Encrypt)

### 1. Upload & Unzip
```bash
scp C:\Users\pavil\Downloads\kailasa-trails-complete.zip root@YOUR_SERVER_IP:/var/www/
ssh root@YOUR_SERVER_IP

cd /var/www
unzip kailasa-trails-complete.zip -d kailasa-trails
cd kailasa-trails
```

### 2. Run Automated Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```
This script installs Node.js 20, pnpm, PM2, builds the project, and starts the server with auto-restart on system reboot.

### 3. Connect Nginx & Your Custom Domain
```bash
# Copy Nginx config
sudo cp nginx/kailasa-trails.conf /etc/nginx/sites-available/kailasa-trails

# Open config and replace 'yourdomain.com' with your actual domain
sudo nano /etc/nginx/sites-available/kailasa-trails

# Enable site
sudo ln -s /etc/nginx/sites-available/kailasa-trails /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # remove default if present
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Enable Free HTTPS / SSL (Let's Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically install and renew your SSL certificate.

---

## Useful PM2 Commands

| Command | Action |
| :--- | :--- |
| `pm2 status` | Check server status |
| `pm2 logs kailasa-trails` | View live server logs |
| `pm2 restart kailasa-trails` | Restart server |
| `pm2 reload kailasa-trails` | Zero-downtime reload |

---

## Data & Photo Upload Backups
- Submissions database: `data/gallery_submissions.json`
- Trekker uploaded photos: `dist/public/uploads/` and `client/public/uploads/`
