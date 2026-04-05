# 🚀 Sumit Shidole — Space Portfolio

A cinematic, 3D space-themed portfolio with a live Three.js galaxy background, rotating planets that appear as you scroll, and smooth Framer Motion animations.

---

## ⚡ OPTION 1 — Instant Preview (No Install)

Just open `index-standalone.html` in any browser. No Node.js, no install needed.

```
Open index-standalone.html directly in Chrome / Firefox / Edge
```

✅ Works offline  
✅ Zero dependencies to install  
✅ Full Three.js galaxy + planets + scroll animations  

---

## 🔥 OPTION 2 — React Dev Mode (Full Quality)

### Prerequisites
- Node.js 18+ installed

### Step 1 — Install dependencies
```bash
cd sumit-portfolio
npm install
```

### Step 2 — Start dev server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Step 3 — Build for production
```bash
npm run build
```

Output goes to `/dist` — deploy this folder to any static host (Vercel, Netlify, GitHub Pages).

---

## 🌌 Features

| Feature | Detail |
|---|---|
| **Galaxy Background** | Three.js live star field (6000 stars), nebula dust, shooting stars |
| **3D Camera** | Camera moves forward through space as you scroll |
| **Rotating Planets** | Procedural textures, atmosphere glow, optional rings |
| **Custom Cursor** | Glowing dot + trailing ring, morphs on hover |
| **Scroll Reveal** | IntersectionObserver-powered fade-up animations |
| **Skill Bars** | Animated progress bars with per-category colors |
| **Project Cards** | Planet-themed cards with expand/collapse detail |
| **Contact Section** | Direct links to email, LinkedIn, GitHub, phone |
| **Performance** | GPU rendering, lazy loading, 60fps target |
| **Responsive** | Works on mobile (planet hidden on small screens) |

---

## 📁 Project Structure

```
sumit-portfolio/
│
├── index-standalone.html    ← OPEN THIS for instant preview
│
├── src/
│   ├── main.jsx             ← React entry
│   ├── App.jsx              ← Three.js canvas + HTML layout
│   ├── index.css            ← Global space theme CSS
│   │
│   ├── utils/
│   │   └── data.js          ← ALL your personal info (edit here)
│   │
│   ├── components/
│   │   ├── GalaxyBackground.jsx   ← Stars, nebula, shooting stars
│   │   ├── Planet.jsx             ← 3D planet with texture + glow
│   │   ├── CustomCursor.jsx       ← Cursor effect
│   │   └── Nav.jsx                ← Fixed navigation
│   │
│   └── sections/
│       ├── Hero.jsx         ← Landing with animated name
│       ├── About.jsx        ← Bio + planet visual + stats
│       ├── Skills.jsx       ← Orbit system + skill bars
│       ├── Projects.jsx     ← Planet cards + experience
│       └── Contact.jsx      ← Contact links + footer
│
├── package.json
└── vite.config.js
```

---

## ✏️ Customizing Your Data

Edit `src/utils/data.js` — all your personal info is in one place:

```js
export const portfolioData = {
  name: "Sumit Shidole",
  title: "Software Developer",
  // ... add projects, skills, etc.
}
```

---

## 🚀 Deploy to Vercel (Free)

```bash
npm install -g vercel
npm run build
vercel deploy dist/
```

Or just drag the `/dist` folder to [netlify.com/drop](https://netlify.com/drop).

---

## 🎨 Tech Stack

- **Three.js** — 3D galaxy, planets, camera movement
- **React + Vite** — Fast component-based UI
- **Framer Motion** — Scroll animations, section reveals
- **React Three Fiber** — React bindings for Three.js
- **@react-three/drei** — Stars, helpers

---

## 📱 Performance Tips

- On mobile, the large side planet is hidden automatically
- `dpr={[1, 1.5]}` caps device pixel ratio for GPU performance
- Star count (6000) can be reduced in `GalaxyBackground.jsx` if needed
- All animations use `transform` + `opacity` (GPU-accelerated)

# MY-Portfolio
