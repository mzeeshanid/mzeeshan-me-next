export default {
  baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  categories: "sample-file-types",
  subcategories: "sample-file-extensions",
  subcategoriesSuggestions: "sample-file-extensions/suggestions",
  updateDownloads: "sample-file-variants/update",
  fileRequest: "sample-file-requests",
};
