/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import ProduitService from "../services/produitService"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [isLoadingProduct, setIsLoading] = useState(false)
    const [currentProducts, setCurrentProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [produitHome, setProduitHome] = useState([])

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

    const priorityCategories = ["CONGELATEUR", "TELEVISION", "REFRIGERATEUR", "CUISINIERE"]

    // Fonction de tri personnalisée
    const sortByCategoryPriority = (products) => {
        return products.sort((a, b) => {
            const indexA = priorityCategories.indexOf(a.category?.toUpperCase())
            const indexB = priorityCategories.indexOf(b.category?.toUpperCase())
            return (indexA === -1 ? Number.MAX_VALUE : indexA) - (indexB === -1 ? Number.MAX_VALUE : indexB)
        })
    }


    const fetchProduitsHome = useCallback(async () => {
        setIsLoading(true)
        try {
            const filtre = {
            }
            const response = await ProduitService.getFilteredProducts(filtre)
            let produits = response.products
            produits = sortByCategoryPriority(produits)

            // setProduitHome(produits)
            // je veux ranger par ordre de l'attribut rang
            const produitsRanged = produits.sort((a, b) => a.rang - b.rang)
            setProduitHome(produitsRanged)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        setCurrentProducts([])
        try {
            const response = await ProduitService.getFilteredProducts(filters)
            let produits = response.products

            produits = sortByCategoryPriority(produits)

            setCurrentProducts(produits)
            setTotalProducts(response.total)
        } catch (error) {
            console.error("Erreur lors de la récupération des produits", error)
        } finally {
            setIsLoading(false)
        }
    }, [filters])


    useEffect(() => {
        fetchProducts()
        fetchProduitsHome()
    }, [fetchProducts, fetchProduitsHome])

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
            currentProducts,
            totalProducts,
            isLoadingProduct,
            fetchProducts,
            updateFilters,
            resetFilters,
            filters,
            selectedCategory: filters.category,
            produitHome,
            fetchProduitsHome,
        }),
        [
            currentProducts,
            totalProducts,
            isLoadingProduct,
            fetchProducts,
            updateFilters,
            resetFilters,
            filters,
            produitHome,
            fetchProduitsHome,
        ],
    )

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
}

