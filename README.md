# Suryaa Book Depot - Website

A product catalog website for **Suryaa Book Depot** built with React and Vite. Browse Regular and Register notebooks with filters for paper quality, type, and cover editions.

## Tech Stack

- **Frontend:** React 19, Vite 5
- **Routing:** React Router 7
- **Deployment:** GitHub Pages (base path `/suryaaBookWebsite/`)

## Prerequisites

- **Node.js** — version **20.19+** or **22.12+** (required by Vite 5)
- **npm** — comes bundled with Node.js

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GaganAgarwal1813/suryaaBookWebsite.git
cd suryaaBookWebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will start at [http://localhost:5173](http://localhost:5173) (or the next available port).

### 4. Build for production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

### 5. Preview the production build

```bash
npm run preview
```

## Project Structure

```
suryaaBookWebsite/
├── public/
├── src/
│   ├── assets/              # Product images (notebook photos, logo)
│   ├── components/
│   │   ├── FilterGroup/     # Reusable filter tabs/pills
│   │   ├── Footer/          # Site footer with contact info
│   │   ├── Header/          # Navigation header with logo
│   │   ├── Hero/            # Hero / landing banner
│   │   ├── NotebookCard/    # Product card component
│   │   ├── NotebookSection/ # Product listing section with filters
│   │   └── OrderBanner/     # "Call us to order" banner
│   ├── constants/
│   │   └── business.js      # Store name, phone, email, social links
│   ├── data/
│   │   └── products.js      # Product catalog (Regular & Register notebooks)
│   ├── utils/
│   │   ├── orderUtils.js    # Currency formatting helper
│   │   └── scrollToElement.js # Smooth-scroll utility
│   ├── pages/
│   │   └── HomePage.jsx     # Main page with Hero + notebook sections
│   ├── App.jsx              # Root app component with routing
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Base styles & CSS custom properties
├── index.html
├── vite.config.js
├── package.json
└── eslint.config.js
```

## Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Create a production build          |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint to check for issues     |
