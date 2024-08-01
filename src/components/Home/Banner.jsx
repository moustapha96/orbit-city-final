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
      {/* <div className={`w-full xl:h-[733px] h-[500px] ${className || ""}`}> */}
      <div className={`w-full ${className || ""}`}>
        <div className="main-wrapper w-full h-full mx-auto mt-5">
          <div className="hero-slider-wrapper xl:h-full mb-20 xl:mb-0 w-full relative">
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(/creation/image_ccbm_shop_4.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">
                        <Link passhref="true">
                          <div rel="noopener noreferrer">
                            <div
                              className={`w-[160px] h-[52px] flex justify-center items-center group rounded bg-qh3-blue text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                                className || ""
                              }`}
                            >
                              <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                                <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                                  Acheter Maintenant
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`,
                                }}
                                className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/image_ccbm_shop_5.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">
                        <Link to="#" passhref="true">
                          <div rel="noopener noreferrer">
                            <div
                              className={`w-[160px] h-[52px] flex justify-center items-center group rounded bg-qh3-blue text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                                className || ""
                              }`}
                            >
                              <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                                <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                                  Voir nos produits
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`,
                                }}
                                className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[533px] h-[400px]">
                <div
                  style={{
                    backgroundImage: `url(/creation/image_ccbm_shop_7.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "80% auto",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                  <div className="container-x mx-auto flex items-center h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">
                        <Link to="#" passhref="true">
                          <div rel="noopener noreferrer">
                            <div
                              className={`w-[160px] h-[52px] flex justify-center items-center group rounded bg-qh3-blue text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                                className || ""
                              }`}
                            >
                              <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                                <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                                  Acheter Maintenant
                                </span>
                              </div>
                              <div
                                style={{
                                  transition: `transform 0.25s ease-in-out`,
                                }}
                                className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                              ></div>
                            </div>
                          </div>
                        </Link>
                      </div>
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
