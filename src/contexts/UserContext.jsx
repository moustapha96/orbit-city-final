/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useEffect } from "react";

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("accessToken");
  const storedUid = localStorage.getItem("uid");
  const storedExpiresIn = localStorage.getItem("expires_in");
  const storedPaniers = localStorage.getItem("paniers");
  const storedSouhaits = localStorage.getItem("souhaits");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    uid: storedUid || null,
    expiresIn: storedExpiresIn || null,
    paniers: storedPaniers ? JSON.parse(storedPaniers) : null,
    souhaits: storedSouhaits ? JSON.parse(storedSouhaits) : null,
  };
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState().user);
  const [token, setToken] = useState(getInitialState().token);
  const [uid, setUid] = useState(getInitialState().uid);
  const [expiresIn, setExpiresIn] = useState(getInitialState().expiresIn);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    localStorage.setItem("uid", uid);
    localStorage.setItem("expires_in", expiresIn);
  }, [user, token, uid, expiresIn]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        uid,
        setUid,
        token,
        setToken,
        expiresIn,
        setExpiresIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
