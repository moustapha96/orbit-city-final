/* eslint-disable react/prop-types */
// import { createContext, useState, useEffect, useMemo } from "react"
// import Categorieservice from "../services/CategorieService"

// export const CategoryContext = createContext()

// export const CategoryProvider = ({ children }) => {
//     const [categories, setCategories] = useState([])
//     const [isLoadingCategorie, setIsLoadingCategorie] = useState(false)
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     useEffect(() => {
//         const fetchCategories = async () => {
//             setIsLoadingCategorie(true)
//             try {
//                 const data = await Categorieservice.getCategories()
//                 const filtered = data.filter(
//                     (c) => !["Services", "Expenses", "Internal", "Consumable", "Saleable", "Software", "All"].includes(c.name),
//                 )
//                 setCategories([{ id: "All", name: "All" }, ...filtered])
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des catégories", error)
//             } finally {
//                 setIsLoadingCategorie(false)
//             }
//         }
//         fetchCategories()
//     }, [])

//     const updateSelectedCategory = (category) => {
//         setSelectedCategory(category)
//     }

//     const contextValue = useMemo(
//         () => ({
//             categories,
//             isLoadingCategorie,
//             selectedCategory,
//             updateSelectedCategory,
//         }),
//         [categories, isLoadingCategorie, selectedCategory],
//     )

//     return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>
// }

import { createContext, useState, useEffect, useContext } from "react"
import Categorieservice from "../services/CategorieService"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const [isLoadingCategorie, setIsLoadingCategorie] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [tags, setTags] = useState([])
    const [isLoadingTags, setIsloadingTags] = useState(false)
    // getTags

    useEffect(() => {
        const fetchTags = async () => {
            setIsloadingTags(true)
            try {
                const data = await Categorieservice.getTags()
                setTags(data)
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories", error)
            } finally {
                setIsloadingTags(false)
            }
        }
        fetchTags()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategorie(true)
            try {
                const data = await Categorieservice.getCategories()
                const filtered = data.filter(
                    (c) => !["Services", "Expenses", "Internal", "Consumable", "Deliveries", "Saleable", "Software", "All"].includes(c.name),
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

    const updateSelectedCategory = (category) => {
        setSelectedCategory(category)
    }

    return (
        <CategoryContext.Provider value={{ categories, isLoadingCategorie, selectedCategory, updateSelectedCategory, tags, isLoadingTags }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext)

