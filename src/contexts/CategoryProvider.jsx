/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CategoryContext from "./CategoryContext";

const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, selectCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
