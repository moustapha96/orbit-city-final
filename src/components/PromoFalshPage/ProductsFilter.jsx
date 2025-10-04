/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useContext, useState } from "react";
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css";

import { PromoProductContext } from "../../Provider/PromoProductContext";
import Checkbox from "../Helpers/Checkbox";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ProductsFilter({ className, filterToggle, updateUrlParams }) {
  const { filters, updateFilters } = useContext(PromoProductContext);
  const [filterState, setFilterState] = useState(filters);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleVolumeChange = (value) => {
    setFilterState({ ...filterState, min: value[0], max: value[1] });
    updateUrlParams({ ...filterState, min: value[0], max: value[1] });
  };

  const handleCheckboxChange = (filterName, value) => {
    const currentValues = filterState[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilterState({ ...filterState, [filterName]: newValues });
  };

  const categories = ["Réfrigérateurs", "Climatiseurs", "Télévisions", "Lave-linges", "Cuisinières"];
  const sizes = ["Petit", "Moyen", "Grand", "Très grand"];
  const brands = ["Samsung", "LG", "Whirlpool", "Bosch", "Electrolux"];
  const colors = ["Blanc", "Noir", "Inox", "Rouge", "Bleu"];

  return (
    <div className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-6 pt-10 ${className || ""} ${filterToggle ? "block" : "hidden lg:block"}`}>

      <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
        <div className="subject-title mb-[30px]">
          <h1 className="text-black text-base font-500">Échelle des prix</h1>
        </div>
        <div className="price-range mb-5">
          <RangeSlider value={[filters.min, filters.max]} onInput={handleVolumeChange} min={4000} max={5000000} />
        </div>
        <p className="text-xs text-qblack font-400">
          Prix (FCFA): {filters.min} - {filters.max}
        </p>
      </div>


      {/* <FilterSection title="Catégories de produits" items={categories} filterName="category" openSections={openSections} toggleSection={toggleSection} handleCheckboxChange={handleCheckboxChange} filterState={filterState} />
      <FilterSection title="Tailles" items={sizes} filterName="sizes" openSections={openSections} toggleSection={toggleSection} handleCheckboxChange={handleCheckboxChange} filterState={filterState} />
      <FilterSection title="Marques" items={brands} filterName="brands" openSections={openSections} toggleSection={toggleSection} handleCheckboxChange={handleCheckboxChange} filterState={filterState} />
      <FilterSection title="Couleurs" items={colors} filterName="colors" openSections={openSections} toggleSection={toggleSection} handleCheckboxChange={handleCheckboxChange} filterState={filterState} /> */}
    </div>
  );
}

function FilterSection({ title, items, filterName, openSections, toggleSection, handleCheckboxChange, filterState }) {
  return (
    <div className="filter-subject-item pb-4 border-b border-gray-300">
      <div className="subject-title flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection(filterName)}>
        <h1 className="text-black text-base font-medium">{title}</h1>
        {openSections[filterName] ? <FaMinus className="text-gray-600" /> : <FaPlus className="text-gray-600" />}
      </div>
      {openSections[filterName] && (
        <div className="filter-items">
          <ul>
            {items.map((item) => (
              <li key={item} className="item flex justify-between items-center mb-2">
                <div className="flex space-x-3 items-center">
                  <Checkbox
                    id={`${filterName}-${item}`}
                    name={`${filterName}-${item}`}
                    handleChange={() => handleCheckboxChange(filterName, item)}
                    checked={filterState[filterName]?.includes(item)}
                  />
                  <label htmlFor={`${filterName}-${item}`} className="text-sm font-normal capitalize">
                    {item}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
