/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// "use client"
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */


// import { useState, useCallback, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { Search } from "lucide-react"
// import { useContext } from "react"
// import { ProductContext } from "../../../Provider/ProductContext"
// import { PromoProductContext } from "../../../Provider/PromoProductContext"
// import { useCategory } from "../../../Provider/CategoryContext"
// import useGoogleAnalytics from "../../../Hooks/useGoogleAnalytics"
// import { addTermeRecherche } from "../../../services/TermeRecherche"

// export default function SearchBox({ className, type = 3, isMobile = false }) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { trackEvent, trackPageView } = useGoogleAnalytics()

//   const { updateFilters: updateProductFilters, filters: filtreProduit } = useContext(ProductContext)
//   const { updateFilters: updatePromoFilters, filters: filtrePromo } = useContext(PromoProductContext)
//   const { categories, isLoadingCategorie, selectedCategory, updateSelectedCategory } = useCategory()

//   const searchParams = new URLSearchParams(location.search)
//   const initialQuery = searchParams.get("search") || ""
//   const initialCategory = searchParams.get("category") || "All"

//   const [query, setQuery] = useState(initialQuery)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null)

//   useEffect(() => {
//     setQuery(initialQuery)
//     updateSelectedCategory(initialCategory)
//   }, [initialQuery, initialCategory, updateSelectedCategory])

//   const updateUrlParams = useCallback(
//     (newFilters) => {
//       const params = new URLSearchParams(location.search)
//       Object.entries(newFilters).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== "") {
//           params.set(key, value.toString())
//         } else {
//           params.delete(key)
//         }
//       })
//       return params.toString()
//     },
//     [location.search],
//   )

//   const performSearch = useCallback(
//     (searchQuery) => {
//       trackEvent("Recherche", "barre_de_recherche", `Search: ${searchQuery}`, 1)

//       const newFilters = { ...filtreProduit, search: searchQuery, category: selectedCategory, page: 1 }

//       if (location.pathname === "/en-promo") {
//         updatePromoFilters(newFilters)
//         navigate(`/en-promo?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-ramadan") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-ramadan?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-korite") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-korite?${updateUrlParams(newFilters)}`)
//       } else {
//         updateProductFilters(newFilters)
//         navigate(`/boutique?${updateUrlParams(newFilters)}`)
//       }

//       const data = {
//         terme: searchQuery,
//         source:
//           location.pathname === "/en-promo"
//             ? "en-promo"
//             : location.pathname === "/promo-ramadan"
//               ? "promo-ramadan"
//               : location.pathname === "/promo-korite"
//                 ? "promo-korite"
//                 : "boutique",
//       }

//       TermeRecherche(data)

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       })
//     },
//     [
//       filtreProduit,
//       selectedCategory,
//       location.pathname,
//       updatePromoFilters,
//       updateProductFilters,
//       navigate,
//       updateUrlParams,
//       trackEvent,
//     ],
//   )

//   const handleSearch = (e) => {
//     e.preventDefault()
//     performSearch(query)
//   }

//   const handleSearchChange = (e) => {
//     const newQuery = e.target.value
//     setQuery(newQuery)

//     // Debounce search to avoid too many requests
//     if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)

//     setSearchDebounceTimeout(
//       setTimeout(() => {
//         // Only trigger search if query has at least 2 characters or is empty
//         if (newQuery.length >= 2 || newQuery === "") {
//           performSearch(newQuery)
//         }
//       }, 300),
//     ) // 300ms debounce
//   }

