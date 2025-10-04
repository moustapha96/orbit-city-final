/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import RangeSlider from "react-range-slider-input";
// import { useContext } from "react";
// import {
//   Loader2, MoveRight
// } from 'lucide-react';
// import { Link } from "react-router-dom";
// import { ProductContext } from "../../contexts/ProductContext";

// export default function ProductsFilter({
//   volume,
//   volumeHandler,
//   className,
//   filterToggle,
//   handleCategoryChange,
//   type = 3,
// }) {

//   const minVolume = volume.min < 5000 ? 5000 : volume.min;
//   const maxVolume = volume.max > 5000000 ? 5000000 : volume.max;

//   return (
//     <div
//       className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""
//         } ${filterToggle ? "block" : "hidden lg:block"}`}
//     >
//       <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
//         <div className="subject-title mb-[30px]">
//           <h1 className="text-black text-base font-500">Échelle des prix</h1>
//         </div>
//         <div className="price-range mb-5">
//           <RangeSlider
//             value={[volume.min, volume.max]}
//             onInput={volumeHandler}
//             min={5000}
//             max={5000000}
//           />
//         </div>
//         <p className="text-xs text-qblack font-400">
//           Prix (FCFA): {5000} - {5000000}
//         </p>
//       </div>

//     </div>
//   );
// }


import { useContext } from "react"
import RangeSlider from "react-range-slider-input"
import { PromoProductContext } from "../../Provider/PromoProductContext"

export default function ProductsFilter({ className, filterToggle, updateUrlParams, handleCategoryChange, type = 3 }) {
  const { filters, updateFilters } = useContext(PromoProductContext)

  const handleVolumeChange = (value) => {
    updateFilters({ ...filters, min: value[0], max: value[1], page: 1 })
    updateUrlParams({ ...filters, min: value[0], max: value[1], page: 1 })
  }

  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""
        } ${filterToggle ? "block" : "hidden lg:block"}`}
    >
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
    </div>
  )
}

