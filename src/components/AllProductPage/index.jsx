/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import { useLocation, useParams } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
export default function AllProductPage() {
  const [startLength, setStartLength] = useState(0);
  const [endLength, setEndLength] = useState(6);
  const [produits, setProduits] = useState([]);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const { products, isLoadingProduct, searchContext, setSearchContext } =
    useContext(ProductContext);

  const handleLoadMore = () => {
    if (endLength < products.length) {
      setEndLength(endLength + 8);
      setStartLength(Math.max(0, endLength));
      setShowBackButton(true);
    }
    if (endLength + 8 >= products.length) {
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
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category) {
      console.log(category);
      setSelectedCategory(category);
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "All" || selectedCategory === null) {
        setProduits(products);
      } else {
        const filteredProducts = products.filter(
          (pro) => pro.categ_id === selectedCategory
        );
        setProduits(filteredProducts);
      }
      console.log("categori sselectionne page boutique " + selectedCategory);
    } else {
      setProduits(products);
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    const searchTerm = searchContext.toLowerCase();
    setSearch(searchTerm);

    const filteredProducts = products.filter(
      (product) =>
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.categ_id &&
          product.categ_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log(filteredProducts);
    setProduits(filteredProducts);
  }, [searchContext]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);
    setSearch(searchTerm);

    const filteredProducts = products.filter(
      (product) =>
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.categ_id &&
          product.categ_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log(filteredProducts);
    setProduits(filteredProducts);
  };

  return (
    <>
      <SEOHeader
        title="CCBM Shop - Boutique"
        description="Trouvez l'appareil parfait pour votre maison sur CCBM Shop."
        keywords="électroménager, boutique en ligne, appareils électroménagers, CCBM Shop"
      />
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              {/* <div className="lg:w-[270px]">
                {isLoadingCategorie ? (
                  <div className="flex justify-center">
                    <Loader2
                      size={100}
                      className="mr-2 h-4 text-center w-4 animate-spin"
                    />
                  </div>
                ) : (
                  <>
                    <ProductsFilter
                      filterToggle={filterToggle}
                      filterToggleHandler={() => setToggle(!filterToggle)}
                      filters={filters}
                      checkboxHandler={checkboxHandler}
                      volume={volume}
                      volumeHandler={handleVolumeChange}
                      storage={storage}
                      filterstorage={filterStorage}
                      categories={categories}
                      handleCategoryChange={handleCategoryChange}
                      className="mb-[30px]"
                    />
                  </>
                )}
              </div> */}

              <div className="flex-1">
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
                          // onChange={handleSearch}
                          onChange={(e) => {
                            setSearchContext(e.target.value);
                          }}
                          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
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
                            // datas={produits.filter((product) =>
                            //   filters.category.length
                            //     ? filters.category.includes(product.categ_id)
                            //     : true
                            // )}
                            datas={produits}
                            startLength={Math.max(0, startLength)}
                            endLength={Math.min(endLength, produits.length)}
                          >
                            {({ datas }) => (
                              <div data-aos="fade-up" key={datas.id}>
                                <ProductCardStyleOne datas={datas} />
                              </div>
                            )}
                          </DataIteration>{" "}
                        </div>{" "}
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
