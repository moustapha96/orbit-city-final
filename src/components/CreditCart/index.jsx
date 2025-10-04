/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CircleX, Trash } from "lucide-react";
import formatPrice from "../../utils/formatPrice";
import { CartContext } from "../../contexts/CartContext";
export default function CreditCart({ className, type = 3 }) {
  const { creditOrder, getCreditOrderTotal, removeFromCreditOrder } = useContext(CartContext);

  const handleRemoveToCart = (e, produit) => {
    e.preventDefault();
    removeFromCreditOrder(produit);
  };

  return (
    <>
      {creditOrder && creditOrder.length > 0 && (
        <div
          style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
          className={`w-[300px] bg-white border-t-[3px] ${type === 3 ? "border-qh3-blue" : "cart-wrappwer"
            }  ${className || ""}`}
        >
          <div className="w-full h-full">
            <div className="product-items h-[310px] overflow-y-scroll">
              <ul>
                {creditOrder.map((produit) => (
                  <li key={produit.id} className="w-full h-full flex">
                    <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                      <div className="w-[65px] h-full">
                        <img
                          src={`${produit.image_256
                            ? "data:image/png;base64," + produit.image_256
                            : "https://readymadeui.com/images/coffee1.webp"
                            }`}
                          alt="image produit ccbm shop"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-center ">
                        <p className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                          {produit.name}
                        </p>

                        <p className="price">
                          <span className="offer-price text-qred font-600 text-[15px] ml-2">
                            Prix : {formatPrice(produit.creditorder_price)} X{" "}
                            {produit.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="mt-[20px] mr-[15px] inline-flex cursor-pointer ">
                      <div
                        onClick={(e) => handleRemoveToCart(e, produit)}
                        className="duration-200 hover:red-150"
                      >
                        <Trash className="hover:text-red-500" />
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full px-4 mt-[20px] mb-[12px]">
              <div className="h-[1px] bg-[#F0F1F3]"></div>
            </div>
            <div className="product-actions px-4 mb-[30px]">
              <div className="total-equation flex justify-between items-center mb-[28px]">
                <span className="text-[15px] font-500 text-qblack">
                  Sou Total
                </span>
                <span className="text-[15px] font-500 text-qred ">
                  {" "}
                  {formatPrice(getCreditOrderTotal())}
                </span>
              </div>
              <div className="product-action-btn">
                <Link to="/credit-cart">
                  <div className="gray-btn w-full h-[50px] mb-[10px] ">
                    <span>Panier Crédit commande</span>
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
