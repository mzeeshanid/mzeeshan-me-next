import API from "../config/API";
import apiClient from "./client";

const getCategories = (...args) => apiClient.get(API.categories, ...args);

export default {
  getCategories,
};
