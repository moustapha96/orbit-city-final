<<<<<<< HEAD
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";

// import Layout from "../../Partials/Layout";
// import Thumbnail from "./Thumbnail";
// import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import userService from "../../../services/userService";
// import { Button, Label, TextInput } from "flowbite-react";

// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader";
// import { useAuthContext } from "../../../contexts/useAuthContext";
// export default function Login() {

//   const searchParams = new URLSearchParams(location.search);
//   const mail = searchParams.get("mail");
//   const isVerified = searchParams.get("isVerified");

//   const { logout, saveSession } = useAuthContext();


//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [identifier, setIdentifier] = useState("");

//   const validateForm = () => {
//     setError({
//       identifier: !identifier ? "L'email ou le numéro de téléphone est obligatoire." : "",
//       password: !password ? "Le mot de passe est obligatoire." : "",
//     });

//     return Object.values(error).every((error) => !error);
//   };

//   useEffect(() => {
//     if (mail)
//       setIdentifier(mail);
//   }, [mail]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
//   }, []);


//   const handleSubmit = async (e) => {
//     const redirectUrl = searchParams.get("redirectTo") ?? "/boutique";

//     setIsLoading(true);
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.dismiss();
//       toast.error(
//         "Connexion Echoué , champs Email ou Mot de passe incorrecte  !",
//         {
//           position: "top-center",
//           autoClose: 5000
//         }
//       );
//       console.log("Formulaire invalide !");
//     }

//     if (validateForm()) {
//       console.log(identifier, password);
//       try {
//         const response = await userService.login({
//           username: identifier,
//           password: password,
//         });
//         setIsLoading(false);
//         console.log(response)
//         console.log("resultat")
//         if (response.is_verified != true) {
//           toast.dismiss();
//           toast.error("Merci de vérifier votre compte pour se connecter", {
//             position: "top-center",
//             autoClose: 5000,
//           });
//           navigate("/login");
//         } else {
//           if (response.user_info.role == "main_user") {
//             toast.warning("Veuillez utiliser votre compte client", {
//               position: "top-center",
//               autoClose: 3000,
//             })
//             logout();
//           } else {
//             toast.dismiss();
//             toast.success("Connexion réussie !", {
//               position: "top-center",
//               autoClose: 3000,
//             });
//             setIsLoading(false);
//             saveSession(response);

//             if (redirectUrl) {
//               navigate(redirectUrl);
//             } else {
//               navigate("/boutique");
//             }
//           }
//         }
//       } catch (error) {
//         setIsLoading(false);
//         toast.dismiss();
//         toast.error(error.response.data.error, {
//           position: "top-center",
//           autoClose: 5000,
//         });
//         console.error(error.response.data.error);
//       }
//     }

//     setIsLoading(false);
//   };



//   useEffect(() => {
//     setIsLoading(true);
//     const fetchModels = async () => {
//       if (mail && isVerified) {
//         try {
//           const resp = await userService.verifiedCompte(mail);
//           console.log(resp.status);
//           setIsLoading(false);
//           if (resp.status == "success") {
//             setIdentifier(mail);
//           }
//           setIsLoading(false);
//         } catch (error) {
//           setIsLoading(false);
//           toast.error("Votre compte n'est pas encore valide", {
//             position: "top-center",
//             autoClose: 5000
//           });
//         }
//       }
//     };
//     fetchModels();
//     setIsLoading(false);
//   }, []);

//   return (
//     <>
//       <SEOHeader
//         title="CCBM Shop | Connexion"
//         description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
//         keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
//       />
//       <Layout childrenClasses="pt-0 pb-0">

//         <div className="login-page-wrapper w-full py-10">
//           <div className="container-x mx-auto">
//             <div className="flex justify-center items-center min-h-screen">
//               <div className="w-full max-w-md bg-white p-6 border border-[#E0E0E0] rounded-lg shadow-md">
//                 <form onSubmit={handleSubmit} className="w-full space-y-6">
//                   <div className="title-area text-center mb-8">
//                     <h1 className="text-3xl font-bold text-qblack">Connexion</h1>
//                     <div className="shape mt-2">
//                       <svg
//                         width="172"
//                         height="29"
//                         viewBox="0 0 172 29"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
//                           stroke="#FFBB38"
//                         />
//                       </svg>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
//                         Adresse Email ou Téléphone
//                       </Label>
//                       <TextInput
//                         id="email"
//                         type="email"
//                         className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                         value={identifier}
//                         onChange={(e) => setIdentifier(e.target.value)}
//                         required
//                         placeholder="Adresse email"

//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
//                         Mot de passe
//                       </Label>
//                       <div className="relative">
//                         <TextInput
//                           id="password"
//                           placeholder="*******"
//                           className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                           type={showPassword ? "text" : "password"}
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required

