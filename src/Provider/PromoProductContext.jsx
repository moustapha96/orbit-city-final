// /* eslint-disable react/prop-types */
// import { createContext, useState, useEffect, useCallback, useMemo } from "react"
// import ProduitService from "../services/produitService"

// export const PromoProductContext = createContext()

// export const PromoProductProvider = ({ children }) => {
//     const [isLoadingProductPromo, setIsLoadingProductPromo] = useState(false)
//     const [currentProductsPromo, setCurrentProductsPromo] = useState([])
//     const [totalProductsPromo, setTotalProductsPromo] = useState(0)
//     const [produitHomePromo, setProduitHomePromo] = useState([])

//     const [isLoadingProductFlash, setIsLoadingProductsFlash] = useState(false)
//     const [currentProductsFlash, setCurrentProductsFlash] = useState([])
//     const [totalProductsFlash, setTotalProductsFlash] = useState(0)
//     const [produitHomeFlash, setProduitHomeFlash] = useState([])

//     const [produitHomeTabaski, setProduitHomeTabaski] = useState([])
//     const [isLoadingProductTabaski, setIsLoadingProductTabaski] = useState(false)
//     const [currentProductsTabaski, setCurrentProductsTabaski] = useState([])
//     const [totalProductsTabaski, setTotalProductsTabaski] = useState(0)


//     const [filters, setFilters] = useState({
//         category: "All",
//         search: "",
//         min: 1,
//         max: 5000000,
//         page: 1,
//         limit: 9
//     })

//     const fetchProductsHomeTabaski = useCallback(async () => {
//         setIsLoadingProductTabaski(true)
//         try {
//             const filtre = {
//             }
//             const response = await ProduitService.getFilteredProductsTabaski(filtre)
//             console.log(response)
//             const produits = response.products
//             setProduitHomeTabaski(produits)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductTabaski(false)
//         }
//     }, [])


//     const fetchProductsHomeFlash = useCallback(async () => {
//         setIsLoadingProductsFlash(true)
//         try {
//             const filtre = {
//                 tag: "Ramadan"
//             }
//             const response = await ProduitService.getFilteredProductsFlash(filtre)
//             console.log(response)
//             const produits = response.products
//             setProduitHomeFlash(produits)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductsFlash(false)
//         }
//     }, [])


//     const fetchProduitsHomePromo = useCallback(async () => {
//         setIsLoadingProductPromo(true)
//         try {
//             const filtre = {
//                 // category: "All",
//                 // search: "",
//                 // min: 5000,
//                 // max: 5000000,
//                 // page: 1,
//                 // limit: 4,
//             }
//             const response = await ProduitService.getFilteredProductsPromo(filtre)
//             const produits = response.products
//             setProduitHomePromo(produits)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductPromo(false)
//         }
//     }, [])

//     const fetchProdcutsFlash = useCallback(async () => {
//         setIsLoadingProductsFlash(true)
//         setCurrentProductsFlash([])
//         try {
//             const response = await ProduitService.getFilteredProductsFlash(filters)
//             const produits = response.products
//             setCurrentProductsFlash(produits)
//             setTotalProductsFlash(response.total)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductsFlash(false)
//         }
//     }, [filters])


//     const fetchProdcutsPromo = useCallback(async () => {
//         setIsLoadingProductPromo(true)
//         setCurrentProductsPromo([])
//         try {
//             const response = await ProduitService.getFilteredProductsPromo(filters)
//             const produits = response.products
//             setCurrentProductsPromo(produits)
//             setTotalProductsPromo(response.total)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductPromo(false)
//         }
//     }, [filters])


//     const fetchProdcutsTabaski = useCallback(async () => {
//         setIsLoadingProductTabaski(true)
//         setCurrentProductsTabaski([])
//         try {
//             const response = await ProduitService.getFilteredProductsTabaski(filters)
//             const produits = response.products
//             setCurrentProductsTabaski(produits)
//             setTotalProductsTabaski(response.total)
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits en promo", error)
//         } finally {
//             setIsLoadingProductTabaski(false)
//         }
//     }, [filters])


//     useEffect(() => {
//         fetchProdcutsPromo()
//         fetchProduitsHomePromo()
//         fetchProdcutsFlash()
//         fetchProductsHomeFlash()
//         fetchProdcutsTabaski()
//         fetchProductsHomeTabaski()
//     }, [fetchProdcutsFlash,
//         fetchProdcutsTabaski,
//         fetchProdcutsPromo,
//         fetchProductsHomeFlash,
//         fetchProductsHomeTabaski,
//         fetchProduitsHomePromo])


