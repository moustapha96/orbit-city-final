// services/commandeservice.js
import axiosInstance from "../config/axiosConfig";

const ContactService = {


    sendContact: async (modelData) => {
        try {
            const response = await axiosInstance.post("/api/sendContact", modelData);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création du modèle", error);
            throw error;
        }
    },


};

export default ContactService;
