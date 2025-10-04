/* eslint-disable react/prop-types */
// // /* eslint-disable no-unused-vars */
// // /* eslint-disable react/prop-types */

// // // fin de la bonne methode
// // import React, { createContext, useState, useEffect, useCallback } from "react";
// // import ProduitService from "../services/produitService";
// // import Categorieservice from "../services/CategorieService";

// // export const ProductContext = createContext();

// // export const ProductProvider = ({ children }) => {
// //   const [products, setProducts] = useState([]);
// //   const [isLoadingProduct, setIsLoading] = useState(false);
// //   const [searchContext, setSearchContext] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [categories, setCategories] = useState([]);
// //   const [isLoadingCategorie, setIsLoadingCategorie] = useState(false);
// //   const [productFilter, setProductFilter] = useState([]);
// //   const [productCreditCommandeFilter, setProductCreditCommandeFilter] = useState([]);
// //   const [productPrecommandeFilter, setProductPrecommandeFilter] = useState([]);
// //   const [productCreditCommande, setProductCreditCommande] = useState([]);
// //   const [productPrecommande, setProductPrecommande] = useState([]);
// //   const [sizeProducts, setSizeProducts] = useState(0);
// //   const [productFilterEnPromo, setProductFilterEnPromo] = useState([]);
// //   const [productEnPromo, setProductEnPromo] = useState([]);

// //   const fetchSizeProduct = useCallback(async () => {
// //     try {
// //       const data = await ProduitService.getSizeProducts();
// //       console.log("taille totale des produits: " + data);
// //       setSizeProducts(data);
// //     } catch (error) {
// //       console.error("Erreur lors de la récupération taille produits", error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchSizeProduct();
// //   }, [fetchSizeProduct]);

// //   const fetchProductsPage = useCallback(async (page, pageSize) => {
// //     try {
// //       const data = await ProduitService.getProduitsPerPage(page, pageSize);
// //       const filteredPro = data.filter(
// //         (p) =>
// //           p.categ_id !== "Services" &&
// //           p.categ_id !== "service" &&
// //           p.categ_id !== "Expenses" &&
// //           p.categ_id !== "Internal" &&
// //           p.categ_id !== "Consumable" &&
// //           p.categ_id !== "Saleable" &&
// //           p.categ_id !== "Software"
// //       );
// //       return filteredPro;
// //     } catch (error) {
// //       console.error("Erreur lors de la récupération des produits", error);
// //       return [];
// //     }
// //   }, []);

// //   useEffect(() => {
// //     let isMounted = true;
// //     if (sizeProducts > 0 && isMounted) {
// //       const fetchAllPages = async () => {
// //         setIsLoading(true);
// //         const pageSize = 10;
// //         let allProducts = [];
// //         let page = 1;

// //         while (allProducts.length < sizeProducts && isMounted) {
// //           const newProducts = await fetchProductsPage(page, pageSize);
// //           if (!newProducts.length) break;
// //           allProducts = [...allProducts, ...newProducts];

// //           setProducts(allProducts);
// //           setProductFilter(allProducts);

// //           const promoProducts = allProducts.filter((p) => p.en_promo === true);
// //           setProductFilterEnPromo(promoProducts);
// //           setProductEnPromo(promoProducts);

// //           if (page === 1) {
// //             setIsLoading(false);
// //           } else {
// //             await new Promise(resolve => setTimeout(resolve, 1000));
// //           }

// //           page++;
// //         }
// //       };

// //       fetchAllPages();
// //     }

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, [sizeProducts, fetchProductsPage]);

// //   useEffect(() => {
// //     setIsLoadingCategorie(true);
// //     const fetchModelsCatgeorie = async () => {
// //       try {
// //         const data = await Categorieservice.getCategories();
// //         const filtered = data.filter(
// //           (c) =>
// //             c.name !== "Services" &&
// //             c.name !== "Expenses" &&
// //             c.name !== "Internal" &&
// //             c.name !== "Consumable" &&
// //             c.name !== "Saleable" &&
// //             c.name !== "Software" &&
// //             c.name !== "All"
// //         );
// //         const categoriesWithAll = [{ id: "All", name: "All" }, ...filtered];
// //         setCategories(categoriesWithAll);
// //         setIsLoadingCategorie(false);
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des catégories", error);
// //         setIsLoadingCategorie(false);
// //       }
// //     };
// //     fetchModelsCatgeorie();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedCategory === "All") {
// //       setProductFilter(products);
// //       setProductFilterEnPromo(productEnPromo);
// //     } else {
// //       const filteredPro = products.filter(
// //         (p) =>
// //           p.categ_id &&
// //           selectedCategory &&
// //           p.categ_id.toLowerCase() === selectedCategory.toLowerCase()
// //       );
// //       setProductFilter(filteredPro);
// //     }
// //   }, [selectedCategory, products]);

