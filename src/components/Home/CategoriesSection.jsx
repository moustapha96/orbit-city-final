/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import {
  AirVent,
  Heater,
  Layers3,
  Loader,
  Microwave,
  Refrigerator,
  SwatchBook,
  SwatchBookIcon,
  Tv,
  WashingMachine,
} from "lucide-react";

import { FaTv, FaFilm, FaMusic, FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

export default function CategoriesSection() {
  const navigate = useNavigate();
  const { categories, setSelectedCategory, selectedCategory } =
    useContext(ProductContext);
  const categoryIcons = {
    cuisiniere: Heater,
    "machine a laver": WashingMachine,
    "micro onde": Microwave,
    refrigerateur: Refrigerator,
    television: FaTv,
    All: Layers3,
    "climatiseur": AirVent,
    'congélateur': SwatchBook,
  };

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category.name);
    console.log("variable selected page accueil " + category.name);
    const isAllProductPage = window.location.pathname === "/all-products";
    const isPrecommandePage = window.location.pathname === "/pre-commandes";

    if (isPrecommandePage && selectedCategory) {
      navigate(`/pre-commandes`);
    } else if (!isAllProductPage) {
      navigate(`/all-products`);
    }
  };

  return (
    <>
      <div className="categories-section-wrapper w-full flex justify-center items-center">
        <div className="container-x mx-auto  ">
          <div className="w-full categories-items">
            <div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 gap-10 mb-[46px]">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.name] || FaTv;
                return (
                  <div
                    key={category.id}
                    className="item w-full group cursor-pointer"
                    onClick={(e) => handleCategoryChange(e, category)}
                  >
                    <div className="w-full flex justify-center">
                      <div className="w-[110px] h-[110px] rounded-full bg-[#EEF1F1] group-hover:bg-bleu-logo mb-2.5 flex justify-center items-center">
                        <span className="text-qblack group-hover:text-white">
                          <IconComponent size={50} strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <p className=" text-base text-qblack whitespace-nowrap toupper uppercase">
                        {category.name == "All" ? "Tout" : category.name}
                      </p>
                    </div>
                  </div>
                );
              })}
              {!categories && (
                <>
                  <div className="flex justify-center items-center ">
                    <Loader className="animate-spin"></Loader>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
