import { create } from "apisauce";
import API from "../config/API";

const apiClient = create({
  baseURL: API.baseUrl,
});

export default apiClient;
