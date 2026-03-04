# Suryaa Book Depot - Website

An e-commerce web application for **Suryaa Book Depot** built with React and Firebase. Browse notebooks, add to cart, place orders, and manage inventory through an admin dashboard.

## Tech Stack

- **Frontend:** React 19, Vite 5
- **Backend / Database:** Firebase (Firestore, Authentication, Analytics)
- **Auth:** Google Sign-In via Firebase Auth

## Prerequisites

- **Node.js** — version **20.19+** or **22.12+** (required by Vite 5)
- **npm** — comes bundled with Node.js
- A modern web browser

> **Tip:** You can check your Node version with `node -v`. If it's below 20.19, download the latest LTS from [https://nodejs.org](https://nodejs.org).

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
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images (notebook photos, etc.)
│   ├── components/          # React components
│   │   ├── AdminDashboard/  # Admin panel for managing orders
│   │   ├── AuthModal/       # Login / Sign-up modal
│   │   ├── CartItem/        # Individual cart item
│   │   ├── CartSidebar/     # Slide-out cart drawer
│   │   ├── CheckoutSection/ # Checkout flow
│   │   ├── Footer/          # Site footer
│   │   ├── Header/          # Navigation header
│   │   ├── Hero/            # Hero / landing banner
│   │   ├── NotebookCard/    # Product card
│   │   ├── NotebookSection/ # Product listing section
│   │   └── OrderHistory/    # User's past orders
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── CartContext.jsx   # Shopping cart state
│   ├── data/
│   │   └── products.js      # Product catalog data
│   ├── firebase/
│   │   └── config.js        # Firebase configuration
│   ├── App.jsx              # Root app component
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Base styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
└── eslint.config.js         # ESLint configuration
```

## Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Create a production build          |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint to check for issues     |
