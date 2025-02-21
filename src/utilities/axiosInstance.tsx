import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_KEY,
  //baseURL: "http://192.168.100.199:4000",
  // baseURL: "http://localhost:3000",
  baseURL: "http://localhost:4000",
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
