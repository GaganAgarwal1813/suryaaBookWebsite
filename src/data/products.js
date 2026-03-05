import cover1Front from '../assets/Notebook58GSM/Hindi/front.jpeg';
import cover1Back from '../assets/Notebook58GSM/Hindi/back.jpeg';
import cover2Front from '../assets/Notebook58GSM/Hindi/front_1.jpeg';
import cover2Back from '../assets/Notebook58GSM/Hindi/back_1.jpeg';
import cover3Front from '../assets/Notebook58GSM/Hindi/front_2.jpeg';
import cover3Back from '../assets/Notebook58GSM/Hindi/back_2.jpeg';
import cover4Front from '../assets/Notebook58GSM/Hindi/front_3.jpeg';
import cover4Back from '../assets/Notebook58GSM/Hindi/back_3.jpeg';
import cover5Front from '../assets/Notebook58GSM/Hindi/front_4.png';
import cover5Back from '../assets/Notebook58GSM/Hindi/back_4.png';
import cover6Front from '../assets/Notebook58GSM/Hindi/front_5.png';
import cover6Back from '../assets/Notebook58GSM/Hindi/back_5.png';

import gsm64Front from '../assets/Notebook64GSM/front.jpeg';
import gsm64Back from '../assets/Notebook64GSM/back.jpeg';
import gsm64Cover2Front from '../assets/Notebook64GSM/front_1.jpeg';
import gsm64Cover2Back from '../assets/Notebook64GSM/back_1.jpeg';
import gsm64Cover3Front from '../assets/Notebook64GSM/front_2.jpeg';
import gsm64Cover3Back from '../assets/Notebook64GSM/back_2.jpeg';
import gsm64Cover4Front from '../assets/Notebook64GSM/front_3.jpeg';
import gsm64Cover4Back from '../assets/Notebook64GSM/back_3.jpeg';
import gsm64Cover5Front from '../assets/Notebook64GSM/front_4.png';
import gsm64Cover5Back from '../assets/Notebook64GSM/back_4.png';
import gsm64Cover6Front from '../assets/Notebook64GSM/front_5.png';
import gsm64Cover6Back from '../assets/Notebook64GSM/back_5.png';

// --- A4 Notebook 64 GSM Register images ---
import a4RegCover1Front from '../assets/A4Notebook64GSM/front_1.png';
import a4RegCover1Back from '../assets/A4Notebook64GSM/back_1.png';
import a4RegCover2Front from '../assets/A4Notebook64GSM/front_2.png';
import a4RegCover2Back from '../assets/A4Notebook64GSM/back_2.png';
import a4RegCover3Front from '../assets/A4Notebook64GSM/front_3.png';
import a4RegCover3Back from '../assets/A4Notebook64GSM/back_3.png';
import a4RegCover4Front from '../assets/A4Notebook64GSM/front_4.png';
import a4RegCover4Back from '../assets/A4Notebook64GSM/back_4.png';

// --- Long Notebook 64 GSM Register images ---
import longRegCover1Front from '../assets/LongNotebook64GSM/front_1.png';
import longRegCover1Back from '../assets/LongNotebook64GSM/back_1.png';
import longRegCover2Front from '../assets/LongNotebook64GSM/front_2.png';
import longRegCover2Back from '../assets/LongNotebook64GSM/back_2.png';
import longRegCover3Front from '../assets/LongNotebook64GSM/front_3.png';
import longRegCover3Back from '../assets/LongNotebook64GSM/back_3.png';
import longRegCover4Front from '../assets/LongNotebook64GSM/front_4.png';
import longRegCover4Back from '../assets/LongNotebook64GSM/back_4.png';

