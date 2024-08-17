/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";

import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import userService from "../../../services/userService";
import { Button, Label, TextInput } from "flowbite-react";

import { Loader2 } from "lucide-react";
import { UserContext } from "../../../contexts/UserContext";
export default function ResetPassword() {
  const {
    user,
    setUser,
    setToken,
    setUid,
    setExpiresIn,
    setRefreshExpiresIn,
    setRefreshToken,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const validateForm = () => {
    setError({
      email: !email ? "L'adresse email est obligatoire." : "",
    });

    return Object.values(error).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      toast.dismiss();
      toast.error(
        "Connexion Echoué , champs Email ou Mot de passe incorrecte  !",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.log("Formulaire invalide !");
    }

    if (validateForm()) {
      console.log(email);
      try {
        const response = await userService.resetPassword(email);
        console.log(response);

        toast.dismiss();
        toast.success("Lien de réinitailisation envoyé avec succès!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        setIsLoading(false);
        toast.dismiss();
        toast.error("Merci de vérifier l'adresse mail renseignée ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Erreur lors de l'obtention des jetons :", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                      Mot de passe oublié
                    </h1>
                    <div className="shape -mt-6">
                      <svg
                        width="172"
                        height="29"
                        viewBox="0 0 172 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                          stroke="#FFBB38"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="input-area">
                    <div className="input-item mb-5">
                      <div className="mb-2 block">
                        <Label htmlFor="email" value="Adresse Email" />
                      </div>
                      <TextInput
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\$"
                        placeholder="name@flowbite.com"
                        className="
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            invalid:border-red-500 invalid:text-red-600
                            focus:invalid:border-red-500 focus:invalid:ring-red-500"
                      />
                    </div>

                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          variant="failure"
                          className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                              hover:bg-red-500  bg-purple items-center"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Demande de réinitialisation
                        </Button>
                      </div>
                    </div>
                    <div className="signup-area flex justify-center">
                      <p className="text-base text-qgraytwo font-normal">
                        Vous avez déjà un compte ?
                        <Link to="/login" className="ml-2 text-qblack">
                          Connexion
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
