
// "use client"

// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react"
// import Layout from "../../Partials/Layout"
// import Thumbnail from "./Thumbnail"
// import { Link, useNavigate } from "react-router-dom"
// import { Button, Label, TextInput } from "flowbite-react"
// import { Eye, EyeOff, Loader2 } from "lucide-react"
// import userService from "../../../services/userService"
// import { toast } from "react-toastify"
// import { isValidEmail, isValidPhoneNumber } from "../../../utils/validations"
// import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader"
// import { getAllCompanies } from "../../../services/entrepriseFunctionService"

// export default function Signup() {
//   const [checked, setValue] = useState(false)
//   const navigate = useNavigate()

//   const [error, setError] = useState({})
//   const [errorSubmit, setErrorSubmit] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const [companies, setCompanies] = useState([])

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     city: "",
//     phone: "",
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }))
//   }

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const resultat = await getAllCompanies()
//         setCompanies(resultat)
//       } catch (error) {
//         console.error(error)
//       }
//     }
//     fetchCompanies()
//   }, [setCompanies])

//   const validateForm = () => {
//     const errors = {}
//     if (!formData.name) errors.name = "Le nom est obligatoire."
//     if (!formData.phone) {
//       errors.phone = "Le téléphone est obligatoire."
//     } else if (!isValidPhoneNumber(formData.phone)) {
//       errors.phone = "Le numéro de téléphone est invalide."
//     }
//     if (!formData.email) {
//       errors.email = "L'adresse email est obligatoire."
//     } else if (!isValidEmail(formData.email)) {
//       errors.email = "L'adresse email est invalide."
//     }
//     if (!formData.city) {
//       errors.city = "L'adresse est obligatoire."
//     }
//     if (formData.password !== formData.confirmPassword) {
//       errors.password = "Les mots de passe ne correspondent pas."
//     }

//     setError(errors)
//     return Object.keys(errors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const newPhone = formData.phone.startsWith("221") ? formData.phone : "221" + formData.phone
//     const userData = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       city: formData.city,
//       phone: newPhone,
//     }

//     console.log(userData)
//     if (validateForm()) {
//       console.log(userData)
//       try {
//         const response = await userService.createUser(userData)
//         toast.success("Compte créé! Veuillez vérifier le code OTP", {
//           position: "top-center",
//           autoClose: 5000,
//         })
//         console.log(response)
//         setIsLoading(false)

//         // Rediriger vers la page de vérification OTP avec l'email en paramètre
//         navigate(`/verification-code?email=${encodeURIComponent(formData.email)}`)
//       } catch (error) {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           submit: error.response?.data?.message || error.response?.data || "Une erreur s'est produite",
//         }))
//         setIsLoading(false)
//         console.log("response")
//         console.log(error)
//       }
//     } else {
//       console.log("Formulaire invalide!")
//       toast.error("Création compte échouée, formulaire invalide", {
//         position: "top-center",
//         autoClose: 5000,
//       })
//     }
//     setIsLoading(false)
//   }

//   return (
//     <>
//       <SEOHeader
//         title="CCBM Shop | Inscription"
//         description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
//         keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
//       />
//       <Layout childrenClasses="pt-0 pb-0">
//         <div className="login-page-wrapper w-full py-10">
//           <div className="container-x mx-auto">
//             <div className="lg:flex items-center relative">
//               <div className="lg:w-[582px] w-full lg:h-[880px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
//                 <div className="w-full">
//                   <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
//                     {errorSubmit && <p className="text-red-600">{errorSubmit}</p>}
//                     {error.nom && <p className="text-red-600">{error.nom}</p>}
//                     {error.prenom && <p className="text-red-600">{error.prenom}</p>}
//                     {error.telephone && <p className="text-red-600">{error.telephone}</p>}
//                     {error.passwordError && <p className="text-red-600">{error.passwordError}</p>}
//                     {error.email && <p className="text-red-600">{error.email}</p>}
//                   </div>

//                   <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
//                     <h1 className="text-[34px] font-bold leading-[74px] text-qblack">Créer un compte</h1>
//                     <div className="shape -mt-6">
//                       <svg width="354" height="30" viewBox="0 0 354 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
//                           stroke="#FFBB38"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="input-area">
//                     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//                       {error.submit && (
//                         <p className="text-red-600">
//                           {typeof error.submit === "object"
//                             ? error.submit.message || JSON.stringify(error.submit)
//                             : error.submit}
//                         </p>
//                       )}

