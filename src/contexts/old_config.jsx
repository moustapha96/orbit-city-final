/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect, useCallback } from "react";
import ProduitService from "../services/produitService";
import Categorieservice from "../services/CategorieService";

export const ProductContext = createContext();

export const ProductProvider1 = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProduct, setIsLoading] = useState(false);
  const [searchContext, setSearchContext] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategorie, setIsLoadingCategorie] = useState(false);
  const [productFilter, setProductFilter] = useState([]);

  const [productCreditCommandeFilter, setProductCreditCommandeFilter] = useState([])
  const [productPrecommandeFilter, setProductPrecommandeFilter] = useState([]);

  const [productCreditCommande, setProductCreditCommande] = useState([]);
  const [productPrecommande, setProductPrecommande] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // getProduitsPrecommande;
  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchModelsProduits = async () => {
  //     try {
  //       const data = await ProduitService.getProduits();
  //       const filsteredPro = data.filter(
  //         (p) =>
  //           p.type != "service" &&
  //           p.categ_id != "Services" &&
  //           p.categ_id != "Expenses" &&
  //           p.categ_id != "Internal" &&
  //           p.categ_id != "Consumable" &&
  //           p.categ_id != "Saleable"
  //       );
  //       setProducts(filsteredPro);
  //       setProductFilter(filsteredPro);
  //       setIsLoading(false);


  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des modèles", error);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchModelsProduits();
  // }, []);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;

    setIsLoading(true);
    try {
      const data = await ProduitService.getProduitsPerPage(page, 150);
      const filteredPro = data.
        filter(
          (p) =>
            p.type !== "service" &&
            p.categ_id !== "Services" &&
            p.categ_id !== "Expenses" &&
            p.categ_id !== "Internal" &&
            p.categ_id !== "Consumable" &&
            p.categ_id !== "Saleable"
        );

      setProducts(prevProducts => [...prevProducts, ...filteredPro]);
      setProductFilter(prevFilter => [...prevFilter, ...filteredPro]);
      setPage(prevPage => prevPage + 1);
      setTotalCount(data.totalCount);
      setHasMore(products.length + filteredPro.length < data.totalCount);

    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, products.length]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (hasMore && !isLoadingProduct) {
      const timer = setTimeout(() => {
        fetchProducts();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fetchProducts, hasMore, isLoadingProduct]);






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
    const fetchModelsProduitsCreditCommande = async () => {
      try {
        const data = await ProduitService.getProduitsCreditCommande();
        const filsteredPro = data.filter(
          (p) =>
            p.type != "service" &&
            p.categ_id != "Services" &&
            p.categ_id != "Expenses" &&
            p.categ_id != "Internal" &&
            p.categ_id != "Consumable" &&
            p.categ_id != "Saleable"
        );
        setProductCreditCommande(filsteredPro);
        setProductCreditCommandeFilter(filsteredPro);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des modèles produit credit commande",
          error
        );
        setIsLoading(false);
      }
    };

    fetchModelsProduitsCreditCommande();
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
            c.name != "Software" &&
            c.name != "All"
        );
        const categoriesWithAll = [{ id: "All", name: "All" }, ...filstered];
        setCategories(categoriesWithAll);
        setIsLoadingCategorie(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
        setIsLoadingCategorie(false);
      }
    };
    fetchModelsCatgeorie();
    setIsLoadingCategorie(false);
  }, []);

  // useEffect(() => {
  //   if (selectedCategory == "All") {
  //     setProductFilter(products);
  //     setProductPrecommandeFilter(productPrecommande);
  //     setProductCreditCommandeFilter(productCreditCommande);
  //   } else {
  //     const filsteredPro = products.filter(
  //       (p) => p.categ_id == selectedCategory
  //     );
  //     const filsteredPre = productPrecommande.filter(
  //       (p) => p.categ_id == selectedCategory
  //     );
  //     const filsteredCredit = productCreditCommande.filter(
  //       (p) => p.categ_id == selectedCategory
  //     );
  //     setProductCreditCommandeFilter(filsteredCredit);
  //     setProductPrecommandeFilter(filsteredPre);
  //     setProductFilter(filsteredPro);
  //   }
  // }, [selectedCategory]);


  useEffect(() => {
    if (selectedCategory === "All") {
      setProductFilter(products);
    } else {
      const filteredPro = products.filter(
        (p) => p.categ_id.toLowerCase() === selectedCategory.toLowerCase()
      );
      setProductFilter(filteredPro);
    }
  }, [selectedCategory, products]);


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
        productCreditCommande,
        productCreditCommandeFilter,
        totalCount
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
