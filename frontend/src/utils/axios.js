import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    console.log(1234);
    config.headers.Authorization = `Bearer ` + localStorage.getItem("access");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