//                       <div>
//                         <Label htmlFor="name" className="text-gray-900 dark:text-gray-900">
//                           Nom complet
//                         </Label>
//                         <TextInput
//                           id="name"
//                           placeholder="Nom complet"
//                           className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         {error && error.name && (
//                           <>
//                             <p className="text-red-600">{error.name}</p>
//                           </>
//                         )}
//                       </div>

//                       <div>
//                         <Label htmlFor="email" className="text-gray-900 dark:text-gray-900">
//                           Email
//                         </Label>
//                         <TextInput
//                           className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                           id="email"
//                           placeholder="Adresse Email"
//                           name="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                         />
//                         {error && error.email && (
//                           <>
//                             <p className="text-red-600">{error.email}</p>
//                           </>
//                         )}
//                       </div>

//                       <div>
//                         <Label htmlFor="city" className="text-gray-900 dark:text-gray-900">
//                           Adresse
//                         </Label>
//                         <TextInput
//                           className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                           id="city"
//                           name="city"
//                           placeholder="Votre Adresse"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         {error && error.city && (
//                           <>
//                             <p className="text-red-600">{error.city}</p>
//                           </>
//                         )}
//                       </div>

//                       <div>
//                         <Label htmlFor="phone" className="text-gray-900 dark:text-gray-900">
//                           Téléphone{" "}
//                         </Label>
//                         <TextInput
//                           className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                           id="phone"
//                           name="phone"
//                           placeholder="221......"
//                           max="12"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         {error && error.phone && (
//                           <>
//                             <p className="text-red-600">{error.phone}</p>
//                           </>
//                         )}
//                       </div>

//                       <div>
//                         <Label htmlFor="password" className="text-gray-900 dark:text-gray-900">
//                           Mot de passe
//                         </Label>
//                         <div className="relative">
//                           <TextInput
//                             id="password"
//                             className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Mot de Passe"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                           >
//                             {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                           </button>
//                         </div>
//                         {error && error.password && (
//                           <>
//                             <p className="text-red-600">{error.password}</p>
//                           </>
//                         )}
//                       </div>
//                       <div>
//                         <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-gray-900">
//                           Confirmer le mot de passe
//                         </Label>
//                         <div className="relative">
//                           <TextInput
//                             id="confirmPassword"
//                             className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
//                             name="confirmPassword"
//                             type={showConfirmPassword ? "text" : "password"}
//                             placeholder="Confirmer le mot de passe"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                           >
//                             {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex justify-center">
//                         {/* <Button type="submit" disabled={isLoading} className="w-full ">
//                           {isLoading ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Création du compte...
//                             </>
//                           ) : (
//                             "Créer un compte"
//                           )}
//                         </Button> */}

//                         <button
//                           type="submit"
//                           className="w-full bg-bleu-logo hover:bg-bleu-claire text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? (
//                             <>
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                               Création du compte...
//                             </>
//                           ) : (
//                             "Créer un compte"
//                           )}
//                         </button>
//                       </div>

//                       <div className="signup-area flex justify-center">
//                         <p className="text-base text-qgraytwo font-normal">
//                           Vous avez déjà un compte?
//                           <Link to="/login" className="ml-2 hover:text-bleu-logo text-qblack">
//                             Se connecter
//                           </Link>
//                         </p>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
//                 <div className="absolute xl:-right-20 -right-[138px]" style={{ top: "calc(50% - 258px)" }}>
//                   <Thumbnail />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   )
// }


"use client"

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Layout from "../../Partials/Layout"
import Thumbnail from "./Thumbnail"
import { Link, useNavigate } from "react-router-dom"
import { Button, Label, TextInput } from "flowbite-react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import userService from "../../../services/userService"
import { toast } from "react-toastify"
import { isValidEmail, isValidPhoneNumber } from "../../../utils/validations"
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader"
import { getAllCompanies } from "../../../services/entrepriseFunctionService"

