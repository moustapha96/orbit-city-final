/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import { Heart, HeartHandshake, Menu, ShoppingBag, ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import { useAuthContext } from "../../../../contexts/useAuthContext";
import { CartContext } from "../../../../contexts/CartContext";
import SearchBox from "../../../Helpers/SearchBox";


export default function HeaderOne({ className, drawerAction, type = 3 }) {
  const { user } = useAuthContext();
  const { cart, wishlist, preorder, creditOrder } = useContext(CartContext);
  const [headerHeight, setHeaderHeight] = useState(0);
  const backgroundColor = type === 3 ? "var(--bleu-logo)" : "var(--qyellow)";
  const textColor = type === 3 ? "white" : "var(--qblack)";



  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById("fixed-header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);


  return (
    <>
      <header id="fixed-header" className={`${className || ""} fixed top-0 left-0 right-0 z-50  bg-white`}>
        <Middlebar type={type} className="quomodo-shop-middle-bar lg:block hidden" />
        <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />


        <div className="quomodo-shop-drawer lg:hidden block w-full bg-white shadow-md fixed top-0 left-0 z-50 ">

          {/* <div className="w-full h-[60px] flex justify-between items-center px-5">
            <div onClick={drawerAction}>
              <Menu />
            </div>

            <div>
              <Link to="/">
                <img
                  width={type === 3 ? "120" : type === 4 ? "152" : "70"}
                  height={type === 3 ? "36" : type === 4 ? "36" : "26"}
                  src="/logo.png"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {wishlist.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/wishlist">
                    <Heart />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {wishlist.length}
                  </span>
                </div>
              )}

              {user && user.adhesion === "accepted" && creditOrder.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/credit-cart">
                    <HeartHandshake />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {creditOrder.length}
                  </span>
                </div>
              )}

              {cart.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <ShoppingCart />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {cart.length}
                  </span>
                </div>
              )}

              {preorder.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/pre-cart">
                    <ShoppingBag />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {preorder.length}
                  </span>
                </div>
              )}

              <div>
                {!user ? (
                  <Link to="/login">
                    <ThinPeople />
                  </Link>
                ) : (
                  <Link to="/profile">
                    <ThinPeople />
                  </Link>
                )}
              </div>


            </div>
          </div> */}

          <div className="w-full h-[60px] flex items-center px-5">
            <div className="flex items-center space-x-4">

              <div onClick={drawerAction} className="cursor-pointer">
                <Menu />
              </div>


              <div className="ml-4">
                <Link to="/">
                  <img
                    width={type === 3 ? "120" : type === 4 ? "152" : "70"}
                    height={type === 3 ? "36" : type === 4 ? "36" : "26"}
                    src="/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>


            <div className="flex items-center space-x-4 ml-auto">
              {wishlist.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/wishlist">
                    <Heart />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {wishlist.length}
                  </span>
                </div>
              )}

              {user && user.adhesion === "accepted" && creditOrder.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/credit-cart">
                    <HeartHandshake />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {creditOrder.length}
                  </span>
                </div>
              )}

              {cart.length > 0 && (
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <ShoppingCart />
                  </Link>
                  <span
                    className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {cart.length}
                  </span>
                </div>
              )}

              {/* <div>
                {!user ? (
                  <Link to="/login">
                    <ThinPeople />
                  </Link>
                ) : (
                  <Link to="/profile">
                    <ThinPeople />
                  </Link>
                )}
              </div> */}
              <div className="flex items-center space-x-1">
                {!user ? (
                  <Link to="/login" className="flex items-center space-x-1">
                    <ThinPeople />
                    <span>Profil</span>
                  </Link>
                ) : (
                  <Link to="/profile" className="flex items-center space-x-1">
                    <ThinPeople />
                    <span>Profil</span>
                  </Link>
                )}
              </div>
            </div>
          </div>


          <div className={`px-5 pb-4 `}>
            <SearchBox
              type={type}
              className="w-full"
              isMobile={true}
              onSearch={(query, category) => {
                console.log(`Searching for "${query}" in category "${category}"`);
              }}
            />
          </div>

        </div>

      </header>

    </>
  );
}