//     const updateFilters = useCallback((newFilters) => {
//         setFilters((prev) => ({
//             ...prev,
//             ...newFilters,
//             category: newFilters.category || "All",
//             search: newFilters.search !== undefined ? newFilters.search : prev.search,
//         }))
//     }, [])

//     const resetFilters = useCallback(() => {
//         setFilters({
//             category: "All",
//             search: "",
//             min: 5000,
//             max: 5000000,
//             page: 1,
//             limit: 9,
//         })
//     }, [])

//     const contextValue = useMemo(
//         () => ({
//             currentProductsPromo,
//             totalProductsPromo,
//             isLoadingProductPromo,
//             fetchProdcutsPromo,
//             updateFilters,
//             resetFilters,
//             filters,
//             selectedCategory: filters.category,
//             produitHomePromo,
//             fetchProduitsHomePromo,

//             fetchProdcutsFlash,
//             fetchProductsHomeFlash,
//             isLoadingProductFlash,
//             currentProductsFlash,
//             totalProductsFlash,
//             produitHomeFlash,

//             currentProductsTabaski,
//             produitHomeTabaski,
//             totalProductsTabaski,
//             isLoadingProductTabaski,
//             fetchProdcutsTabaski,
//             fetchProductsHomeTabaski
//         }),
//         [currentProductsPromo, totalProductsPromo, isLoadingProductPromo, produitHomeTabaski, fetchProdcutsPromo, updateFilters, resetFilters, filters, produitHomePromo, fetchProduitsHomePromo, fetchProdcutsFlash, fetchProductsHomeFlash, isLoadingProductFlash, currentProductsFlash, totalProductsFlash, produitHomeFlash, currentProductsTabaski, totalProductsTabaski, isLoadingProductTabaski, fetchProdcutsTabaski, fetchProductsHomeTabaski],
//     )

//     return <PromoProductContext.Provider value={contextValue}>{children}</PromoProductContext.Provider>
// }


/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import ProduitService from "../services/produitService"

export const PromoProductContext = createContext()

