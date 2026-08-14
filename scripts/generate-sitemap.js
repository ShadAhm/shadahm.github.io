const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/shadahmio');
const baseUrl = 'https://shadahm.github.io';

const routes = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/resume', changefreq: 'monthly', priority: 0.9 },
  { path: '/projects', changefreq: 'monthly', priority: 0.8 },
  { path: '/pet-projects', changefreq: 'monthly', priority: 0.8 },
  { path: '/pro-projects', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'yearly', priority: 0.7 }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
  const lastmod = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

// Create dist directory if it doesn't exist
if (!fs.existsSync(distPath)) {
  console.log(`Warning: ${distPath} does not exist. Sitemap will be created but may not be in final output.`);
}

// Write sitemap.xml
const sitemapPath = path.join(distPath, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log(`✓ Sitemap generated: ${sitemapPath}`);
