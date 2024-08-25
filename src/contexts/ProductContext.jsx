/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import ProduitService from "../services/produitService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProduct, setIsLoading] = useState(false);
  const [searchContext, setSearchContext] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchModels = async () => {
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
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoadingProduct,
        searchContext,
        setSearchContext,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
