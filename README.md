# Suryaa Book Depot - Website

An e-commerce web application for **Suryaa Book Depot** built with React and Firebase. Browse notebooks, add to cart, place orders, and manage inventory through an admin dashboard.

## Tech Stack

- **Frontend:** React 19, Vite 5
- **Backend / Database:** Firebase (Firestore, Authentication, Analytics)
- **Auth:** Email/Password + Google Sign-In via Firebase Auth
- **State Management:** React Context API (AuthContext, CartContext)

## Prerequisites

- **Node.js** — version **20.19+** or **22.12+** (required by Vite 5)
- **npm** — comes bundled with Node.js
- A **Firebase project** (see setup below)
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

### 3. Set up Firebase environment variables

The app uses Firebase for authentication, database (Firestore), and analytics. All Firebase config values are loaded from a `.env` file that is **not committed to version control** (it's in `.gitignore`).

Create a `.env` file in the project root:

```bash
# On macOS/Linux:
touch .env

# On Windows (PowerShell):
New-Item .env
```

Then paste the following into `.env`, replacing each value with your own Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Where do I find these values?**
> 1. Go to the [Firebase Console](https://console.firebase.google.com/).
> 2. Select your project (or create one).
> 3. Click the **⚙️ gear icon → Project settings**.
> 4. Scroll down to **Your apps** → select the web app (or register one).
> 5. Copy the `firebaseConfig` object values into the `.env` file above.

### 4. Set up Firebase services

Make sure the following services are enabled in your Firebase project:

#### Firestore Database
1. In the Firebase Console, go to **Build → Firestore Database**.
2. Click **Create database** and select a location.
3. Start in **test mode** for development (or configure security rules for production).

#### Authentication
1. Go to **Build → Authentication → Sign-in method**.
2. Enable **Email/Password** provider.
3. Enable **Google** provider (configure the OAuth consent screen if prompted).

#### Analytics (optional)
- Analytics is loaded conditionally and is optional. If your project has it enabled, it will work automatically via the `VITE_FIREBASE_MEASUREMENT_ID`.

### 5. Firestore data structure

The app uses a single Firestore collection:

| Collection | Document fields |
|---|---|
| `orders` | `userId`, `userEmail`, `customer` (name, email, phone, address), `items[]` (id, name, category, price, quantity, lineTotal), `totalAmount`, `status` (pending / processing / shipped / delivered), `createdAt` |

Orders are created automatically when a user places one through the checkout flow.

### 6. Admin access

The admin dashboard is accessible to the user whose email matches the `ADMIN_EMAIL` constant in `src/context/AuthContext.jsx`. Update this value to your own admin email:

```js
const ADMIN_EMAIL = 'your-admin-email@example.com';
```

### 7. Run the development server

```bash
npm run dev
```

The app will start at [http://localhost:5173](http://localhost:5173) (or the next available port).

### 8. Build for production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

### 9. Preview the production build

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
│   │   ├── Modal/           # Reusable overlay/modal wrapper
│   │   ├── NotebookCard/    # Product card
│   │   ├── NotebookSection/ # Product listing section
│   │   └── OrderHistory/    # User's past orders
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── CartContext.jsx   # Shopping cart state
│   ├── data/
│   │   └── products.js      # Product catalog data
│   ├── firebase/
│   │   └── config.js        # Firebase configuration (reads from .env)
│   ├── hooks/
│   │   └── useFormData.js   # Reusable form state hook
│   ├── utils/
│   │   ├── orderUtils.js    # Order constants & helpers
│   │   └── scrollToElement.js # Smooth-scroll utility
│   ├── App.jsx              # Root app component
│   ├── App.css              # Global app styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Base styles & CSS custom properties
├── .env                     # Firebase config (NOT committed — see setup)
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies & scripts
└── eslint.config.js         # ESLint configuration
```

## Environment Variables Reference

All variables must be prefixed with `VITE_` for Vite to expose them to the client bundle.

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain (`<project>.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket (`<project>.firebasestorage.app`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID (optional) |

## Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Create a production build          |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint to check for issues     |

## Troubleshooting

| Issue | Solution |
|---|---|
| App loads but Firebase errors in console | Make sure `.env` exists in the project root with all 7 `VITE_FIREBASE_*` variables. Restart `npm run dev` after creating/editing `.env`. |
| Google sign-in popup closes immediately | Enable the Google provider in Firebase Console → Authentication → Sign-in method. Also add `localhost` to authorized domains. |
| Firestore permission denied | Check your Firestore security rules. For development, you can use `allow read, write: if true;` (don't use this in production). |
| `ADMIN_EMAIL` doesn't grant admin access | Make sure the email in `AuthContext.jsx` exactly matches the email you sign in with (case-sensitive). |