export const PromoProductProvider = ({ children }) => {
    const [isLoadingProductPromo, setIsLoadingProductPromo] = useState(false)
    const [currentProductsPromo, setCurrentProductsPromo] = useState([])
    const [totalProductsPromo, setTotalProductsPromo] = useState(0)
    const [produitHomePromo, setProduitHomePromo] = useState([])

    const [isLoadingProductFlash, setIsLoadingProductsFlash] = useState(false)
    const [currentProductsFlash, setCurrentProductsFlash] = useState([])
    const [totalProductsFlash, setTotalProductsFlash] = useState(0)
    const [produitHomeFlash, setProduitHomeFlash] = useState([])

    const [produitHomeTabaski, setProduitHomeTabaski] = useState([])
    const [isLoadingProductTabaski, setIsLoadingProductTabaski] = useState(false)
    const [currentProductsTabaski, setCurrentProductsTabaski] = useState([])
    const [totalProductsTabaski, setTotalProductsTabaski] = useState(0)

    const [filters, setFilters] = useState({
        category: "All",
        search: "",
        min: 1,
        max: 5000000,
        page: 1,
        limit: 9,
        productType: "All",
        tag: "All",
    })

    // Catégories prioritaires
    const priorityCategories = ["CONGELATEUR", "TELEVISION", "REFRIGERATEUR", "CUISINIERE"]

    // Fonction de tri personnalisée
    const sortByCategoryPriority = (products) => {
        return products.sort((a, b) => {
            const indexA = priorityCategories.indexOf(a.category?.toUpperCase())
            const indexB = priorityCategories.indexOf(b.category?.toUpperCase())
            return (indexA === -1 ? Number.MAX_VALUE : indexA) - (indexB === -1 ? Number.MAX_VALUE : indexB)
        })
    }

    const fetchProductsHomeTabaski = useCallback(async () => {
        setIsLoadingProductTabaski(true)
        try {
            const response = await ProduitService.getFilteredProductsTabaski({})
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setProduitHomeTabaski(produits)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits tabaski", error)
        } finally {
            setIsLoadingProductTabaski(false)
        }
    }, [])

    const fetchProductsHomeFlash = useCallback(async () => {
        setIsLoadingProductsFlash(true)
        try {
            const response = await ProduitService.getFilteredProductsFlash({ tag: "Ramadan" })
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setProduitHomeFlash(produits)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits flash", error)
        } finally {
            setIsLoadingProductsFlash(false)
        }
    }, [])

    const fetchProduitsHomePromo = useCallback(async () => {
        setIsLoadingProductPromo(true)
        try {
            const response = await ProduitService.getFilteredProductsPromo({})
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setProduitHomePromo(produits)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits promo", error)
        } finally {
            setIsLoadingProductPromo(false)
        }
    }, [])

    const fetchProdcutsFlash = useCallback(async () => {
        setIsLoadingProductsFlash(true)
        setCurrentProductsFlash([])
        try {
            const response = await ProduitService.getFilteredProductsFlash(filters)
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setCurrentProductsFlash(produits)
            setTotalProductsFlash(response.total)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits flash", error)
        } finally {
            setIsLoadingProductsFlash(false)
        }
    }, [filters])

    const fetchProdcutsPromo = useCallback(async () => {
        setIsLoadingProductPromo(true)
        setCurrentProductsPromo([])
        try {
            const response = await ProduitService.getFilteredProductsPromo(filters)
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setCurrentProductsPromo(produits)
            setTotalProductsPromo(response.total)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits promo", error)
        } finally {
            setIsLoadingProductPromo(false)
        }
    }, [filters])

    const fetchProdcutsTabaski = useCallback(async () => {
        setIsLoadingProductTabaski(true)
        setCurrentProductsTabaski([])
        try {
            const response = await ProduitService.getFilteredProductsTabaski(filters)
            let produits = response.products
            produits = sortByCategoryPriority(produits)
            setCurrentProductsTabaski(produits)
            setTotalProductsTabaski(response.total)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits tabaski", error)
        } finally {
            setIsLoadingProductTabaski(false)
        }
    }, [filters])

    useEffect(() => {
        fetchProdcutsPromo()
        fetchProduitsHomePromo()
        fetchProdcutsFlash()
        fetchProductsHomeFlash()
        fetchProdcutsTabaski()
        fetchProductsHomeTabaski()
    }, [
        fetchProdcutsFlash,
        fetchProdcutsTabaski,
        fetchProdcutsPromo,
        fetchProductsHomeFlash,
        fetchProductsHomeTabaski,
        fetchProduitsHomePromo
    ])

    const updateFilters = useCallback((newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            category: newFilters.category || "All",
            search: newFilters.search !== undefined ? newFilters.search : prev.search,
        }))
    }, [])

    const resetFilters = useCallback(() => {
        setFilters({
            category: "All",
            search: "",
            min: 5000,
            max: 5000000,
            page: 1,
            limit: 9,
            productType: "All",
            tag: "All",
        })
    }, [])

    const contextValue = useMemo(
        () => ({
            currentProductsPromo,
            totalProductsPromo,
            isLoadingProductPromo,
            fetchProdcutsPromo,
            updateFilters,
            resetFilters,
            filters,
            selectedCategory: filters.category,
            produitHomePromo,
            fetchProduitsHomePromo,

            fetchProdcutsFlash,
            fetchProductsHomeFlash,
            isLoadingProductFlash,
            currentProductsFlash,
            totalProductsFlash,
            produitHomeFlash,

            currentProductsTabaski,
            produitHomeTabaski,
            totalProductsTabaski,
            isLoadingProductTabaski,
            fetchProdcutsTabaski,
            fetchProductsHomeTabaski
        }),
        [
            currentProductsPromo,
            totalProductsPromo,
            isLoadingProductPromo,
            produitHomeTabaski,
            fetchProdcutsPromo,
            updateFilters,
            resetFilters,
            filters,
            produitHomePromo,
            fetchProduitsHomePromo,
            fetchProdcutsFlash,
            fetchProductsHomeFlash,
            isLoadingProductFlash,
            currentProductsFlash,
            totalProductsFlash,
            produitHomeFlash,
            currentProductsTabaski,
            totalProductsTabaski,
            isLoadingProductTabaski,
            fetchProdcutsTabaski,
            fetchProductsHomeTabaski
        ]
    )

    return <PromoProductContext.Provider value={contextValue}>{children}</PromoProductContext.Provider>
}
