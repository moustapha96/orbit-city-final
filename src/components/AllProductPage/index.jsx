/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BreadcrumbCom from "../BreadcrumbCom"
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne"
import Layout from "../Partials/Layout"
import ProductsFilter from "./ProductsFilter"
import { Loader } from "lucide-react"
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader"
import Pagination from "./Pagination"
import { ProductContext } from "../../Provider/ProductContext"

export default function AllProductPage() {
  const { currentProducts, totalProducts, isLoadingProduct, fetchProducts, updateFilters, resetFilters, filters } =
    useContext(ProductContext)

  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
<<<<<<< HEAD
    resetFilters()
    const params = new URLSearchParams(location.search)
    const newFilters = {
      page: Number.parseInt(params.get("page")) || 1,
      category: params.get("category") || "All",
      search: params.get("search") || "",
      min: Number.parseInt(params.get("min")) || 4000,
      max: Number.parseInt(params.get("max")) || 5000000,
      limit: 9,
      productType: params.get("productType") || "All",
      tag: params.get("tag") || "All",
    }

    updateFilters(newFilters)
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
  }, [location.pathname, location.search, resetFilters, updateFilters])


=======
    console.log(productFilter);
    setProduits(productFilter);
    setSearchContext("");
  }, [productFilter]);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])


  const startIndex = (filters.page - 1) * filters.limit + 1
  const endIndex = Math.min(filters.page * filters.limit, totalProducts)

  const handlePageChange = (pageNumber) => {
    updateUrlParams({ ...filters, page: pageNumber })
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    updateUrlParams({ ...filters, search: value, page: 1 })
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
  }


  const handleCategoryChange = (categoryId) => {
    updateUrlParams({ category: categoryId || "All", page: 1 })
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
  }


  const updateUrlParams = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(location.search)
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, value.toString())
        } else {
          params.delete(key)
        }
      })
      navigate({ search: params.toString() }, { replace: true })
    },
    [location.search, navigate],
  )

  return (
    <>
      <SEOHeader
        title="CCBM Shop | Boutique"
<<<<<<< HEAD
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité."
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits"
=======
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      />
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
<<<<<<< HEAD
              <div className="lg:w-[270px]">
=======

>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

                <ProductsFilter
                  handleCategoryChange={handleCategoryChange}
                  updateUrlParams={updateUrlParams} />
              </div>
              <div className="flex-1">
                <div className="products-sorting w-full bg-white flex flex-col md:flex-row justify-between p-[30px] mb-[40px]">
                  <p className="font-400 text-[13px]">
                    <span className="text-qgray">Affichage</span>{" "}
                    {totalProducts > 0 ? `${startIndex}–${endIndex} sur ${totalProducts} résultats` : "0 résultat"}
                  </p>

                </div>
                {isLoadingProduct ? (
                  <div className="flex justify-center items-center">
                    <Loader className="animate-spin" /> Chargement
                  </div>
                ) : currentProducts.length === 0 ? (
                  <div className="flex justify-center items-center">Pas de produits disponible pour le moment</div>
                ) : (
<<<<<<< HEAD
                  // <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
                  //   {currentProducts.map((product) => (
                  //     <ProductCardStyleOne key={product.id} datas={product} />
                  //   ))}
                  // </div>
                  <div className="grid xl:grid-cols-3 grid-cols-2 gap-[30px]">
                    {currentProducts.map((product) => (
                      <ProductCardStyleOne key={product.id} datas={product} />
                    ))}
                  </div>
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
                )}
                <Pagination
                  currentPage={filters.page}
                  totalPages={Math.ceil(totalProducts / filters.limit)}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