//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute inset-y-0 right-0 flex items-center pr-3"
//                         >
//                           {!showPassword ? <Eye className="h-5 w-5 text-gray-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between mt-6">
//                     <Link to="/forgot-password" className="text-sm text-bleu-logo hover:text-bleu-claire">
//                       Mot de passe oublié
//                     </Link>
//                   </div>


//                   <button
//                     type="submit"
//                     className="w-full flex items-center justify-center bg-bleu-logo hover:bg-bleu-claire text-white font-medium 
//                           py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         <span>Connexion...</span>
//                       </>
//                     ) : (
//                       "Se connecter"
//                     )}
//                   </button>


//                   <div className="text-center mt-6">
//                     <p className="text-sm text-gray-600">
//                       Vous n'avez pas de compte ?
//                       <Link to="/signup" className="ml-1 text-blue-logo hover:text-bleu-logo">
//                         Inscription
//                       </Link>
//                     </p>
//                   </div>

//                 </form>
//               </div>

//               <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
//                 <div
//                   className="absolute xl:-right-20 -right-[138px]"
//                   style={{ top: "calc(50% - 258px)" }}
//                 >
//                   <Thumbnail />

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// }


"use client"

=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

import Layout from "../../Partials/Layout"
import Thumbnail from "./Thumbnail"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import userService from "../../../services/userService"
import { Label, TextInput } from "flowbite-react"

