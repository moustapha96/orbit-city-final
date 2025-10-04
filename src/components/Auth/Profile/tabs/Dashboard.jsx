/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Car, ShoppingBag, ShoppingCart } from "lucide-react";
import userService from "../../../../services/userService";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/useAuthContext";

export default function Dashboard() {

  const { user, isAuthenticated, parent, } = useAuthContext();
  const [compte, setCompte] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await userService.getCompte(user.id);
        if (response) {
          setCompte(response);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données user", error);
      }
    };
    fetchModels();
  }, [user, isAuthenticated]);

  return (
    <>
      <div className="welcome-msg w-full">
        <div>
          <p className="text-qblack text-lg">
            Hello <span>{user ? user.name : "Non connecté"}</span>
          </p>
          <h1 className="font-bold text-[24px] text-qblack sm:text-[20px]">
            Bienvenue sur votre profil
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
          <Link to="/profile#order">
            <p className="text-xl text-white group-hover:text-qblacktext mt-3">
              Mes commandes
            </p>
          </Link>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {compte && <> {compte.order_count} </>}
          </span>
        </div>

        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingBag />
            </span>
          </div>
          <Link to="/profile#preorder">
            <p className="text-xl text-white group-hover:text-qblacktext mt-2">
              Mes Pré-commandes
            </p>
          </Link>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {compte && <> {compte.preorder_count} </>}
          </span>
        </div>

        {user && user.adhesion == "accepted" && parent && <>
          <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
            <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
              <span>
                <ShoppingBag />
              </span>
            </div>
            <Link to="/profile#commandes-a-credit">
              <p className="text-xl text-white group-hover:text-qblacktext mt-2">
                Mes Crédits
              </p>
            </Link>
            <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
              {compte && <> {compte.creditorder_count} </>}
            </span>
          </div>
        </>}

        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <Car />
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Livrées
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {compte && <> {compte.delivered_count} </>}
          </span>
        </div>

        <div className="qv-item w-full sm:w-[180px] h-[200px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6 mx-2 mb-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingBag />
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            En cours
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            {compte && <> {compte.progress_count} </>}
          </span>
        </div>

      </div>

      <div className="dashboard-info mt-8 flex flex-col bg-primarygray px-4 sm:px-7 py-7">
        <p className="title text-[22px] font-semibold">
          Informations personnelles
        </p>
        <div className="mt-5 flex flex-wrap">
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Nom:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.name : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Email:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.email : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Téléphone:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.partner_phone : "Not found"}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Adresse:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.partner_city : ""}
            </div>
          </div>
        </div>
      </div>
      {user && user.adhesion == "accepted" && parent && <>
        <div className="dashboard-info mt-8 flex flex-col bg-primarygray px-4 sm:px-7 py-7">
          <p className="title text-[22px] font-semibold">
            Informations Entreprise
          </p>
          <div className="mt-5 flex flex-wrap">
            <div>
              <div className="inline-flex mr-5 mb-5">
                <div className="text-base text-qgraytwo w-[100px] block">
                  <div>Nom:</div>
                </div>
                <div className="text-base text-qblack font-medium">
                  {user && user.adhesion && parent && parent.name}
                </div>
              </div>

              <div className="inline-flex mr-5 mb-5">
                <div className="text-base text-qgraytwo w-[100px] block">
                  <div>Email:</div>
                </div>
                <div className="text-base text-qblack font-medium">
                  {user && user.adhesion && parent && parent.email}
                </div>
              </div>
              <div className="inline-flex mr-5 mb-5">
                <div className="text-base text-qgraytwo w-[100px] block">
                  <div>Téléphone:</div>
                </div>
                <div className="text-base text-qblack font-medium">
                  {user && user.adhesion && parent && parent.phone}
                </div>
              </div>

            </div>
          </div>
        </div>
      </>}
      {/* {user && <>
        <div className="dashboard-info mt-8 flex flex-col bg-primarygray px-4 sm:px-7 py-7">
          <p className="title text-[22px] font-semibold">
            lien vers gestion rh <a href="https://africatransit.sn" className="text-bleu-logo" target="_blank" rel="noopener noreferrer">plateforme</a>
          </p>
        </div>
      </>} */}
    </>
  );
}
