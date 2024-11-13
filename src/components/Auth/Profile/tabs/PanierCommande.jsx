/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import InputCom from "../../../Helpers/InputQuantityCom";
import { CartContext } from "../../../../contexts/CartContext";

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
      <div className="w-full mt-[23px]">
        <div className="container-x mx-auto">
          <ProductsTable className="mb-[30px]" />
          <div className="w-full sm:flex justify-between">

            <div className="flex space-x-2.5 items-center">
              <Link>
                <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                  <span className="text-sm font-semibold">
                    Continuer vos achats
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
