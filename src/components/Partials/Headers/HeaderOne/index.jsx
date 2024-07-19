/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { Heart, Menu, ShoppingBag, ShoppingCart } from "lucide-react";
import { CartContext } from "../../../../contexts/CartContext ";
import { useContext } from "react";
import { useSelector } from "react-redux";
import ThinPeople from "../../../Helpers/icons/ThinPeople";

export default function HeaderOne({ className, drawerAction, type = 3 }) {
  const user = useSelector((state) => state.user.user);
  const backgroundColor = type === 3 ? "var(--bleu-logo)" : "var(--qyellow)";
  const textColor = type === 3 ? "white" : "var(--qblack)";
  const { cart, wishlist, preorder } = useContext(CartContext);

  return (
    <header className={` ${className || ""} header-section-wrapper relative`}>
      <TopBar className="quomodo-shop-top-bar" />
      <Middlebar
        type={type}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <Menu></Menu>
          </div>
          <div>
            {type === 3 ? (
              <Link to="/">
                <img width="120" height="36" src="/logo.png" alt="logo" />
              </Link>
            ) : type === 4 ? (
              <Link to="/">
                <img width="152" height="36" src="/logo.png" alt="logo" />
              </Link>
            ) : (
              <Link to="/">
                <img width="70" height="26" src="/logo.png" alt="logo" />
              </Link>
            )}
          </div>
          <div className="cart relative cursor-pointer">
            <Link to="/wishlist">
              <span>
                <Heart />
              </span>
            </Link>
            <span
              className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
              style={{ backgroundColor, color: textColor }}
            >
              {wishlist.length > 0 ? wishlist.length : 0}
            </span>
          </div>

          <div className="cart relative cursor-pointer">
            <Link to="/cart">
              <span>
                <ShoppingCart />
              </span>
            </Link>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
              style={{ backgroundColor, color: textColor }}
            >
              {cart.length > 0 ? cart.length : 0}
            </span>
          </div>

          <div className="cart relative cursor-pointer">
            <Link to="/pre-cart">
              <span>
                <ShoppingBag />
              </span>
            </Link>
            <span
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
              style={{ backgroundColor, color: textColor }}
            >
              {preorder.length > 0 ? preorder.length : 0}
            </span>
          </div>

          <div>
            {!user ? (
              <>
                {" "}
                <Link to="/login">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
