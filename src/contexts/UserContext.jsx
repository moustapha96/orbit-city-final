/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useEffect } from "react";

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("accessToken");
  const storedUid = localStorage.getItem("uid");
  const storedExpiresIn = localStorage.getItem("expires_in");
  const is_verified = localStorage.getItem("is_verified");
  const storedRefreshExpiresIn = localStorage.getItem("refresh_expires_in");
  const storedRefreshToken = localStorage.getItem("refresh_token");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    uid: storedUid || null,
    expiresIn: storedExpiresIn || null,
    refreshExpiresIn: storedRefreshExpiresIn || null,
    refreshToken: storedRefreshToken || null,
    is_verified: is_verified || null,
  };
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(getInitialState());

  const [user, setUser] = useState(getInitialState().user);
  const [token, setToken] = useState(getInitialState().token);
  const [uid, setUid] = useState(getInitialState().uid);
  const [is_verified, setIsVerified] = useState(getInitialState().is_verified);

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
    localStorage.setItem("is_verified", userContext.is_verified);
    localStorage.setItem("token", userContext.token);
  }, [userContext]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("refresh_expires_in");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_verified");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
    setUid(null);
    setExpiresIn(null);
    setRefreshToken(null);
    setRefreshExpiresIn(null);
    setUserContext(getInitialState());
    setIsVerified(null);
  };
  const value = {
    user,
    token,
    uid,
    expiresIn,
    refreshToken,
    refreshExpiresIn,
    userContext,
    is_verified,
    setUid,
    setUser,
    setToken,
    setExpiresIn,
    setRefreshToken,
    setRefreshExpiresIn,
    setUserContext,
    setIsVerified,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
