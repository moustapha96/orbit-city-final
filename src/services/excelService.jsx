// services/commandeservice.js

import axiosInstance from "../config/axiosConfig";

const ExcelService = {

    createCrm: async (leads) => {
        try {

            const formattedLeads = leads.map(lead => ({
                productName: lead.productName,
                date: new Date().toLocaleString(),
                user: lead.user,
                phone: lead.phone,
                email: lead.email,
                type: lead.type,
                price: lead.price,
                location: lead.location
            }));

            const data = {
                data: formattedLeads
            };
            console.log(data);
            const response = await axiosInstance.post("/api/create_leads", data);

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'Excel:", error);
        }
    },
    getBrowserInfo: async () => {
        const userAgent = navigator.userAgent; // Récupère l'agent utilisateur
        const browserName = navigator.appName; // Nom du navigateur
        const browserVersion = navigator.appVersion; // Version du navigateur
        const screenWidth = window.innerWidth; // Largeur de la fenêtre
        const screenHeight = window.innerHeight; // Hauteur de la fenêtre

        return {
            userAgent,
            browserName,
            browserVersion,
            screenWidth,
            screenHeight
        };
    }
};

export default ExcelService;