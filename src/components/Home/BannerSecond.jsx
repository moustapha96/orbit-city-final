/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import SimpleSlider from "../Helpers/SliderCom";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BannerSecond({ className }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: false, // Désactiver le défilement automatique
    fade: true,
    arrows: true, // Activer les flèches de navigation
    dots: false, // Désactiver les points de navigation
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true, // Activer les points de navigation pour les écrans plus petits
        },
      },
    ],
  };
  const handlePrev = () => {
    if (sliderRef.current && sliderRef.current.slickPrev) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current && sliderRef.current.slickNext) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    // Vérifiez si le composant SimpleSlider est monté
    if (sliderRef.current) {
      console.log("Slider is mounted");
    }
  }, []);
  return (
    <>
      <div
        className={`hero-slider-wrapper w-full h-[150px] md:h-[600px] sm:h-[400px] lg:h-[570px] ${className || ""
          }`}
      >
        <div className="main-wrapper w-full h-full">
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute left-0 top-0 w-full h-full items-center justify-between flex">
              <button
                type="button"
                onClick={handlePrev}
                className="relative hover:text-bleu-logo text-[#8cb1f6] 2xl:left-32 left-5 cursor-pointer z-10"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="relative hover:text-bleu-logo text-[#8cb1f6] 2xl:right-32 right-5 cursor-pointer z-10"
              >
                <ArrowRight />
              </button>
            </div>
            <SimpleSlider settings={settings} selector={sliderRef}>


              <div className="item w-full h-[600px] sm:h-[400px] md:h-[300px] lg:h-[570px]">
                <div
                  className="w-full h-full relative bg-center"
                  style={{
                    backgroundImage: `url('/banner_ccbme_shop_pub_2.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "top center",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                ></div>
              </div>

              <div className="item w-full h-[600px] sm:h-[400px] md:h-[300px] lg:h-[570px]">
                <div
                  className="w-full h-full relative bg-center"
                  style={{
                    backgroundImage: `url('/banner_ccbme_shop_pub_1.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "top center",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                ></div>
              </div>
            </SimpleSlider>
          </div>
        </div>
      </div>

      {/* <div className={`w-full xl:h-[733px] h-[500px] ${className || ""}`}>
        <div className="main-wrapper w-full h-full">
          <div className="hero-slider-wrapper xl:h-full mb-20 xl:mb-0 w-full relative">
            <div className="absolute left-0 top-0 w-full h-full items-center justify-between hidden xl:flex">
              <button
                type="button"
                onClick={() => sliderRef.current.slickPrev()}
                className="relative hover:text-qh3-blue text-[#8cb1f6] 2xl:left-32 left-5 cursor-pointer z-10"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => sliderRef.current.slickNext()}
                className="relative hover:text-qh3-blue text-[#8cb1f6] 2xl:right-32 right-5 cursor-pointer z-10"
              >
                <ArrowRight />
              </button>
            </div>
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className="item w-full xl:h-[733px] h-[500px]">
                <div
                  className="w-full h-full relative bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/banner_ccbme_shop_pub_2.png)`,
                  }}
                ></div>
              </div>
              <div className="item w-full xl:h-[733px] h-[500px]">
                <div
                  className="w-full h-full relative bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/banner_ccbme_shop_pub_1.jpg)`,
                  }}
                ></div>
              </div>
            </SimpleSlider>
          </div>
        </div>
      </div> */}
    </>
  );
}
