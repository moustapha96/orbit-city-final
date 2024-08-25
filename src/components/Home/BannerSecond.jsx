/* eslint-disable react/prop-types */

import { useRef } from "react";
import SimpleSlider from "../Helpers/SliderCom";
import { Carousel } from "flowbite-react";

export default function BannerSecond({ className }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <div
        className={`hero-slider-wrapper w-full xl:h-[570px] h-[500px] md:h-[600px] sm:h-[400px] hidden lg:block hero-slider-wrapper ${
          className || ""
        }`}
      >
        <div className="main-wrapper w-full h-full ">
          <div className="xl:h-full xl:mb-0  md:mb-0  sm:mb-0  w-full relative overflow-hidden">
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className="item w-full xl:h-[570px] md:h-[600px] sm:h-[400px] h-[400px]">
                <div
                  className="w-full h-full relative md:bg-center  xl:bg-center"
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
              <div className="item w-full xl:h-[570px] md:h-[600px] sm:h-[400px] h-[300px]">
                <div
                  className="w-full h-full relative md:bg-center"
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
              {/* <div className="item w-full xl:h-[733px] md:h-[600px] sm:h-[400px] h-[300px]">
                <div
                  className="w-full h-full relative md:bg-center"
                  style={{
                    backgroundImage: `url('/banner_ccbme_shop_2.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "top center",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                ></div>
              </div> */}
            </SimpleSlider>
          </div>
        </div>
      </div>

      <div className="block lg:hidden w-full h-56 sm:h-64 md:h-[400px] xl:h-80 2xl:h-96 md:mt-8">
        <Carousel>
          <img
            src="/banner_ccbme_shop_pub_2.png"
            alt="CCBME banner 1"
            className="w-full h-full object-contain"
          />
          <img
            src="/banner_ccbme_shop_pub_1.jpg"
            alt="CCBME banner 2"
            className="w-full h-full object-contain"
          />
          {/* <img
            src="/banner_ccbme_shop_2.png"
            alt="CCBME banner"
            className="w-full h-full object-contain"
          /> */}
        </Carousel>
      </div>
    </>
  );
}
