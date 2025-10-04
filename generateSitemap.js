import { create } from 'xmlbuilder2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const BASE_URL = 'https://www.ccbme.sn'; // Replace with the actual URL of your site

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getRoutes() {
  // Define your static routes here
  return [
    '', '/informations', '/boutique', '/en-promo',
  ];
}

async function getProducts() {
  try {
    const response = await axios.get("https://orbitcity.sn/api/produits");
    return response.data; // Ensure you return the actual product data
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
}

async function generateSitemap() {
  const routes = getRoutes();
  const products = await getProducts();

  if (!Array.isArray(products)) {
    console.error('Error: Products data is not an array.');
    return;
  }

  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  // Add static routes
  routes.forEach((route) => {
    root.ele('url')
      .ele('loc').txt(`${BASE_URL}${route}`).up()
      .ele('lastmod').txt(new Date().toISOString()).up()
      .ele('changefreq').txt('weekly').up()
      .ele('priority').txt('0.8').up();
  });

  // Add product pages
  products.forEach((product) => {
    const updatedAt = product.updatedAt ? new Date(product.updatedAt) : new Date(); // Fallback to current date

    if (isNaN(updatedAt.getTime())) {
      console.warn(`Warning: Invalid date for product ID ${product.id}. Skipping...`);
      return;
    }

    root.ele('url')
      .ele('loc').txt(`${BASE_URL}/produits/${product.id}/details`).up()
      .ele('lastmod').txt(updatedAt.toISOString()).up()
      .ele('changefreq').txt('daily').up()
      .ele('priority').txt('0.6').up();
  });

  const xml = root.end({ prettyPrint: true });

  // Write to file
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log('Sitemap generated successfully at', sitemapPath);
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error.message);
});
