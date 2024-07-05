// services/Categorieservice.js
import axiosInstance from "../config/axiosConfig";

const Categorieservice = {
  getCategories: async () => {
    try {
      const response = await axiosInstance.get("/api/categories");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des categories", error);
      throw error;
    }
  },

  getCategorieById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  createCategorie: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/categories", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

  updateCategorie: async (id, modelData) => {
    try {
      const response = await axiosInstance.put(
        `/api/categories/${id}`,
        modelData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  deleteCategorie: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du Categorie avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },
};

export default Categorieservice;
