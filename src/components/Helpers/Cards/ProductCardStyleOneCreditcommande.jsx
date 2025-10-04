/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

import { Eye, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { CartContext } from "../../../contexts/CartContext";
import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import { toast } from "react-toastify";

export default function ProductCardStyleOneCreditcommande({ datas, type = 3 }) {
  // console.log(datas);

  const navigate = useNavigate();
  const {
    addToCart,
    addToCreditOrder,
    addToWishlist,
    wishlist,
    cart,
    creditOrder,
    addToPreorder,
    preorder,
    isProductInWishlist,
  } = useContext(CartContext);
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(datas, 1);
    console.log("Ajout au souhait :", cart);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(datas, 1);
    console.log(wishlist);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    addToPreorder(datas, 1);
    console.log("Ajout au panier crédit :", creditOrder);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToCreditOrder = (e) => {
    e.preventDefault();
    addToCreditOrder(datas, 1);
    console.log("Ajout au preorder :", preorder);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  }

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
          {/* <span className="offer-price text-bleu-logo  font-600 text-[18px] ">
            {formatPrice(datas.list_price)}
          </span> */}

          <span className="offer-price text-vert font-600 text-[18px] ">
            {datas.is_creditorder && (
              <>
                {" "}
                <br /> {formatPrice(datas.creditorder_price)} <br />
              </>
            )}
          </span>

          {/* <span className="main-price  text-vert font-500 text-[16px]">
            {datas.is_creditorder && (
              <>
                {" "}
                <br /> {formatPrice(datas.creditorder_price)} <br />
              </>
            )}
          </span> */}

        </p>

        <div className="w-full left-0 flex flex-col gap-4 mt-3 items-center">
          {/* {datas.sale_ok && (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full h-20 flex items-center justify-center gap-2 ${type === 3 ? "blue-logo-btn" : "yellow-btn"
                }`}
            >
              <ShoppingCart />
              <span>Commander</span>
            </button>
          )} */}

          {datas.is_creditorder && (
            <button
              type="button"
              onClick={handleAddToCreditOrder}
              className={`w-full h-20 flex items-center justify-center gap-2 vert-btn `}
            >
              <span>
                <ShoppingBag></ShoppingBag>
              </span>
              <span>À crédit</span>
            </button>
          )}

          {/* {!datas.sale_ok && !datas.is_preorder && (
            <>
              <p className="text-red-400">Rupture de stock </p>
            </>
          )} */}

        </div>
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
