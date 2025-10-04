/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { use, useContext, useEffect, useRef, useState } from "react";

import { Button, Label, Modal } from "flowbite-react";
import { Loader2, Pencil } from "lucide-react";
import { UserContext } from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import userService from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/useAuthContext";
import { sendDemandeAdhesion } from "../../../../services/entrepriseFunctionService";

import CreditAgreement from "./credit-agreement";

export default function ProfileTab() {
  const { user, refreshContext, parent } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [departement, setDepartement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAdhesion, setIsLoadingAdhesion] = useState(false);
  const [codeEntreprise, setCodeEntreprise] = useState("");
  const [sendStatut, setSendStatut] = useState("");
  const [agreedToCredit, setAgreedToCredit] = useState(false);
  const [showCreditAgreement, setShowCreditAgreement] = useState(false);
  const profileImgInput = useRef(null);
  const [profileImg, setprofileImg] = useState(null);

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    email: '',
    partner_id: 0,
    company_id: 0,
    company_name: '',
    partner_city: '',
    partner_phone: '',
    country_id: 0,
    country_name: '',
    country_code: '',
    country_phone_code: 0,
    avatar: null,
    is_verified: false,
    function: '',
    role: '',
    adhesion: '',
    adhesion_submit: false,
    parent_id: 0
  });


  const fetchUserInfo = async () => {
    try {
      const response = await userService.actualiseInfoUser(user.id);
      if (response) {
        await refreshContext(response);
        console.log("Context mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données du compte :", error);
      toast.error("Erreur lors de la récupération des données du compte");
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchUserInfo();
    }
  }, [user.id]);



  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.getDetailsCompteUser(user.id);
        setUserInfo(res);
        console.log("information reccuperer")
        console.log(res)
      } catch (error) {
        console.error('Erreur lors de la récupération des données du compte:', error);
        toast.error('Erreur lors de la récupération des données du compte');
      }
    };
    if (user.id) {
      fetchUserInfo();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    setEmail(user.email);
    setTelephone(user.partner_phone);
    setAdresse(user.partner_city);
    setName(user.name);
    setDepartement(user.function);

    const name = "avatar_" + user.id;
    const storedAvatar = localStorage.getItem(name);
    if (user.avatar) {
      setprofileImg(user.avatar);
    } else if (storedAvatar) {
      setprofileImg(storedAvatar);
    } else {
      setprofileImg("avatar.png");
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(userInfo)
    try {
      const response = await userService.updateUserCompte(userInfo.partner_id, userInfo);
      if (response.code === 300) {
        toast.warning(response.message);
      } else {
        toast.success("Modification des informations réussie !");
      }
    } catch (error) {
      toast.error("Modification du compte échouée : " + error);
    } finally {
      setIsLoading(false);
    }
  };




  const profileImgChangHandler = (e) => {
    const file = e.target.files[0];
    const name = "avatar_" + user.id;
    if (file) {
      const imgReader = new FileReader();
      imgReader.onload = async (event) => {
        setprofileImg(event.target.result);
        localStorage.setItem(name, event.target.result);
        const response = await userService.updateUserAvatar(
          event.target.result
        );
        if (response.status == "success") {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 5000,
          });
          setprofileImg(response.avatar);
        }
      };
      imgReader.readAsDataURL(file);
    } else {
      setprofileImg("avatar.png");
      localStorage.removeItem(name);
    }
  };

  const browseProfileImg = () => {
    profileImgInput.current.click();
  };

  const handleCreditAgreementSubmit = async (event) => {
    event.preventDefault();
    if (agreedToCredit) {
      setShowCreditAgreement(false);
      await handleSendAdhesion();
    } else {
      toast.warning("Vous devez accepter les conditions pour continuer.");
    }
  };



  const handleSendAdhesion = async () => {
    if (!codeEntreprise) {
      toast.warning("L'identifiant de entreprise est obligatoire");
      return;
    }

    if (user && (user.adhesion === "pending" && user.adhesion_submit === true)) {
      toast.warning("Vous avez déjà une demande d'adhésion en cours ou acceptée.");
      return;
    }

    setIsLoadingAdhesion(true);
    const data = {
      'partner_id': user.id,
      'entreprise_code': codeEntreprise,
      'adhesion_submit': true
    };
    console.log(data)
    try {
      const res = await sendDemandeAdhesion(data);
      console.log("res", res);

      setCodeEntreprise("");
      setSendStatut(res.adhesion);
      toast.success("Votre demande d'adhésion a été envoyée avec succès.");
      fetchUserInfo();
    } catch (error) {
      console.error("Error fetching clients:", error);
      console.log(error.response.status);
      console.log(error.response);
      if (error.response.status == 302) {
        toast.warning(error.response.data.message);
      } else if (error.response.status == 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoadingAdhesion(false);
    }
  };

  return (
    <>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                Mettre à jour le profil
                <span className="ml-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                      fill="#374557"
                      fillOpacity="0.6"
                    />
                  </svg>
                </span>
              </h1>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden relative">
                    <img
                      src={profileImg || `/images/edit-profileimg.jpg`}
                      alt="CCBM Shop Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <input
                    ref={profileImgInput}
                    onChange={profileImgChangHandler}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />

                  <button
                    onClick={browseProfileImg}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    <Pencil className="text-white" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Informations Personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" value="Nom Complet" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="partner_phone" value="Téléphone" />
                  <input
                    type="tel"
                    id="partner_phone"
                    name="partner_phone"
                    value={userInfo.partner_phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="partner_city" value="Ville" />
                  <input
                    type="text"
                    id="partner_city"
                    name="partner_city"
                    value={userInfo.partner_city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="country_name" value="Pays" />
                  <input
                    type="text"
                    id="country_name"
                    name="country_name"
                    value={userInfo.country_name}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="function" value="Fonction" />
                  <input
                    type="text"
                    id="function"
                    name="function"
                    value={userInfo.function}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm"
                  />
                </div>


              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  color="failure"
                  pill
                  className="w-full h-12 text-sm font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Mise à jour en cours</span>
                    </>
                  ) : (
                    <span>Mettre à jour</span>
                  )}
                </Button>
              </div>
            </form>
          </div>




        </div>
      </div>
      {/* pour la demande d'adhesion */}
      <div className="container mx-auto px-4 py-8">

        <div className="flex flex-col  md:flex-row  space-x-0 md:space-x-8">
          <div className="flex-1 w-full md:w-1/3 order-first md:order-none">

            <div className="update-logo w-full mb-9">
              <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                Demande d'adhésion
              </h1>

              <div className="flex xl:justify-center justify-start">
                <div className="relative">

                  {user && user.adhesion == "pending" && user.adhesion_submit && <>
                    <span> Demande en cours de traitement...
                      <Loader2 className="mr-2 h-20 w-10 animate-spin" /> </span>
                  </>}
                  {user && user.adhesion == "rejected" && <>
                    <span> Votre demande a été réjeter </span>
                  </>}
                  {user && user.adhesion == "accepted" && parent && <>
                    <span> Votre demande a été accepté </span>
                    <span>  <strong>Entreprise : </strong> {parent.name} </span>
                  </>}

                </div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-2/3">
            <div className="w-full md:w-[1/3px]">
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="L'identifiant de l'entreprise" value="Identifiant entreprise" />
                  </div>
                  <input
                    type="text"
                    placeholder="Identifiant Entreprise"
                    value={codeEntreprise}
                    onChange={(e) => setCodeEntreprise(e.target.value)}
                    name="codeEntreprise"
                    required
                    disabled={user && user.adhesion == "pending" && user.adhesion_submit == true}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"
                  />
                </div>

              </div>
            </div>
            <Button
              type="button"
              color="failure"
              pill
              className="w-full"
              disabled={isLoadingAdhesion || (user && (user.adhesion === "pending" && user.adhesion_submit === true))}
              onClick={() => { setShowCreditAgreement(true), setAgreedToCredit(false) }}
            >
              {isLoadingAdhesion ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <span>Demande d'adhésion</span>
              )}
            </Button>
          </div>

        </div>


        <Modal
          show={showCreditAgreement}
          onClose={() => setShowCreditAgreement(false)}
          size="xl"
        >
          <Modal.Header>Conditions de Commande à Crédit</Modal.Header>
          <Modal.Body>
            <CreditAgreement
              agreed={agreedToCredit}
              setAgreed={setAgreedToCredit}
              onSubmit={handleCreditAgreementSubmit}
              isLoadingAdhesion={isLoadingAdhesion}
              stateUser={user && (user.adhesion === "pending" && user.adhesion_submit === true)}
            />
          </Modal.Body>
        </Modal>
      </div>

    </>
  );
}
