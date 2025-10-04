// services/produitservice.js
import axiosInstance from "../config/axiosConfig";

const PackPromoService = {
    getPackByCode: async (code) => {
        try {
            const response = await axiosInstance.get('api/pack_product/' + code);
            return response;
        } catch (error) {
            console.error('Error sending CRM data:', error);
            throw error;
        }
    }
    ,
    getPacks: async () => {
        try {
            const response = await axiosInstance.get('api/pack_product');
            return response;
        } catch (error) {
            console.error('Error sending CRM data:', error);
            throw error;
        }
    }

};

export default PackPromoService;
