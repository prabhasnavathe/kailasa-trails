# Kailasa Trails - High-Altitude Expeditions Web Application

A luxury wilderness expedition web platform designed for Kailasa Trails, featuring 7 official Himalayan treks, interactive peak explorers, live trail weather telemetry, an interactive summit climber mini-game with a ₹500 booking voucher, and seamless WhatsApp booking.

---

## 🏔️ Included Treks & Expeditions
1. **Brahmatal Winter Trek** - 11,570 FT · 5D/4N · ₹6,500/person
2. **Kedarkantha Trek** - 12,500 FT · 5D/4N · ₹6,000/person
3. **Kuari Pass Curzon Trail** - 12,516 FT · 6D/5N · ₹8,000/person
4. **Har Ki Dun Trek** - 11,675 FT · 7D/6N · ₹11,000/person
5. **Hampta Pass High Crossing** - 14,010 FT · 5D/4N · ₹6,500/person
6. **Bali Pass Alpine Crossing** - 16,200 FT · 8D/7N · ₹17,500/person
7. **Chopta Chandrashila & Tungnath** - 13,549 FT · 3D/2N · ₹6,000/person

---

## ✨ Key Platform Features
- **Hero & Aesthetic**: Dark luxury wilderness theme, transparent Kailasa Trails logo, and gentle interactive snowflake cursor field.
- **Unified Live Trail Telemetry**: Real-time atmospheric summit conditions (temperature, wind, visibility, summit push times) across all 7 summits without visual clutter.
- **Sacred Summits & Seasonal Expedition Guide**: Authentic high-resolution photographic profiles of Mt. Nanda Devi, Mt. Trishul, Mt. Swargarohini, Mt. Chaukhamba, Kala Nag (Black Peak), and Mt. Deo Tibba & Indrasan, alongside 4-season expedition guides.
- **Find Your Type (Trail Matcher)**: 3-step interactive summit finder matching trekkers to their ideal itinerary based on fitness and style.
- **Summit Climber Mini-Game (The 13,549 FT Ascent)**: Interactive physics-based vertical cliff climbing game with ice shelves, prayer flags, hot Pahadi chai thermal shields, and an exclusive **₹500 OFF voucher code (`KAILASA500`)** redeemable via WhatsApp.
- **WhatsApp Integration**: Instant 1-click booking and inquiries connecting directly to +91 89781 17089.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Server
```bash
node dist/index.js
```
The server will start listening on port 3000.

---

## 📁 Repository Structure
- `client/src/` - React frontend application (pages, components, UI primitives).
- `client/public/peaks/` - Authentic high-resolution photos of all 6 sacred peaks.
- `client/public/manus-storage/` - Authentic trek cover photos, transparent logos, and branding assets.
- `server/` - Express + tRPC backend server.
- `shared/` - Shared TypeScript schemas and data structures.
- `brochures/` - Official PDF brochures for all 7 Kailasa Trails expeditions.
- `dist/` - Pre-compiled production bundle ready for immediate deployment.

---
© 2026 Kailasa Trails. Conquer Your Own Peak.
