# SAP S/4HANA Cloud — Plant Maintenance & Asset Lifecycle Management
### SAP BTP Developer Project | Priyanshu Raj | KIIT University

A complete, production-style SAP Fiori simulation built with vanilla HTML, CSS, and JavaScript.
No build tools, no frameworks — runs directly in the browser via a simple local server.

---

## 🚀 Quick Start (VS Code)

### Option 1 — VS Code Live Server Extension (Recommended, Easiest)

1. Open the `sap-btp-alm` folder in VS Code
2. Install the **Live Server** extension by Ritwick Dey (if not already installed)
   - Press `Ctrl+Shift+X` → search "Live Server" → Install
3. Right-click `index.html` → **"Open with Live Server"**
4. Browser opens at **http://127.0.0.1:5500**

---

### Option 2 — Node.js (npm)

Requires Node.js installed: https://nodejs.org

```bash
# 1. Open terminal in VS Code (Ctrl + `)
# 2. Navigate to the project folder
cd sap-btp-alm

# 3. Install dependencies
npm install

# 4. Start the server
npm start
# Opens at http://localhost:3000
```

---

### Option 3 — Python (no install needed)

If Python is installed:

```bash
# Python 3
python -m http.server 3000

# Then open: http://localhost:3000
```

---

### Option 4 — npx (no npm install needed)

```bash
npx http-server . -p 3000 -o
```

---

## 📁 Project Structure

```
sap-fiori-alm/
├── index.html                  ← Entry point
├── package.json                ← npm config
├── README.md                   ← This file
├── public/
│   └── favicon.svg
└── src/
    ├── styles/
    │   ├── main.css            ← SAP Fiori design tokens, layout, shell, tabs
    │   ├── components.css      ← Component-specific styles
    │   └── animations.css      ← Page transitions, stagger effects
    ├── data/
    │   └── mockData.js         ← All mock assets, orders, inspection plans
    └── components/
        ├── utils.js            ← Shared helpers (statusBadge, breadcrumb, toast)
        ├── home.js             ← Launchpad / dashboard
        ├── assets.js           ← Equipment Register + Asset Detail view
        ├── orders.js           ← Maintenance Orders + Order Detail view
        ├── inspection.js       ← Inspection Plans + Cost Analysis + Reporting
        ├── modals.js           ← Create Order / Create Asset modal forms
        └── app.js              ← Tab routing, sidenav, keyboard shortcuts
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏭 Home | KPI tiles, activity timeline, upcoming maintenance |
| ⚙ Equipment Register | Searchable/filterable table, full detail view |
| 🔧 Maintenance Orders | Order list with filters, order detail with operations |
| ✅ Inspection Plans | Plan table + Gantt calendar view |
| 📊 Cost Analysis | Bar chart, donut chart, budget tracking |
| 📈 Reporting | Fleet OEE, reliability KPIs, recommendations |
| 💬 Modals | Create Equipment & Create Order forms |
| 🍞 Toasts | Non-intrusive success/error notifications |
| ⌨ Shortcuts | Alt+1 to Alt+6 for tab navigation |
| 📱 Responsive | Mobile-friendly layout |

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + 1` | Home |
| `Alt + 2` | Equipment Register |
| `Alt + 3` | Maintenance Orders |
| `Alt + 4` | Inspection Plans |
| `Alt + 5` | Cost Analysis |
| `Alt + 6` | Reporting |
| `Escape` | Close modal |

---

## 🎨 Design System

This project replicates the **SAP Fiori Design System** including:
- SAP Shell Bar with notifications and user avatar
- SAP Fiori tile-based Launchpad
- SAP List Report floorplan (tables with search, filters)
- SAP Object Page floorplan (detail views)
- SAP Fiori color tokens (Blue #0070F2, Shell #354A5E, etc.)
- Progress indicators, status badges, priority dots
- Responsive grid layout

---

*Priyanshu Raj | SAP BTP Developer | KIIT University | April 2026*