// //   return (
// //     <ProductContext.Provider
// //       value={{
// //         products,
// //         isLoadingProduct,
// //         searchContext,
// //         setSearchContext,
// //         selectedCategory,
// //         setSelectedCategory,
// //         categories,
// //         isLoadingCategorie,
// //         productFilter,
// //         productPrecommandeFilter,
// //         productPrecommande,
// //         productCreditCommande,
// //         productCreditCommandeFilter,
// //         productFilterEnPromo,
// //         productEnPromo
// //       }}
// //     >
// //       {children}
// //     </ProductContext.Provider>
// //   );
// // };



// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { createContext, useState, useEffect, useCallback } from "react";
// import ProduitService from "../services/produitService";
// import Categorieservice from "../services/CategorieService";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [isLoadingProduct, setIsLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [isLoadingCategorie, setIsLoadingCategorie] = useState(false);
//   // Nouveaux états pour la pagination
//   const [currentProducts, setCurrentProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(9); // Correspond à votre configuration
//   const [filters, setFilters] = useState({});

//   const fetchProducts = useCallback(async (params) => {
//     setIsLoading(true);
//     try {
//       const response = await ProduitService.getFilteredProducts(params);
//       setCurrentProducts(response.products);
//       setTotalProducts(response.total);
//       setCurrentPage(params.page || 1);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Ajouter une fonction pour rafraîchir les filtres
//   const updateFilters = useCallback((newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   }, []);

//   // Chargement des catégories (identique)
//   useEffect(() => {
//     setIsLoadingCategorie(true);
//     const fetchModelsCatgeorie = async () => {
//       try {
//         const data = await Categorieservice.getCategories();
//         const filtered = data.filter(
//           c => !["Services", "Expenses", "Internal", "Consumable", "Saleable", "Software", "All"].includes(c.name)
//         );
//         setCategories([{ id: "All", name: "All" }, ...filtered]);
//         setIsLoadingCategorie(false);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des catégories", error);
//         setIsLoadingCategorie(false);
//       }
//     };
//     fetchModelsCatgeorie();
//   }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         currentProducts,
//         totalProducts,
//         currentPage,
//         itemsPerPage,
//         isLoadingProduct,
//         categories,
//         isLoadingCategorie,
//         fetchProducts,
//         updateFilters,
//         filters
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };


// import { createContext, useState, useEffect, useCallback } from "react"
// import ProduitService from "../services/produitService"
// import Categorieservice from "../services/CategorieService"

// export const ProductContext = createContext()

// export const ProductProvider = ({ children }) => {
//   const [isLoadingProduct, setIsLoading] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [isLoadingCategorie, setIsLoadingCategorie] = useState(false)
//   const [currentProducts, setCurrentProducts] = useState([])
//   const [totalProducts, setTotalProducts] = useState(0)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(9)
//   const [filters, setFilters] = useState({
//     category: "All",
//     search: "",
//     min: 5000,
//     max: 5000000,
//     page: 1,
//   })

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true)
//     try {
//       const response = await ProduitService.getFilteredProducts(filters)
//       setCurrentProducts(response.products)
//       setTotalProducts(response.total)
//       setCurrentPage(filters.page)
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [filters])

//   const updateFilters = useCallback((newFilters) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }))
//   }, [])

//   useEffect(() => {
//     fetchProducts()
//   }, [fetchProducts])

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoadingCategorie(true)
//       try {
//         const data = await Categorieservice.getCategories()
//         const filtered = data.filter(
//           (c) => !["Services", "Expenses", "Internal", "Consumable", "Saleable", "Software", "All"].includes(c.name),
//         )
//         setCategories([{ id: "All", name: "All" }, ...filtered])
//       } catch (error) {
//         console.error("Erreur lors de la récupération des catégories", error)
//       } finally {
//         setIsLoadingCategorie(false)
//       }
//     }
//     fetchCategories()
//   }, [])

//   return (
//     <ProductContext.Provider
//       value={{
//         currentProducts,
//         totalProducts,
//         currentPage,
//         itemsPerPage,
//         isLoadingProduct,
//         categories,
//         isLoadingCategorie,
//         fetchProducts,
//         updateFilters,
//         filters,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   )
// }


// ----------------------------------------------------

// import React, { createContext, useState, useEffect, useCallback } from "react"
// import ProduitService from "../services/produitService"
// import Categorieservice from "../services/CategorieService"

// export const ProductContext = createContext()

// export const ProductProvider = ({ children }) => {
//   const [isLoadingProduct, setIsLoading] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [isLoadingCategorie, setIsLoadingCategorie] = useState(false)
//   const [currentProducts, setCurrentProducts] = useState([])
//   const [totalProducts, setTotalProducts] = useState(0)
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [filters, setFilters] = useState({
//     category: "All",
//     search: "",
//     min: 5000,
//     max: 5000000,
//     page: 1,
//     limit: 9, // Update: limit changed to 9
//   })

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true)
//     try {
//       const response = await ProduitService.getFilteredProducts(filters)
//       setCurrentProducts(response.products)
//       setTotalProducts(response.total)
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [filters])

