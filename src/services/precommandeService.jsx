// services/Precommandeservice.js
import axiosInstance from "../config/axiosConfig";

const PrecommandeService = {
  getPreCommandes: async () => {
    try {
      const partner_id = localStorage.getItem("partner_id");
      const response = await axiosInstance.get(
        `/api/precommandes/${partner_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des Precommandes", error);
      throw error;
    }
  },

  getPreCommandeById: async (id) => {
    try {
      const partner_id = localStorage.getItem("partner_id");
      const response = await axiosInstance.post(`/api/precommandes/details`, {
        precommande_id: id,
        partner_id: partner_id,
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

  createPreCommande: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/precommandes", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

  updatePreCommande: async ({ order, partner_id }) => {
    try {
      console.log({ order_id: order, partner_id: partner_id });
      const response = await axiosInstance.post(`/api/precommandes/update`, {
        order_id: order,
        partner_id: partner_id,
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du modèle `, error);
      throw error;
    }
  },

  deletePreCommande: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/precommandes/${id}`);
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

export default PrecommandeService;