//   const TermeRecherche = async (data) => {
//     console.log(data)
//     try {
//       const res = await addTermeRecherche(data)
//       return res
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleCategoryChange = (category) => {
//     updateSelectedCategory(category)
//     setIsDropdownOpen(false)
//   }

//   return (
//     <div
//       className={`w-full flex items-center rounded-md overflow-hidden shadow-md ${className || ""} ${isMobile ? "flex-col" : ""}`}
//     >
//       <form
//         onSubmit={handleSearch}
//         className={`flex-1 flex items-center relative ${isMobile ? "w-full flex-col" : ""}`}
//       >
//         <input
//           type="search"
//           className={`flex-1 px-4 py-2 text-sm focus:outline-none ${isMobile ? "w-full" : ""} pr-12`}
//           placeholder="Rechercher un produit..."
//           value={query}
//           onChange={handleSearchChange}
//         />
//         <button
//           type="submit"
//           className="absolute right-0 top-0 h-full px-4 text-white bg-bleu-logo flex items-center justify-center focus:outline-none"
//         >
//           <Search className="h-4 w-4" />
//         </button>
//       </form>
//     </div>
//   )
// }






















// "use client"

// import { useState, useCallback, useEffect, useRef } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { Search } from "lucide-react"
// import { useContext } from "react"
// import { ProductContext } from "../../../Provider/ProductContext"
// import { PromoProductContext } from "../../../Provider/PromoProductContext"
// import { useCategory } from "../../../Provider/CategoryContext"
// import useGoogleAnalytics from "../../../Hooks/useGoogleAnalytics"
// import { addTermeRecherche } from "../../../services/TermeRecherche"
// import { getProductsBySearch } from "../../../services/ProductService" // You'll need to create this service function

// export default function SearchBox({ className, type = 3, isMobile = false }) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { trackEvent, trackPageView } = useGoogleAnalytics()
//   const dropdownRef = useRef(null)

//   const { updateFilters: updateProductFilters, filters: filtreProduit } = useContext(ProductContext)
//   const { updateFilters: updatePromoFilters, filters: filtrePromo } = useContext(PromoProductContext)
//   const { categories, isLoadingCategorie, selectedCategory, updateSelectedCategory } = useCategory()

//   const searchParams = new URLSearchParams(location.search)
//   const initialQuery = searchParams.get("search") || ""
//   const initialCategory = searchParams.get("category") || "All"

//   const [query, setQuery] = useState(initialQuery)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null)
//   const [suggestions, setSuggestions] = useState([])
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     setQuery(initialQuery)
//     updateSelectedCategory(initialCategory)
//   }, [initialQuery, initialCategory, updateSelectedCategory])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const updateUrlParams = useCallback(
//     (newFilters) => {
//       const params = new URLSearchParams(location.search)
//       Object.entries(newFilters).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== "") {
//           params.set(key, value.toString())
//         } else {
//           params.delete(key)
//         }
//       })
//       return params.toString()
//     },
//     [location.search],
//   )

//   const fetchSuggestions = async (searchQuery) => {
//     if (!searchQuery || searchQuery.length < 2) {
//       setSuggestions([])
//       return
//     }

//     setIsLoading(true)
//     try {
//       // Replace with your actual API call to get product suggestions
//       const response = await getProductsBySearch(searchQuery, selectedCategory)
//       setSuggestions(response.slice(0, 5)) // Limit to 5 suggestions
//       setIsDropdownOpen(true)
//     } catch (error) {
//       console.error("Error fetching suggestions:", error)
//       setSuggestions([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const performSearch = useCallback(
//     (searchQuery) => {
//       trackEvent("Recherche", "barre_de_recherche", `Search: ${searchQuery}`, 1)

//       const newFilters = { ...filtreProduit, search: searchQuery, category: selectedCategory, page: 1 }

//       if (location.pathname === "/en-promo") {
//         updatePromoFilters(newFilters)
//         navigate(`/en-promo?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-ramadan") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-ramadan?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-korite") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-korite?${updateUrlParams(newFilters)}`)
//       } else {
//         updateProductFilters(newFilters)
//         navigate(`/boutique?${updateUrlParams(newFilters)}`)
//       }

//       const data = {
//         terme: searchQuery,
//         source:
//           location.pathname === "/en-promo"
//             ? "en-promo"
//             : location.pathname === "/promo-ramadan"
//               ? "promo-ramadan"
//               : location.pathname === "/promo-korite"
//                 ? "promo-korite"
//                 : "boutique",
//       }

//       TermeRecherche(data)
//       setIsDropdownOpen(false)

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       })
//     },
//     [
//       filtreProduit,
//       selectedCategory,
//       location.pathname,
//       updatePromoFilters,
//       updateProductFilters,
//       navigate,
//       updateUrlParams,
//       trackEvent,
//     ],
//   )

