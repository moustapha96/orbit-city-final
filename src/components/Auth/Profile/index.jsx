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
<<<<<<< HEAD
import { useAuthContext } from "../../../contexts/useAuthContext";

export default function Profile() {
=======

export default function Profile() {

  const { user, token, uid, logout } = useContext(UserContext);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74


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
<<<<<<< HEAD
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
=======
                  className={`w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)] ${isMenuOpen ? "block" : "hidden"
                    } sm:block`}
                >
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <Link
                        to="/profile#dashboard"
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
                        to="/profile#profile"
                        onClick={() => setActive("profile")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoPeople />
                          </span>
                          <span className="font-normal text-base">
                            Information Personnel
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link
                        to="/profile#orderDraft"
                        onClick={() => setActive("orderDraft")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Commandes Brouillons
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link
                        to="/profile#order"
                        onClick={() => setActive("order")}
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
                        to="/profile#preorder"
                        onClick={() => setActive("preorder")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Précommandes
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link
                        to="/profile#commandes-a-credit"
                        onClick={() => setActive("commandes-a-credit")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">
                            Commandes à crédit
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* <div className="item group">
                      <Link
                        to="/profile#wishlist"
                        onClick={() => setActive("wishlist")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLove />
                          </span>
                          <span className="font-normal text-base">
                            Liste de souhaits
                          </span>
                        </div>
                      </Link>
                    </div> */}
                    <div className="item group">
                      <Link
                        to="/profile#payments"
                        onClick={() => setActive("payments")}
                      >
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLove />
                          </span>
                          <span className="font-normal text-base">
                            Transactions
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link onClick={HandleLout}>
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLogout />
                          </span>
                          <span className="font-normal text-base">
                            Déconnexion
                          </span>
                        </div>
                      </Link>
                    </div>
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
                  </div>
                </div>


                <div className={`flex-1 ${isMenuOpen ? 'hidden' : 'block'} lg:block`}>
                  <div className="item-body dashboard-wrapper w-full">
<<<<<<< HEAD
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
=======
                    {active === "dashboard" ? (
                      <Dashboard />
                    ) : active === "profile" ? (
                      <ProfileTab />
                    ) : active === "payment" ? (
                      <Payment />
                    ) : active === "order" ? (
                      <OrderTab />
                    ) : active === "orderDraft" ? (
                      <OrderDraftTab />
                    ) : active === "payments" ? (
                      <PaymentDetailsTab />
                    ) : active === "preorder" ? (
                      <PreOrderTab />
                    ) : active === "wishlist" ? (
                      <WishlistTab />
                    ) : active === "address" ? (
                      <AddressesTab />
                    ) : active === "password" ? (
                      <PasswordTab />
                    ) : active === "support" ? (
                      <SupportTab />
                    ) : active === "paniercommande" ? (
                      <PanierCommande />
                    ) : active === "commandes-a-credit" ? (
                      <CommandesACredit />
                    ) : active === "panierprecommande" ? (
                      <PanierPreCommande />
                    ) : (
                      ""
                    )}
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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