import type { IConfig } from "next-sitemap";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.mzeeshan.me"
).replace(/\/$/, "");

const config: IConfig = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};

export default config;
