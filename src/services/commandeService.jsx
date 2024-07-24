// services/commandeservice.js
import axiosInstance from "../config/axiosConfig";

const commandeService = {
  getCommandes: async () => {
    try {
      const partner_id = localStorage.getItem("partner_id");
      console.log(partner_id);
      const response = await axiosInstance.get(`/api/commandes/${partner_id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
      throw error;
    }
  },
  getCommandeTracking: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/tracking", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la réccuperation de la commande", error);
      throw error;
    }
  },
  getCommandeAny: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/getcommande/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
      throw error;
    }
  },
  getCommandeById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/commandes/${id}/details`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  createCommande: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/commandes", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

  updateCommande: async (id, modelData) => {
    try {
      const response = await axiosInstance.put(
        `/api/commandes/${id}`,
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

  deleteCommande: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/commandes/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du Commande avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },
};

export default commandeService;
