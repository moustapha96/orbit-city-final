/* eslint-disable no-unused-vars */

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
  createPrecommandePaimentMontant: async (idOrder, montant, token) => {
    try {
      const response = await axiosInstance.get(
        `/api/precommande/${idOrder}/payment/${montant}/${token}`
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
  getPaymentDetailsByToken: async (token) => {
    try {
      const response = await axiosInstance.get(`/api/payment/byToken/${token}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },

  updatePaymentDetails: async (
    id,
    payment_state,
    url_facture,
    customer_name,
    customer_email,
    customer_phone, token_status
  ) => {
    console.log('id precommande ', id)
    try {
      const response = await axiosInstance.put(`/api/payment/update/${id}`, {
        payment_state,
        url_facture,
        customer_name,
        customer_email,
        customer_phone,
        token_status

      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },

  getPaymentDetailsByIdOrder: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/payment/byOrder/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du paiement",
        error
      );
      throw error;
    }
  },

  confirmInvoice: async (token) => {

    const headersTest = {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      "PAYDUNYA-PRIVATE-KEY": "test_private_LJfJe2zAiwndwRq6ZF4qIDIoApZ",
      "PAYDUNYA-TOKEN": "VaZUkYb6b1JOpZfxUe3R",
    };

    const headersProd = {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      "PAYDUNYA-PRIVATE-KEY": "live_private_KvbXuQU1IJ4z68hQOU9YeEtrUjW",
      "PAYDUNYA-TOKEN": "cjTGi71WL8xOTCrsJisR",
    };

    const urlVerifInvoiceTest = `https://app.paydunya.com/sandbox-api/v1/checkout-invoice/confirm/${token}`;
    const urlVerifInvoiceLive = `https://app.paydunya.com/api/v1/checkout-invoice/confirm/${token}`;

    const response = await axiosInstance.get(urlVerifInvoiceTest, {
      headers: headersTest,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.response_text);
    }
  },
};

export default PaiementService;