//   const handleSearch = (e) => {
//     e.preventDefault()
//     performSearch(query)
//   }

//   const handleSearchChange = (e) => {
//     const newQuery = e.target.value
//     setQuery(newQuery)

//     // Debounce search to avoid too many requests
//     if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)

//     setSearchDebounceTimeout(
//       setTimeout(() => {
//         // Only trigger search if query has at least 2 characters or is empty
//         if (newQuery.length >= 2) {
//           fetchSuggestions(newQuery)
//         } else {
//           setIsDropdownOpen(false)
//           setSuggestions([])
//         }
//       }, 300),
//     ) // 300ms debounce
//   }

//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.name)
//     performSearch(suggestion.name)
//     setIsDropdownOpen(false)
//   }

//   const TermeRecherche = async (data) => {
//     console.log(data)
//     try {
//       const res = await addTermeRecherche(data)
//       return res
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleCategoryChange = (category) => {
//     updateSelectedCategory(category)
//     setIsDropdownOpen(false)
//   }

//   return (
//     <div
//       className={`w-full flex items-center rounded-md overflow-hidden shadow-md ${className || ""} ${isMobile ? "flex-col" : ""}`}
//       ref={dropdownRef}
//     >
//       <form
//         onSubmit={handleSearch}
//         className={`flex-1 flex items-center relative ${isMobile ? "w-full flex-col" : ""}`}
//       >
//         <input
//           type="search"
//           className={`flex-1 px-4 py-2 text-sm focus:outline-none ${isMobile ? "w-full" : ""} pr-12`}
//           placeholder="Rechercher un produit..."
//           value={query}
//           onChange={handleSearchChange}
//           onFocus={() => query.length >= 2 && setSuggestions.length > 0 && setIsDropdownOpen(true)}
//         />
//         <button
//           type="submit"
//           className="absolute right-0 top-0 h-full px-4 text-white bg-bleu-logo flex items-center justify-center focus:outline-none"
//         >
//           <Search className="h-4 w-4" />
//         </button>

//         {/* Suggestions Dropdown */}
//         {isDropdownOpen && (
//           <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-50 mt-0.5 max-h-60 overflow-y-auto">
//             {isLoading ? (
//               <div className="p-3 text-center text-gray-500">Chargement...</div>
//             ) : suggestions.length > 0 ? (
//               <ul>
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={suggestion.id || index}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//                     onClick={() => handleSuggestionClick(suggestion)}
//                   >
//                     {suggestion.image && (
//                       <img
//                         src={suggestion.image || "/placeholder.svg"}
//                         alt={suggestion.name}
//                         className="w-10 h-10 object-cover mr-3"
//                       />
//                     )}
//                     <div>
//                       <div className="font-medium">{suggestion.name}</div>
//                       {suggestion.price && (
//                         <div className="text-sm text-gray-600">{suggestion.price.toLocaleString()} FCFA</div>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : query.length >= 2 ? (
//               <div className="p-3 text-center text-gray-500">Aucun produit trouvé</div>
//             ) : null}
//           </div>
//         )}
//       </form>
//     </div>
//   )
// }






















// "use client"

// import { useState, useCallback, useEffect, useRef } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { Search } from "lucide-react"
// import { useContext } from "react"
// import { ProductContext } from "../../../Provider/ProductContext"
// import { PromoProductContext } from "../../../Provider/PromoProductContext"
// import { useCategory } from "../../../Provider/CategoryContext"
// import useGoogleAnalytics from "../../../Hooks/useGoogleAnalytics"
// import { addTermeRecherche } from "../../../services/TermeRecherche"
// import ProduitService from "../../../services/produitService"

// export default function SearchBox({ className, type = 3, isMobile = false }) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { trackEvent } = useGoogleAnalytics()
//   const dropdownRef = useRef(null)
//   const inputRef = useRef(null)

//   const { updateFilters: updateProductFilters, filters: filtreProduit, currentProducts } = useContext(ProductContext)
//   const { updateFilters: updatePromoFilters, filters: filtrePromo } = useContext(PromoProductContext)
//   const { selectedCategory, updateSelectedCategory } = useCategory()

//   const searchParams = new URLSearchParams(location.search)
//   const initialQuery = searchParams.get("search") || ""
//   const initialCategory = searchParams.get("category") || "All"

//   const [query, setQuery] = useState(initialQuery)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null)
//   const [suggestions, setSuggestions] = useState([])
//   const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

//   useEffect(() => {
//     setQuery(initialQuery)
//     updateSelectedCategory(initialCategory)
//   }, [initialQuery, initialCategory, updateSelectedCategory])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const updateUrlParams = useCallback(
//     (newFilters) => {
//       const params = new URLSearchParams(location.search)
//       Object.entries(newFilters).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== "") {
//           params.set(key, value.toString())
//         } else {
//           params.delete(key)
//         }
//       })
//       return params.toString()
//     },
//     [location.search],
//   )

//   const fetchSuggestions = async (searchQuery) => {
//     if (!searchQuery || searchQuery.length < 2) {
//       setSuggestions([])
//       setIsDropdownOpen(false)
//       return
//     }

//     setIsLoadingSuggestions(true)

//     try {
//       // Option 1: Use direct API call
//       const suggestionFilters = {
//         category: selectedCategory !== "All" ? selectedCategory : "",
//         search: searchQuery,
//         page: 1,
//         limit: 10,
//       }

//       // Try to get products directly from the service
//       const response = await ProduitService.getFilteredProducts(suggestionFilters)

//       if (response && response.products) {
//         setSuggestions(response.products)
//         setIsDropdownOpen(response.products.length > 0)
//       } else {
//         setSuggestions([])
//         setIsDropdownOpen(false)
//       }
//     } catch (error) {
//       console.error("Error fetching suggestions:", error)

//       // Option 2: Fallback to filtering current products from context
//       if (currentProducts && currentProducts.length > 0) {
//         const filteredProducts = currentProducts
//           .filter((product) => {
//             const productName = (product.name || product.titre || "").toLowerCase()
//             return productName.includes(searchQuery.toLowerCase())
//           })
//           .slice(0, 10)

//         setSuggestions(filteredProducts)
//         setIsDropdownOpen(filteredProducts.length > 0)
//       } else {
//         setSuggestions([])
//         setIsDropdownOpen(false)
//       }
//     } finally {
//       setIsLoadingSuggestions(false)
//     }
//   }

//   const performSearch = useCallback(
//     (searchQuery) => {
//       trackEvent("Recherche", "barre_de_recherche", `Search: ${searchQuery}`, 1)

//       const newFilters = { ...filtreProduit, search: searchQuery, category: selectedCategory, page: 1 }

//       if (location.pathname === "/en-promo") {
//         updatePromoFilters(newFilters)
//         navigate(`/en-promo?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-ramadan") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-ramadan?${updateUrlParams(newFilters)}`)
//       } else if (location.pathname === "/promo-korite") {
//         updatePromoFilters(newFilters)
//         navigate(`/promo-korite?${updateUrlParams(newFilters)}`)
//       } else {
//         updateProductFilters(newFilters)
//         navigate(`/boutique?${updateUrlParams(newFilters)}`)
//       }

//       const data = {
//         terme: searchQuery,
//         source:
//           location.pathname === "/en-promo"
//             ? "en-promo"
//             : location.pathname === "/promo-ramadan"
//               ? "promo-ramadan"
//               : location.pathname === "/promo-korite"
//                 ? "promo-korite"
//                 : "boutique",
//       }

//       addTermeRecherche(data).catch((error) => console.error("Error recording search term:", error))
//       setIsDropdownOpen(false)

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       })
//     },
//     [
//       filtreProduit,
//       selectedCategory,
//       location.pathname,
//       updatePromoFilters,
//       updateProductFilters,
//       navigate,
//       updateUrlParams,
//       trackEvent,
//     ],
//   )

