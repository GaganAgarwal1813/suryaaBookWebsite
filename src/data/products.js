import regularFront from '../assets/Notebook58GSM/Hindi/front.jpeg';
import regularBack from '../assets/Notebook58GSM/Hindi/back.jpeg';

export const products = [
  // Register Notebooks
  {
    id: 1,
    category: 'Register',
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
    name: 'Student Register - 150 Pages',
    pages: 150,
    gsm: 'Ruled',
    mrp: 150,
    price: 120,
    frontImage: 'https://via.placeholder.com/300x400/C47B2B/FFFFFF?text=Student+Register+Front',
    backImage: 'https://via.placeholder.com/300x400/7B3F00/FFFFFF?text=Student+Register+Back'
  },

  // Regular Notebooks
  {
    id: 4,
    category: 'Regular',
    name: 'Regular - 104 Pages',
    pages: 104,
    gsm: '58 GSM',
    mrp: 36,
    price: 18,
    frontImage: regularFront,
    backImage: regularBack
  },
  {
    id: 5,
    category: 'Regular',
    name: 'Regular - 132 Pages',
    pages: 132,
    gsm: '58 GSM',
    mrp: 46,
    price: 23,
    frontImage: regularFront,
    backImage: regularBack
  },
  {
    id: 6,
    category: 'Regular',
    name: 'Regular - 172 Pages',
    pages: 172,
    gsm: '58 GSM',
    mrp: 60,
    price: 30,
    frontImage: regularFront,
    backImage: regularBack
  },

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

export const categories = ['Regular', 'Register'];
// Hidden categories for future: 'A5', 'Spiral', 'Hard Cover'
