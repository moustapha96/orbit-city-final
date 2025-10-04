
// import axiosInstance from '../config/axiosConfig';

import axiosInstance from "../config/axiosConfig";






// // fonction pour obtenir la liste des abonnements
// export async function getClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// // function to gaet all company 
// export async function getAllCompanies() {
//     try {
//         const response = await axiosInstance.get('/api/companies');
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }


// export async function setCompteEnable(id) {
//     try {
//         const response = await axiosInstance.get('/api/companies/clients/compte/' + id);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// // getCommandesClientsEntreprise
// export async function getCommandesClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandes/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }
// // getCommandeECDVClientsEntreprise
// export async function getCommandeECDVClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandesECDV/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// export async function getCommandeRejeteClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandesRejete/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// export async function getCommandeApprouveClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandesApprouve/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// export async function setValidationStateCommande(id, state) {
//     try {
//         const response = await axiosInstance.put(`api/companies/clients/commande/changeState/${id}`, {
//             state: state
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// export async function getCommandeClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandes/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }

// // commandes a credit clients
// export async function getCommandesCreditClientsEntreprise(id) {
//     try {
//         const response = await axiosInstance.get(`api/companies/clients/commandesCredit/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }
// export async function getCommandeCreditClient(id) {
//     try {
//         const response = await axiosInstance.get(`api/creditcommandes/clients/${id}/liste`);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }
// // send demande adhesion
// export async function sendDemandeAdhesion(data) {
//     try {
//         const response = await axiosInstance.post(`api/companies/clients/demandeAdhesion`, data);
//         return response.data;
//     } catch (error) {
//         console.error('Erreur lors de la sélection des abonnements:', error);
//         throw error;
//     }
// }


const urlApi = import.meta.env.VITE_API_URL_DEV;



export async function getClientsEntreprise(data) {
    try {
        console.log(data)
        const response = await axiosInstance.post(`${urlApi}api/companies/clients/liste`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getAllCompanies() {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function setCompteEnable(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/compte/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandesClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeECDVClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesECDV/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeRejeteClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesRejete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// get commandes of partner
export async function getCommandesPartenaireEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesPartenaire/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// get commande order
export async function getCommandeOrderClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesOrder/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// get commande preorder
export async function getCommandePreOrderClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesPreOrder/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeApprouveClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesApprouve/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function setValidationStateCommande(id, state) {
    try {
        const response = await axiosInstance.put(`${urlApi}api/companies/clients/commande/changeState/${id}`, {
            state: state
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// 
export async function setValidationAdhesion(id, state) {
    try {
        const response = await axiosInstance.put(`${urlApi}api/companies/clients/commande/changeAdhesion/${id}`, {
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
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandesCreditClientsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/commandesCredit/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getClientDetails(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}


export async function getCommandeDetailsEntreprise(data) {
    try {
        console.log(data)
        const response = await axiosInstance.post(`${urlApi}api/companies/clients/commandes/details`, {
            order_id: data.order_id,
            parent_id: data.parent_id
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getDetailsEntreprise(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function updateCompanyInfo(id, data) {
    try {
        console.log(data, id)
        const response = await axiosInstance.put(`${urlApi}api/companies/${id}/details`, data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error);
        throw error;
    }
}

export async function getDetailsCompte(id) {
    try {
        const response = await axiosInstance.get(`${urlApi}api/companies/clients/compte/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
export async function updateUserProfile(id, data) {
    try {
        console.log(data, id)
        const response = await axiosInstance.put(`${urlApi}api/companies/clients/compte/${id}/details`, data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error);
        throw error;
    }
}

export async function checkCodeEntreprise(data) {
    try {
        const response = await axiosInstance.post(`${urlApi}api/companies/check_entreprise_code`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// send demande adhesion
export async function sendDemandeAdhesion(data) {
    try {
        const response = await axiosInstance.post(`api/companies/clients/demandeAdhesion`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeCreditClient(id) {
    try {
        const response = await axiosInstance.get(`api/creditcommandes/clients/${id}/liste`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}