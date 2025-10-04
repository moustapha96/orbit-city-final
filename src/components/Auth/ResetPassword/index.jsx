// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";

// import Layout from "../../Partials/Layout";
// import Thumbnail from "./Thumbnail";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// import userService from "../../../services/userService";
// import { Button, Label, TextInput } from "flowbite-react";

// import { Loader2 } from "lucide-react";
// export default function ResetPassword() {

//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");


//   const [contactMethod, setContactMethod] = useState("email")
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [errors, setErrors] = useState({
//     email: "",
//     phoneNumber: "",
//   })

//   const validateForm = () => {
//     const newErrors = {
//       email: contactMethod === "email" && !email ? "L'adresse email est obligatoire." : "",
//       phoneNumber: contactMethod === "sms" && !phoneNumber ? "Le numéro de téléphone est obligatoire." : "",
//     }

//     setErrors(newErrors)
//     return !Object.values(newErrors).some((error) => error)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     if (!validateForm()) {
//       toast({
//         variant: "destructive",
//         title: "Erreur",
//         description: "Veuillez remplir tous les champs obligatoires.",
//       })
//       setIsLoading(false)
//       return
//     }

//     try {
//       // Appel API selon la méthode choisie
//       if (contactMethod === "email") {
//         await userService.resetPasswordMail(email);
//         console.log("Envoi du lien par email à:", email)
//       } else {
//         await userService.resetPasswordBySMS(phoneNumber)
//         console.log("Envoi du lien par SMS au:", phoneNumber)
//       }
//       toast.success(`Le lien de réinitialisation a été envoyé avec succès par ${contactMethod === "email" ? "email" : "SMS"}.`, {
//         position: "top-center",
//         autoClose: 5000,
//       });
//       setEmail("")
//       setPhoneNumber("")
//       setContactMethod("email")
//     } catch (error) {
//       console.error("Erreur lors de la réinitialisation:", error)
//       toast.error(`Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.`, {
//         position: "top-center",
//         autoClose: 5000,
//       });
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Layout childrenClasses="pt-0 pb-0">
//       <div className="login-page-wrapper w-full py-10">
//         <div className="container-x mx-auto">
//           <div className="flex justify-center items-center min-h-screen">
//             <div className="flex justify-center items-center min-h-screen py-10 px-4">
//               <div className="w-full max-w-md bg-white p-6 border border-gray-200 rounded-lg shadow-md">
//                 <div className="text-center mb-6">
//                   <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
//                   <p className="text-gray-600 mt-2">Choisissez comment recevoir votre lien de réinitialisation</p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-6">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div
//                         className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${contactMethod === "email" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
//                         onClick={() => setContactMethod("email")}
//                       >
//                         <input
//                           type="radio"
//                           id="email-option"
//                           name="contactMethod"
//                           value="email"
//                           checked={contactMethod === "email"}
//                           onChange={() => setContactMethod("email")}
//                           className="h-4 w-4 text-bleu-logo focus:ring-bleu-logo"
//                         />
//                         <label htmlFor="email-option" className="cursor-pointer w-full text-gray-700">
//                           Par email
//                         </label>
//                       </div>

//                       <div
//                         className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${contactMethod === "sms" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
//                         onClick={() => setContactMethod("sms")}
//                       >
//                         <input
//                           type="radio"
//                           id="sms-option"
//                           name="contactMethod"
//                           value="sms"
//                           checked={contactMethod === "sms"}
//                           onChange={() => setContactMethod("sms")}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                         />
//                         <label htmlFor="sms-option" className="cursor-pointer w-full text-gray-700">
//                           Par SMS
//                         </label>
//                       </div>
//                     </div>
//                   </div>

//                   {contactMethod === "email" ? (
//                     <div className="mb-6">
//                       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
//                         Adresse email
//                       </label>
//                       <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="nom@exemple.com"
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
//                       />
//                       {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//                     </div>
//                   ) : (
//                     <div className="mb-6">
//                       <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
//                         Numéro de téléphone
//                       </label>
//                       <input
//                         id="phone"
//                         type="tel"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="771234567"
//                         pattern="^(70|76|77|78|79)[0-9]{7}$"
//                         maxLength="9"
//                         minLength="9"
//                         required
//                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
//                       />
//                       {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
//                     </div>
//                   )}

//                   <div className="space-y-4">


//                     <button
//                       type="submit"
//                       className="w-full flex items-center justify-center bg-bleu-logo hover:bg-bleu-claire text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"

//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <>
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                           <span>envoie...</span>
//                         </>
//                       ) : (
//                         "Envoyer le lien de réinitialisation"
//                       )}
//                     </button>

//                     <div className="text-center">

//                       <p className="text-base text-qgraytwo font-normal">
//                         Vous avez déjà un compte?
//                         <Link to="/login" className="ml-2 hover:text-bleu-logo text-qblack">
//                           Se connecter
//                         </Link>
//                       </p>

//                     </div>
//                   </div>
//                 </form>
//               </div>
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
import { useState } from "react"

import Layout from "../../Partials/Layout"
import Thumbnail from "./Thumbnail"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import userService from "../../../services/userService"
import { Loader2 } from "lucide-react"

export default function ResetPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const [contactMethod, setContactMethod] = useState("email")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  })

  const validateForm = () => {
    const newErrors = {
      email: contactMethod === "email" && !email ? "L'adresse email est obligatoire." : "",
      phoneNumber: contactMethod === "sms" && !phoneNumber ? "Le numéro de téléphone est obligatoire." : "",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
      })
      setIsLoading(false)
      return
    }

    try {
      // Appel API selon la méthode choisie
      if (contactMethod === "email") {
        await userService.resetPasswordMail(email)
        console.log("Envoi du lien par email à:", email)
      } else {
        await userService.resetPasswordBySMS(phoneNumber)
        console.log("Envoi du lien par SMS au:", phoneNumber)
      }
      toast.success(
        `Le lien de réinitialisation a été envoyé avec succès par ${contactMethod === "email" ? "email" : "SMS"}.`,
        {
          position: "top-center",
          autoClose: 5000,
        },
      )
      setEmail("")
      setPhoneNumber("")
      setContactMethod("email")
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error)
      toast.error(`Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.`, {
        position: "top-center",
        autoClose: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex justify-center items-center min-h-screen py-10 px-4">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mot de passe oublié</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Choisissez comment recevoir votre lien de réinitialisation
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${contactMethod === "email"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400"
                          : "border-gray-200 dark:border-gray-600"
                          }`}
                        onClick={() => setContactMethod("email")}
                      >
                        <input
                          type="radio"
                          id="email-option"
                          name="contactMethod"
                          value="email"
                          checked={contactMethod === "email"}
                          onChange={() => setContactMethod("email")}
                          className="h-4 w-4 text-bleu-logo focus:ring-bleu-logo dark:text-blue-500 dark:focus:ring-blue-500"
                        />
                        <label
                          htmlFor="email-option"
                          className="cursor-pointer w-full text-gray-700 dark:text-gray-200"
                        >
                          Par email
                        </label>
                      </div>

                      <div
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${contactMethod === "sms"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400"
                          : "border-gray-200 dark:border-gray-600"
                          }`}
                        onClick={() => setContactMethod("sms")}
                      >
                        <input
                          type="radio"
                          id="sms-option"
                          name="contactMethod"
                          value="sms"
                          checked={contactMethod === "sms"}
                          onChange={() => setContactMethod("sms")}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:text-blue-500 dark:focus:ring-blue-500"
                        />
                        <label htmlFor="sms-option" className="cursor-pointer w-full text-gray-700 dark:text-gray-200">
                          Par SMS
                        </label>
                      </div>
                    </div>
                  </div>

                  {contactMethod === "email" ? (
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Adresse email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Numéro de téléphone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="771234567"
                        pattern="^(70|76|77|78|79)[0-9]{7}$"
                        maxLength="9"
                        minLength="9"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 ${errors.phoneNumber
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          }`}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phoneNumber}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center bg-bleu-logo hover:bg-bleu-claire text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>envoie...</span>
                        </>
                      ) : (
                        "Envoyer le lien de réinitialisation"
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-base text-qgraytwo dark:text-gray-300 font-normal">
                        Vous avez déjà un compte?
                        <Link
                          to="/login"
                          className="ml-2 hover:text-bleu-logo text-qblack dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Se connecter
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
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
