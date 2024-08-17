// services/commandeservice.js
import axiosInstance from "../config/axiosConfig";

const PaiementService = {
  createPrecommandePaiment: async (idOrder) => {
    try {
      const response = await axiosInstance.get(
        `/api/precommande/${idOrder}/payment`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors du paiement", error);
      throw error;
    }
  },
  createPrecommandePaimentMontant: async (idOrder, montant) => {
    try {
      const response = await axiosInstance.get(
        `/api/precommande/${idOrder}/payment/${montant}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors du paiement", error);
      throw error;
    }
  },
  createPrecommandePaimentState: async (idOrder, rang, montant) => {
    try {
      const response = await axiosInstance.get(
        `/api/precommande/${idOrder}/payment/${rang}/${montant}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors du paiement", error);
      throw error;
    }
  },
  createCommandePaiment: async (idOrder) => {
    try {
      const response = await axiosInstance.get(
        `/api/commande/${idOrder}/payment`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors du paiement", error);
      throw error;
    }
  },
  setPaymentDetails: async (paymentDetails) => {
    try {
      const response = await axiosInstance.post(
        `/api/payment/set`,
        paymentDetails
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement des détails du paiement",
        error
      );
      throw error;
    }
  },
  getPaymentDetails: async (transactionId) => {
    try {
      const response = await axiosInstance.get(
        `/api/payment/get/${transactionId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },
  getPaymentsPartner: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/payment/partner/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },
  getPaymentDetailsById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/payment/byId/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },
};

export default PaiementService;
