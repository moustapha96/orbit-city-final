/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";

import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLove from "./icons/IcoLove";


import Dashboard from "./tabs/Dashboard";
import { UserContext } from "../../../contexts/UserContext";
import CommandeApprouves from "./tabs/CommandeApprouves";
import CommandeRejetes from "./tabs/CommandeRejetes";
import CommandesECDV from "./tabs/CommandesECDV";
import ClientsTab from "./tabs/ClientsTab";
import ClientDetails from "./tabs/ClientDetails";
import ClientOrders from "./tabs/ClientOrders";
import Commandes from "./tabs/Commandes";
import { useAuthContext } from "../../../contexts/useAuthContext";

export default function Entreprise() {



  const { session, isAuthenticated,
    token,
    userInfo,
    comapny,
    userContext,
    saveSession } = useAuthContext();

  console.log(userInfo, token);
  // const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setViewMode("details");
  };

  const handleViewOrders = (client) => {
    setSelectedClient(client);
    setViewMode("orders");
  };

  const handleBackToClients = () => {
    setSelectedClient(null);
    setViewMode("list");
  };



  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "Entreprise", path: "/entreprise" },
              ]}
            />

            <div className="w-full bg-white px-4 sm:px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack sm:text-xl">
                  Gestion Entreprise
                </h1>
                <button
                  className="block sm:hidden text-qblack"
                  onClick={toggleMenu}
                >
                  {/* Icône Hamburger */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
              <div className="profile-wrapper w-full mt-8 flex space-x-10">

                <div
                  className={`w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ${isMenuOpen ? "block" : "hidden"
                    } sm:block`}
                >
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <Link
                        to="/entreprise#dashboard"
                        onClick={() => setActive("dashboard")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className="font-normal text-base">
                            Tableau de bord
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link
                        to="/entreprise#clients"
                        onClick={() => setActive("clients")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Clients
                          </span>
                        </div>
                      </Link>
                    </div>


                    <div className="item group">
                      <Link
                        to="/entreprise#commandes"
                        onClick={() => setActive("comnandes")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Commandes
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link
                        to="/entreprise#commandes-en-attente-de-validation"
                        onClick={() => setActive("commandes-en-attente-de-validation")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Commandes ECDV
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link
                        to="/entreprise#commandes-rejetees"
                        onClick={() => setActive("commandes-rejetees")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Commandes Rejetées
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="item group">
                      <Link
                        to="/entreprise#commandes-approuves"
                        onClick={() => setActive("commandes-approuves")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLove />
                          </span>
                          <span className="font-normal text-base">
                            Commandes Approuvées
                          </span>
                        </div>
                      </Link>
                    </div>

                  </div>
                </div>

                {/* Contenu principal */}
                <div className="flex-1">

                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" ? (
                      <Dashboard />
                    ) : active === "clients" ? (
                      viewMode === "list" ? (
                        <ClientsTab
                          onClientSelect={handleClientSelect}
                          onViewOrders={handleViewOrders}
                        />
                      ) : viewMode === "details" ? (
                        <ClientDetails
                          client={selectedClient}
                          onBack={handleBackToClients}
                          onViewOrders={() => setViewMode("orders")}
                        />
                      ) : (
                        <ClientOrders
                          client={selectedClient}
                          onBack={handleBackToClients}
                        />
                      )
                    ) : active === "commandes" ? (
                      <Commandes />
                    ) : active === "commandes-en-attente-de-validation" ? (
                      <CommandesECDV />
                    ) : active === "commandes-rejetees" ? (
                      <CommandeRejetes />
                    ) : active === "commandes-approuves" ? (
                      <CommandeApprouves />
                    ) : (
                      ""
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
