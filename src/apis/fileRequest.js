import API from "../config/API";
import apiClient from "./client";

const getFileRequests = (...args) => apiClient.get(API.fileRequest, ...args);
const addFileRequest = (...args) => apiClient.post(API.fileRequest, ...args);

export default {
  getFileRequests,
  addFileRequest,
};
