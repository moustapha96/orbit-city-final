/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import RangeSlider from "react-range-slider-input";
import Checkbox from "../Helpers/Checkbox";
import { useEffect, useState } from "react";
import Categorieservice from "../../services/categorieservice";
import { Plus } from "lucide-react";

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
}) {
  console.log(volume);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

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
                <li
                  key={category.id}
                  className="item flex justify-between items-center mb-5"
                >
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <Checkbox
                        id={`category-${category.id}`}
                        name={`category-${category.id}`}
                        handleChange={() => handleCategoryChange(category.id)}
                        checked={filters.category.includes(category.id)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-xs font-black font-400 capitalize"
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                  <div>
                    <Plus></Plus>
                  </div>
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
