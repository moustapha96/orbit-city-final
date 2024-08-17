/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";

import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";

import Layout from "../Partials/Layout";
import ProductView from "./ProductView";

import { useLocation, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import { ProductContext } from "../../contexts/ProductContext";
export default function SingleProductPage() {
  const [produits, setProduits] = useState([]);
  const { products } = useContext(ProductContext);
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
  useEffect(() => {
    const filteredProducts = products.filter(
      (pro) => pro.categ_id === produit.categ_id
    );
    setProduits(filteredProducts);
  }, []);
  const [quantity, setQuantity] = useState(1);

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
                    { name: "Accueil", path: "/" },
                    { name: "Page Détails", path: "/single-product" },
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
                    datas={produits}
                    startLength={0}
                    endLength={produits.length > 4 ? 4 : produits.length}
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
