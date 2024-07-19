/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import formatPrice from "../../utils/formatPrice";
import { Facebook, Flag, Heart, Linkedin, Twitter } from "lucide-react";
import { CartContext } from "../../contexts/CartContext ";
import { toast } from "react-toastify";

export default function ProductView({ produit, className, reportHandler }) {
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
    addToCart(produit, 1);
    console.log("Ajout au souhait :", cart);
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
    addToWishlist(produit, 1);
    console.log(wishlist);
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
    addToPreorder(produit, 1);
    console.log("Ajout au preorder :", preorder);
  };

  const imageProps = [
    "image_128",
    "image_256",
    "image_512",
    "image_1024",
    "image_1920",
  ];

  const [src, setSrc] = useState(produit[imageProps[0]]);
  console.log(src);
  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const [quantity, setQuantity] = useState(1);
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
                  : "https://readymadeui.com/images/coffee1.webp"
              }`}
              alt=""
              className="object-contain"
            />
            <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>-50%</span>
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

          {/* <div
            data-aos="fade-up"
            className="flex space-x-[10px] items-center mb-6"
          >
            <div className="flex">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span className="text-[13px] font-normal text-qblack">
              6 Reviews
            </span>
          </div> */}

          <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
            <span className="text-sm font-500 text-qgray line-through mt-2">
              {produit.standard_price != 0 && (
                <> {formatPrice(produit.standard_price)} </>
              )}
            </span>
            <span className="text-2xl font-500 text-qred">
              {" "}
              {formatPrice(produit.list_price)}
            </span>
          </div>

          <p
            data-aos="fade-up"
            className="text-qgray text-sm text-normal mb-[30px] leading-7"
          >
            {produit.description}
          </p>

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
                  onClick={decrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{quantity}</span>
                <button
                  onClick={increment}
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
              {produit.quantite_en_stock > 0 && (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="blue-logo-btn-detail"
                >
                  Commander
                </button>
              )}
              {produit.quanitty_virtuelle_disponible > 0 && (
                <button
                  type="button"
                  onClick={handleAddToPreOrder}
                  className="blue-logo-btn-detail "
                >
                  Pré comamnder
                </button>
              )}
            </div>
          </div>

          <div data-aos="fade-up" className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Categorie :</span>{" "}
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
        </div>
      </div>
    </div>
  );
}
