/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useSelector } from "react-redux";
import { Car, ShoppingBag, ShoppingCart } from "lucide-react";
import userService from "../../../../services/userService";
import { Link } from "react-router-dom";
import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "../../../../services/entrepriseFunctionService";
import { useAuthContext } from "../../../../contexts/useAuthContext";

export default function Dashboard() {

  const { session, isAuthenticated,
    token,
    userInfo,
    comapny,
    userContext, parent,
    saveSession } = useAuthContext();

  const [compte, setCompte] = useState([]);
  const [commandeApprouve, setCommandeApprouve] = useState([]);
  const [commandeECDV, setCommandeECDV] = useState([]);
  const [commandeRejetes, setCommandeRejetes] = useState([]);
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {

    const fetchModelsCount = async () => {
      const res = await getCommandeApprouveClientsEntreprise(parent.id);
      setCommandeApprouve(res);
      const resCE = await getCommandeECDVClientsEntreprise(parent.id);
      setCommandeECDV(resCE);
      const resrejete = await getCommandeRejeteClientsEntreprise(parent.id);
      setCommandeRejetes(resrejete);

    };

    const fetchModels = async () => {
      try {
        const response = await userService.getCompte(parent.id);
        if (response) {
          setCompte(response);
          console.log(response);
        }
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données user", error);
      }
    };


    fetchModels();
    fetchModelsCount();
  }, [userInfo, parent]);

  console.log(userInfo);
  return (
    <>
      <div className="welcome-msg w-full">
        <div>
          <p className="text-qblack text-lg">
            Hello <span>{userInfo ? userInfo.name : "Non connecté"}</span>
          </p>
          <h1 className="font-bold text-[24px] text-qblack sm:text-[20px]">
            Bienvenue sur l'entreprise {parent.name}
          </h1>
        </div>
      </div>

      <div className="quick-view-grid w-full flex flex-wrap  space-evenly items-center mt-3">
        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingCart />
            </span>
          </div>
          <Link to="/entreprise#commandes-en-attente-de-validation">
            <p className="text-xl text-white group-hover:text-qblacktext mt-3">
              Commandes en cours
            </p>
          </Link>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {commandeECDV && <> {commandeECDV.length} </>}
          </span>
        </div>

        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingBag />
            </span>
          </div>
          <Link to="/entreprise#commandes-rejetees">
            <p className="text-xl text-white group-hover:text-qblacktext mt-2">
              Commandes Rejetées
            </p>
          </Link>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {commandeRejetes && <> {commandeRejetes.length} </>}
          </span>
        </div>

        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <Car />
            </span>
          </div>
          <Link to="/entreprise#commandes-approuves"  >
            <p className="text-xl text-white group-hover:text-qblacktext mt-5">
              Commandes Validées
            </p>
          </Link>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {commandeApprouve && <> {commandeApprouve.length} </>}
          </span>
        </div>


      </div>

      <div className="dashboard-info mt-8 flex flex-col bg-primarygray px-4 sm:px-7 py-7">
        <p className="title text-[22px] font-semibold">
          Informations de l'entreprise
        </p>
        <div className="mt-5 flex flex-wrap">
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Name:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {parent ? parent.name : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Email:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {parent ? parent.email : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Phone:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {parent ? parent.partner_phone : "Not found"}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
