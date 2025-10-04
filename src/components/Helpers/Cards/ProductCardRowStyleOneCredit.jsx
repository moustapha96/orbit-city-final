/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";

import Star from "../icons/Star";

import formatPrice from "../../../utils/formatPrice";
import { Eye, Heart, HeartHandshake, ShoppingBag, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { CartContext } from "../../../contexts/CartContext";

export default function ProductCardRowStyleOneCredit({ className, datas, type = 3 }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    addToCreditOrder,
    addToPreorder,
    isProductInWishlist,
  } = useContext(CartContext);
  const { user, parent } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(datas, 1)
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 })
  }

  const handleAddToCreditOrder = (e) => {
    e.preventDefault()
    console.log(e, datas)
    addToCreditOrder(datas, 1)
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 })
  }

  const handleAddToWishlist = (e) => {
    e.preventDefault()
    addToWishlist(datas, 1)
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 })
  }

  const handleAddToPreOrder = (e) => {
    e.preventDefault()
    addToPreorder(datas, 1)
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 })
  }




  const handleDetails = (e, produit) => {
    e.preventDefault();
    navigate("/single-product/" + produit.id, {
      state: { produit },
    });
  };


  return (
    <div
      className={`product-row-card-style-one w-full bg-white group relative overflow-hidden ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row items-center w-full h-full p-4 md:p-6">
        <div className="w-full md:w-1/3 h-48 md:h-full mb-4 md:mb-0">
          {datas.image_256 && (
            <img
              src={`data:image/png;base64,${datas.image_256}`}
              alt="image produit ccbm shop"
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center h-full md:pl-6">
          <div className="mb-2">

            <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-bleu-logo">
              <Link onClick={(e) => handleDetails(e, datas)}>{datas.name}</Link>
            </p>
            <p className="price mb-4">

              <span className="offer-price   text-bleu-logo font-600 sm:text-[18px] text-base ">
                {formatPrice(datas.list_price)}
              </span>
              {/* {datas.is_preorder && (
                <span className="block text-qred font-500 text-[14px] ">
                  {formatPrice(datas.preorder_price)} <br />
                </span>
              )} */}
              {user && user.adhesion === "accepted" && parent && datas.is_creditorder && (
                <span className="block offer-price text-vert font-600 text-[16px]">
                  {formatPrice(datas.creditorder_price)} <br />
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {datas.sale_ok && (
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-[110px] h-[30px] transition-all duration-300 ease-in-out "
              >
                <span className={type === 3 ? "blue-logo-btn" : "yellow-btn"}>
                  {" "}
                  <ShoppingCart /> Acheter
                </span>
              </button>
            )}
            {/* {datas.is_preorder && (
              <button
                type="button"
                onClick={handleAddToPreOrder}
                className="w-[150px] h-[30px]"
              >
                <span className={type === 3 ? "red-btn" : "yellow-btn"}>
                  <ShoppingBag className="m-1" /> Précommander
                </span>
              </button>
            )} */}
            {datas.is_creditorder && user && user.adhesion === "accepted" && parent && (
              <button
                type="button"
                onClick={handleAddToCreditOrder}
                className="w-[120px] h-[30px]"
              >
                <span className={type === 3 ? "vert-btn" : "yellow-btn"}>
                  <HeartHandshake className="m-1" />À crédit
                </span>
              </button>
            )}
            {/* {!datas.sale_ok || !datas.is_preorder && (
              <p className="text-red-500 font-semibold">Rupture de stock</p>
            )} */}
          </div>
        </div>
      </div>
      <div
        className={`quick-access-btns flex flex-col space-y-2 absolute top-4 transition-all duration-300 ease-in-out ${isHovered ? 'right-4' : '-right-10'
          }`}
      >
        <button
          onClick={(e) => handleDetails(e, datas)}
          className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          <Eye className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleAddToWishlist}
          className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
        >
          <Heart className={`w-5 h-5 ${isProductInWishlist(datas) ? 'text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
    </div>
  )
}
