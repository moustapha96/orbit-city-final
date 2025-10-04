/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { use, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";

import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoLove from "./icons/IcoLove";

import IcoPeople from "./icons/IcoPeople";

import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PreOrderTab from "./tabs/PreOrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";

import PanierCommande from "./tabs/PanierCommande";
import PanierPreCommande from "./tabs/PanierPreCommande";
import PaymentDetailsTab from "./tabs/PaymentDetailsTab";
import OrderDraftTab from "./tabs/OrderDraftTab";
import CommandesACredit from "./tabs/CommandesACredit";
import { useAuthContext } from "../../../contexts/useAuthContext";

export default function Profile() {


  const { user, logout, parent } = useAuthContext();

  console.log("user", user, parent)

  const navigate = useNavigate();
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );

  }, [getHashContent]);

  useEffect(() => {
    if (active != "") {
      setIsMenuOpen(false);
    }
  }, [active]);


  function HandleLout() {
    logout();
    navigate("/login");
  }
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "profile", path: "/profile" },
              ]}
            />

            <div className="w-full bg-white px-4 sm:px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack sm:text-xl">
                  Tableau de bord
                </h1>
                <button
                  className="block w-500  lg:hidden text-qblack"
                  onClick={toggleMenu}
                >
                  {/* Icône Hamburger */}

                  {isMenuOpen ? (
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
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
                  )}

                </button>
              </div>

              <div className="profile-wrapper w-full mt-8 flex flex-col lg:flex-row lg:space-x-10">

                <div
                  className={`w-full md:w-[236px] md:min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ${isMenuOpen ? "block" : "hidden"
                    } lg:block  transition-all duration-300 ease-in-out`}
                // className={`w-full lg:w-[236px] lg:min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ${isMenuOpen ? "block" : "hidden"
                //   } lg:block transition-all duration-300 ease-in-out`}
                >
                  <div className="flex flex-col space-y-10">
                    {/* Menu items */}
                    <MenuItem
                      to="/profile#dashboard"
                      icon={<IcoDashboard />}
                      text="Tableau de bord"
                      onClick={() => setActive("dashboard")}
                    />
                    <MenuItem
                      to="/profile#profile"
                      icon={<IcoPeople />}
                      text="Information Personnel"
                      onClick={() => setActive("profile")}
                    />
                    {/* <MenuItem
                      to="/profile#orderDraft"
                      icon={<IcoCart />}
                      text="Commandes Brouillons"
                      onClick={() => setActive("orderDraft")}
                    /> */}
                    <MenuItem
                      to="/profile#order"
                      icon={<IcoCart />}
                      text="Commandes"
                      onClick={() => setActive("order")}
                    />
                    {/* <MenuItem
                      to="/profile#preorder"
                      icon={<IcoCart />}
                      text="Précommandes"
                      onClick={() => setActive("preorder")}
                    /> */}
                    {user && parent && user.adhesion === "accepted" && (
                      <MenuItem
                        to="/profile#commandes-a-credit"
                        icon={<IcoCart />}
                        text="Commandes à crédit"
                        onClick={() => setActive("commandes-a-credit")}
                      />
                    )}
                    <MenuItem
                      to="/profile#payments"
                      icon={<IcoLove />}
                      text="Transactions"
                      onClick={() => setActive("payments")}
                    />
                    <MenuItem
                      onClick={HandleLout}
                      icon={<IcoLogout />}
                      text="Déconnexion"
                    />
                  </div>
                </div>


                <div className={`flex-1 ${isMenuOpen ? 'hidden' : 'block'} lg:block`}>
                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" && <Dashboard />}
                    {active === "profile" && <ProfileTab />}
                    {active === "payment" && <Payment />}
                    {active === "order" && <OrderTab />}
                    {active === "orderDraft" && <OrderDraftTab />}
                    {active === "payments" && <PaymentDetailsTab />}
                    {active === "preorder" && <PreOrderTab />}
                    {active === "wishlist" && <WishlistTab />}
                    {active === "paniercommande" && <PanierCommande />}
                    {user && parent && user.adhesion === "accepted" && active === "commandes-a-credit" && <CommandesACredit />}
                    {/* {active === "commandes-a-credit" && <CommandesACredit />} */}
                    {active === "panierprecommande" && <PanierPreCommande />}
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

const MenuItem = ({ to, icon, text, onClick }) => (
  <div className="item group">
    <Link to={to} onClick={onClick}>
      <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
        <span>{icon}</span>
        <span className="font-normal text-base">{text}</span>
      </div>
    </Link>
  </div>
);