//   const handleSearch = (e) => {
//     e.preventDefault()
//     performSearch(query)
//   }

//   const handleSearchChange = (e) => {
//     const newQuery = e.target.value
//     setQuery(newQuery)

//     // Debounce search to avoid too many requests
//     if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)

//     setSearchDebounceTimeout(
//       setTimeout(() => {
//         // Only trigger search if query has at least 2 characters
//         if (newQuery.length >= 2) {
//           fetchSuggestions(newQuery)
//         } else {
//           setIsDropdownOpen(false)
//           setSuggestions([])
//         }
//       }, 300),
//     ) // 300ms debounce
//   }

//   const handleSuggestionClick = (suggestion) => {
//     const productName = suggestion.name || suggestion.titre || ""
//     setQuery(productName)
//     // Ne pas appeler performSearch ici pour éviter la redirection
//     // setIsDropdownOpen(false)
//     setIsDropdownOpen(true)
//   }

//   return (
//     <div
//       className={`w-full flex items-center rounded-md overflow-hidden shadow-md ${className || ""} ${isMobile ? "flex-col" : ""}`}
//       ref={dropdownRef}
//     >
//       <form
//         onSubmit={handleSearch}
//         className={`flex-1 flex items-center relative ${isMobile ? "w-full flex-col" : ""}`}
//       >
//         <input
//           ref={inputRef}
//           type="search"
//           className={`flex-1 px-4 py-2 text-sm focus:outline-none ${isMobile ? "w-full" : ""} pr-12`}
//           placeholder="Rechercher un produit..."
//           value={query}
//           onChange={handleSearchChange}
//           onFocus={() => {
//             if (query.length >= 2) {
//               fetchSuggestions(query)
//             }
//           }}
//         />
//         <button
//           type="submit"
//           className="absolute right-0 top-0 h-full px-4 text-white bg-bleu-logo flex items-center justify-center focus:outline-none"
//         >
//           <Search className="h-4 w-4" />
//         </button>

