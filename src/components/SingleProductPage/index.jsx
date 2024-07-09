/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import data from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import InputCom from "../Helpers/InputCom";
import Layout from "../Partials/Layout";
import ProductView from "./ProductView";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";
import { useLocation, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext ";
import ProduitService from "../../services/produitService";

export default function SingleProductPage() {
  const location = useLocation();
  const produit = location.state.produit;
  const {
    wishList,
    addToCart,
    addToWishlist,
    cart,
    addToPreorder,
    preorder,
    isProductInWishlist,
  } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(produit, quantity);
    console.log("Ajout au souhait :", cart);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(produit, quantity);
    console.log("Ajout au souhait :", wishList);
  };

  const handleAddToPreOrder = (e) => {
    e.preventDefault();
    addToPreorder(produit, 1);
    console.log("Ajout au preorder :", preorder);
  };

  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);

  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full ">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full ">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "single product", path: "/single-product" },
                  ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView
                  produit={produit}
                  quantity={quantity}
                  reportHandler={() => setReport(!report)}
                />
              </div>
            </div>
          </div>

          <div
            className="product-des-wrapper w-full relative pb-[60px]"
            ref={reviewElement}
          >
            <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
              <div className="container-x mx-auto">
                <ul className="flex space-x-12 ">
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Description
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("info")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "info"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Seller Info
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>
            <div className="tab-contents w-full min-h-[400px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Introduction
                    </h6>
                    <p className="text-[15px] text-qgray text-normal mb-10">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries but also the on leap into electronic
                      typesetting, remaining essentially unchanged. It wasn’t
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, andei more
                      recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum to make a type
                      specimen book.
                    </p>
                    <div>
                      <h6 className="text-[18px] text-medium mb-4">
                        Features :
                      </h6>
                      <ul className="list-disc ml-[15px]">
                        <li className="font-normal text-qgray leading-9">
                          slim body with metal cover
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          latest Intel Core i5-1135G7 import.metaor (4 cores / 8
                          threads)
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          8GB DDR4 RAM and fast 512GB PCIe SSD
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit
                          keyboard, touchpad with gesture support
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {tab === "info" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <SallerInfo products={data.products.slice(0, 8)} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                  Produits Relatés
                </h1>
                <div
                  data-aos="fade-up"
                  className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                >
                  <DataIteration
                    datas={data.products}
                    startLength={5}
                    endLength={9}
                  >
                    {({ datas }) => (
                      <div key={datas.id} className="item">
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
