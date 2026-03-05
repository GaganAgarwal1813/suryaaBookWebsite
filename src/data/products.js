import cover1Front from '../assets/Notebook58GSM/Hindi/front.jpeg';
import cover1Back from '../assets/Notebook58GSM/Hindi/back.jpeg';
import cover2Front from '../assets/Notebook58GSM/Hindi/front_1.jpeg';
import cover2Back from '../assets/Notebook58GSM/Hindi/back_1.jpeg';
import gsm64Front from '../assets/Notebook64GSM/front.jpeg';
import gsm64Back from '../assets/Notebook64GSM/back.jpeg';
import gsm64Cover2Front from '../assets/Notebook64GSM/front_1.jpeg';
import gsm64Cover2Back from '../assets/Notebook64GSM/back_1.jpeg';
import gsm64Cover3Front from '../assets/Notebook64GSM/front_2.jpeg';
import gsm64Cover3Back from '../assets/Notebook64GSM/back_2.jpeg';

// --- Regular Notebook configuration ---
const gsmTypes = ['64 GSM', '58 GSM'];
const covers = ['Cover 1', 'Cover 2', 'Cover 3'];
const subjects = ['Hindi', 'English', 'Math'];
const pageVariants58 = [
  { pages: 104, mrp: 36, price: 18 },
  { pages: 132, mrp: 46, price: 23 },
  { pages: 172, mrp: 60, price: 30 },
];
const pageVariants64 = [
  { pages: 132, mrp: 58, price: 29 },
  { pages: 160, mrp: 68, price: 34 },
  { pages: 192, mrp: 78, price: 39 },
];

// Generate all Regular notebook products programmatically
let regularId = 100;
const regularProducts = [];

// Map GSM + Cover to real images (same cover images for all subjects)
const coverImages = {
  '58 GSM|Cover 1': { front: cover1Front, back: cover1Back },
  '58 GSM|Cover 2': { front: cover2Front, back: cover2Back },
  '64 GSM|Cover 1': { front: gsm64Front, back: gsm64Back },
  '64 GSM|Cover 2': { front: gsm64Cover2Front, back: gsm64Cover2Back },
  '64 GSM|Cover 3': { front: gsm64Cover3Front, back: gsm64Cover3Back },
};

gsmTypes.forEach((gsm) => {
  const variants = gsm === '64 GSM' ? pageVariants64 : pageVariants58;
  covers.forEach((cover) => {
    subjects.forEach((subject) => {
      variants.forEach(({ pages, mrp, price }) => {
        const realImages = coverImages[`${gsm}|${cover}`];
        const label = `${gsm.replace(' ', '+')}+${cover.replace(' ', '+')}+${subject}`;

        regularProducts.push({
          id: regularId++,
          category: 'Regular',
          name: `${subject} - ${pages} Pages`,
          pages,
          gsm,
          cover,
          subject,
          mrp,
          price,
          frontImage: realImages
            ? realImages.front
            : `https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=${label}+${pages}p+Front`,
          backImage: realImages
            ? realImages.back
            : `https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=${label}+${pages}p+Back`,
        });
      });
    });
  });
});

// --- Register Notebook configuration ---
const registerTypesList = ['All', 'Student', 'Classic', 'Premium'];
const registerPagesList = ['All', '150', '200', '300'];

