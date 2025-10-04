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
import { PromoProductContext } from "../../Provider/PromoProductContext"

export default function PromoFalshPage() {
    const {
        updateFilters,
        filters,
        resetFilters,
        fetchProdcutsFlash,
        isLoadingProductFlash,
        currentProductsFlash,
        totalProductsFlash,
    } = useContext(PromoProductContext)


    const location = useLocation()
    const navigate = useNavigate()



    useEffect(() => {
        resetFilters()
        const params = new URLSearchParams(location.search)
        const newFilters = {
            page: Number.parseInt(params.get("page")) || 1,
            category: params.get("category") || "All",
            search: params.get("search") || "",
            min: Number.parseInt(params.get("min")) || 4000,
            max: Number.parseInt(params.get("max")) || 5000000,
            limit: 9,
        }
        updateFilters(newFilters)
        console.log(filters)
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: "smooth",
        })
    }, [location.search, location.pathname, resetFilters, updateFilters])


    useEffect(() => {
        fetchProdcutsFlash()
    }, [fetchProdcutsFlash])


    const handlePageChange = (pageNumber) => {
        updateUrlParams({ ...filters, page: pageNumber })
    }

    const handleSearchChange = (e) => {
        const value = e.target.value
        updateUrlParams({ ...filters, search: value, page: 1 })
    }


    const handleCategoryChange = (categoryId) => {
        updateUrlParams({ category: categoryId || "All", page: 1 })
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


    const startIndex = (filters.page - 1) * filters.limit + 1
    const endIndex = Math.min(filters.page * filters.limit, totalProductsFlash)

    return (
        <>
            <SEOHeader
                title="CCBM Shop | Promo Ramadan"
                description="Découvrez les meilleures offres promotionnelles sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité à prix réduits."
                keywords="électroménager, promotions, offres spéciales, CCBM Shop, ccbme, appareils électroménagers à prix réduits"
            />
            <Layout>
                <div className="products-page-wrapper w-full">
                    <div className="container-x mx-auto">
                        <BreadcrumbCom />
                        <div className="w-full lg:flex lg:space-x-[30px]">
                            <div className="lg:w-[270px]">
                                <ProductsFilter updateUrlParams={updateUrlParams} handleCategoryChange={handleCategoryChange} />
                            </div>
                            <div className="flex-1">
                                <div className="products-sorting w-full bg-white flex flex-col md:flex-row justify-between p-[30px] mb-[40px]">
                                    <p className="font-400 text-[13px]">
                                        <span className="text-qgray">Affichage</span>{" "}
                                        {totalProductsFlash > 0 ? `${startIndex}–${endIndex} sur ${totalProductsFlash} résultats` : "0 résultat"}
                                    </p>

                                </div>
                                {isLoadingProductFlash ? (
                                    <div className="flex justify-center items-center">
                                        <Loader className="animate-spin" /> Chargement
                                    </div>
                                ) : currentProductsFlash.length === 0 ? (
                                    <div className="flex justify-center items-center">Aucun produit en promotion trouvé</div>
                                ) : (
                                    // <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
                                    //     {currentProductsFlash.map((product) => (
                                    //         <ProductCardStyleOne key={product.id} datas={product} />
                                    //     ))}
                                    //         </div>
                                    <div className="grid xl:grid-cols-3 grid-cols-2 gap-[30px]">
                                        {currentProductsFlash.map((product) => (
                                            <ProductCardStyleOne key={product.id} datas={product} />
                                        ))}
                                    </div>
                                )}
                                <Pagination
                                    currentPage={filters.page}
                                    totalPages={Math.ceil(totalProductsFlash / filters.limit)}
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

