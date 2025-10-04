import axiosInstance from '../config/axiosConfig';



export async function createSimpleCommentaire(data) {
    try {
        const response = await axiosInstance.post(`/api/commentaires/simple`, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du commentaire", error);
        throw error;
    }
}
export async function getSimpleCommentaire() {
    try {
        const response = await axiosInstance.get(`/api/commentaires/simple`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires", error);
        throw error;
    }
}

export async function createCommentaire(data) {
    try {
        const response = await axiosInstance.post(`/api/commentaires`, data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du commentaire", error);
        throw error;
    }
}

export async function getCommentaire() {
    try {
        const response = await axiosInstance.get(`/api/commentaires`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires", error);
        throw error;
    }
}

// get commentaire by id produit
export async function getCommentaireByProduit(id) {
    try {
        const response = await axiosInstance.get(`/api/commentaires/produit/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires", error);
        throw error;
    }
}