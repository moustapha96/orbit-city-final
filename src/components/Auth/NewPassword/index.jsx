// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";

// import Layout from "../../Partials/Layout";
// import Thumbnail from "./Thumbnail";
// import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import userService from "../../../services/userService";
// import { Button, Label, TextInput } from "flowbite-react";

// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import isStrongPassword from "../../../utils/verifPassword";

// export default function NewPassword() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const mail = searchParams.get("mail");
//   const token = searchParams.get("token");


//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState();
//   const [tokenG, setTokenG] = useState();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const validatePassword = (password, confirmPassword) => {
//     if (password !== confirmPassword) {
//       return "Les mots de passe ne correspondent pas.";
//     }
//     return "";
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
//   const validateForm = () => {
//     const errors = {
//       // password: !password
//       //   ? "Le mot de passe est obligatoire."
//       //   : !isStrongPassword(password)
//       //   ? "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
//       //   : "",
//       passwordError: validatePassword(password, confirmPassword),
//     };
//     console.log(errors);
//     setError(errors);
//     return Object.values(errors).every((error) => !error);
//   };

//   const handleSubmit = async (e) => {
//     setIsLoading(true);
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.dismiss();
//       toast.error(error.password, {
//         position: "top-center",
//         autoClose: 5000,
//       });
//       console.log("Formulaire invalide !");
//     }

//     if (validateForm()) {
//       console.log(password);
//       try {
//         const dataModel = {
//           email: mail,
//           password: password,
//           token: token,
//         };
//         console.log(dataModel);
//         const response = await userService.newPassword(dataModel);
//         console.log(response);
//         navigate("/login");
//         toast.success("Mot de passe réinitialiser avec succés", {
//           position: "top-center",
//           autoClose: 5000,
//         });
//         setError(null);
//       } catch (error) {
//         setIsLoading(false);
//         toast.dismiss();
//         toast.error("Réinitialiser non effectif ", {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         console.error(
//           "Erreur lors de l'initialisation du mot de passe :",
//           error
//         );
//       }
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     const fetchModels = async () => {
//       if (mail && token) {
//         setEmail(mail);
//         setTokenG(token);
//       } else {
//         console.log("email ou token non reccuperer");
//       }
//     };
//     fetchModels();
//     setIsLoading(false);
//   }, []);

//   return (
//     <Layout childrenClasses="pt-0 pb-0">



//       <div className="login-page-wrapper w-full py-10">
//         <div className="container-x mx-auto">
//           <div className="flex justify-center items-center min-h-screen">
//             <div className="w-full max-w-md bg-white p-6 border border-[#E0E0E0] rounded-lg shadow-md">
//               <form onSubmit={handleSubmit}>
//                 <div className="w-full">
//                   <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
//                     <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
//                       Nouveau mot de passe
//                     </h1>
//                     <div className="shape -mt-6">
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
//                   <div className="input-area">
//                     <div className="input-item mb-5">
//                       <div className="mb-2 block">
//                         <Label
//                           htmlFor="password"
//                           value="Nouveau Mot de passe"
//                           className="dark:text-qblack"
//                         />
//                       </div>
//                       <div className="relative">
//                         <TextInput
//                           id="password"
//                           placeholder="*******"
//                           label="Password*"
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           value={password}
//                           minLength={4}
//                           maxLength={20}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                           className="  invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                         />
//                         <button
//                           type="button"
//                           onClick={togglePasswordVisibility}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                         >
//                           {!showPassword ? <EyeOff /> : <Eye />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="input-item mb-5 sm:w-1/2 md:w-full">
//                       <div className="mb-2 block">
//                         <Label
//                           htmlFor="confpassword"
//                           value="Confirmation Mot de passe"
//                           className="dark:text-qblack"
//                         />
//                       </div>
//                       <div className="relative">
//                         <TextInput
//                           id="confpassword"
//                           type={showConfirmPassword ? "text" : "password"}
//                           value={confirmPassword}
//                           onChange={(e) => setConfirmPassword(e.target.value)}
//                           required
//                           placeholder="*******"
//                           className="invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
//                         />
//                         <button
//                           type="button"
//                           onClick={toggleConfirmPasswordVisibility}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                         >
//                           {!showConfirmPassword ? <EyeOff /> : <Eye />}
//                         </button>
//                       </div>
//                       {error.passwordError && (
//                         <p className="text-red-600">{error.passwordError}</p>
//                       )}
//                     </div>
//                     <div className="signin-area mb-3.5">
//                       <div className="flex justify-center">
//                         <Button
//                           type="submit"
//                           variant="failure"
//                           className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center
//                               hover:bg-red-500 bg-purple items-center"
//                           disabled={isLoading}
//                         >
//                           {isLoading && (
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           )}
//                           Enregistrer
//                         </Button>
//                       </div>
//                     </div>
//                     <div className="signup-area flex justify-center">
//                       <p className="text-base text-qgraytwo font-normal">
//                         <Link to="/login" className=" hover:text-bleu-logo  ml-2 text-qblack">
//                           Se connecter
//                         </Link>
//                       </p>
//                     </div>
//                     <div className="flex justify-center">
//                       {error.password && (
//                         <p className="text-red-500"> {error.password} </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>

