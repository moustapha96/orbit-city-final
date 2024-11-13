/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";

import { Link } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
// import Popup from "reactjs-popup";

import ProductCardStyleOnePrecommande from "../Helpers/Cards/ProductCardStyleOnePrecommande";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
export default function ProductPrecommandePage() {
  const {
    products,
    isLoadingProduct,
    searchContext,
    setSearchContext,
    productPrecommandeFilter,
    productPrecommande,
    setSelectedCategory,
  } = useContext(ProductContext);

  const [startLength, setStartLength] = useState(0);
  const [endLength, setEndLength] = useState(6);
  const [produits, setProduits] = useState([]);

  const [showBackButton, setShowBackButton] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLoadMore = () => {
    if (endLength < produits.length) {
      setEndLength(endLength + 8);
      setStartLength(Math.max(0, endLength));
      setShowBackButton(true);
    }
    if (endLength + 8 >= produits.length) {
      setShowLoadMoreButton(false);
    }
  };

  const handleLoadLess = () => {
    if (startLength > 0) {
      setEndLength(startLength);
      setStartLength(Math.max(0, startLength - 8));
      setShowLoadMoreButton(true);
    }
    if (startLength - 8 <= 0) {
      setShowBackButton(false);
    }
  };

  useEffect(() => {
    setProduits(productPrecommandeFilter);
    setSearchContext("");
    // setSelectedCategory("All");
  }, [productPrecommandeFilter]);

  useEffect(() => {
    const searchTerm = searchContext.toLowerCase();
    setSearch(searchTerm);
    const filteredProducts = productPrecommandeFilter.filter(
      (product) =>
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.categ_id &&
          product.categ_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setProduits(filteredProducts);
  }, [productPrecommandeFilter, searchContext]);

  const setAllProduct = () => {
    setSelectedCategory("All");
    setSearch("");
    setSearchContext("");
  };
  return (
    <>
      <SEOHeader
        title="CCBM Shop | Précommande "
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto justify-center">
            <BreadcrumbCom />

            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="flex-1">
                <div className="flex justify-center  ">
                  <p className="mb-2 text-center bg-bleu-logo text-base md:text-xl  font-700 leading-snug py-[6px] px-3 uppercase rounded-full tracking-wider text-white animate-up-down  animate-up-down">
                    50% de réduction en précommande &nbsp;
                    <Link
                      to="/faq"
                      className="text-qyellow underline hover:text-white transition-colors duration-300"
                    >
                      en savoir plus
                    </Link>
                  </p>
                </div>
                {isLoading ? (
                  <>
                    {" "}
                    <div className="flex justify-center">
                      <Loader2
                        size={100}
                        className="mr-2 h-4 text-center w-4 animate-spin"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                      <div>
                        <p className="font-400 text-[13px]">
                          <span className="text-qgray"> Affichage</span>{" "}
                          {Math.max(0, startLength + 1)}–
                          {Math.min(endLength, produits.length)} of{" "}
                          {produits.length} résultats
                        </p>
                      </div>
                      <div>
                        <input
                          type="search"
                          placeholder="Rechercher des produits"
                          value={search}
                          onChange={(e) => {
                            setSearchContext(e.target.value);
                          }}
                          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-3 items-center">
                        <button
                          className=" hover:text-bleu-500"
                          onClick={setAllProduct}
                        >
                          Tout
                        </button>

                        {showBackButton && (
                          <div className="flex space-x-3 items-center border-b border-b-qgray">
                            <button
                              className=" hover:text-bleu-500"
                              onClick={handleLoadLess}
                            >
                              {" "}
                              Retour{" "}
                            </button>
                          </div>
                        )}
                        {showLoadMoreButton && (
                          <div className="flex space-x-3 items-center border-b border-b-qgray">
                            <button onClick={handleLoadMore} className="">
                              {" "}
                              charger plus{" "}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {isLoadingProduct ? (
                      <>
                        <div className="flex justify-center">
                          <div className="flex justify-center items-center ">
                            <Loader className="animate-spin"></Loader>{" "}
                            Chargement
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                          <DataIteration
                            datas={produits}
                            startLength={Math.max(0, startLength)}
                            endLength={Math.min(endLength, produits.length)}
                          >
                            {({ datas }) => (
                              <div data-aos="fade-up" key={datas.id}>
                                <ProductCardStyleOnePrecommande datas={datas} />
                              </div>
                            )}
                          </DataIteration>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-3 items-center">
                      {showBackButton && (
                        <div className="flex space-x-3 items-center border-b border-b-qgray">
                          <button
                            className=" hover:text-bleu-500"
                            onClick={handleLoadLess}
                          >
                            {" "}
                            Retour{" "}
                          </button>
                        </div>
                      )}
                      {showLoadMoreButton && (
                        <div className="flex space-x-3 items-center border-b border-b-qgray">
                          <button onClick={handleLoadMore} className="">
                            {" "}
                            charger plus{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
