
import axiosInstance from '../config/axiosConfig';






// fonction pour obtenir la liste des abonnements
export async function getClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// function to gaet all company 
export async function getAllCompanies() {
    try {
        const response = await axiosInstance.get('/api/companies');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}


export async function setCompteEnable(id) {
    try {
        const response = await axiosInstance.get('/api/companies/clients/compte/' + id);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// getCommandesClientsEntreprise
export async function getCommandesClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// getCommandeECDVClientsEntreprise
export async function getCommandeECDVClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandesECDV/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeRejeteClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandesRejete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeApprouveClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandesApprouve/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function setValidationStateCommande(id, state) {
    try {
        const response = await axiosInstance.put(`api/companies/clients/commande/changeState/${id}`, {
            state: state
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// commandes a credit clients
export async function getCommandesCreditClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`api/companies/clients/commandesCredit/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}