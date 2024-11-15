/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../../Partials/Layout";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import userService from "../../../services/userService";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhoneNumber } from "../../../utils/validations";
import isStrongPassword from "../../../utils/verifPassword";
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader";
import Thumbnail from "./Thumbnail";
import { getAllCompanies } from "../../../services/entrepriseFunctionService";
export default function CreateCompte() {
  const [checked, setValue] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('mail');

  const [partner, setPartner] = useState({})

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState([]);
  const [errorSubmit, setErrorSubmit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirme, setShowPasswordConfirm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companie, setCompanie] = useState([]);


  useEffect(() => {

    const fetchPartner = async () => {

      try {
        const resultat = await userService.getPartnerByEmail(email);
        setPartner(resultat)
        if (resultat.password) {
          navigate('/login')
        }
        setName(resultat.name)
        setTelephone(resultat.partner_phone)
        setAdresse(resultat.partner_city)
        console.log(resultat)
      } catch (error) {
        console.error(error);
      }
    }
    const fetchCompanies = async () => {
      try {
        const resultat = await getAllCompanies();
        setCompanies(resultat)
      } catch (error) {
        console.error(error);
      }
    }
    if (!email) {
      navigate('/login')
    } else {
      fetchPartner();
      fetchCompanies();
    }
  }, [email, navigate]);
  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }
    return "";
  };
  const validateForm = () => {
    const errors = {
      checked: !checked
        ? "Veuillez accepter les termes de condition de notre site"
        : "",
      name: !name ? "Le prénom est obligatoire." : "",
      telephone: !telephone
        ? "Le téléphone est obligatoire."
        : !isValidPhoneNumber(telephone)
          ? "Le numéro de téléphone est invalide."
          : "",
      adresse: !adresse ? "L'adresse est obligatoire." : "",
      email: !email
        ? "L'adresse email est obligatoire."
        : !isValidEmail(email)
          ? "L'adresse email est invalide."
          : "",
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
        name: name,
        email: email,
        adresse: adresse,
        password: password,
        telephone: telephone,
        companie: companie.id
      };
      console.log(data);
      try {
        const response = await userService.createPasswordPartner(data);
        toast.success("Création compte réussie, Merci de consulter votre boite mail", {
          position: "top-center",
          // autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response);
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        setErrorSubmit(error.response.data);
        setIsLoading(false);
        console.log("response");
        console.log(error);
      }
    } else {
      console.log("Formulaire invalide!");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const rememberMe = () => {
    setValue(!checked);
  };
  return (
    <>
      <SEOHeader
        title="CCBM Shop | Inscription"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses="pt-0 pb-0">
        <div className="login-page-wrapper w-full py-10">
          <div className="container-x mx-auto">
            <div className="lg:flex items-center relative">
              <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">


                    {errorSubmit && (
                      <p className="text-red-600">{errorSubmit}</p>
                    )}
                    {error.nom && (
                      <p className="text-red-600">{error.nom}</p>
                    )}
                    {error.prenom && (
                      <p className="text-red-600">{error.prenom}</p>
                    )}
                    {error.telephone && (
                      <p className="text-red-600">{error.telephone}</p>
                    )}

                    {error.passwordError && (
                      <p className="text-red-600">{error.passwordError}</p>
                    )}
                    {error.email && (
                      <p className="text-red-600">{error.email}</p>
                    )}



                  </div>

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


                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            <Label htmlFor="companie" value="Votre entreprise" className="dark:text-white" />

                          </div>
                          <input
                            type="text"
                            placeholder="Entreprise"
                            value={`${name}`}
                            name="companie"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          invalid:text-red-600
                          focus:invalid:border-red-500 focus:invalid:ring-red-500
                          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          />
                        </div>


                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            <Label htmlFor="name" value="Nom Complet" className="dark:text-white" />
                            {error.name && (
                              <p className="text-red-600">{error.name}</p>
                            )}
                          </div>
                          <input
                            type="text"
                            placeholder="Nom Complet"
                            value={`${name}`}
                            name="prenom"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                          invalid:text-red-600
                          focus:invalid:border-red-500 focus:invalid:ring-red-500
                          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          />
                        </div>

                      </div>
                      <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            {error.email && (
                              <p className="text-red-600">{error.email}</p>
                            )}
                            <Label htmlFor="email" value="Email" className="dark:text-white" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            placeholder="Adresse Email"
                            value={email}
                            disabled
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  invalid:text-red-600
                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          />
                        </div>
                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            {error.telephone && (
                              <p className="text-red-600">{error.telephone}</p>
                            )}
                            <Label htmlFor="phone" value="Téléphone" className="dark:text-white" />
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
                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          />
                        </div>
                      </div>
                      <div className="w-full input-item mb-5">
                        <div className="mb-2 block">
                          {error.adresse && (
                            <p className="text-red-600">{error.adresse}</p>
                          )}
                          <Label htmlFor="adresse" value="Adresse" className="dark:text-white" />
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
                  focus:invalid:border-red-500 focus:invalid:ring-red-500
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </div>



                      <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            <div>
                              <Label htmlFor="password" value="Mot de passe" className="dark:text-white" />
                            </div>
                            <div className="relative">
                              <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Mot de passe"
                                className="focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600
                      mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:ring-1
                      invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  setShowPassword(!showPassword);
                                }}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                              >
                                {!showPassword ? <EyeOff /> : <Eye />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="sm:w-1/2 md:w-full">
                          <div className="mb-2 block">
                            <div>
                              <Label
                                htmlFor="confpassword"
                                value="Confirmation Mot de passe"
                                className="dark:text-white"
                              />
                            </div>
                            <div className="relative">
                              <input
                                id="hs-toggle-password"
                                type={showPasswordConfirme ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                                placeholder="confirmation mot de passe"
                                className="focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600
                                  mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                  focus:outline-none focus:ring-1
                                  invalid:text-red-600
                                  focus:invalid:border-red-500 focus:invalid:ring-red-500"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  setShowPasswordConfirm(!showPasswordConfirme);
                                }}
                                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                              >
                                {!showPasswordConfirme ? <EyeOff /> : <Eye />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div className="forgot-password-area mb-7">
                        <div className="remember-checkbox flex items-center space-x-2.5">
                          <div className="flex items-center space-x-2">
                            {!checked && (
                              <p className="text-red-600 dark:text-red-400">{error.checked}</p>
                            )}
                            <Checkbox id="terms" onClick={rememberMe} className="dark:text-white" />
                            <Label htmlFor="terms" className="dark:text-white">
                              J'accepte les termes de conditions de CCBM Shop
                            </Label>
                          </div>
                        </div>
                      </div>


                      <div className="signin-area mb-3">
                        <div className="flex justify-center">
                          <Button
                            type="submit"
                            variant="failure"
                            className="hover:bg-bleu-logo black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center
                  bg-purple items-center"
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
                          <Link
                            to="/login"
                            className="ml-2 hover:text-bleu-logo text-qblack"
                          >
                            Se connecter
                          </Link>
                        </p>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
              {/* <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
                <div
                  className="absolute xl:-right-20 -right-[138px]"
                  style={{ top: "calc(50% - 258px)" }}
                >

                </div>
              </div> */}
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
    </>
  );
}
