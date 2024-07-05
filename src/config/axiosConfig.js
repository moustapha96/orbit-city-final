import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8016/",
});

const excludedEndpoints = ["/auth", "/users", "/produits", "/categories"];

axiosInstance.interceptors.request.use(
  (config) => {
    const isExcludedEndpoint = excludedEndpoints.some((endpoint) =>
      config.url.startsWith(endpoint)
    );

    if (!isExcludedEndpoint) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Access-Token"] = `${token}`;
        config.headers["Content-Type"] = "application/json";
      }
    } else {
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
    }
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
        const response = await axios.post(
          "http://localhost:8016/refresh-token",
          { refreshToken }
        );

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
