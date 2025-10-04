/* eslint-disable no-unused-vars */
<<<<<<< HEAD
"use client"
import { useContext, useRef, useEffect } from "react"
import { Loader } from "lucide-react"
import { useCategory } from "../../Provider/CategoryContext"
import { ProductContext } from "../../Provider/ProductContext"
import { PromoProductContext } from "../../Provider/PromoProductContext"
=======
import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import {
  AirVent,
  Heater,
  Layers3,
  Loader,
  Microwave,
  Refrigerator,
  Snowflake,
  SwatchBook,
  SwatchBookIcon,
  Tv,
  WashingMachine,
} from "lucide-react";
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

import { useNavigate, useLocation } from "react-router-dom"

import airFryer from "../../assets/categories/air-fryer.png"
import aspirateur from "../../assets/categories/aspirateur.png"
import barreDeSon from "../../assets/categories/barre-de-son.png"
import bouilloire from "../../assets/categories/bouilloire.png"
import chauffeEau from "../../assets/categories/chauffe-eau.png"
import climatiseur from "../../assets/categories/climatiseur.png"
import congelateur from "../../assets/categories/congelateur.png"
import cuisiniere from "../../assets/categories/cuisiniere.png"
import extracteurDeJus from "../../assets/categories/extracteur-de-jus.png"
import ferARepasser from "../../assets/categories/fer-a-repasser.png"
import fontaine from "../../assets/categories/fontaine.png"
import four from "../../assets/categories/four.png"
import fourEncastrable from "../../assets/categories/four-encastrable.png"
import homeCinema from "../../assets/categories/home-cinema.png"
import hotteDeCuisine from "../../assets/categories/hotte-de-cuisine.png"
import laveVaisselle from "../../assets/categories/lave-vaisselle.png"
import machineACafe from "../../assets/categories/machine-a-cafe.png"
import machineALaver from "../../assets/categories/machine-a-laver.png"
import microOnde from "../../assets/categories/micro-onde.png"
import miniChaine from "../../assets/categories/mini-chaine.png"
import mixeur from "../../assets/categories/mixeur.png"
import nonCategorise from "../../assets/categories/all.png"
import plaqueDeCuisson from "../../assets/categories/plaque-de-cuisson.png"
import refrigerateur from "../../assets/categories/refrigerateur.png"
import regulateur from "../../assets/categories/regulateur.png"
import secheLinge from "../../assets/categories/seche-linge.png"
import telephone from "../../assets/categories/telephone.png"
import television from "../../assets/categories/television.png"
import ventilateur from "../../assets/categories/ventilateur.png"
import all from "../../assets/categories/all.png"


const categoryImages = {
  All: all,
  "AIR FRYER": airFryer,
  ASPIRATEUR: aspirateur,
  "BARRE DE SON": barreDeSon,
  BOUILLOIRE: bouilloire,
  "CHAUFFE EAU": chauffeEau,
  CLIMATISEUR: climatiseur,
  CONGELATEUR: congelateur,
  CUISINIERE: cuisiniere,
  "EXTRACTEUR DE JUS": extracteurDeJus,
  "FER A REPASSER": ferARepasser,
  FONTAINE: fontaine,
  FOUR: four,
  "FOUR ENCASTRABLE": fourEncastrable,
  "HOME CINEMA": homeCinema,
  "HOTTE DE CUISINE": hotteDeCuisine,
  "LAVE VAISSELLE": laveVaisselle,
  "MACHINE A CAFE": machineACafe,
  "MACHINE A LAVER": machineALaver,
  "MICRO ONDE": microOnde,
  "MINI CHAINE": miniChaine,
  MIXEUR: mixeur,
  "Non catégorisé": nonCategorise,
  "PLAQUE DE CUISSON": plaqueDeCuisson,
  REFRIGERATEUR: refrigerateur,
  REGULATEUR: regulateur,
  "SECHE LINGE": secheLinge,
  TELEPHONE: telephone,
  TELEVISION: television,
  VENTILATEUR: ventilateur,
}

export default function CategoriesSection() {
<<<<<<< HEAD
  const location = useLocation()
  const navigate = useNavigate()
  const { updateFilters: updateProductFilters } = useContext(ProductContext)
  const { updateFilters: updatePromoFilters } = useContext(PromoProductContext)
  const { categories, updateSelectedCategory } = useCategory()
=======
  const navigate = useNavigate();
  const { categories, setSelectedCategory, selectedCategory } =
    useContext(ProductContext);
  console.log(categories);
  const categoryIcons = {
    cuisiniere: Heater,
    "machine a laver": WashingMachine,
    "micro onde": Microwave,
    refrigerateur: Refrigerator,
    television: FaTv,
    All: Layers3,
    "climatiseur": AirVent,
    'congélateur': SwatchBook,
    "lave linge": SwatchBookIcon,
    "lave vaisselle": SwatchBookIcon,
    "split": AirVent,
    "CONGELATEUR": Refrigerator,
    "CONGELATEUR HORIZONTAL": Snowflake,
    "CONGELATEUR VERTICAL": Snowflake,

  };
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  console.log("categories", categories)
  const handleCategoryChange = (e, category) => {
    e.preventDefault()
    const newFilters = {
      category: category.name,
      page: 1,
      search: "",
      min: 5000,
      max: 5000000,
      limit: 9,
    }

    updateSelectedCategory(category.name)

    const params = new URLSearchParams()
    if (category.name !== "All") {
      params.set("page", "1")
      params.set("category", category.name)
    }

    if (location.pathname === "/en-promo") {
      updatePromoFilters(newFilters)
      navigate(`/en-promo?${params.toString()}`)
    } else if (location.pathname === "/promo-ramadan") {
      updatePromoFilters(newFilters)
      navigate(`/promo-ramadan?${params.toString()}`)
    } else {
      updateProductFilters(newFilters)
      navigate(`/boutique?${params.toString()}`)
    }
  }

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "All") return -1
    if (b.name === "All") return 1
    return 0
  })

  return (
<<<<<<< HEAD

    <div className="flex space-x-6">
      {sortedCategories.map((category) => {
        const imageSrc = categoryImages[category.name] || "@assets/categories/split.png"
        return (
          <div
            key={category.id}
            className="item flex-shrink-0 group cursor-pointer"
            onClick={(e) => handleCategoryChange(e, category)}
          >
            <div className="flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full bg-[#EEF1F1] group-hover:bg-bleu-logo mb-2.5 flex justify-center items-center overflow-hidden">
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={"ccbm shop " + category.name}
                  className="w-8 h-8 transform group-hover:scale-150 transition-transform duration-300 ease-in-out"
                />
              </div>
              <p className="text-sm text-qblack whitespace-nowrap uppercase text-center">
                {category.name === "All" ? "Tout" : category.name}
              </p>
=======
    <>
      <div className="categories-section-wrapper w-full flex justify-center items-center">
        <div className="container-x mx-auto  ">
          <div className="w-full categories-items">
            <div className="grid xl:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-10 mb-[46px]">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.name] || FaTv;
                return (
                  <div
                    key={category.id}
                    className="item w-full group cursor-pointer mb-4 "
                    onClick={(e) => handleCategoryChange(e, category)}
                  >
                    <div className="w-full flex justify-center">
                      <div className="w-[100px] h-[100px] rounded-full bg-[#EEF1F1] group-hover:bg-bleu-logo mb-2.5 flex justify-center items-center">
                        <span className="text-qblack group-hover:text-white">
                          <IconComponent size={40} strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-full flex justify-center">
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
            </div>
          </div>
        )
      })}
      {!categories.length && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>

  )
}
