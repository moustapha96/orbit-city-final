/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import formatPrice from "../../utils/formatPrice";
import { Facebook, Flag, Heart, Linkedin, Twitter } from "lucide-react";
import { CartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
export default function ProductView({ produit, className, reportHandler }) {
  const [quantity, setQuantity] = useState(1);

  console.log(produit);
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
    addToCart(produit, quantity);
    toast.success("Produit ajouté au panier", {
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
    addToWishlist(produit, quantity);
    toast.success("Produit ajouté au souhait", {
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
    addToPreorder(produit, quantity);
    toast.success("Produit ajouté au panier précommande", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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

  const imageProps = [
    "image_128",
    "image_256",
    "image_512",
    "image_1024",
    "image_1920",
  ];

  const [src, setSrc] = useState(produit[imageProps[0]]);

  const changeImgHandler = (current) => {
    setSrc(current);
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`product-view w-full lg:flex justify-between ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img
              src={`${
                produit.image_1920
                  ? "data:image/png;base64," + produit.image_1920
                  : "https://cdn-icons-png.flaticon.com/512/130/130288.png"
              }`}
              alt=""
              className="object-contain"
            />
            <div className="w-[150px] h-[40px] rounded-full bg-qyellow text-qblack flex justify-center items-center font-medium absolute left-[30px] top-[30px]">
              {/* <span>-50%</span> */}
              <span>{produit.categ_id}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {imageProps &&
              imageProps.length > 0 &&
              imageProps.map((img) => (
                <div
                  onClick={() => changeImgHandler(produit[img])}
                  key={img}
                  className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                >
                  <img
                    src={`${"data:image/png;base64," + produit[img]}`}
                    alt=""
                    className={`w-full h-full object-contain ${
                      src !== produit[img] ? "opacity-50" : ""
                    } `}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span
            data-aos="fade-up"
            className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
          >
            Produit
          </span>
          <p
            data-aos="fade-up"
            className="text-xl font-medium text-qblack mb-4"
          >
            {produit.name}
          </p>

          <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
            {/* <span className="text-sm font-500 text-qgray line-through mt-2">
              {produit.standard_price != 0 && (
                <> {formatPrice(produit.standard_price)} </>
              )}
            </span> */}

            <span className="text-2xl font-500 text-qred">
              {" "}
              {formatPrice(produit.list_price)}
            </span>
            {produit.is_preorder && (
              <>
                <span className="text-2xl font-500 text-bleu-logo ">
                  ( {formatPrice(produit.preorder_price)} )
                </span>
                <br />
              </>
            )}
          </div>

          {/* <div data-aos="fade-up" className="colors mb-[30px]">
            <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">
              COLOR
            </span>

            <div className="flex space-x-4 items-center">
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img) => (
                  <div key={img.id}>
                    {img.color && img.color !== "" && (
                      <button
                        onClick={() => changeImgHandler(img.src)}
                        type="button"
                        style={{ "--tw-ring-color": `${img.color}` }}
                        className="w-[20px] h-[20px]  rounded-full focus:ring-2  ring-offset-2 flex justify-center items-center"
                      >
                        <span
                          style={{ background: `${img.color}` }}
                          className="w-[20px] h-[20px] block rounded-full border"
                        ></span>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div> */}

          {/* <div data-aos="fade-up" className="product-size mb-[30px]">
            <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">
              SIZE
            </span>
            <div className="w-full">
              <div className=" border border-qgray-border h-[50px] flex justify-between items-center px-6 cursor-pointer">
                <Selectbox
                  className="w-full"
                  datas={["Small", "Medium", "Large", "Extra Large"]}
                >
                  {({ item }) => (
                    <>
                      <div>
                        <span className="text-[13px] text-qblack">{item}</span>
                      </div>
                      <div className="flex space-x-10 items-center">
                        <span className="text-[13px] text-qblack">
                          3”W x 3”D x 7”H
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
                    </>
                  )}
                </Selectbox>
              </div>
            </div>
          </div> */}

          <div
            data-aos="fade-up"
            className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
          >
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={handleDecrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
              <button type="button">
                <span>
                  <Heart
                    className={`${
                      isProductInWishlist(produit) ? "text-yellow-500" : ""
                    } cursor-pointer hover:text-yellow-500  hover:scale-150 duration-300`}
                    onClick={handleAddToWishlist}
                  />
                </span>
              </button>
            </div>
            <div className="flex-1 flex gap-2 h-full">
              {produit.quantite_en_stock > 0 && produit.sale_ok && (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="blue-logo-btn-detail"
                >
                  Commander
                </button>
              )}
              {produit.is_preorder && produit.sale_ok && (
                <button
                  type="button"
                  onClick={handleAddToPreOrder}
                  className="blue-logo-btn-detail "
                >
                  Pré comamnder
                </button>
              )}
              {produit.quantite_en_stock == 0 && !produit.is_preorder && (
                <>
                  <p className="text-red-400">Rupture de stock </p>
                </>
              )}
            </div>
          </div>

          <div data-aos="fade-up" className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Catégorie :</span>{" "}
              {produit.categ_id}
            </p>
            {/* <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Tags :</span> Beer, Foamer
            </p> */}
            {/* <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">SKU:</span> KE-91039
            </p> */}
          </div>

          {/* <div
            data-aos="fade-up"
            className="flex space-x-2 items-center mb-[20px]"
          >
            <span>
              <Flag></Flag>
            </span>

            <button
              type="button"
              onClick={reportHandler}
              className="text-qred font-semibold text-[13px]"
            >
              Report This Item
            </button>
          </div> */}

          <div
            data-aos="fade-up"
            className="social-share flex  items-center w-full"
          >
            <span className="text-qblack text-[13px] mr-[17px] inline-block">
              Partagez ceci
            </span>

            <div className="flex space-x-5 items-center">
              <span>
                <Facebook></Facebook>
              </span>
              <span>
                <Twitter></Twitter>
              </span>
              <span>
                <Linkedin></Linkedin>
              </span>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="social-share flex items-center w-full  mt-3"
          >
            <h2>Description </h2>
          </div>

          <div
            data-aos="fade-up"
            className="social-share flex items-center w-full"
          >
            <p
              data-aos="fade-up"
              className="text-qgray text-sm text-normal mb-[30px] leading-7"
            >
              {produit.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(produit.description),
                  }}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
