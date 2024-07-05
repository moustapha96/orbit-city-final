/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch } from "react-redux";
import {
  user,
  token,
  setUid,
  setUser,
  setToken,
  setExpiresIn,
  setUserContext,
  setRefreshExpiresIn,
  setRefresToken,
} from "../slices/userSlice";

export const Logout = () => {
  const dispatch = useDispatch();

  // Supprimer les informations de l'utilisateur du localStorage
  localStorage.removeItem("uid");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("company_id");
  localStorage.removeItem("user_context");
  localStorage.removeItem("user");
  localStorage.removeItem("partner_id");

  // Réinitialiser l'état de l'utilisateur dans le store Redux
  dispatch(setUid(null));
  dispatch(setUser(null));
  dispatch(setToken(null));
  dispatch(setExpiresIn(null));
  dispatch(setUserContext(null));
  dispatch(setRefresToken(null));
  dispatch(setRefreshExpiresIn(null));
};