export const products = [
  // Register Notebooks
  {
    id: 1,
    category: 'Register',
    type: 'Classic',
    name: 'Classic Register - 200 Pages',
    pages: 200,
    gsm: 'Ruled',
    mrp: 200,
    price: 150,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Register+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Register+Back'
  },
  {
    id: 2,
    category: 'Register',
    type: 'Premium',
    name: 'Premium Register - 300 Pages',
    pages: 300,
    gsm: 'Ruled',
    mrp: 280,
    price: 220,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Premium+Register+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Premium+Register+Back'
  },
  {
    id: 3,
    category: 'Register',
    type: 'Student',
    name: 'Student Register - 150 Pages',
    pages: 150,
    gsm: 'Ruled',
    mrp: 150,
    price: 120,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Student+Register+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Student+Register+Back'
  },

  // Regular Notebooks (generated: 2 GSM x 3 Covers x 3 Subjects x 3 Page variants = 54)
  ...regularProducts,

  // A5 Notebooks
  {
    id: 7,
    category: 'A5',
    name: 'A5 Notebook - 80 Pages',
    pages: 80,
    gsm: 'Ruled',
    price: 140,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=A5+Notebook+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=A5+Notebook+Back'
  },
  {
    id: 8,
    category: 'A5',
    name: 'A5 Notebook - 120 Pages',
    pages: 120,
    gsm: 'Ruled',
    price: 190,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=A5+120+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=A5+120+Back'
  },
  {
    id: 9,
    category: 'A5',
    name: 'A5 Notebook - Grid',
    pages: 100,
    gsm: 'Grid',
    price: 170,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=A5+Grid+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=A5+Grid+Back'
  },

  // Spiral Notebooks
  {
    id: 10,
    category: 'Spiral',
    name: 'Spiral Notebook - 100 Pages',
    pages: 100,
    gsm: 'Ruled',
    price: 200,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Spiral+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Spiral+Back'
  },
  {
    id: 11,
    category: 'Spiral',
    name: 'Spiral Notebook - 150 Pages',
    pages: 150,
    gsm: 'Ruled',
    price: 280,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Spiral+150+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Spiral+150+Back'
  },
  {
    id: 12,
    category: 'Spiral',
    name: 'Spiral Notebook - College Ruled',
    pages: 120,
    gsm: 'College Ruled',
    price: 240,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Spiral+College+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Spiral+College+Back'
  },

  // Hard Cover Notebooks
  {
    id: 13,
    category: 'Hard Cover',
    name: 'Hard Cover Notebook - 200 Pages',
    pages: 200,
    gsm: 'Ruled',
    price: 350,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Hard+Cover+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Hard+Cover+Back'
  },
  {
    id: 14,
    category: 'Hard Cover',
    name: 'Hard Cover Notebook - 300 Pages',
    pages: 300,
    gsm: 'Ruled',
    price: 480,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Hard+Cover+300+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Hard+Cover+300+Back'
  },
  {
    id: 15,
    category: 'Hard Cover',
    name: 'Premium Hard Cover - Leather',
    pages: 250,
    gsm: 'Ruled',
    price: 650,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Leather+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Leather+Back'
  }
];

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getRegularProducts = (gsm, cover) => {
  return products.filter(
    product => product.category === 'Regular' && product.gsm === gsm && product.cover === cover
  );
};

/**
 * Returns Regular products grouped by page count.
 * Each group: { pages, variants: [hindiProduct, englishProduct, mathProduct] }
 */
export const getRegularProductsGrouped = (gsm, cover) => {
  const filtered = getRegularProducts(gsm, cover);
  const grouped = {};
  filtered.forEach((product) => {
    if (!grouped[product.pages]) {
      grouped[product.pages] = { pages: product.pages, variants: [] };
    }
    grouped[product.pages].variants.push(product);
  });
  // Return sorted by page count ascending
  return Object.values(grouped).sort((a, b) => a.pages - b.pages);
};

export const regularGsmTypes = gsmTypes;
export const regularCovers = covers;

export const registerTypes = registerTypesList;
export const registerPageOptions = registerPagesList;

/**
 * Returns Register products filtered by type and page count.
 * 'All' means no filtering on that dimension.
 */
export const getRegisterProducts = (type, pages) => {
  return products.filter((product) => {
    if (product.category !== 'Register') return false;
    if (type !== 'All' && product.type !== type) return false;
    if (pages !== 'All' && product.pages !== Number(pages)) return false;
    return true;
  });
};

export const categories = ['Regular', 'Register'];
// Hidden categories for future: 'A5', 'Spiral', 'Hard Cover'