<<<<<<< HEAD
import { Eye, EyeOff, Loader2 } from "lucide-react"
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader"
import { useAuthContext } from "../../../contexts/useAuthContext"
export default function Login() {
  const searchParams = new URLSearchParams(location.search)
  const mail = searchParams.get("mail")
  const isVerified = searchParams.get("isVerified")

  const { logout, saveSession } = useAuthContext()

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState("")
=======
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { UserContext } from "../../../contexts/UserContext";
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader";
export default function Login() {
  const searchParams = new URLSearchParams(location.search);
  const mail = searchParams.get("mail");
  const isVerified = searchParams.get("isVerified");
  const {
    setUser,
    setToken,
    setUid,
    setExpiresIn,
    setRefreshExpiresIn,
    setRefreshToken,
    setIsVerified,
  } = useContext(UserContext);

  const [checked, setValue] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  const validateForm = () => {
    setError({
      identifier: !identifier ? "L'email ou le numéro de téléphone est obligatoire." : "",
      password: !password ? "Le mot de passe est obligatoire." : "",
    })

    return Object.values(error).every((error) => !error)
  }

  useEffect(() => {
    if (mail) setIdentifier(mail)
  }, [mail])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 100, behavior: "smooth" })
  }, [])

  const handleSubmit = async (e) => {
    const redirectUrl = searchParams.get("redirectTo") ?? "/boutique"

    setIsLoading(true)
    e.preventDefault()
    if (!validateForm()) {
      toast.dismiss()
      toast.error("Connexion Echoué , champs Email ou Mot de passe incorrecte  !", {
        position: "top-center",
        autoClose: 5000,
      })
      console.log("Formulaire invalide !")
    }

    if (validateForm()) {
<<<<<<< HEAD
      console.log(identifier, password)
=======
      console.log(identifier, password);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      try {
        const response = await userService.login({
          username: identifier,
          password: password,
        })
        setIsLoading(false)
        console.log(response)
        // console.log("resultat")
        if (response.is_verified != true) {
          toast.dismiss()
          toast.error("Merci de vérifier votre compte pour se connecter", {
            position: "top-center",
            autoClose: 5000,
          })
          navigate("/login")
        } else {
          if (response.user_info.role == "main_user") {
            toast.warning("Veuillez utiliser votre compte client", {
              position: "top-center",
              autoClose: 3000,
            })
            logout()
          } else {
            toast.dismiss()
            toast.success("Connexion réussie !", {
              position: "top-center",
              autoClose: 3000,
            })
            setIsLoading(false)
            saveSession(response)

<<<<<<< HEAD
            if (redirectUrl) {
              navigate(redirectUrl)
            } else {
              navigate("/boutique")
            }
          }
        }
      } catch (error) {
        setIsLoading(false)
        toast.dismiss()
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
        })
        console.error(error)
=======
          localStorage.setItem("user", JSON.stringify(user_info));
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("token", access_token);
          localStorage.setItem("uid", uid);
          localStorage.setItem("expires_in", Date.now() + expires_in);
          localStorage.setItem("is_verified", is_verified);
          localStorage.setItem(
            "refresh_expires_in",
            Date.now() + refresh_expires_in
          );
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("company_id", company_id);
          localStorage.setItem("user_context", JSON.stringify(user_context));
          localStorage.setItem("partner_id", user_info.partner_id);
          navigate("/all-products");
        }
      } catch (error) {
        setIsLoading(false);
        toast.dismiss();
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(error.response.data.error);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchModels = async () => {
      if (mail && isVerified) {
        try {
          const resp = await userService.verifiedCompte(mail)
          console.log(resp.status)
          setIsLoading(false)
          if (resp.status == "success") {
<<<<<<< HEAD
            setIdentifier(mail)
=======
            setIdentifier(mail);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
          }
          setIsLoading(false)
        } catch (error) {
<<<<<<< HEAD
          setIsLoading(false)
=======
          setIsLoading(false);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
          toast.error("Votre compte n'est pas encore valide", {
            position: "top-center",
            autoClose: 5000,
          })
        }
      }
    }
    fetchModels()
    setIsLoading(false)
  }, [])

  return (
    <>
      <SEOHeader
        title="CCBM Shop | Connexion"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses="pt-0 pb-0">
        <div className="login-page-wrapper w-full py-10">
          <div className="container-x mx-auto">
<<<<<<< HEAD
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 border border-[#E0E0E0] dark:border-gray-700 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="title-area text-center mb-8">
                    <h1 className="text-3xl font-bold text-qblack dark:text-white">Connexion</h1>
                    <div className="shape mt-2">
                      <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                          stroke="#FFBB38"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Adresse Email ou Téléphone
                      </Label>
                      <div className="relative">
                        <TextInput
                          id="email"
                          type="email"
                          className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-bleu-logo dark:focus:border-bleu-claire"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          required
                          placeholder="Adresse email"
                          theme={{
                            field: {
                              input: {
                                base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                colors: {
                                  gray: "border-gray-300 dark:border-gray-600 focus:border-bleu-logo dark:focus:border-bleu-claire",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      {error.identifier && <p className="text-sm text-red-500 mt-1">{error.identifier}</p>}
                    </div>

                    <div>
                      <Label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <TextInput
                          id="password"
                          placeholder="*******"
                          className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-bleu-logo dark:focus:border-bleu-claire"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          theme={{
                            field: {
                              input: {
                                base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                colors: {
                                  gray: "border-gray-300 dark:border-gray-600 focus:border-bleu-logo dark:focus:border-bleu-claire",
                                },
                              },
                            },
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {!showPassword ? (
                            <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                          )}
                        </button>
                      </div>
                      {error.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-bleu-logo hover:text-bleu-claire dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Mot de passe oublié
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-bleu-logo hover:bg-bleu-claire text-white font-medium 
                          py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
                          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Connexion...</span>
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Vous n'avez pas de compte ?
                      <Link
                        to="/signup"
                        className="ml-1 text-blue-logo hover:text-bleu-logo dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Inscription
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
                <div className="absolute xl:-right-20 -right-[138px]" style={{ top: "calc(50% - 258px)" }}>
                  <Thumbnail />
=======
            <div className="lg:flex items-center relative">
              <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit}>
                  <div className="w-full">
                    <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">

                      <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                        Connexion
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
                          <Label htmlFor="email" value="Adresse Email ou Téléphone" />
                        </div>
                        <TextInput
                          id="email"
                          type="email"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          required
                          placeholder="Adresse email"
                          className="
                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            invalid:border-red-500 invalid:text-red-600
                            focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>

                      <div className="input-item mb-5">
                        <div className="mb-2 block">
                          <Label htmlFor="password" value="Mot de passe" />
                        </div>
                        <div className="relative">
                          <TextInput
                            id="password"
                            placeholder="*******"
                            label="Password*"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            x
                            value={password}
                            minLength={4}
                            maxLength={20}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                      invalid:border-red-500 invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              setShowPassword(!showPassword);
                            }}
                            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                          >
                            {!showPassword ? <Eye></Eye> : <EyeOff />}
                          </button>
                        </div>
                      </div>

                      <div className="forgot-password-area flex justify-between items-center mb-7">
                        <div className="remember-checkbox flex items-center space-x-2.5"></div>
                        <Link
                          to="/forgot-password"
                          className="text-base text-qyellow  hover:text-bleu-logo "
                        >
                          Mot de passe oublié
                        </Link>
                      </div>
                      <div className="signin-area mb-3.5">
                        <div className="flex justify-center">
                          <Button
                            type="submit"
                            variant="failure"
                            className=" hover:bg-bleu-logo black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                                items-center"
                            disabled={isLoading}
                          >
                            {isLoading && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Se connecter
                          </Button>
                        </div>

                      </div>
                      <div className="signup-area flex justify-center">
                        <p className="text-base text-qgraytwo font-normal">
                          Vous n'avez pas de compte ?
                          <Link
                            to="/signup"
                            className=" hover:text-bleu-logo ml-2 text-qblack"
                          >
                            Inscription
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
                  {/* <img src="banner_reseau.jpg" alt="" /> */}
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
}
