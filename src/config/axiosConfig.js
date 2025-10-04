/* eslint-disable no-unused-vars */
import axios from "axios";
import { getCookie } from "cookies-next";
import { get } from "jquery";

// const urlBase = "https://orbitcity.sn/";

const urlApidev = import.meta.env.VITE_API_URL_DEV;

const urlBase = urlApidev;

const axiosInstance = axios.create({
  baseURL: urlApidev
});



const excludedEndpoints = [
  "/auth",
  // "/users",
  "/produits",
  "/tags",
  "/categories",
  "/new_compte",
  "/tracking",
  "/sendResetPasswordMail",
  "/create_leads",
  "/api/produits-filtrer",
  "/api/produits-filter-promo",
  "/api/produits-filtrer-tabaski",
  "/api/produits-filtrer-ramadan",
  "/api/produits",
  "/api/auth/get_tokens",
  "/api/new-password",
  "/api/reset-password-sms",
  "/api/new_compte",
  "/api/reset-password-email",
  "/api/auth/refresh_token",
  // "/api/commandes"
  // "/api/users/"
];

axiosInstance.interceptors.request.use(
  (config) => {
    const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
      config.url.startsWith(endpoint)
    );
   
    console.log(localStorage.getItem("access_token"))
    console.log("access_token")
    // if (!isExcludedEndpoint) {
    //   const token = localStorage.getItem("access_token");
    //   if (token) {
    //     config.headers["Access-Token"] = `${token}`;
    //     config.headers["Content-Type"] = "application/json";
    //   }
    // } else {
    //   config.headers["Content-Type"] = "application/json";
    //   config.headers["Accept"] = "application/json";
    // }
     config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(urlBase, { refreshToken });

        const { accessToken } = response.data;
        localStorage.setItem("access_token", accessToken);

        originalRequest.headers["Access-Token"] = `${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Optionally, handle logout or redirect to login page here
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
