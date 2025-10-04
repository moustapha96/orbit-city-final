/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

import { Check, Eye, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import formatPrice from "../../../utils/formatPrice";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { CartContext } from "../../../contexts/CartContext";
import NewsletterPopup from "../../Popup/NewsletterPopup";
import { useNewsletterPopup } from "../../../Hooks/useNewsletterPopup";
import { trackImageClick } from "../../../utils/tracking";
import useGoogleAnalytics from "../../../Hooks/useGoogleAnalytics";
import { Badge } from "flowbite-react";



export default function ProductCardStyleOne({ datas, type = 3 }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    addToPreorder,
    preorder,
    isProductInWishlist,
    addToCreditOrder
  } = useContext(CartContext);
  const { trackEvent, trackPageView } = useGoogleAnalytics();

  const { showPopup, handleClosePopup } = useNewsletterPopup();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { user } = useAuthContext();

  const handleAddToCreditOrder = (e) => {
    e.preventDefault();
    addToCreditOrder(datas, 1);
    setIsPopupVisible(true);
    console.log("Ajout au preorder :", preorder);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  }


  const handleSubscribe = (email) => {
    console.log(`Subscribed with email: ${email}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(datas, 1);
    setIsPopupVisible(true);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(datas, 1);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };


  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    setIsPopupVisible(true);
    addToPreorder(datas, 1);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
    });
  };



  const handleDetails = (e, produit) => {
    e.preventDefault();
    console.log(produit);
    navigate("/produits/" + produit.id + "/details", {
      state: { produit },
    });
    trackImageClick(produit.name);
    trackEvent('Image', 'image_produit', produit.name, 1);
  };

  return (
    <>

      <div
        className="product-card-one w-full h-full bg-white relative group overflow-hidden"
        style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
      >
        {/* Image du produit - hauteur réduite sur mobile */}
        <div
          className="product-card-img w-full h-[200px] sm:h-[300px] cursor-pointer"
          style={{
            // background: `url('data:image/png;base64,${datas.image_256}') no-repeat center`,
            background: `${datas.image_256 ? `url('data:image/png;base64,${datas.image_256}')` : 'https://www.ccbmshop.sn/logo.png'}`,
            backgroundSize: "contain",
          }}
          onClick={(e) => handleDetails(e, datas)}
        >
          {/* Badges promo et catégorie */}
          <div className="absolute left-0 right-0 flex justify-between">
            {datas.en_promo && (
              <div className="product-type absolute left-[14px] top-[17px]">
                <span
                  className="text-[8px] font-bold leading-none py-[5px] px-2 uppercase text-white 
                      rounded-full tracking-wider bg-bleu-logo"
                >
                  En promo
                </span>
              </div>
            )}

            {/* {datas.categ_id && (
              <div className="product-type absolute right-[14px] top-[17px]">
                <span
                  className="text-[8px] font-bold leading-none py-[5px] px-2 uppercase text-white 
                      rounded-full tracking-wider bg-qyellow"
                >
                  {datas.categ_id}
                </span>
              </div>
            )} */}
            {datas.categ_id && (
              <div className="product-type absolute right-[14px] top-[17px] hidden sm:block">
                <span
                  className="text-[8px] font-bold leading-none py-[5px] px-2 uppercase text-white 
                      rounded-full tracking-wider bg-qyellow"
                >
                  {datas.categ_id}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Détails du produit - padding réduit sur mobile */}
        <div className="product-card-details px-[15px] sm:px-[30px] pb-[15px] sm:pb-[30px] relative">
          {datas.categ_id && (
            <div className="block sm:hidden mb-1">
              <span className="text-[7px] font-medium py-1 px-2 bg-yellow-500 text-white rounded-md">
                {datas.categ_id}
              </span>
            </div>
          )}
          {/* <Link
            to={`/produits/${datas.id}/details`}
          >
            <p className="title mb-2 text-[13px] sm:text-[15px] font-600 text-qblack leading-[20px] sm:leading-[24px] line-clamp-2 hover:text-bleu-logo">
              {datas.name}
            </p>
          </Link> */}

          <Link to={`/produits/${datas.id}/details`}>
            <p className="title mb-2 text-[11px] sm:text-[14px] font-600 text-qblack leading-[16px] sm:leading-[24px] line-clamp-2 hover:text-bleu-logo">
              {datas.name}
            </p>
          </Link>

          <p className="price">
            {/* Prix barré - affiché uniquement si le prix de crédit est supérieur à 0 */}
            {datas.creditorder_price > 0 && datas.is_creditorder && (
              <span className="offer-price line-through text-qred font-600 text-[14px] sm:text-[16px]">
                {formatPrice(datas.creditorder_price)}
              </span>
            )}
            {/* <span className="offer-price line-through text-qred font-600 text-[14px] sm:text-[16px]">
              {datas.creditorder_price > 0 && <>{formatPrice(datas.creditorder_price)}</>}
            </span> */}
            <br />
            {datas.en_promo ? <>
              {datas.promo_price > 0 && <>
                <span className="offer-price text-bleu-logo font-600 text-[14px] sm:text-[16px]">
                  {formatPrice(datas.promo_price)}
                </span>
              </>}
            </> : <>
              {datas.list_price > 0 && <>
                <span className="offer-price text-bleu-logo font-600 text-[14px] sm:text-[16px]">
                  {formatPrice(datas.list_price)}
                </span>
              </>}
            </>}
          </p>

          {/* Boutons - hauteur et espacement réduits sur mobile */}
          <div className="w-full left-0 flex flex-col gap-2 mt-2 items-center">
            {/* Bouton Commander */}
            {datas.sale_ok && (

              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full h-12 flex items-center justify-center gap-2 text-[14px] font-medium ${type === 3 ? "blue-logo-btn" : "yellow-btn"
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Commander</span>
              </button>
            )}

            {/* Bouton Crédit */}
            {user && user.adhesion === "accepted" && datas.is_creditorder && (


              <button
                type="button"
                onClick={handleAddToCreditOrder}
                className="w-full h-12 flex items-center justify-center gap-2 text-[14px] font-medium vert-btn"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>À crédit</span>
              </button>
            )}
          </div>
        </div>

        {/* quick-access-btns */}
        <div className="quick-access-btns flex flex-col space-y-1 sm:space-y-2 absolute group-hover:right-2 sm:group-hover:right-4 -right-10 top-20 transition-all duration-300 ease-in-out">
          {/* Catégorie visible uniquement sur mobile */}

          {/* Bouton détails */}
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-primarygray rounded">
            <div className="flex gap-1">
              <Link
                to={`/produits/${datas.id}/details`}
                className="cursor-pointer hover:text-gray-500 hover:scale-150 duration-300"
              >
                <Eye />
              </Link>
            </div>
          </span>

          {/* Bouton favoris */}
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-primarygray rounded">
            <Heart
              className={`${isProductInWishlist(datas) ? "text-yellow-500" : ""} cursor-pointer hover:text-yellow-500 hover:scale-150 duration-300`}
              onClick={handleAddToWishlist}
            />
          </span>

          {/* Tags */}
          {datas.tags && datas.tags.length > 0 && (
            <span className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded">
              <div className="flex gap-1">
                {datas.tags.map((tag) => (
                  <Badge icon={Check} key={tag.id} variant="success">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </span>
          )}
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
