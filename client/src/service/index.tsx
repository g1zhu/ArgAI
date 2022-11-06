import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000000,
  headers: {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Origin": "*",
  },
});

export { apiClient };
