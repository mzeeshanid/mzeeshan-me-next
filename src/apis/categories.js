import API from "../config/API";
import apiClient from "./client";

const getCategories = (...args) => apiClient.get(API.categories, ...args);
const addCategory = (...args) => apiClient.post(API.addCategory, ...args);

export default {
  getCategories,
  addCategory,
};
