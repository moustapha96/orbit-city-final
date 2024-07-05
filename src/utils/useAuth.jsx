// Dans un fichier useAuth.js
import { useDispatch, useSelector } from "react-redux";
import refreshAccessToken from "../service/userService";

import { setToken } from "../slices/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.token);
  const expiresIn = useSelector((state) => state.user.expiresIn);

  const isTokenExpired = () => {
    if (!accessToken || !expiresIn) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expiresIn;
  };

  const refreshAccessTokenF = async () => {
    const newAccessToken = await refreshAccessToken();
    console.log("fonction refresh token");
    if (newAccessToken) {
      // Mettez à jour le store Redux avec le nouveau token
      dispatch(setToken(newAccessToken));
      return newAccessToken;
    }

    return null;
  };

  return { user, accessToken, isTokenExpired, refreshAccessTokenF };
};

export default useAuth;
