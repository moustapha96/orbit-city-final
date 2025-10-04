

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
import NewsletterPopup from "../../Popup/NewsletterPopup";
import { useNewsletterPopup } from "../../../Hooks/useNewsletterPopup";
import { trackImageClick } from "../../../utils/tracking";

export default function ProductCardRowStyleTwo({ className, datas, type = 3 }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    addToCreditOrder,
    addToPreorder,
    isProductInWishlist,
  } = useContext(CartContext);
  const { user, parent } = useAuthContext();
  const [isHovered, setIsHovered] = useState(false);
  const { showPopup, handleClosePopup } = useNewsletterPopup();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(datas, 1);
    setIsPopupVisible(true);
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 });
  };

  const handleSubscribe = (email) => {
    console.log(`Subscribed with email: ${email}`);
  };

  const handleAddToCreditOrder = (e) => {
    e.preventDefault();
    console.log(e, datas);
    addToCreditOrder(datas, 1);
    setIsPopupVisible(true);
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(datas, 1);
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 });
  };

  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    addToPreorder(datas, 1);
    toast.success("Produit ajouté", { position: "top-center", autoClose: 1000 });
  };

  const handleDetails = (e, produit) => {
    e.preventDefault();
    navigate("/produits/" + produit.id + "/details", {
      state: { produit },
    });
  };

  return (
    <>
      <div
        className={`product-row-card-style-one w-full bg-white group relative overflow-hidden p-2 md:p-4 ${className || ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row items-center w-full h-full">

          {datas.en_promo && (
            <div className="product-type absolute left-2 top-2">
              <span
                className="text-[10px] font-bold leading-none py-0.5 px-1 uppercase text-white
                 rounded-full tracking-wider bg-bleu-logo"
              >
                En promo
              </span>
            </div>
          )}


          <div className="w-full md:w-1/3 h-24 md:h-32 mb-2 md:mb-0">
            <Link to={`/produits/${datas.id}/details`} >
              {datas.image_256 && (
                <img
                  src={`data:image/png;base64,${datas.image_256}`}
                  alt={`${datas.name} CCBM Shop`}
                  className="w-full h-full object-contain"
                />
              )}
            </Link>
          </div>
          <div className="flex-1 flex flex-col justify-center h-full md:pl-4">
            <div className="mb-1">
              <p className="title mb-1 text-xs md:text-sm font-600 text-qblack leading-tight line-clamp-2 hover:text-bleu-logo">
                <Link to={`/produits/${datas.id}/details`}>{datas.name}</Link>
              </p>

              <p className="price mb-2">
                <span className="offer-price line-through text-qred font-600 text-xs md:text-sm">
                  {datas.creditorder_price > 0 && datas.is_creditorder && <>{formatPrice(datas.creditorder_price)}</>}
                </span>
                <br />

                {datas.en_promo && datas.promo_price > 0 ? (
                  <span className="offer-price text-bleu-logo font-600 text-xs md:text-sm">
                    {formatPrice(datas.promo_price)}
                  </span>
                ) : <>
                  {datas.list_price > 0 && <>
                    <span className="offer-price text-bleu-logo font-600 text-xs md:text-sm">
                      {formatPrice(datas.list_price)}
                    </span>
                  </>}

                </>}

              </p>


            </div>

            <div className="flex flex-wrap justify-between gap-1 md:gap-2">
              {(datas.sale_ok && datas.list_price > 0) && (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-[30px] h-[30px] md:w-[90px] md:h-[25px] transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <span className={type === 3 ? "blue-logo-btn-small" : "yellow-btn-small"}>
                    <ShoppingCart className="w-4 h-4 block md:hidden" /> {/* Icône réduite en mobile */}
                    <span className="hidden md:inline">Commander</span>
                  </span>
                </button>
              )}


              {/* {datas.is_preorder && datas.preorder_price > 0 && (
                <button
                  type="button"
                  onClick={handleAddToPreOrder}
                  className="w-[30px] h-[30px] md:w-[120px] md:h-[25px] flex items-center justify-center"
                >
                  <span className={type === 3 ? "red-btn-small" : "yellow-btn-small"}>
                    <ShoppingBag className="w-4 h-4 block md:hidden" />
                    <span className="hidden md:inline">Précommander</span>
                  </span>
                </button>
              )} */}

              {datas.is_creditorder && datas.creditorder_price > 0 && user && user.adhesion === "accepted" && parent && (
                <button
                  type="button"
                  onClick={handleAddToCreditOrder}
                  className="w-[30px] h-[30px] md:w-[100px] md:h-[25px] flex items-center justify-center"
                >
                  <span className={type === 3 ? "vert-btn-small" : "yellow-btn-small"}>
                    <HeartHandshake className="w-4 h-4 block md:hidden" /> {/* Icône réduite en mobile */}
                    <span className="hidden md:inline">A Crédit</span>
                  </span>
                </button>
              )}
            </div>


          </div>
        </div>
        <div
          className={`quick-access-btns flex flex-col space-y-2 absolute top-4 transition-all duration-300 ease-in-out ${isHovered ? 'right-4' : '-right-10'
            }`}
        >
          <button
            onClick={(e) => handleDetails(e, datas)}
            className="w-7 h-7 md:w-10 md:h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
          >
            <Eye className="w-3 h-3 md:w-5 md:h-5 text-gray-600" />
          </button>
          <button
            onClick={handleAddToWishlist}
            className="w-7 h-7 md:w-10 md:h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
          >
            <Heart className={`w-3 h-3 md:w-5 md:h-5 ${isProductInWishlist(datas) ? 'text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {isPopupVisible && !user && (
        <NewsletterPopup
          onClose={handleClosePopup}
          onSubscribe={handleSubscribe}
          isVisible={showPopup}
        />
      )}
    </>
  );
}
