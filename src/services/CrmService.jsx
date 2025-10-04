// services/produitservice.js
import axiosInstance from "../config/axiosConfig";

const CrmService = {
    sendCRMData: async (dataM) => {
        try {
            const response = await axiosInstance.post('api/create_or_update_crm', dataM);
            return response;
        } catch (error) {
            console.error('Error sending CRM data:', error);
            throw error;
        }
    }

};

export default CrmService;
