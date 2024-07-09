/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import {
  CircleUser,
  Heart,
  Menu,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { CartContext } from "../../../../contexts/CartContext ";
import { useContext } from "react";

export default function HeaderOne({ className, drawerAction, type = 3 }) {
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
                <img width="152" height="36" src="/logo.png" alt="logo" />
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
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow text-qblack"
              }`}
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
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow text-qblack"
              }`}
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
              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow text-qblack"
              }`}
            >
              {preorder.length > 0 ? preorder.length : 0}
            </span>
          </div>

          <div>
            <Link to="/profile">
              <span>
                <CircleUser />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
