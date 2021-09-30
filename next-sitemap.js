module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.mzeeshan.me",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://www.mzeeshan.me/server-sitemap.xml", // <==== Add here
    ],
  },
};
