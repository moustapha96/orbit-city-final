
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';
import formatPrice from "../../utils/formatPrice";
import { CartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { useAuthContext } from "../../contexts/useAuthContext";
import { useNavigation } from "react-router-dom";
import { Badge } from "flowbite-react";

export default function ProductView({ produit, className }) {
  const navigate = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const {
    addToCart,
    addToWishlist,
    addToPreorder,
    isProductInWishlist,
    addToCreditOrder
  } = useContext(CartContext);
  const { user } = useAuthContext();
  console.log(user)
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(produit, quantity);
    toast.success("Produit ajouté au panier", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(produit, quantity);
    toast.success("Produit ajouté aux favoris", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    addToPreorder(produit, quantity);
    toast.success("Produit ajouté en précommande", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleAddToCreditOrder = (e) => {
    e.preventDefault();
    addToCreditOrder(produit, quantity);
    toast.success("Produit ajouté au panier crédit", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (produit == null) {
      navigate('/boutique')
    }
    setSrc(produit[imageProps[0]]);
  }, [produit]);


  const imageProps = [
    "image_512",
    "image_1",
    "image_2",
    "image_3",
    "image_4",
  ];

  const [src, setSrc] = useState(produit[imageProps[0]]);

  const changeImgHandler = (current) => {
    setSrc(current);
  };

  return (
    <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">

            {src && (
              <img
                src={`${src
                  ? "data:image/png;base64," + src
                  : "https://cdn-icons-png.flaticon.com/512/130/130288.png"
                  }`}
                alt={`${produit.name} CCBM shop`}
                className="w-2/3 h-2/3 max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            )}

            <div className="absolute top-4 left-0 right-0 flex flex-wrap items-center justify-between px-2">
              <div className="flex space-x-1">
                {produit.tags && produit.tags.length > 0 &&
                  produit.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="px-2 py-0.5 rounded-full bg-qyellow text-qblack text-xs font-medium shadow-sm"
                    >
                      <span>{tag.name}</span>
                    </div>
                  ))}

                <div className="px-2 py-0.5 rounded-full bg-qyellow text-qblack text-xs font-medium shadow-sm">
                  <span>{produit.categ_id}</span>
                </div>
              </div>

              {produit.en_promo && (
                <div className="px-2 py-0.5 rounded-full bg-bleu-logo text-white text-xs font-medium shadow-sm">
                  <span>🔥 Promo</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            {imageProps &&
              imageProps.length > 0 &&
              imageProps.map((img) => <>

                {produit[img] && <>
                  <div
                    onClick={() => changeImgHandler(produit[img])}
                    key={img}
                    className={`w-[90px] h-[90px] p-[10px] border border-qgray-border cursor-pointer transition-transform duration-300 hover:scale-110 ${src === produit[img] ? "ring-2 ring-bleu-logo" : ""
                      }`}
                  >
                    {produit[img] && (
                      <img
                        src={`data:image/png;base64,${produit[img]}`}
                        alt={`${produit.name} CCBM shop`}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </>}


              </>)}
          </div>


        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block">
            Produit
          </span>
          <p className="text-xl font-medium text-qblack mb-4">{produit.name}</p>

          {/* Updated price display */}
          <div className="flex flex-wrap items-end gap-4 mb-1">
            <span className=" line-through text-qred text-2xl font-medium">
              {produit.creditorder_price > 0 && produit.is_creditorder && <>{formatPrice(produit.creditorder_price)}</>}
            </span>
            <br />
            {produit.en_promo ? <>
              {produit.promo_price > 0 && <>
                <span className="text-2xl font-medium text-bleu-logo">
                  {formatPrice(produit.promo_price)}
                </span>
              </>}

            </> : <>
              {produit.list_price > 0 && <>
                <span className="text-2xl font-medium text-bleu-logo">
                  {formatPrice(produit.list_price)}
                </span>
              </>}

            </>}

          </div>

          {/* Updated quantity and buttons section */}
          <div className="quantity-card-wrapper w-full flex flex-wrap items-center gap-4 mb-[30px]">
            <div className="flex items-center space-x-2">
              <div className="w-32 h-12 px-4 flex items-center justify-between border border-qgray-border rounded">
                <button onClick={handleDecrement} type="button" className="text-xl text-qgray">-</button>
                <span className="text-qblack text-lg">{quantity}</span>
                <button onClick={handleIncrement} type="button" className="text-xl text-qgray">+</button>
              </div>
              <button
                onClick={handleAddToWishlist}
                className="w-12 h-12 flex justify-center items-center border border-qgray-border rounded hover:bg-gray-100 transition-colors duration-200"
              >
                <Heart className={`${isProductInWishlist(produit) ? "fill-yellow-500 text-yellow-500" : "text-qgray"} w-6 h-6`} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {produit.sale_ok && produit.list_price > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[140px] h-12 px-4 bg-bleu-logo text-white rounded-md hover:bg-bleu-claire transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span>Commander</span>
                </button>
              )}
              {produit.is_preorder && produit.preorder_price > 0 && (
                <button
                  onClick={handleAddToPreOrder}
                  className="flex-1 min-w-[140px] h-12 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span>Précommander</span>
                </button>
              )}
              {user && user.adhesion == "accepted" && produit.is_creditorder && produit.creditorder_price > 0 && (
                <button
                  onClick={handleAddToCreditOrder}
                  className="flex-1 min-w-[140px] h-12 px-4 bg-vert text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span>Acheter à crédit</span>
                </button>
              )}
            </div>
          </div>

          <div className="mb-[5px]">
            <p className="text-[14px] text-qgray leading-7">
              <span className="text-qblack">Catégorie :</span> {produit.categ_id}
            </p>
          </div>


          {produit.tags && produit.tags.length > 0 && <>
            <div className="flex gap-1">
              <p className="text-[14px] text-qblack">Tags :</p>
              {produit.tags &&
                produit.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
            </div>
          </>}

          <div
            data-aos="fade-up"
            className="social-share flex gap-3 items-center w-full mt-[5px]"
          >
            <span className="text-qblack text-[13px] mr-[17px] inline-block">
              Partager
            </span>

            <div className="flex space-x-5 items-center">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                    fill="#3E75B2"
                  />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Découvrez ce produit: ${produit.name} ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                    fill="#25D366"
                  />
                </svg>
              </a>

              {/* Twitter/X */}

            </div>


            {/* Bouton Copier */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Lien copié !", {
                  position: "top-center",
                  autoClose: 2000,
                });
              }}
              title="Copier le lien"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
                  stroke="#666666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85953 1.72386 9.60948C1.47381 9.35943 1.33334 9.02029 1.33334 8.66667V2.66667C1.33334 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33334 2.66667 1.33334H8.66667C9.02029 1.33334 9.35943 1.47381 9.60948 1.72386C9.85953 1.97391 10 2.31305 10 2.66667V3.33334"
                  stroke="#666666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

          </div>





          <div className="text-qblack text-[14px] social-share flex items-center w-full mt-3">
            <h2>Description</h2>
          </div>

          <div className="social-share flex items-center w-full">
            <p className="text-qgray  text-sm text-normal mb-[30px] leading-7">
              {produit.description && (
                <div className=" text-justify text-[13px]"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(produit.description),
                  }}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

