# 🌍 EcoSphere — Environmental Science Website

A fully animated, modern environmental science website with live data stats, interactive topics, climate timeline, solutions showcase, and the EcoBalance city management game.

---

## 🚀 Deploy to Vercel in 5 Steps

### Step 1 — Install Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

---

### Step 2 — Open in VS Code
1. Drag the `ecosphere` folder into VS Code
2. Open the terminal: **Terminal → New Terminal** (or `` Ctrl+` ``)

---

### Step 3 — Push to GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: EcoSphere website"

# Go to github.com → New Repository → name it "ecosphere"
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/ecosphere.git
git branch -M main
git push -u origin main
```

---

### Step 4 — Deploy to Vercel

**Option A — Via CLI (fastest):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: ecosphere
# - In which directory? ./  (press Enter)
# - Override settings? N

# Your site is live! 🎉
```

**Option B — Via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com) → Sign up / Log in
2. Click **"Add New Project"**
3. Import your GitHub repo (`ecosphere`)
4. Click **"Deploy"**
5. Done! You'll get a URL like `ecosphere.vercel.app`

---

### Step 5 — Future Updates

After making changes:
```bash
git add .
git commit -m "Update: describe your changes"
git push
```
Vercel auto-deploys on every push to `main`. ✅

---

## 📁 Project Structure

```
ecosphere/
├── index.html          # Main HTML file
├── vercel.json         # Vercel deployment config
├── css/
│   └── style.css       # All styles + animations
├── js/
│   ├── canvas.js       # Animated background (canvas + particles)
│   ├── main.js         # Scroll animations, counters, interactions
│   └── game.js         # EcoBalance city game logic
└── README.md           # This file
```

---

## 🎯 Features

- **Animated canvas background** — floating network nodes + sine waves
- **Particle system** — floating colored particles
- **Animated globe** in hero section
- **Live stat counters** with scroll-triggered animations
- **5 environmental topic cards** with gradient backgrounds
- **Climate timeline** 1750–2050
- **6 solution cards** with impact bars
- **EcoBalance Game** — 9-round city management game with real climate science
- **Cursor glow effect**
- **Fully responsive** mobile layout

---

## 🌐 Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks needed)
- Google Fonts: Syne + DM Sans
- Canvas API for background
- IntersectionObserver for scroll animations
- Vercel Static Hosting

---

Built for Environmental Science Assignment · Data from NASA, NOAA, IPCC