//             <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
//               <div
//                 className="absolute xl:-right-20 -right-[138px]"
//                 style={{ top: "calc(50% - 258px)" }}
//               >
//                 <Thumbnail />

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

"use client"

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

import Layout from "../../Partials/Layout"
import Thumbnail from "./Thumbnail"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

import userService from "../../../services/userService"
import { Button, Label, TextInput } from "flowbite-react"

import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function NewPassword() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const mail = searchParams.get("mail")
  const token = searchParams.get("token")

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState()
  const [tokenG, setTokenG] = useState()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas."
    }
    return ""
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validateForm = () => {
    const errors = {
      // password: !password
      //   ? "Le mot de passe est obligatoire."
      //   : !isStrongPassword(password)
      //   ? "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
      //   : "",
      passwordError: validatePassword(password, confirmPassword),
    }
    console.log(errors)
    setError(errors)
    return Object.values(errors).every((error) => !error)
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (!validateForm()) {
      toast.dismiss()
      toast.error(error.password, {
        position: "top-center",
        autoClose: 5000,
      })
      console.log("Formulaire invalide !")
    }

    if (validateForm()) {
      console.log(password)
      try {
        const dataModel = {
          email: mail,
          password: password,
          token: token,
        }
        console.log(dataModel)
        const response = await userService.newPassword(dataModel)
        console.log(response)
        navigate("/login")
        toast.success("Mot de passe réinitialiser avec succés", {
          position: "top-center",
          autoClose: 5000,
        })
        setError(null)
      } catch (error) {
        setIsLoading(false)
        toast.dismiss()
        toast.error("Réinitialiser non effectif ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.error("Erreur lors de l'initialisation du mot de passe :", error)
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchModels = async () => {
      if (mail && token) {
        setEmail(mail)
        setTokenG(token)
      } else {
        console.log("email ou token non reccuperer")
      }
    }
    fetchModels()
    setIsLoading(false)
  }, [])

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 border border-[#E0E0E0] dark:border-gray-700 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack dark:text-white">
                      Nouveau mot de passe
                    </h1>
                    <div className="shape -mt-6">
                      <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <Label
                          htmlFor="password"
                          value="Nouveau Mot de passe"
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="relative">
                        <TextInput
                          id="password"
                          placeholder="*******"
                          label="Password*"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          minLength={4}
                          maxLength={20}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                          theme={{
                            field: {
                              input: {
                                base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                colors: {
                                  gray: "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500",
                                },
                              },
                            },
                          }}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
                        >
                          {!showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="input-item mb-5 sm:w-1/2 md:w-full">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="confpassword"
                          value="Confirmation Mot de passe"
                          className="text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="relative">
                        <TextInput
                          id="confpassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="*******"
                          className="invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                          theme={{
                            field: {
                              input: {
                                base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                colors: {
                                  gray: "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500",
                                },
                              },
                            },
                          }}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
                        >
                          {!showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {error.passwordError && <p className="text-red-600 dark:text-red-400">{error.passwordError}</p>}
                    </div>
                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          variant="failure"
                          className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center
                              hover:bg-red-500 bg-purple items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Enregistrer
                        </Button>
                      </div>
                    </div>
                    <div className="signup-area flex justify-center">
                      <p className="text-base text-qgraytwo dark:text-gray-300 font-normal">
                        <Link
                          to="/login"
                          className="hover:text-bleu-logo ml-2 text-qblack dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Se connecter
                        </Link>
                      </p>
                    </div>
                    <div className="flex justify-center">
                      {error.password && <p className="text-red-500 dark:text-red-400"> {error.password} </p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div className="absolute xl:-right-20 -right-[138px]" style={{ top: "calc(50% - 258px)" }}>
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
