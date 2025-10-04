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


  getFilteredProducts: async (params) => {
    try {
      const query = new URLSearchParams(params);
      const response = await axiosInstance.get(`/api/produits-filtrer?${query}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },
  getFilteredProductsPromo: async (params) => {
    try {
      const query = new URLSearchParams(params);
      const response = await axiosInstance.get(`/api/produits-filtrer-promo?${query}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },
  getFilteredProductsFlash: async (params) => {
    try {
      const query = new URLSearchParams(params);
      const response = await axiosInstance.get(`/api/produits-filtrer-ramadan?${query}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },
  getFilteredProductsTabaski: async (params) => {
    try {
      const query = new URLSearchParams(params);
      const response = await axiosInstance.get(`/api/produits-filtrer-tabaski?${query}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },

  getProduitsPerPage: async (page = 1, limit = 100) => {
    try {
      const response = await axiosInstance.get(`/api/produits-page?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      throw error;
    }
  },
  getSizeProducts: async () => {
    try {
      const response = await axiosInstance.get("/api/produits-count");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de produits", error);
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

  getProduitsCreditCommande: async () => {
    try {
      const response = await axiosInstance.get("/api/produits-creditcommande");
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits credit commande",
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

  getProduitByCategorie: async (name) => {
    try {
      const response = await axiosInstance.get(`/api/produits/categorie/${name}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la sélection des produits avec la catégorie ${name}`,
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
