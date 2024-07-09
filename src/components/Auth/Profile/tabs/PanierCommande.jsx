/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import InputCom from "../../../Helpers/InputQuantityCom";
import { CartContext } from "../../../../contexts/CartContext ";

import { Link } from "react-router-dom";
import ProductsTable from "../../../CartPage/ProductsTable";
export default function PanierCommande({ className }) {
  const { cart } = useContext(CartContext);
  console.log(cart);

  const handleRemoveFromCart = (e, produit) => {
    e.preventDefault();
  };
  return (
    <>
      {/* <div className="welcome-msg w-full">
        <div>
          <h1 className="font-bold text-[24px] text-qblack">Panier Commande</h1>
        </div>
      </div>
      <div className={`w-full ${className || ""}`}>
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                  Produit
                </td>

                <td className="py-4 whitespace-nowrap text-center">PRIX</td>
                <td className="py-4 whitespace-nowrap  text-center">
                  Quantité
                </td>
                <td className="py-4 whitespace-nowrap  text-center">Total</td>
                <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
              </tr>
              {cart.map((produit, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="pl-10  py-4 ">
                      <div className="flex space-x-6 items-center">
                        <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                          <img
                            src={`${
                              produit.image_1920
                                ? "data:image/png;base64," + produit.image_1920
                                : "https://readymadeui.com/images/coffee1.webp"
                            }`}
                            alt="product"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <p className="font-medium text-[15px] text-qblack">
                            {produit.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">
                          {" "}
                          {formatPrice(produit.list_price)}
                        </span>
                      </div>
                    </td>
                    <td className=" py-4">
                      <div className="flex justify-center items-center">
                        <InputQuantityCom produit={produit} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">
                          {" "}
                          {formatPrice(produit.list_price * produit.quantity)}
                        </span>
                      </div>
                    </td>

                    <td className="text-right py-4">
                      <div className="flex space-x-5 items-center justify-center">
                        <button
                          onClick={(event) =>
                            handleRemoveFromCart(event, produit)
                          }
                          className="duration-200 hover:scale-150"
                        >
                          <Trash className="hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full mt-[30px] flex sm:justify-end justify-start">
        <div className="sm:flex sm:space-x-[30px] items-center">
          <button type="button">
            <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
              Vider le panier
            </div>
          </button>
          <div className="w-[180px] h-[50px]">
            <button type="button" className="yellow-btn">
              <div className="w-full text-sm font-semibold">
                Valider Commande
              </div>
            </button>
          </div>
        </div>
      </div> */}
      <div className="w-full mt-[23px]">
        <div className="container-x mx-auto">
          <ProductsTable className="mb-[30px]" />
          <div className="w-full sm:flex justify-between">
            <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
              <div className="flex-1 h-full">
                <InputCom type="text" placeholder="Discount Code" />
              </div>
              <button type="button" className="w-[90px] h-[50px] black-btn">
                <span className="text-sm font-semibold">Apply</span>
              </button>
            </div>
            <div className="flex space-x-2.5 items-center">
              <Link>
                <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                  <span className="text-sm font-semibold">
                    Continue Shopping
                  </span>
                </div>
              </Link>
              <Link>
                <div className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                  <span className="text-sm font-semibold">Update Cart</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full mt-[30px] flex sm:justify-end">
            <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
              <div className="sub-total mb-6">
                <div className=" flex justify-between mb-6">
                  <p className="text-[15px] font-medium text-qblack">
                    Subtotal
                  </p>
                  <p className="text-[15px] font-medium text-qred">$365</p>
                </div>
                <div className="w-full h-[1px] bg-[#EDEDED]"></div>
              </div>
              <div className="shipping mb-6">
                <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                  Shipping
                </span>
                <ul className="flex flex-col space-y-1">
                  <li>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2.5 items-center">
                        <div className="input-radio">
                          <input
                            type="radio"
                            name="price"
                            className="accent-pink-500"
                          />
                        </div>
                        <span className="text-[13px] text-normal text-qgraytwo">
                          Free Shipping
                        </span>
                      </div>
                      <span className="text-[13px] text-normal text-qgraytwo">
                        +$00.00
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2.5 items-center">
                        <div className="input-radio">
                          <input
                            type="radio"
                            name="price"
                            className="accent-pink-500"
                          />
                        </div>
                        <span className="text-[13px] text-normal text-qgraytwo">
                          Flat Rate
                        </span>
                      </div>
                      <span className="text-[13px] text-normal text-qgraytwo">
                        +$00.00
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2.5 items-center">
                        <div className="input-radio">
                          <input
                            type="radio"
                            name="price"
                            className="accent-pink-500"
                          />
                        </div>
                        <span className="text-[13px] text-normal text-qgraytwo">
                          Local Delivery
                        </span>
                      </div>
                      <span className="text-[13px] text-normal text-qgraytwo">
                        +$00.00
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="shipping-calculation w-full mb-3">
                <div className="title mb-[17px]">
                  <h1 className="text-[15px] font-medium">
                    Calculate Shipping
                  </h1>
                </div>
                <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                  <span className="text-[13px] text-qgraytwo">
                    Select Country
                  </span>
                  <span>
                    <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </div>
                <div className="w-full h-[50px]">
                  <InputCom
                    inputClasses="w-full h-full"
                    type="text"
                    placeholder="Postcode / ZIP"
                  />
                </div>
              </div>
              <button type="button" className="w-full mb-10">
                <div className="w-full h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                  <span className="text-sm font-semibold">Update Cart</span>
                </div>
              </button>
              <div className="total mb-6">
                <div className=" flex justify-between">
                  <p className="text-[18px] font-medium text-qblack">Total</p>
                  <p className="text-[18px] font-medium text-qred">$365</p>
                </div>
              </div>
              <Link to="/checkout">
                <div className="w-full h-[50px] black-btn flex justify-center items-center">
                  <span className="text-sm font-semibold">
                    Proceed to Checkout
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
