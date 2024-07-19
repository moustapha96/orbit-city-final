/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Loader2 } from "lucide-react";
import userService from "../../../services/userService";
import { toast } from "react-toastify";
export default function Signup() {
  const [checked, setValue] = useState(false);
  const navigate = useNavigate();

  const [stateListe, setStateListe] = useState(null);
  const [stateListeFilter, setStateListeFilter] = useState(null);
  const [state, setState] = useState(null);
  const [pays, setPays] = useState(null);

  const [countryListe, setCountryListe] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [typeProfile, setTypeProfile] = useState("");
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password, confirmPassword) =>
    password !== confirmPassword
      ? "Les mots de passe ne correspondent pas."
      : "";

  const validateForm = () => {
    const errors = {
      checked: !checked
        ? "Veuillez accepter les termes de condition de notre site"
        : "",
      prenom: !prenom ? "Le prénom est obligatoire." : "",
      nom: !nom ? "Le nom est obligatoire." : "",
      telephone: !telephone ? "Le téléphone est obligatoire." : "",
      adresse: !adresse ? "L'adresse est obligatoire." : "",
      email: !email ? "L'adresse email est obligatoire." : "",
      // typeProfile: !typeProfile
      //   ? "Veuillez sélectionner un type de profil."
      //   : "",
      password: !password ? "Le mot de passe est obligatoire." : "",
      passwordError: validatePassword(password, confirmPassword),
    };
    console.log(errors);
    setError(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      const data = {
        name: `${prenom} ${nom}`,
        login: email,
        city: adresse,
        phone: telephone,
        type: typeProfile,
        email: email,
        password: password,
        company_name: "Client WEB",
      };

      const response = await userService.createUser(data);

      if (response) {
        toast.success("Création compte réussie !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response);
        navigate("/login");
      } else {
        console.log("response " + response);
        alert("erreur : " + response.error);
        toast.error("Création compte Echouée , " + response.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      console.log("Formulaire invalide!");
      toast.error("Création compte échouée , formulaire invalide", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
  };

  const rememberMe = () => {
    setValue(!checked);
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Créer un compte
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <form onSubmit={handleSubmit}>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="w-1/2">
                        <div className="mb-2 block">
                          <Label htmlFor="prenom" value="Prénom" />
                          {error.prenom && (
                            <p className="text-red-600">{error.prenom}</p>
                          )}
                          <Label htmlFor="prenom" value="Prénom" />
                        </div>
                        <input
                          type="text"
                          placeholder="Prénom"
                          value={`${prenom}`}
                          name="prenom"
                          onChange={(e) => setPrenom(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                      <div className="w-1/2">
                        <div className="mb-2 block">
                          <Label htmlFor="nom" value="Nom" />
                          {error.nom && (
                            <p className="text-red-600">{error.nom}</p>
                          )}
                          <Label htmlFor="nom" value="Nom" />
                        </div>
                        <input
                          id="nom"
                          type="text"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="w-1/2">
                        <div className="mb-2 block">
                          {error.email && (
                            <p className="text-red-600">{error.email}</p>
                          )}
                          <Label htmlFor="email" value="Email" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          placeholder="Adresse Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>

                      <div className="w-1/2">
                        <div className="mb-2 block">
                          {error.telephone && (
                            <p className="text-red-600">{error.telephone}</p>
                          )}
                          <Label htmlFor="phone" value="Téléphone" />
                        </div>
                        <input
                          id="phone"
                          type="phone"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          required
                          placeholder="77 000 00 00"
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="input-item mb-5">
                      <div className="mb-2 block">
                        {error.adresse && (
                          <p className="text-red-600">{error.adresse}</p>
                        )}
                        <Label htmlFor="adresse" value="Adresse" />
                      </div>
                      <input
                        id="adresse"
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                        placeholder="city"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                      />
                    </div>

                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="w-1/2">
                        <div className="mb-2 block">
                          {error.password && (
                            <p className="text-red-600">{error.password}</p>
                          )}
                          <Label htmlFor="password" value="Mot de passe" />
                        </div>
                        <input
                          id="password"
                          type="password"
                          placeholder="Mot de passe"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>

                      <div className="w-1/2">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="confpassword"
                            value="Confirmation Mot de passe"
                          />
                        </div>
                        <input
                          id="confpassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="confirmation mot de passe"
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />{" "}
                        {error.passwordError && (
                          <p className="text-red-600">{error.passwordError}</p>
                        )}
                      </div>
                    </div>

                    <div className="forgot-password-area mb-7">
                      <div className="remember-checkbox flex items-center space-x-2.5">
                        <div className="flex items-center space-x-2">
                          {!checked && (
                            <p className="text-red-600">{error.checked}</p>
                          )}
                          <Checkbox id="terms" onClick={rememberMe} />
                          <Label htmlFor="terms">
                            J'accepte les termes de conditions de Orbit City
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="signin-area mb-3">
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          variant="failure"
                          className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                       hover:bg-red-500  bg-purple items-center"
                          disabled={isLoading}
                        >
                          {isLoading == true ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span> Creation compte</span>
                            </>
                          ) : (
                            <span> Créer un compte</span>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="signup-area flex justify-center">
                      <p className="text-base text-qgraytwo font-normal">
                        Vous avez déjà un compte?
                        <Link to="/login" className="ml-2 text-qblack">
                          Se connecter
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
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
