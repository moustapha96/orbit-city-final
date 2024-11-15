/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

import { Eye, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { CartContext } from "../../../contexts/CartContext";
import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import { toast } from "react-toastify";

export default function ProductCardStyleOne({ datas, type = 3 }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    wishlist,
    cart,
    addToPreorder,
    preorder,
    isProductInWishlist,
  } = useContext(CartContext);
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(datas, 1);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(datas, 1);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    addToPreorder(datas, 1);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDetails = (e, produit) => {
    e.preventDefault();
    navigate("/single-product/" + produit.id, {
      state: { produit },
    });
  };

  return (
    <div
      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div
        className="product-card-img w-full h-[300px]"
        style={{
          background: `url('data:image/png;base64,${datas.image_256}') no-repeat center`,
          // backgroundSize: "cover",
        }}
      >
        {datas.categ_id && (
          <div className="product-type absolute right-[14px] top-[17px]">
            <span
              className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${datas.categ_id === "popular" ? "bg-[#19CC40]" : "bg-qyellow"
                }`}
            >
              {datas.categ_id}
            </span>
          </div>
        )}

      </div>

      <div className="product-card-details px-[30px] pb-[30px] relative">
        <Link onClick={(e) => handleDetails(e, datas)}>
          <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-bleu-logo">
            {datas.name}
          </p>
        </Link>
        <p className="price">
          <span className="offer-price text-bleu-logo   font-600 text-[18px] ">
            {formatPrice(datas.list_price)}
          </span>
          <span className="main-price text-qred font-500 text-[16px]">
            {datas.is_preorder ? (
              <>
                {" "}
                <br /> {formatPrice(datas.preorder_price)} <br /> en précommande
              </>
            ) : (
              <>
                <p className="h-12"></p>
              </>
            )}
          </span>
        </p>

        <div className="w-full left-0 flex flex-col gap-4 mt-3 items-center">
          {datas.sale_ok && datas.quantite_en_stock > 0 && (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full h-10 flex items-center justify-center gap-2 ${type === 3 ? "blue-logo-btn" : "yellow-btn"
                }`}
            >
              <ShoppingCart />
              <span>Ajouter au panier</span>
            </button>
          )}
          {datas.is_preorder && (
            <button
              type="button"
              onClick={handleAddToPreOrder}
              className={`w-full h-10 flex items-center justify-center gap-2  red-btn  `}
            >
              <span>
                <ShoppingBag></ShoppingBag>
              </span>
              <span>Pré commander</span>
            </button>
          )}

          {datas.quantite_en_stock == 0 && !datas.is_preorder && (
            <>
              <p className="text-red-400 w-full  flex items-center justify-center ">
                Rupture de stock{" "}
              </p>
            </>
          )}
        </div>

        {/* <div className="w-full flex flex-col gap-4 mt-3 items-center">
          {isInStock && (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-auto h-${
                10 * buttonCount
              } flex items-center justify-center gap-2 ${
                type === 3 ? "blue-logo-btn" : "yellow-btn"
              }`}
            >
              <ShoppingCart />
              <span>Ajouter au panier</span>
            </button>
          )}
          {isPreorderAvailable && (
            <button
              type="button"
              onClick={handleAddToPreOrder}
              className={`w-auto h-${
                10 * buttonCount
              } flex items-center justify-center gap-2 ${
                type === 3 ? "blue-logo-btn" : "yellow-btn"
              }`}
            >
              <ShoppingBag />
              <span>Pré commander</span>
            </button>
          )}
          {isOutOfStock && <p className="text-red-400">Rupture de stock</p>}
        </div> */}
      </div>

      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
        <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
          <Link
            onClick={(e) => handleDetails(e, datas)}
            className="cursor-pointer hover:text-gray-500 hover:scale-150 duration-300"
          >
            <Eye />
          </Link>
        </span>

        <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
          <Heart
            className={`${isProductInWishlist(datas) ? "text-yellow-500" : ""
              } cursor-pointer hover:text-yellow-500 hover:scale-150 duration-300`}
            onClick={handleAddToWishlist}
          />
        </span>

        {/* <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
          <Compair />
        </span> */}
      </div>
    </div>
  );
}
