import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ` + localStorage.getItem("access");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
