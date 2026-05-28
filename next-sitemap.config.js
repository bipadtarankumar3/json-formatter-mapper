/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jsonformatter.revoxera.com',
  generateRobotsTxt: false, // We manage robots.txt manually
  outDir: 'public',
  exclude: ['/privacy-policy', '/terms-and-conditions'],
};