export default function Signup() {
  const [checked, setValue] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState({})
  const [errorSubmit, setErrorSubmit] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [companies, setCompanies] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    phone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const resultat = await getAllCompanies()
        setCompanies(resultat)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCompanies()
  }, [setCompanies])

  const validateForm = () => {
    const errors = {}
    if (!formData.name) errors.name = "Le nom est obligatoire."
    if (!formData.phone) {
      errors.phone = "Le téléphone est obligatoire."
    } else if (!isValidPhoneNumber(formData.phone)) {
      errors.phone = "Le numéro de téléphone est invalide."
    }
    if (!formData.email) {
      errors.email = "L'adresse email est obligatoire."
    } else if (!isValidEmail(formData.email)) {
      errors.email = "L'adresse email est invalide."
    }
    if (!formData.city) {
      errors.city = "L'adresse est obligatoire."
    }
    if (formData.password !== formData.confirmPassword) {
      errors.password = "Les mots de passe ne correspondent pas."
    }

    setError(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newPhone = formData.phone.startsWith("221") ? formData.phone : "221" + formData.phone
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      phone: newPhone,
    }

    console.log(userData)
    if (validateForm()) {
      console.log(userData)
      try {
        const response = await userService.createUser(userData)
        toast.success("Compte créé! Veuillez vérifier le code OTP", {
          position: "top-center",
          autoClose: 5000,
        })
        console.log(response)
        setIsLoading(false)

        // Rediriger vers la page de vérification OTP avec l'email en paramètre
        navigate(`/verification-code?email=${encodeURIComponent(formData.email)}`)
      } catch (error) {
        setError((prevErrors) => ({
          ...prevErrors,
          submit: error.response?.data?.message || error.response?.data || "Une erreur s'est produite",
        }))
        setIsLoading(false)
        console.log("response")
        console.log(error)
      }
    } else {
      console.log("Formulaire invalide!")
      toast.error("Création compte échouée, formulaire invalide", {
        position: "top-center",
        autoClose: 5000,
      })
    }
    setIsLoading(false)
  }

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
              <div className="lg:w-[582px] w-full lg:h-[880px] bg-white dark:bg-gray-800 flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] dark:border-gray-700">
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    {errorSubmit && <p className="text-red-600 dark:text-red-400">{errorSubmit}</p>}
                    {error.nom && <p className="text-red-600 dark:text-red-400">{error.nom}</p>}
                    {error.prenom && <p className="text-red-600 dark:text-red-400">{error.prenom}</p>}
                    {error.telephone && <p className="text-red-600 dark:text-red-400">{error.telephone}</p>}
                    {error.passwordError && <p className="text-red-600 dark:text-red-400">{error.passwordError}</p>}
                    {error.email && <p className="text-red-600 dark:text-red-400">{error.email}</p>}
                  </div>

                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack dark:text-white">
                      Créer un compte
                    </h1>
                    <div className="shape -mt-6">
                      <svg width="354" height="30" viewBox="0 0 354 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                      {error.submit && (
                        <p className="text-red-600 dark:text-red-400">
                          {typeof error.submit === "object"
                            ? error.submit.message || JSON.stringify(error.submit)
                            : error.submit}
                        </p>
                      )}

                      <div>
                        <Label htmlFor="name" className="text-gray-900 dark:text-white">
                          Nom complet
                        </Label>
                        <TextInput
                          id="name"
                          placeholder="Nom complet"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
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
                        {error && error.name && (
                          <>
                            <p className="text-red-600 dark:text-red-400">{error.name}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-900 dark:text-white">
                          Email
                        </Label>
                        <TextInput
                          id="email"
                          placeholder="Adresse Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
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
                        {error && error.email && (
                          <>
                            <p className="text-red-600 dark:text-red-400">{error.email}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-gray-900 dark:text-white">
                          Adresse
                        </Label>
                        <TextInput
                          id="city"
                          name="city"
                          placeholder="Votre Adresse"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
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
                        {error && error.city && (
                          <>
                            <p className="text-red-600 dark:text-red-400">{error.city}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-900 dark:text-white">
                          Téléphone{" "}
                        </Label>
                        <TextInput
                          id="phone"
                          name="phone"
                          placeholder="221......"
                          max="12"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
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
                        {error && error.phone && (
                          <>
                            <p className="text-red-600 dark:text-red-400">{error.phone}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-gray-900 dark:text-white">
                          Mot de passe
                        </Label>
                        <div className="relative">
                          <TextInput
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de Passe"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
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
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-300"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {error && error.password && (
                          <>
                            <p className="text-red-600 dark:text-red-400">{error.password}</p>
                          </>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-white">
                          Confirmer le mot de passe
                        </Label>
                        <div className="relative">
                          <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-300"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        {/* <button
                          type="submit"
                          className="w-full bg-bleu-logo hover:bg-bleu-claire text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Création du compte...
                            </>
                          ) : (
                            "Créer un compte"
                          )}
                        </button> */}

                        <Button
                          type="submit"
                          className="hover:bg-red-500  w-full bg-bleu-logo text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:bleu-logo focus:ring-offset-2 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Créer un compte
                        </Button>
                      </div>

                      <div className="signup-area flex justify-center">
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
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
                <div className="absolute xl:-right-20 -right-[138px]" style={{ top: "calc(50% - 258px)" }}>
                  <Thumbnail />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
