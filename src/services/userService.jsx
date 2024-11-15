// services/userservice.js
import axiosInstance from "../config/axiosConfig";

const userService = {
  getUsers: async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des users", error);
      throw error;
    }
  },
  getCompte: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}/compte`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  createUser: async (modelData) => {
    try {
      const response = await axiosInstance.post("/api/new_compte", modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du modèle", error);
      throw error;
    }
  },

  updateUser: async (id, modelData) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/${id}/update`,
        modelData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du modèle avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du user avec l'ID ${id}`,
        error
      );
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosInstance.get(
        `/api/auth/get_tokens?username=${credentials.username}&password=${credentials.password}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des tokens", error);
      throw error;
    }
  },
  verifiedCompte: async (mail) => {
    try {
      const response = await axiosInstance.get(`/api/users/verified/${mail}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la vérification de votre compte", error);
      throw error;
    }
  },
  resetPassword: async (email) => {
    try {
      const response = await axiosInstance.get(`/api/reset-password/${email}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des tokens", error);
      throw error;
    }
  },
  newPassword: async (modelData) => {
    try {
      const response = await axiosInstance.post(`/api/new-password`, modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des tokens", error);
      throw error;
    }
  },
  refreshAccessToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      const response = await axiosInstance.post("/api/auth/refresh_token", {
        refresh_token: refreshToken,
      });
      const { access_token, expires_in } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("expires_in", expires_in);
      return response;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token", error);
      throw error;
    }
  },

  deleteAccessToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post("/api/auth/delete_tokens", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du token", error);
      throw error;
    }
  },

  getCurrentUser: async (uid) => {
    try {
      const response = await axiosInstance.get(`/api/users/${uid}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur avec l'ID ${uid}`,
        error
      );
      throw error;
    }
  },

  updateUserAvatar: async (avatar) => {
    const partner_id = localStorage.getItem("partner_id");
    try {
      const response = await axiosInstance.put(
        `/api/users/avatar/${partner_id}`,
        { avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar", error);
      throw error;
    }
  },

  updateUserInfo: async (userData) => {
    try {
      const response = await axiosInstance.put("/api/users/me", userData);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des informations de l'utilisateur",
        error
      );
      throw error;
    }
  },
  getPartnerByEmail: async (email) => {
    try {
      const response = await axiosInstance.get(`/api/partnerByEmail/${email}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la?}", error);
      throw error;
    }
  },
  createPasswordPartner: async (modelData) => {
    try {
      const response = await axiosInstance.post(`/api/partner-create/${modelData.email}/update`, modelData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du mot de passe", error);
      throw error;
    }
  },
};

export default userService;