//         {/* Suggestions Dropdown */}
//         {isDropdownOpen && (
//           <div
//             className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-50 mt-0.5 max-h-60 overflow-y-auto border border-gray-200"
//             style={{ width: inputRef.current ? inputRef.current.offsetWidth : "100%" }}
//           >
//             {isLoadingSuggestions ? (
//               <div className="p-3 text-center text-gray-500">Chargement...</div>
//             ) : suggestions.length > 0 ? (
//               <ul className="py-1">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={suggestion._id || index}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSuggestionClick(suggestion)}
//                   >
//                     <span className="block truncate">{suggestion.name || suggestion.titre || "Produit sans nom"}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="p-3 text-center text-gray-500">Aucun produit trouvé</div>
//             )}
//           </div>
//         )}
//       </form>
//     </div>
//   )
// }










"use client"
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useCallback, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Search } from "lucide-react"
import { useContext } from "react"
import { ProductContext } from "../../../Provider/ProductContext"
import { PromoProductContext } from "../../../Provider/PromoProductContext"
import { useCategory } from "../../../Provider/CategoryContext"
import useGoogleAnalytics from "../../../Hooks/useGoogleAnalytics"
import { addTermeRecherche } from "../../../services/TermeRecherche"

export default function SearchBox({ className, type = 3, isMobile = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { trackEvent, trackPageView } = useGoogleAnalytics()
  const dropdownRef = useRef(null)

  const { updateFilters: updateProductFilters, filters: filtreProduit, products } = useContext(ProductContext)
  const { updateFilters: updatePromoFilters, filters: filtrePromo } = useContext(PromoProductContext)
  const { categories, isLoadingCategorie, selectedCategory, updateSelectedCategory } = useCategory()

  const searchParams = new URLSearchParams(location.search)
  const initialQuery = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || "All"

  const [query, setQuery] = useState(initialQuery)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchDebounceTimeout, setSearchDebounceTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setQuery(initialQuery)
    updateSelectedCategory(initialCategory)
  }, [initialQuery, initialCategory, updateSelectedCategory])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
      return params.toString()
    },
    [location.search],
  )

  const performSearch = useCallback(
    (searchQuery) => {
      trackEvent("Recherche", "barre_de_recherche", `Search: ${searchQuery}`, 1)

      const newFilters = { ...filtreProduit, search: searchQuery, category: selectedCategory, page: 1 }

      if (location.pathname === "/en-promo") {
        updatePromoFilters(newFilters)
        navigate(`/en-promo?${updateUrlParams(newFilters)}`)
      } else if (location.pathname === "/promo-ramadan") {
        updatePromoFilters(newFilters)
        navigate(`/promo-ramadan?${updateUrlParams(newFilters)}`)
      } else if (location.pathname === "/promo-tabaski") {
        updatePromoFilters(newFilters)
        navigate(`/promo-tabaski?${updateUrlParams(newFilters)}`)
      } else {
        updateProductFilters(newFilters)
        navigate(`/boutique?${updateUrlParams(newFilters)}`)
      }

      const data = {
        terme: searchQuery,
        source:
          location.pathname === "/en-promo"
            ? "en-promo"
            : location.pathname === "/promo-ramadan"
              ? "promo-ramadan"
              : location.pathname === "/promo-tabaski"
                ? "promo-korite"
                : "boutique",
      }

      TermeRecherche(data)

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    },
    [
      filtreProduit,
      selectedCategory,
      location.pathname,
      updatePromoFilters,
      updateProductFilters,
      navigate,
      updateUrlParams,
      trackEvent,
    ],
  )

  // Function to filter products based on search query
  const filterProducts = useCallback(
    (searchQuery) => {
      if (!searchQuery || searchQuery.length < 2) {
        setSearchResults([])
        setIsDropdownOpen(false)
        return
      }

      // Assuming products is an array of product objects from ProductContext
      // If you need to get products from a different source, adjust this accordingly
      const filteredProducts = products
        ? products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
          )
          .slice(0, 5)
        : [] // Limit to 5 results for dropdown

      setSearchResults(filteredProducts)
      setIsDropdownOpen(filteredProducts.length > 0)
    },
    [products],
  )

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(query)
    setIsDropdownOpen(false)
  }

  const handleSearchChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    // Debounce search to avoid too many requests
    if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)

    setSearchDebounceTimeout(
      setTimeout(() => {
        // Filter products for dropdown
        filterProducts(newQuery)

        // Only trigger full search if query has at least 2 characters or is empty
        if (newQuery.length >= 2 || newQuery === "") {
          performSearch(newQuery)
        }
      }, 300),
    ) // 300ms debounce
  }

  const TermeRecherche = async (data) => {
    console.log(data)
    try {
      const res = await addTermeRecherche(data)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  const handleCategoryChange = (category) => {
    updateSelectedCategory(category)
    setIsDropdownOpen(false)
  }

  const handleResultClick = (productName) => {
    setQuery(productName)
    performSearch(productName)
    setIsDropdownOpen(false)
  }

  return (
    <div
      className={`w-full flex items-center rounded-md overflow-visible shadow-md ${className || ""} ${isMobile ? "flex-col" : ""}`}
      ref={dropdownRef}
    >
      <form
        onSubmit={handleSearch}
        className={`flex-1 flex items-center relative ${isMobile ? "w-full flex-col" : ""}`}
      >
        <input
          type="search"
          className={`flex-1 px-4 py-2 text-sm focus:outline-none ${isMobile ? "w-full" : ""} pr-12`}
          placeholder="Rechercher un produit..."
          value={query}
          onChange={handleSearchChange}
          onFocus={() => query.length >= 2 && setIsDropdownOpen(searchResults.length > 0)}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 text-white bg-bleu-logo flex items-center justify-center focus:outline-none"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Dropdown for search results */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-md z-10 mt-1 max-h-60 overflow-y-auto">
            {searchResults.length > 0 ? (
              <ul className="py-1">
                {searchResults.map((product, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleResultClick(product.name)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">Aucun résultat trouvé</div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
