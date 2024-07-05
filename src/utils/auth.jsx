/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "../slices/userSlice";
import userService from "../service/userService";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const accessToken = useSelector((state) => state.user.token);
    const expiresIn = useSelector((state) => state.user.expiresIn);
    const token = localStorage.getItem("token");

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (expiresIn) {
          const currentTime = Math.floor(Date.now() / 1000);
          const remainingTime = expiresIn - currentTime;
          setTimeLeft(remainingTime);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }, [expiresIn]);

    const isTokenExpired = () => {
      if (!accessToken || !expiresIn) return true;
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= expiresIn;
    };

    const refreshAccessTokenService = async () => {
      const response = await userService.refreshAccessToken();

      if (response) {
        dispatch(setToken(response.access_token));
        return response.access_token;
      }

      if (isTokenExpired()) {
        console.log("token expirer");
        const newAccessToken = await userService.refreshAccessToken();
        if (!newAccessToken) {
          return <Navigate to="/login" replace />;
        }
      }

      return null;
    };

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div>
        {/* {timeLeft !== null && (
          <p>Temps restant avant expiration du token : {timeLeft} secondes</p>
        )} */}
        <Component {...props} />
      </div>
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
