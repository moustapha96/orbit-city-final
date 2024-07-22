/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useEffect } from "react";

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("accessToken");
  const storedUid = localStorage.getItem("uid");
  const storedExpiresIn = localStorage.getItem("expires_in");

  const storedRefreshExpiresIn = localStorage.getItem("refresh_expires_in");
  const storedRefreshToken = localStorage.getItem("refresh_token");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    uid: storedUid || null,
    expiresIn: storedExpiresIn || null,
    refreshExpiresIn: storedRefreshExpiresIn || null,
    refreshToken: storedRefreshToken || null,
  };
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(getInitialState());

  const [user, setUser] = useState(getInitialState().user);
  const [token, setToken] = useState(getInitialState().token);
  const [uid, setUid] = useState(getInitialState().uid);
  const [expiresIn, setExpiresIn] = useState(getInitialState().expiresIn);
  const [refreshToken, setRefreshToken] = useState(
    getInitialState().refreshToken
  );
  const [refreshExpiresIn, setRefreshExpiresIn] = useState(
    getInitialState().refreshExpiresIn
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userContext.user));
    localStorage.setItem("accessToken", userContext.token);
    localStorage.setItem("uid", userContext.uid);
    localStorage.setItem("expires_in", userContext.expiresIn);
    localStorage.setItem("refresh_expires_in", userContext.refreshExpiresIn);
    localStorage.setItem("refresh_token", userContext.refreshToken);
  }, [userContext]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("refresh_expires_in");
    localStorage.removeItem("refresh_token");

    setUser(null);
    setToken(null);
    setUid(null);
    setExpiresIn(null);
    setRefreshToken(null);
    setRefreshExpiresIn(null);
    setUserContext(getInitialState());
  };
  const value = {
    user,
    token,
    uid,
    expiresIn,
    refreshToken,
    refreshExpiresIn,
    userContext,
    setUid,
    setUser,
    setToken,
    setExpiresIn,
    setRefreshToken,
    setRefreshExpiresIn,
    setUserContext,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
