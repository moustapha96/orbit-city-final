/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Banner({ className }) {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
  };
  return (
    <>


      <div className={`w-full ${className || ""}`}>
        <div className="main-wrapper w-full h-full mx-auto mt-5">
          <div className="hero-slider-wrapper xl:h-full mb-20 xl:mb-0 w-full relative">
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(/creation/ccbm_shop_banner_1.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/ccbm_shop_banner_2.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/ccbm_shop_banner_3.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/ccbm_shop_banner_4.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/ccbm_shop_banner_5.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
