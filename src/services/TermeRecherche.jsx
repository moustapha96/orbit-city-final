import axiosInstance from '../config/axiosConfig';



export async function addTermeRecherche(data) {
    try {
        const response = await axiosInstance.post(`/api/termeRecherche`, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du commentaire", error);
        throw error;
    }
}