//   const updateFilters = useCallback((newFilters) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }))
//     if (newFilters.category) {
//       setSelectedCategory(newFilters.category)
//     }
//   }, [])

//   useEffect(() => {
//     fetchProducts()
//   }, [fetchProducts])

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoadingCategorie(true)
//       try {
//         const data = await Categorieservice.getCategories()
//         const filtered = data.filter(
//           (c) => !["Services", "Expenses", "Internal", "Consumable", "Saleable", "Software", "All"].includes(c.name),
//         )
//         setCategories([{ id: "All", name: "All" }, ...filtered])
//       } catch (error) {
//         console.error("Erreur lors de la récupération des catégories", error)
//       } finally {
//         setIsLoadingCategorie(false)
//       }
//     }
//     fetchCategories()
//   }, [])

//   return (
//     <ProductContext.Provider
//       value={{
//         currentProducts,
//         totalProducts,
//         isLoadingProduct,
//         categories,
//         isLoadingCategorie,
//         fetchProducts,
//         updateFilters,
//         filters,
//         selectedCategory,
//         setSelectedCategory,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   )
// }

import { createContext, useState, useEffect, useCallback, useMemo, } from "react"
import ProduitService from "../services/produitService"
import Categorieservice from "../services/CategorieService"


export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [isLoadingProduct, setIsLoading] = useState(false)
  const [isLoadingProductPromo, setIsLoadingProductPromo] = useState(false)
  const [categories, setCategories] = useState([])
  const [isLoadingCategorie, setIsLoadingCategorie] = useState(false)
  const [currentProducts, setCurrentProducts] = useState([])
  const [currentProductsPromo, setCurrentProductsPromo] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalProductsPromo, setTotalProductsPromo] = useState(0)
  const [produitHome, setProduitHome] = useState([])
  const [produitHomePromo, setProduitHomePromo] = useState([])

  const [filters, setFilters] = useState({
    category: "All",
    search: "",
    min: 5000,
    max: 5000000,
    page: 1,
    limit: 9,
  })


  const fetchProduitsHomePromo = useCallback(async () => {
    setIsLoadingProductPromo(true)
    try {
      const filtre = {
        category: "All",
        search: "",
        min: 5000,
        max: 5000000,
        page: 1,
        limit: 4
      }
      const response = await ProduitService.getFilteredProductsPromo(filtre)
      const produits = response.products
      setProduitHomePromo(produits)
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error)
    } finally {
      setIsLoadingProductPromo(false)
    }
  }, [])

  const fetchProduitsHome = useCallback(async () => {
    setIsLoading(true)
    try {
      const filtre = {
        category: "All",
        search: "",
        min: 5000,
        max: 5000000,
        page: 1,
        limit: 4
      }
      const response = await ProduitService.getFilteredProducts(filtre)
      const produits = response.products
      console.log(response)
      setProduitHome(produits)
      setIsLoading(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error)
      setIsLoading(false)
    }
  }, [])




  const fetchProdcutsPromo = useCallback(async () => {
    setIsLoadingProductPromo(true)
    setCurrentProductsPromo([]);
    try {
      const response = await ProduitService.getFilteredProductsPromo(filters)
      const produits = response.products
      setCurrentProductsPromo(produits)
      setTotalProductsPromo(response.total)
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error)
    } finally {
      setIsLoadingProductPromo(false)
    }
  }, [filters])



  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setCurrentProducts([]);
    try {
      const response = await ProduitService.getFilteredProducts(filters)
      const produits = response.products
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
    fetchProdcutsPromo()
  }, [filters, fetchProducts, fetchProdcutsPromo, fetchProduitsHome])

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
    })
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategorie(true)
      try {
        const data = await Categorieservice.getCategories()
        const filtered = data.filter(
          (c) => !["Services", "Expenses", "Internal", "Consumable", "Saleable", "Software", "All"].includes(c.name),
        )
        setCategories([{ id: "All", name: "All" }, ...filtered])
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error)
      } finally {
        setIsLoadingCategorie(false)
      }
    }
    fetchCategories()
  }, [])

  const contextValue = useMemo(
    () => ({
      currentProducts,
      currentProductsPromo,
      totalProducts,
      totalProductsPromo,
      isLoadingProduct,
      isLoadingProductPromo,
      categories,
      isLoadingCategorie,
      fetchProducts,
      fetchProdcutsPromo,
      updateFilters,
      resetFilters,
      filters,
      selectedCategory: filters.category,
      produitHome,
      produitHomePromo, fetchProduitsHomePromo, fetchProduitsHome
    }),
    [currentProducts, currentProductsPromo, totalProducts, totalProductsPromo, isLoadingProduct, isLoadingProductPromo, categories, isLoadingCategorie, fetchProducts, fetchProdcutsPromo, updateFilters, resetFilters, filters, produitHome, produitHomePromo, fetchProduitsHomePromo, fetchProduitsHome],
  )

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
}