// --- Regular Notebook configuration ---
const gsmTypes = ['64 GSM', '58 GSM'];
const covers = ['Sports Edition', 'Nature Edition', 'Adventure Edition', 'Urban Edition', 'Floral Edition', 'Abstract Edition'];
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
  '58 GSM|Sports Edition': { front: cover1Front, back: cover1Back },
  '58 GSM|Nature Edition': { front: cover2Front, back: cover2Back },
  '58 GSM|Adventure Edition': { front: cover3Front, back: cover3Back },
  '58 GSM|Urban Edition': { front: cover4Front, back: cover4Back },
  '58 GSM|Floral Edition': { front: cover5Front, back: cover5Back },
  '58 GSM|Abstract Edition': { front: cover6Front, back: cover6Back },

  '64 GSM|Sports Edition': { front: gsm64Front, back: gsm64Back },
  '64 GSM|Nature Edition': { front: gsm64Cover2Front, back: gsm64Cover2Back },
  '64 GSM|Adventure Edition': { front: gsm64Cover3Front, back: gsm64Cover3Back },
  '64 GSM|Urban Edition': { front: gsm64Cover4Front, back: gsm64Cover4Back },
  '64 GSM|Floral Edition': { front: gsm64Cover5Front, back: gsm64Cover5Back },
  '64 GSM|Abstract Edition': { front: gsm64Cover6Front, back: gsm64Cover6Back },
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
          dimensions: '18 × 24 cm',
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
const registerTypesList = ['All', 'A4 64 GSM', 'Long 64 GSM'];
const registerCoversList = ['All', 'Cover 1', 'Cover 2', 'Cover 3', 'Cover 4'];
const registerPagesList = ['All', '150', '200', '300'];

const registerPageVariants = [
  { pages: 150, mrp: 150, price: 120 },
  { pages: 200, mrp: 200, price: 150 },
  { pages: 300, mrp: 280, price: 220 },
];

const registerCoverImages = {
  'A4 64 GSM|Cover 1': { front: a4RegCover1Front, back: a4RegCover1Back },
  'A4 64 GSM|Cover 2': { front: a4RegCover2Front, back: a4RegCover2Back },
  'A4 64 GSM|Cover 3': { front: a4RegCover3Front, back: a4RegCover3Back },
  'A4 64 GSM|Cover 4': { front: a4RegCover4Front, back: a4RegCover4Back },
  'Long 64 GSM|Cover 1': { front: longRegCover1Front, back: longRegCover1Back },
  'Long 64 GSM|Cover 2': { front: longRegCover2Front, back: longRegCover2Back },
  'Long 64 GSM|Cover 3': { front: longRegCover3Front, back: longRegCover3Back },
  'Long 64 GSM|Cover 4': { front: longRegCover4Front, back: longRegCover4Back },
};

// Generate A4 & Long register products programmatically
let registerId = 20;
const generatedRegisterProducts = [];
const registerNewTypes = ['A4 64 GSM', 'Long 64 GSM'];
const registerCoversNames = ['Cover 1', 'Cover 2', 'Cover 3', 'Cover 4'];

registerNewTypes.forEach((type) => {
  registerCoversNames.forEach((cover) => {
    registerPageVariants.forEach(({ pages, mrp, price }) => {
      const images = registerCoverImages[`${type}|${cover}`];
      generatedRegisterProducts.push({
        id: registerId++,
        category: 'Register',
        type,
        cover,
        name: `${type} Register - ${pages} Pages`,
        pages,
        gsm: '64 GSM',
        mrp,
        price,
        frontImage: images.front,
        backImage: images.back,
      });
    });
  });
});

export const products = [
  // Register Notebooks (generated: 2 types x 4 covers x 3 page variants)
  ...generatedRegisterProducts,

  // Regular Notebooks (generated: 2 GSM x 6 Covers x 3 Subjects x 3 Page variants)
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
export const registerCovers = registerCoversList;
export const registerPageOptions = registerPagesList;

/**
 * Returns Register products filtered by type, cover, and page count.
 * 'All' means no filtering on that dimension.
 */
export const getRegisterProducts = (type, cover, pages) => {
  return products.filter((product) => {
    if (product.category !== 'Register') return false;
    if (type !== 'All' && product.type !== type) return false;
    if (cover !== 'All' && product.cover && product.cover !== cover) return false;
    if (pages !== 'All' && product.pages !== Number(pages)) return false;
    return true;
  });
};

export const categories = ['Regular', 'Register'];
// Hidden categories for future: 'A5', 'Spiral', 'Hard Cover'
