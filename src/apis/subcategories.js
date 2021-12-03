import client from "./client";
import API from "../config/API";

const getSubcategoriesSuggestions = (...args) =>
  client.get(API.subcategoriesSuggestions, ...args);

const getSubcategories = (...args) => client.get(API.subcategories, ...args);

export default {
  getSubcategoriesSuggestions: getSubcategoriesSuggestions,
  getSubcategories: getSubcategories,
};
