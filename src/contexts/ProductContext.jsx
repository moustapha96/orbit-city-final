/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import ProduitService from "../services/produitService";
import Categorieservice from "../services/CategorieService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProduct, setIsLoading] = useState(false);
  const [searchContext, setSearchContext] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategorie, setIsLoadingCategorie] = useState(false);
  const [productFilter, setProductFilter] = useState([]);
  const [productPrecommandeFilter, setProductPrecommandeFilter] = useState([]);
  const [productPrecommande, setProductPrecommande] = useState([]);
  // getProduitsPrecommande;
  useEffect(() => {
    setIsLoading(true);
    const fetchModelsProduits = async () => {
      try {
        const data = await ProduitService.getProduits();
        const filsteredPro = data.filter(
          (p) =>
            p.type != "service" &&
            p.categ_id != "Services" &&
            p.categ_id != "Expenses" &&
            p.categ_id != "Internal" &&
            p.categ_id != "Consumable" &&
            p.categ_id != "Saleable"
        );
        setProducts(filsteredPro);
        setProductFilter(filsteredPro);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
        setIsLoading(false);
      }
    };

    fetchModelsProduits();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchModelsProduitsPrecommande = async () => {
      try {
        const data = await ProduitService.getProduitsPrecommande();
        const filsteredPro = data.filter(
          (p) =>
            p.type != "service" &&
            p.categ_id != "Services" &&
            p.categ_id != "Expenses" &&
            p.categ_id != "Internal" &&
            p.categ_id != "Consumable" &&
            p.categ_id != "Saleable"
        );
        setProductPrecommande(filsteredPro);
        setProductPrecommandeFilter(filsteredPro);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des modèles produit precommande",
          error
        );
        setIsLoading(false);
      }
    };

    fetchModelsProduitsPrecommande();
  }, []);

  useEffect(() => {
    setIsLoadingCategorie(true);
    const fetchModelsCatgeorie = async () => {
      try {
        const data = await Categorieservice.getCategories();
        const filstered = data.filter(
          (c) =>
            c.name != "Services" &&
            c.name != "Expenses" &&
            c.name != "Internal" &&
            c.name != "Consumable" &&
            c.name != "Saleable" &&
            c.name != "Software"
        );
        setCategories(filstered);
        setIsLoadingCategorie(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
        setIsLoadingCategorie(false);
      }
    };
    fetchModelsCatgeorie();
    setIsLoadingCategorie(false);
  }, []);

  useEffect(() => {
    if (selectedCategory == "All") {
      setProductFilter(products);
      setProductPrecommandeFilter(productPrecommande);
    } else {
      const filsteredPro = products.filter(
        (p) => p.categ_id == selectedCategory
      );
      const filsteredPre = productPrecommande.filter(
        (p) => p.categ_id == selectedCategory
      );
      setProductPrecommandeFilter(filsteredPre);
      setProductFilter(filsteredPro);
    }
  }, [selectedCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoadingProduct,
        searchContext,
        setSearchContext,
        selectedCategory,
        setSelectedCategory,
        categories,
        isLoadingCategorie,
        productFilter,
        productPrecommandeFilter,
        productPrecommande,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
