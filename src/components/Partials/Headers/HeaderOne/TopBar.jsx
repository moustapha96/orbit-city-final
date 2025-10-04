/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/useAuthContext";
// import { useContext } from "react";
// import { CartContext } from "../../../../contexts/CartContext";
// import { Heart, HeartHandshake, ShoppingBag, ShoppingCart } from "lucide-react";

export default function TopBar({ className }) {
  const { user } = useAuthContext();
  // const { cart, wishlist, preorder, creditOrder } = useContext(CartContext);

  return (
    <>
      <div
        className={`   bg-white  border-b  border-qgray-border ${className || ""
          }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
              <ul className="flex space-x-6">
                <li>
                  {!user ? (
                    <>
                      {" "}
                      <Link to="/login">
                        <span className="text-xs leading-6 text-qblack font-500">
                          Se connecter
                        </span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/profile">
                        <span className="text-xs leading-6 text-qblack font-500">
                          Mon compte
                        </span>
                      </Link>
                    </>
                  )}
                </li>
                <li>
                  <Link to="/informations#contact-form">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Contact
                    </span>
                  </Link>
                </li>

                <li className="hidden md:block">
                  <Link to="/tracking-order">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Suivre Commande
                    </span>
                  </Link>
                </li>

              </ul>
            </div>

            <div className="topbar-dropdowns sm:block hidden">
              <div className="flex space-x-6">
                <div className="country-select flex space-x-1 items-center">
                  <div>
                    <Link to="/" >
                      <img
                        src={`/logo.png`}
                        width="50" height="36"
                        alt="CCBM Shop logo"
                        className="overflow-hidden rounded-full"
                      />
                    </Link>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
