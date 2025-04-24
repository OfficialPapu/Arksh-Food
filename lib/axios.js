import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
});

axiosInstance.defaults.headers.common["authorization"] = `${process.env.API_KEY}`;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 550) {
      window.location.reload();
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
