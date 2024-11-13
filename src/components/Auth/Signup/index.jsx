/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import userService from "../../../services/userService";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhoneNumber } from "../../../utils/validations";
import isStrongPassword from "../../../utils/verifPassword";
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader";
import { getAllCompanies } from "../../../services/entrepriseFunctionService";
export default function Signup() {
  const [checked, setValue] = useState(false);
  const navigate = useNavigate();


  const [error, setError] = useState([]);
  const [errorSubmit, setErrorSubmit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companies, setCompanies] = useState([]);

  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    phone: '',
    companyId: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const resultat = await getAllCompanies();
        setCompanies(resultat);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, [setCompanies,]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Le nom est obligatoire.";
    if (!formData.phone) {
      errors.phone = "Le téléphone est obligatoire.";
    } else if (!isValidPhoneNumber(formData.phone)) {
      errors.phone = "Le numéro de téléphone est invalide.";
    }
    if (!formData.email) {
      errors.email = "L'adresse email est obligatoire.";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "L'adresse email est invalide.";
    }
    if (!formData.city) {
      errors.city = "L'adresse est obligatoire.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.password = "Les mots de passe ne correspondent pas.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      phone: formData.phone,
      company_id: formData.companyId ? formData.companyId : null,
    };

    console.log(userData);
    if (validateForm()) {
      console.log(userData);
      try {
        const response = await userService.createUser(userData);
        toast.success("Création compte réussie !", {
          position: "top-center",
          autoClose: 5000,
        });
        console.log(response);
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        setError(prevErrors => ({
          ...prevErrors,
          submit: error.response.data
        }));
        setIsLoading(false);
        console.log("response");
        console.log(error);
      }

    } else {
      console.log("Formulaire invalide!");
      toast.error("Création compte échouée, formulaire invalide", {
        position: "top-center",
        autoClose: 5000,
      });
    }
    setIsLoading(false);
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
              <div className="lg:w-[582px] w-full lg:h-[880px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
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


                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                      {
                        error && error.submit && <p className="text-red-600">{error.submit}</p>
                      }
                      <div>
                        <Label htmlFor="company">Entreprise</Label>
                        <Select
                          id="company"
                          name="companyId"
                          value={formData.companyId}
                          onChange={(e) => {
                            handleInputChange(e);
                            setIsCreatingCompany(e.target.value === 'new');
                          }}
                        >
                          <option value="">Sélectionnez une entreprise (optionnel)</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <TextInput
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                        {error && error.name && <>
                          <p className="text-red-600">{error.name}</p>
                        </>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {error && error.email && <>
                          <p className="text-red-600">{error.email}</p>
                        </>}
                      </div>

                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <TextInput
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                        {error && error.city && <>
                          <p className="text-red-600">{error.city}</p>
                        </>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <TextInput
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        {error && error.phone && <>
                          <p className="text-red-600">{error.phone}</p>
                        </>}
                      </div>

                      <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                          <TextInput
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {error && error.password && <>
                          <p className="text-red-600">{error.password}</p>
                        </>}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <div className="relative">
                          <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>


                      <div className="flex justify-center">

                        <Button type="submit" disabled={isLoading} className="w-full" >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Création du compte...
                            </>
                          ) : (
                            "Créer un compte"
                          )}
                        </Button>


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
              <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
                <div
                  className="absolute xl:-right-20 -right-[138px]"
                  style={{ top: "calc(50% - 258px)" }}
                >
                  <Thumbnail />
                </div>
              </div>
            </div>
          </div>
        </div >
      </Layout >
    </>
  );
}
