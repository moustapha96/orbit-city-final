/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import RangeSlider from "react-range-slider-input";
import Checkbox from "../Helpers/Checkbox";
import { useContext, useEffect, useState } from "react";
import { Asterisk, MoveRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";

export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
  handleCategoryChange,
  type = 3,
}) {
  console.log(volume);
  const { categories, selectedCategory } = useContext(CategoryContext);

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Catégories Produits
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    id={`category-${category.id}`}
                    name={`category-${category.id}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div
                      className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack ${
                        type === 3
                          ? "hover:bg-bleu-logo hover:text-white"
                          : "hover:bg-qyellow"
                      } ${
                        selectedCategory.id === category.id
                          ? "bg-qyellow  text-bleu-logo"
                          : ""
                      }`}
                    >
                      <div className={`flex items-center space-x-6 `}>
                        <span className="text-xs font-400">
                          {category.name == "All" ? (
                            <>Tout</>
                          ) : (
                            <> {category.name} </>
                          )}
                        </span>
                      </div>
                      <div>
                        <span>
                          <MoveRight></MoveRight>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Échelle des prix</h1>
          </div>
          <div className="price-range mb-5">
            <RangeSlider
              value={[volume.min, volume.max]}
              onChange={volumeHandler}
              min={1000}
              max={100000000}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Prix: ${volume.min} - ${volume.max}
          </p>
        </div> */}
      </div>
    </>
  );
}
