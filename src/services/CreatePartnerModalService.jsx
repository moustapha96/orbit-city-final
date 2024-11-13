/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";

import { Button, Label, Modal } from "flowbite-react";
import formatPrice from "../utils/formatPrice";
import { CircleX, Loader2 } from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhoneNumber } from "../utils/validations";
import CommandeService from "./CommandeService";
import { toast } from "react-toastify";
import { CartContext } from "../contexts/CartContext";


// import initializePaydunya from "../config/paydunyaInitializer"
const CreatePartnerModalService = ({
  handleCreatePartner,
  order,
  data,
  onClose,
}) => {

  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);


  const validateForm = () => {
    const errors = {
      prenom: !prenom ? "Le prénom est obligatoire." : "",
      nom: !nom ? "Le nom est obligatoire." : "",
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
    };
    console.log(errors);
    setError(errors);
    return Object.values(errors).every((error) => !error);
  };


  const handleSubmitValidePanier = (event) => {
    console.log("arrivé");
    setIsLoading(false)
    event.preventDefault();

    if (validateForm()) {
      setOpenModal(false)
      setIsLoading(true)
      let modelData = {
        name: prenom + " " + nom,
        email: email,
        telephone: telephone,
        adresse: adresse,
        order: data
      }
      handleCreatePartner(modelData);
    } else {
      setIsLoading(false)
    }
  };


  return (
    <Modal
      size="xl"
      className="h-auto"
      show={openModal}
      popup
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div className="flex items-start border-b border-gray-300 pb-4">
              <div className="flex-1">
                <h3 className="text-gray-800 text-xl font-bold">
                  Vos informations pour la reservation
                </h3>

              </div>

              <p>
                <CircleX
                  onClick={onClose}
                  className={`cursor-pointer hover:text-red-500 hover:scale-150 duration-300`}
                />
              </p>
            </div>

            {order && (

              <>
                <div className="my-8">

                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">

                    <div className="sm:w-1/2 md:w-full">
                      <div className="">
                        <Label htmlFor="prenom" value="Prénom" className="dark:text-white" />
                        {error.prenom && (
                          <p className="text-red-600">{error.prenom}</p>
                        )}
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
                          focus:invalid:border-red-500 focus:invalid:ring-red-500
                          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      />
                    </div>



                    <div className="sm:w-1/2 md:w-full">
                      <div className="mb-2 block">
                        <Label htmlFor="nom" value="Nom" className="dark:text-white" />
                        {error.nom && (
                          <p className="text-red-600">{error.nom}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="nom"
                        value={`${nom}`}
                        name="nom"
                        onChange={(e) => setNom(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
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
                  <br />


                  <div className="signin-area mb-3.5">
                    <div className="flex justify-center">
                      <Button
                        onClick={handleSubmitValidePanier}
                        variant="failure"
                        className=" hover:bg-bleu-logo black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                                items-center"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Valider votre panier
                      </Button>
                    </div>

                  </div>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Vous avez pas un compte ?
                      <Link
                        to="/signin"
                        className=" hover:text-bleu-logo ml-2 text-qblack"
                      >
                        Connectez-Vous
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};




export default CreatePartnerModalService;
