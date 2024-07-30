/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Categorieservice from "../services/CategorieService";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategorie, setIsLoadingCategorie] = useState(false);
  useEffect(() => {
    setIsLoadingCategorie(true);
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        setIsLoadingCategorie(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
        setIsLoadingCategorie(false);
      }
    };
    fetchModels();
    setIsLoadingCategorie(false);
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        selectCategory,
        categories,
        isLoadingCategorie,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
