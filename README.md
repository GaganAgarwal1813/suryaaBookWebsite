# Suryaa Book Depot - React Website

A modern, single-page React application for Suryaa Book Depot - an online notebook store featuring categorized products, shopping cart functionality, and checkout.

## Features

- **Product Categories**: Register, A4, A5, Spiral, and Hard Cover notebooks
- **Shopping Cart**: Add/remove items, update quantities with a slide-in cart sidebar
- **Checkout**: Customer information form with order summary
- **Responsive Design**: Mobile-friendly layout with warm color theme
- **Component-Based Architecture**: Reusable React components

## Tech Stack

- React 19
- Vite
- CSS3 (Custom styling with warm orange/brown theme)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  components/
    Header/          # Sticky navigation with cart icon
    Hero/            # Welcome banner section
    NotebookCard/    # Reusable product card component
    NotebookSection/ # Category section with product grid
    CartSidebar/     # Slide-in shopping cart
    CartItem/        # Individual cart item with quantity controls
    CheckoutSection/ # Checkout form and order summary
    Footer/          # Footer with contact information
  context/
    CartContext.jsx  # Global cart state management
  data/
    products.js      # Product data (15 notebooks across 5 categories)
  App.jsx           # Main app component
```

## Color Theme

- Primary: `#C47B2B` (Warm Amber)
- Background: `#FDF6EC` (Cream)
- Accent: `#7B3F00` (Dark Brown)

## Git Configuration

Git repository initialized with:
- Email: agarwal.gagan1813@gmail.com
- Name: Gagan Agarwal
