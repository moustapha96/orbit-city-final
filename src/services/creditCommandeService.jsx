
import axiosInstance from '../config/axiosConfig';


export async function checkExistingCreditCommande(id) {
    try {
        const response = await axiosInstance.get(`/api/creditcommandes/clients/${id}/stateCommande`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du commande a credit", error);
        throw error;
    }
}
export async function getCreditCommandeById(idPartner, id) {
    try {

        const response = await axiosInstance.post(`api/creditcommandes/details`, {
            partner_id: idPartner,
            order_id: id
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function createCreditCommande(modelData) {
    try {
        const response = await axiosInstance.post(`/api/creditcommandes`, modelData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du commande a credit", error);
        throw error;
    }
}


