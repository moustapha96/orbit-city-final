/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { CartContext } from "../../../../contexts/CartContext";
import Cart from "../../../Cart";

import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import PreCart from "../../../PreCart";

import ThinPeople from "../../../Helpers/icons/ThinPeople";

export default function Middlebar({ className, type = 3 }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const backgroundColor = type === 3 ? "var(--bleu-logo)" : "var(--qyellow)";
  const textColor = type === 3 ? "white" : "var(--qblack)";
  const { cart, wishlist, preorder } = useContext(CartContext);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log(userLocal);
  }, []);

  const navigate = useNavigate();
  const handleCart = (e) => {
    e.preventDefault();
    navigate("/cart");
    console.log(cart);
  };
  const handlePreCart = (e) => {
    e.preventDefault();
    navigate("/pre-cart");
    console.log(cart);
  };
  return (
    <div className={`w-full h-[86px] bg-white  ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              {type === 3 ? (
                <Link to="/">
                  <img width="120" height="36" src="/logo.png" alt="logo" />
                </Link>
              ) : type === 4 ? (
                <Link to="/">
                  <img width="80" height="36" src="/logo.png" alt="logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img width="80" height="36" src="/logo.png" alt="logo" />
                </Link>
              )}
            </div>
            {/* <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div> */}
            <div className="flex space-x-6 items-center">
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <Heart />
                  </span>
                </Link>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                  style={{ backgroundColor, color: textColor }}
                >
                  {wishlist.length > 0 ? wishlist.length : 0}
                </span>
              </div>

              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <button onClick={handleCart}>
                    <ShoppingCart />
                    <span
                      className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] `}
                      style={{ backgroundColor, color: textColor }}
                    >
                      {cart.length > 0 ? cart.length : 0}
                    </span>
                    <Cart
                      type={type}
                      className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                    />
                  </button>
                </div>
              </div>

              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <button onClick={handlePreCart}>
                    <span>
                      <ShoppingBag />
                    </span>
                  </button>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] `}
                    style={{ backgroundColor, color: textColor }}
                  >
                    {preorder.length > 0 ? preorder.length : 0}
                  </span>
                </div>
                <PreCart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
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
        </div>
      </div>
    </div>
  );
}
