/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
import formatPrice from "../../../utils/formatPrice";
import { CartContext } from "../../../contexts/CartContext";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductCardRowStyleTwo({ className, datas, type = 3 }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
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
      autoClose: 1000,
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
      autoClose: 1000,
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
      autoClose: 1000,
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
      data-aos="fade-left"
      className={`product-row-card-style-one w-full h-[250px] bg-white group relative overflow-hidden ${
        className || ""
      }`}
    >
      <div className="flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2">
        <div className="lg:w-1/2 w-1/3 h-full">
          <img
            src={`${
              datas.image_1920
                ? "data:image/png;base64," + datas.image_1920
                : "https://readymadeui.com/images/coffee1.webp"
            }`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center h-full">
          <div>
            {/* reviews */}
            <div className="flex space-x-1 mb-3">
              {Array.from(Array(datas.review), () => (
                <span key={datas.review + Math.random()}>
                  <Star />
                </span>
              ))}
            </div>
            <Link onClick={(e) => handleDetails(e, datas)}>
              <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                {datas.name}
              </p>
            </Link>
            <p className="price mb-[26px]">
              <span className="offer-price   text-bleu-logo font-600 sm:text-[14px] text-base ">
                {formatPrice(datas.list_price)}
              </span>
              {datas.is_preorder && (
                <>
                  <br />
                  <span className="main-price text-qred font-500 text-[14px] ">
                    {formatPrice(datas.preorder_price)} <br /> En précommande
                  </span>
                  <br />
                </>
              )}
            </p>
            <div className="flex justify-between gap-2 md:gap-2">
              {datas.quantite_en_stock > 0 && (
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

              {datas.is_preorder && (
                <button
                  type="button"
                  onClick={handleAddToPreOrder}
                  className="w-[120px] h-[30px]"
                >
                  <span className={type === 3 ? "red-btn" : "yellow-btn"}>
                    {" "}
                    Pré commander
                  </span>
                </button>
              )}
              {datas.sale_ok &&
                datas.quantite_en_stock == 0 &&
                !datas.is_preorder && (
                  <>
                    <p className="text-red-400">Rupture de stock </p>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
        <Link>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            {/* <QuickViewIco /> */}
            <Link
              onClick={(e) => handleDetails(e, datas)}
              className="cursor-pointer hover:text-gray-500 hover:scale-150 duration-300"
            >
              <Eye />
            </Link>
          </span>
        </Link>
        <Link>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            {/* <ThinLove /> */}
            <Heart
              className={`${
                isProductInWishlist(datas) ? "text-yellow-500" : ""
              } cursor-pointer hover:text-yellow-500 hover:scale-150 duration-300`}
              onClick={handleAddToWishlist}
            />
          </span>
        </Link>
        {/* <Link>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </Link> */}
      </div>
    </div>
  );
}
