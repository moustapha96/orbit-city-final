// Dans un fichier useAuth.js
import { useDispatch } from "react-redux";
import refreshtoken from "../service/userService";

import { setToken } from "../slices/userSlice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, expiresIn, token } = useContext(UserContext);

  const isTokenExpired = () => {
    if (!token || !expiresIn) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expiresIn;
  };

  const refreshtokenF = async () => {
    const newtoken = await refreshtoken();
    console.log("fonction refresh token");
    if (newtoken) {
      // Mettez à jour le store Redux avec le nouveau token
      dispatch(setToken(newtoken));
      return newtoken;
    }

    return null;
  };

  return { user, token, isTokenExpired, refreshtokenF };
};

export default useAuth;
