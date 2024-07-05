/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [paniers, setPaniers] = useState(null);
  const [souhaits, setSouhairs] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [uid, setUid] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        uid,
        setUid,
        token,
        setToken,
        paniers,
        setPaniers,
        souhaits,
        setSouhairs,
        expiresIn,
        setExpiresIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
