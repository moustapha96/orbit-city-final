/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client"
import { useRef, useState } from "react"
import SimpleSlider from "../Helpers/SliderCom"
import crea1 from "/src/assets/images/banner_ccbme_shop_pub_1.jpg"
import create_a_credit from "/src/assets/images/crea_a_credit_ccbm_shop.png"
import crea_en_promotion from "/src/assets/images/crea_en_promotion_ccbm_shop.png"
import ccbm_shop_crea_ramadan from "/src/assets/images/ccbm_shop_crea_ramadan.png"
import ccbm_shop_promo_korite from "/src/assets/images/ccbm_shop_promo_korite.png"
import ccbm_shop_promotion from "/src/assets/images/ccbm_shop_promotion.png";

import ccbm_shop_promo_tabaski from "/src/assets/images/ccbm_shop_promo_tabaski.png"

export default function BannerSecond({ className }) {
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(false)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - startX) > 5) {
      setIsDragging(true)
    }
  }

  const handleClick = (e, index) => {
    if (!isDragging) {
      const routes = ['/promo-tabaski', "/", "/", "/credit-commandes"]
      window.location.href = routes[index]
    }
  }

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: false,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: "10%",
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "10%",
        },
      },
    ],
    swipe: true,
    draggable: true,
  }

  return (
    <div className={`hero-slider-wrapper w-full mt-24 mb-12 ${className || ""}`}>
      <div className="main-wrapper max-w-7xl mx-auto relative">

        {/* <div className="fixed  left-0 right-0 bg-white border-t border-gray-200 p-3  z-50">
            <a
              href="tel:+221709221775"
              className="flex items-center justify-center space-x-2 text-green-600"
            >
              <FaPhone className="h-5 w-5 animate-pulse" />
              <span className="font-medium">+221 70 922 17 75</span>
            </a>
          </div> */}

        <div className="w-full relative overflow-visible">
          <SimpleSlider settings={settings} selector={sliderRef}>
            {[ccbm_shop_promo_tabaski, ccbm_shop_promotion, crea1, create_a_credit].map((image, index) => (
              <div
                key={index}
                className="px-2 relative"
                onClick={(e) => handleClick(e, index)}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
              >
                <div className="item w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] cursor-pointer">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-contain"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </SimpleSlider>
        </div>
      </div>
    </div>
  )
}
