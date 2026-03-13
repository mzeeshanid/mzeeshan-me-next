export const getBeBaseUrl = (): string => {
  if (!process.env.BE_STRAPI_BASE_URL) {
    throw new Error("BE_STRAPI_BASE_URL is not defined");
  }

  return process.env.BE_STRAPI_BASE_URL;
};
