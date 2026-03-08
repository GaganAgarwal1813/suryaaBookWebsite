import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, 'src', 'assets');

function imgToBase64(relPath) {
  const full = path.join(ASSETS, relPath);
  const ext = path.extname(full).slice(1).toLowerCase();
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
  const buf = fs.readFileSync(full);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const logo = imgToBase64('Logo.jpeg');

const regular58 = [
  { cover: 'Hockey Edition', front: 'Notebook58GSM/Hindi/front.jpeg', back: 'Notebook58GSM/Hindi/back.jpeg' },
  { cover: 'Birdie Edition', front: 'Notebook58GSM/Hindi/front_1.jpeg', back: 'Notebook58GSM/Hindi/back_1.jpeg' },
  { cover: 'Forest Edition', front: 'Notebook58GSM/Hindi/front_2.jpeg', back: 'Notebook58GSM/Hindi/back_2.jpeg' },
  { cover: 'Kite Edition', front: 'Notebook58GSM/Hindi/front_3.jpeg', back: 'Notebook58GSM/Hindi/back_3.jpeg' },
  { cover: 'Mountain Edition', front: 'Notebook58GSM/Hindi/front_4.png', back: 'Notebook58GSM/Hindi/back_4.png' },
  { cover: 'Rainbow Edition', front: 'Notebook58GSM/Hindi/front_5.png', back: 'Notebook58GSM/Hindi/back_5.png' },
];

const regular64 = [
  { cover: 'Football Edition', front: 'Notebook64GSM/front.jpeg', back: 'Notebook64GSM/back.jpeg' },
  { cover: 'Music Edition', front: 'Notebook64GSM/front_1.jpeg', back: 'Notebook64GSM/back_1.jpeg' },
  { cover: 'Paragliding Edition', front: 'Notebook64GSM/front_2.jpeg', back: 'Notebook64GSM/back_2.jpeg' },
  { cover: 'Sunset Edition', front: 'Notebook64GSM/front_3.jpeg', back: 'Notebook64GSM/back_3.jpeg' },
  { cover: 'Balloon Edition', front: 'Notebook64GSM/front_4.png', back: 'Notebook64GSM/back_4.png' },
  { cover: 'Heritage Edition', front: 'Notebook64GSM/front_5.png', back: 'Notebook64GSM/back_5.png' },
];

const a4Register = [
  { cover: 'Balloon Edition', front: 'A4Notebook64GSM/front_1.png', back: 'A4Notebook64GSM/back_1.png' },
  { cover: 'Rainbow Edition', front: 'A4Notebook64GSM/front_2.png', back: 'A4Notebook64GSM/back_2.png' },
  { cover: 'Heritage Edition', front: 'A4Notebook64GSM/front_3.png', back: 'A4Notebook64GSM/back_3.png' },
  { cover: 'Mountain Edition', front: 'A4Notebook64GSM/front_4.png', back: 'A4Notebook64GSM/back_4.png' },
];

const longRegister = [
  { cover: 'Balloon Edition', front: 'LongNotebook64GSM/front_1.png', back: 'LongNotebook64GSM/back_1.png' },
  { cover: 'Rainbow Edition', front: 'LongNotebook64GSM/front_2.png', back: 'LongNotebook64GSM/back_2.png' },
  { cover: 'Heritage Edition', front: 'LongNotebook64GSM/front_3.png', back: 'LongNotebook64GSM/back_3.png' },
  { cover: 'Mountain Edition', front: 'LongNotebook64GSM/front_4.png', back: 'LongNotebook64GSM/back_4.png' },
];

const variants58 = [
  { pages: 104, mrp: 36, price: 18 },
  { pages: 132, mrp: 46, price: 23 },
  { pages: 172, mrp: 60, price: 30 },
];
const variants64 = [
  { pages: 132, mrp: 58, price: 29 },
  { pages: 160, mrp: 68, price: 34 },
  { pages: 192, mrp: 78, price: 39 },
];
const a4Variants = [
  { pages: 132, mrp: 78, price: 39 },
  { pages: 172, mrp: 100, price: 50 },
  { pages: 240, mrp: 135, price: 68 },
];
const longVariants = [
  { pages: 140, mrp: 60, price: 30 },
  { pages: 220, mrp: 90, price: 45 },
];
const subjects = ['Hindi', 'English', 'Math'];

function buildRegularRows(covers, gsm, variants, subjectsList, dimensions) {
  const rowspan = variants.length;
  return covers.map((c, coverIdx) => {
    const frontB64 = imgToBase64(c.front);
    const backB64 = imgToBase64(c.back);
    const bgClass = coverIdx % 2 === 0 ? 'row-even' : 'row-odd';
    const subjectsHtml = subjectsList.map(s => `<span class="subject-pill">${s}</span>`).join(' ');

    return variants.map((v, vi) => {
      const disc = Math.round(((v.mrp - v.price) / v.mrp) * 100);
      const spanCells = vi === 0 ? `
        <td class="cover-cell" rowspan="${rowspan}">
          <div class="cover-imgs">
            <img src="${frontB64}" class="cover-thumb" alt="${c.cover} Front"/>
            <img src="${backB64}" class="cover-thumb" alt="${c.cover} Back"/>
          </div>
        </td>
        <td class="cover-name" rowspan="${rowspan}"><strong>${c.cover}</strong></td>
        <td class="gsm-cell" rowspan="${rowspan}">${gsm}</td>
        <td class="subjects-cell" rowspan="${rowspan}">${subjectsHtml}</td>` : '';

      const dimCell = vi === 0 ? `<td class="dim-cell" rowspan="${rowspan}">${dimensions}</td>` : '';
      const borderClass = vi < rowspan - 1 ? 'variant-row' : '';

      return `<tr class="${bgClass} ${borderClass}">
        ${spanCells}
        <td class="pages-cell"><span class="pages-pill">${v.pages} Pages</span></td>
        <td class="mrp-cell">\u20B9${v.mrp}</td>
        <td class="price-cell-val">\u20B9${v.price}</td>
        <td class="disc-cell"><span class="disc-badge">${disc}% OFF</span></td>
        ${dimCell}
      </tr>`;
    }).join('\n');
  }).join('\n');
}

function buildRegisterRows(covers, type, variants, dimensions) {
  const rowspan = variants.length;
  return covers.map((c, coverIdx) => {
    const frontB64 = imgToBase64(c.front);
    const backB64 = imgToBase64(c.back);
    const bgClass = coverIdx % 2 === 0 ? 'row-even' : 'row-odd';

    return variants.map((v, vi) => {
      const disc = Math.round(((v.mrp - v.price) / v.mrp) * 100);
      const spanCells = vi === 0 ? `
        <td class="cover-cell" rowspan="${rowspan}">
          <div class="cover-imgs">
            <img src="${frontB64}" class="cover-thumb" alt="${c.cover} Front"/>
            <img src="${backB64}" class="cover-thumb" alt="${c.cover} Back"/>
          </div>
        </td>
        <td class="cover-name" rowspan="${rowspan}"><strong>${c.cover}</strong></td>
        <td class="type-cell" rowspan="${rowspan}">${type}</td>` : '';

      const dimCell = vi === 0 ? `<td class="dim-cell" rowspan="${rowspan}">${dimensions}</td>` : '';
      const borderClass = vi < rowspan - 1 ? 'variant-row' : '';

      return `<tr class="${bgClass} ${borderClass}">
        ${spanCells}
        <td class="pages-cell"><span class="pages-pill">${v.pages} Pages</span></td>
        <td class="mrp-cell">\u20B9${v.mrp}</td>
        <td class="price-cell-val">\u20B9${v.price}</td>
        <td class="disc-cell"><span class="disc-badge">${disc}% OFF</span></td>
        ${dimCell}
      </tr>`;
    }).join('\n');
  }).join('\n');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    background: #fff;
    font-size: 11px;
    line-height: 1.4;
  }

  /* ===== HEADER ===== */
  .page-header {
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: white;
    padding: 28px 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    overflow: hidden;
  }
  .page-header::after {
    content: '';
    position: absolute;
    right: -40px;
    top: -40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .page-header img.logo {
    width: 70px;
    height: 70px;
    border-radius: 14px;
    border: 3px solid rgba(255,255,255,0.3);
    object-fit: cover;
  }
  .header-text h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .header-text p { font-size: 13px; opacity: 0.85; margin-top: 4px; }
  .header-text .tagline { font-size: 14px; font-weight: 500; opacity: 0.95; margin-top: 2px; }

  .discount-banner {
    background: linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #dc2626 100%);
    color: white;
    text-align: center;
    padding: 10px 32px;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
  }
  .discount-banner .flash {
    display: inline-block;
    animation: none;
    margin: 0 8px;
    font-size: 20px;
  }
  .discount-banner .big-text {
    font-size: 22px;
    font-weight: 900;
  }

  .contact-bar {
    background: #f0f5ff;
    padding: 10px 32px;
    display: flex;
    justify-content: center;
    gap: 32px;
    font-size: 11px;
    color: #475569;
    border-bottom: 1px solid #e2e8f0;
  }
  .contact-bar strong { color: #1e3a5f; }

  /* ===== CONTENT ===== */
  .content { padding: 20px 28px 30px; }

  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1e3a5f;
    margin: 24px 0 4px;
    padding-bottom: 5px;
    border-bottom: 3px solid #2563eb;
    display: inline-block;
  }
  .section-title:first-child { margin-top: 0; }

  .section-subtitle {
    font-size: 11px;
    color: #64748b;
    margin-bottom: 10px;
  }

  /* ===== TABLE ===== */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  }

  thead th {
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: white;
    padding: 9px 10px;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
    border-right: 1px solid rgba(255,255,255,0.15);
  }
  thead th:last-child { border-right: none; }

  tbody td {
    padding: 7px 10px;
    vertical-align: middle;
    text-align: center;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }
  tbody td:last-child { border-right: none; }

  .variant-row td:not([rowspan]) {
    border-bottom: 1px dashed #cbd5e1;
  }

  .row-even { background: #ffffff; }
  .row-odd { background: #f8fafc; }

  /* ===== COVER IMAGE CELL ===== */
  .cover-cell {
    width: 130px;
    border-right: 1px solid #e2e8f0;
  }
  .cover-imgs {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
  }
  .cover-thumb {
    width: 52px;
    height: 72px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    border: 1px solid #e2e8f0;
  }

  /* ===== TEXT CELLS ===== */
  .cover-name {
    font-size: 11px;
    min-width: 100px;
    text-align: left;
    padding-left: 12px;
  }
  .cover-name strong { color: #1e3a5f; font-weight: 700; }

  .gsm-cell, .type-cell {
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    white-space: nowrap;
  }

  .subjects-cell { min-width: 120px; }
  .subject-pill {
    display: inline-block;
    background: #eff6ff;
    color: #2563eb;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 9px;
    font-weight: 600;
    margin: 1px 2px;
    border: 1px solid #bfdbfe;
  }

  /* ===== PAGES / MRP / PRICE / DISCOUNT CELLS ===== */
  .pages-cell { white-space: nowrap; }
  .pages-pill {
    display: inline-block;
    background: #1e3a5f;
    color: white;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
  }

  .mrp-cell {
    font-size: 12px;
    color: #94a3b8;
    text-decoration: line-through;
    font-weight: 500;
  }

  .price-cell-val {
    font-size: 14px;
    font-weight: 800;
    color: #16a34a;
  }

  .disc-cell { white-space: nowrap; }
  .disc-badge {
    display: inline-block;
    background: linear-gradient(135deg, #dc2626, #ef4444);
    color: white;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.3px;
  }

  .dim-cell {
    font-size: 10px;
    color: #64748b;
    white-space: nowrap;
    font-weight: 500;
  }

  /* ===== FOOTER ===== */
  .footer {
    text-align: center;
    padding: 14px 32px;
    color: #94a3b8;
    font-size: 10px;
    border-top: 1px solid #e2e8f0;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    table { page-break-inside: auto; }
    tr { page-break-inside: avoid; }
  }
</style>
</head>
<body>

<div class="page-header">
  <img src="${logo}" alt="Suryaa Book Depot" class="logo"/>
  <div class="header-text">
    <h1>Suryaa Book Depot</h1>
    <p class="tagline">Product Catalogue 2025-26</p>
    <p>Quality Notebooks & Registers for Every Student</p>
  </div>
</div>

<div class="discount-banner">
  <span class="flash">\u{1F525}</span>
  FLAT <span class="big-text">50% OFF</span> ON ALL PRODUCTS &mdash; MRP SE AADHI KEEMAT!
  <span class="flash">\u{1F525}</span>
</div>

<div class="contact-bar">
  <span><strong>Phone:</strong> +91 9927158581</span>
  <span><strong>Email:</strong> suryaabookdepothapur@gmail.com</span>
  <span><strong>Instagram:</strong> @suryaabookdepothapur</span>
</div>

<div class="content">

  <!-- ===== REGULAR 58 GSM ===== -->
  <div class="section-title">Regular Notebooks &mdash; 58 GSM</div>
  <p class="section-subtitle">Standard quality paper &bull; Size: 18 &times; 24 cm &bull; Available in Hindi, English &amp; Math</p>
  <table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Edition</th>
        <th>GSM</th>
        <th>Subjects</th>
        <th>Pages</th>
        <th>MRP</th>
        <th>Our Price</th>
        <th>Discount</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      ${buildRegularRows(regular58, '58 GSM', variants58, subjects, '18 \u00d7 24 cm')}
    </tbody>
  </table>

  <!-- ===== REGULAR 64 GSM ===== -->
  <div class="section-title">Regular Notebooks &mdash; 64 GSM</div>
  <p class="section-subtitle">Premium quality paper &bull; Size: 18 &times; 24 cm &bull; Available in Hindi, English &amp; Math</p>
  <table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Edition</th>
        <th>GSM</th>
        <th>Subjects</th>
        <th>Pages</th>
        <th>MRP</th>
        <th>Our Price</th>
        <th>Discount</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      ${buildRegularRows(regular64, '64 GSM', variants64, subjects, '18 \u00d7 24 cm')}
    </tbody>
  </table>

  <!-- ===== A4 REGISTER ===== -->
  <div class="section-title">A4 Registers &mdash; 64 GSM</div>
  <p class="section-subtitle">Large format registers &bull; Size: 21 &times; 30 cm</p>
  <table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Edition</th>
        <th>Type</th>
        <th>Pages</th>
        <th>MRP</th>
        <th>Our Price</th>
        <th>Discount</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      ${buildRegisterRows(a4Register, 'A4 64 GSM', a4Variants, '21 \u00d7 30 cm')}
    </tbody>
  </table>

  <!-- ===== LONG REGISTER ===== -->
  <div class="section-title">Long Registers &mdash; 64 GSM</div>
  <p class="section-subtitle">Long format registers &bull; Size: 17 &times; 27 cm</p>
  <table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Edition</th>
        <th>Type</th>
        <th>Pages</th>
        <th>MRP</th>
        <th>Our Price</th>
        <th>Discount</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      ${buildRegisterRows(longRegister, 'Long 64 GSM', longVariants, '17 \u00d7 27 cm')}
    </tbody>
  </table>

</div>

<div class="footer">
  <strong>Suryaa Book Depot</strong> &mdash; All prices are in INR (\u20B9). Prices subject to change without notice.<br/>
  Contact us for bulk orders: +91 9927158581 &bull; suryaabookdepothapur@gmail.com
</div>

</body>
</html>`;

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  console.log('Loading catalogue HTML...');
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await new Promise(r => setTimeout(r, 3000));

  const outputPath = path.join(__dirname, 'SuryaaBooksCatalogue.pdf');
  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log(`PDF saved to: ${outputPath}`);
})();
