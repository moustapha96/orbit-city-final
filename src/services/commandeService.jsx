// services/commandeservice.js
import axiosInstance from "../config/axiosConfig";

const CommandeService = {
  getCommandes: async (id) => {
    try {

      const response = await axiosInstance.get(`/api/commandes/${id}`);
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
  deleteCommande: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/commande/${id}/delete`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande", error);
      throw error;
    }
  },
  annulerCommande: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/commande/${id}/annuler`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande", error);
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
  getCommandeById: async (idPartner, id) => {
    try {

      const response = await axiosInstance.post(`/api/commandes/details`, {
        commande_id: id,
        partner_id: idPartner,
      });
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

<<<<<<< HEAD
  createCommandePack: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/commande-pack", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
  createCommandeWitoutPartner: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/commande-sans-partner", modelData);
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
};

export default CommandeService;
