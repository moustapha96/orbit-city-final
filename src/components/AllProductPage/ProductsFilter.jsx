/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react"
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { ProductContext } from "../../Provider/ProductContext"
import Categorieservice from "../../services/CategorieService"
import { useAuthContext } from "../../contexts/useAuthContext"

export default function ProductsFilter({ className, filterToggle, updateUrlParams, type = 3 }) {
  const { filters, updateFilters } = useContext(ProductContext)

  const { user } = useAuthContext()

  const handleVolumeChange = (value) => {
    updateFilters({ ...filters, min: value[0], max: value[1], page: 1 })
    updateUrlParams({ ...filters, min: value[0], max: value[1], page: 1 })
  }

  const handleTypeFilterChange = (event) => {
    const newType = event.target.value
    updateFilters({ ...filters, productType: newType, page: 1 })
    updateUrlParams({ ...filters, productType: newType, page: 1 })
  }

  const handleTagFilterChange = (event) => {
    const newTag = event.target.value
    updateFilters({ ...filters, tag: newTag, page: 1 })
    updateUrlParams({ ...filters, tag: newTag, page: 1 })
  }

  const [tags, setTags] = useState([])
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await Categorieservice.getTags()
        setTags(data)
        console.log(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error)
      }
    }
    fetchTags()
  }, [])

  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""
        } ${filterToggle ? "block" : "hidden lg:block"}`}
    >
      {/* Filtre par type de produit */}
      <div className="filter-subject-item pb-10 border-b border-qgray-border">
        <div className="subject-title mb-[20px]">
          <h1 className="text-black text-base font-500">Type de produits</h1>
        </div>
        <div className="flex flex-col gap-3 text-sm text-qgray">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="All"
              name="productType"
              checked={filters.productType === "All"}
              onChange={handleTypeFilterChange}
            />
            Tous les produits
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="promo"
              name="productType"
              checked={filters.productType === "promo"}
              onChange={handleTypeFilterChange}
            />
            Produits en promo
          </label>
          {user && user.adhesion == "accepted" && user.parent_id && (

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="credit"
                name="productType"
                checked={filters.productType === "credit"}
                onChange={handleTypeFilterChange}
              />
              Produits à crédit
            </label>
          )}
        </div>
      </div>


      {/* <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
        <div className="subject-title mb-[20px]">
          <h1 className="text-black text-base font-500">Filtrer par tags</h1>
        </div>
        <div className="text-sm text-qgray">
          <select
            className="w-full border border-qgray-border px-3 py-2 rounded"
            value={filters.tag || ""}
            onChange={handleTagFilterChange}
          >
            <option value="">Tous les tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug || tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div> */}


      {/* Échelle des prix */}
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

