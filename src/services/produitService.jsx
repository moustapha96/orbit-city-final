// services/produitservice.js
import axiosInstance from "../config/axiosConfig";

const ProduitService = {
  getProduits: async () => {
    try {
      const response = await axiosInstance.get("/api/produits");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },
  getProduitsPrecommande: async () => {
    try {
      const response = await axiosInstance.get("/api/produits-precommande");
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits precommande",
        error
      );
      throw error;
    }
  },
  getProduitById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  createProduit: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/produits", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

  updateProduit: async (id, modelData) => {
    try {
      const response = await axiosInstance.put(
        `/api/produits/${id}`,
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

  deleteProduit: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/produits/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du produit avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },
};

export default ProduitService;
