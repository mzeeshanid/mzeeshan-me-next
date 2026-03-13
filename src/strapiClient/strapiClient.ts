import { strapi, StrapiClient } from '@strapi/client';

const strapiClient = (): StrapiClient => {
  const STRAPI_API_URL = process.env.BE_STRAPI_BASE_URL;
  const STRAPI_API_TOKEN = process.env.BE_STRAPI_API_TOKEN;
  
  if (!STRAPI_API_URL) {
    throw new Error('STRAPI_API_URL is not defined');
  }
  
  const client: StrapiClient = strapi({
    baseURL: `${STRAPI_API_URL}/api`,
    auth: STRAPI_API_TOKEN,
  });
  
  return client
  
}

export default strapiClient;
