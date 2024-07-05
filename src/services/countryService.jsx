// services/produitservice.js
import axiosInstance from "../config/axiosConfig";

const countryStateService = {
  getCountry: async () => {
    try {
      const response = await axiosInstance.get("/api/country");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des country", error);
      throw error;
    }
  },
  getState: async () => {
    try {
      const response = await axiosInstance.get("/api/state");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des states", error);
      throw error;
    }
  },
};

export default countryStateService;
