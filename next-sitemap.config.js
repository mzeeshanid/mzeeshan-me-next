/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://mzeeshan.me"
  ).replace(/\/$/, ""),
  generateRobotsTxt: false,
  generateIndexSitemap: false,
};

module.exports = config;
