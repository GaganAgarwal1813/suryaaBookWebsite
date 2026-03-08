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
const gsmFilterOptions = ['All', ...gsmTypes];
const covers58 = ['Hockey Edition', 'Birdie Edition', 'Forest Edition', 'Kite Edition', 'Mountain Edition', 'Rainbow Edition'];
const covers64 = ['Football Edition', 'Music Edition', 'Paragliding Edition', 'Sunset Edition', 'Balloon Edition', 'Heritage Edition'];
const coversPerGsm = { '58 GSM': covers58, '64 GSM': covers64 };
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
  '58 GSM|Hockey Edition': { front: cover1Front, back: cover1Back },
  '58 GSM|Birdie Edition': { front: cover2Front, back: cover2Back },
  '58 GSM|Forest Edition': { front: cover3Front, back: cover3Back },
  '58 GSM|Kite Edition': { front: cover4Front, back: cover4Back },
  '58 GSM|Mountain Edition': { front: cover5Front, back: cover5Back },
  '58 GSM|Rainbow Edition': { front: cover6Front, back: cover6Back },

  '64 GSM|Football Edition': { front: gsm64Front, back: gsm64Back },
  '64 GSM|Music Edition': { front: gsm64Cover2Front, back: gsm64Cover2Back },
  '64 GSM|Paragliding Edition': { front: gsm64Cover3Front, back: gsm64Cover3Back },
  '64 GSM|Sunset Edition': { front: gsm64Cover4Front, back: gsm64Cover4Back },
  '64 GSM|Balloon Edition': { front: gsm64Cover5Front, back: gsm64Cover5Back },
  '64 GSM|Heritage Edition': { front: gsm64Cover6Front, back: gsm64Cover6Back },
};

gsmTypes.forEach((gsm) => {
  const variants = gsm === '64 GSM' ? pageVariants64 : pageVariants58;
  const covers = coversPerGsm[gsm];
  covers.forEach((cover) => {
    subjects.forEach((subject) => {
      variants.forEach(({ pages, mrp, price }) => {
        const images = coverImages[`${gsm}|${cover}`];

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
          frontImage: images.front,
          backImage: images.back,
        });
      });
    });
  });
});

// --- Register Notebook configuration ---
const registerTypesList = ['All', 'A4 64 GSM', 'Long 64 GSM'];

const a4RegisterPageVariants = [
  { pages: 132, mrp: 78, price: 39 },
  { pages: 172, mrp: 100, price: 50 },
  { pages: 240, mrp: 135, price: 68 },
];

const longRegisterPageVariants = [
  { pages: 140, mrp: 60, price: 30 },
  { pages: 220, mrp: 90, price: 45 },
];

const registerCoverImages = {
  'A4 64 GSM|Balloon Edition': { front: a4RegCover1Front, back: a4RegCover1Back },
  'A4 64 GSM|Rainbow Edition': { front: a4RegCover2Front, back: a4RegCover2Back },
  'A4 64 GSM|Heritage Edition': { front: a4RegCover3Front, back: a4RegCover3Back },
  'A4 64 GSM|Mountain Edition': { front: a4RegCover4Front, back: a4RegCover4Back },
  'Long 64 GSM|Balloon Edition': { front: longRegCover1Front, back: longRegCover1Back },
  'Long 64 GSM|Rainbow Edition': { front: longRegCover2Front, back: longRegCover2Back },
  'Long 64 GSM|Heritage Edition': { front: longRegCover3Front, back: longRegCover3Back },
  'Long 64 GSM|Mountain Edition': { front: longRegCover4Front, back: longRegCover4Back },
};

// Generate A4 & Long register products programmatically
let registerId = 20;
const generatedRegisterProducts = [];
const registerNewTypes = ['A4 64 GSM', 'Long 64 GSM'];
const registerCoversNames = ['Balloon Edition', 'Rainbow Edition', 'Heritage Edition', 'Mountain Edition'];

const registerPageVariantsPerType = {
  'A4 64 GSM': a4RegisterPageVariants,
  'Long 64 GSM': longRegisterPageVariants,
};

registerNewTypes.forEach((type) => {
  const pageVariants = registerPageVariantsPerType[type];
  registerCoversNames.forEach((cover) => {
    pageVariants.forEach(({ pages, mrp, price }) => {
      const images = registerCoverImages[`${type}|${cover}`];
      generatedRegisterProducts.push({
        id: registerId++,
        category: 'Register',
        type,
        cover,
        name: `${type} Register - ${pages} Pages`,
        pages,
        gsm: '64 GSM',
        dimensions: type === 'A4 64 GSM' ? '21 × 30 cm' : '17 × 27 cm',
        mrp,
        price,
        frontImage: images.front,
        backImage: images.back,
      });
    });
  });
});

export const products = [
  ...generatedRegisterProducts,
  ...regularProducts,
];

/**
 * Returns Regular products grouped by GSM+Cover.
 * When gsm is 'All', returns 12 groups (2 GSMs × 6 covers).
 * When gsm is specific, returns 6 groups (1 GSM × 6 covers).
 * Each group: { key, gsm, cover, products: [all subjects × all page variants] }
 */
export const getRegularProductsGroupedByCover = (gsm) => {
  const filtered = products.filter(
    (p) => p.category === 'Regular' && (gsm === 'All' || p.gsm === gsm)
  );
  const grouped = {};
  filtered.forEach((product) => {
    const key = `${product.gsm}|${product.cover}`;
    if (!grouped[key]) {
      grouped[key] = { key, gsm: product.gsm, cover: product.cover, products: [] };
    }
    grouped[key].products.push(product);
  });

  const activeGsmTypes = gsm === 'All' ? gsmTypes : [gsm];
  const result = [];
  activeGsmTypes.forEach((g) => {
    const gsmCovers = coversPerGsm[g];
    gsmCovers.forEach((c) => {
      const group = grouped[`${g}|${c}`];
      if (group) result.push(group);
    });
  });
  return result;
};

export const regularGsmTypes = gsmFilterOptions;

export const registerTypes = registerTypesList;

/**
 * Returns Register products grouped by type+cover.
 * Each group: { key, type, cover, products: [sorted by pages ascending] }
 */
export const getRegisterProductsGrouped = (type, cover) => {
  const filtered = products.filter((product) => {
    if (product.category !== 'Register') return false;
    if (type !== 'All' && product.type !== type) return false;
    if (cover !== 'All' && product.cover && product.cover !== cover) return false;
    return true;
  });

  const grouped = {};
  filtered.forEach((product) => {
    const key = `${product.type}|${product.cover}`;
    if (!grouped[key]) {
      grouped[key] = { key, type: product.type, cover: product.cover, products: [] };
    }
    grouped[key].products.push(product);
  });

  return Object.values(grouped).map((group) => ({
    ...group,
    products: group.products.sort((a, b) => a.pages - b.pages),
  }));
};

export const categories = ['Regular', 'Register'];
