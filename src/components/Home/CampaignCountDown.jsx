/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CountDown from "../Helpers/CountDown";

export default function CampaignCountDown({
  className,
  lastDate,
  counterbg,
  appscreen,
}) {
  const { showDate, showHour, showMinute, showSecound } = CountDown(lastDate);

  return (
    <div>
      <div className={`w-full lg:h-[460px] ${className || ""}`}>
        <div className="container-x mx-auto h-full">
          <div className="lg:flex xl:space-x-[30px] lg:space-x-5 items-center h-full">
            <div
              data-aos="fade-right"
              className="campaign-countdown lg:w-1/2 h-full w-full mb-5 lg:mb-0"
              style={{
                background: `url(/creation/television1.png) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <Link to="/all-products">
                <div className="w-full xl:p-12 p-5">
                  <div className="countdown-wrapper w-full flex lg:justify-between justify-evenly mb-10">
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EB5757]">
                          {showDate}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Jours
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#2F80ED]">
                          {showHour}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Heures
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#219653]">
                          {showMinute}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Minutes
                      </p>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                        <span className="font-700 sm:text-[30px] text-[14px] text-[#EF5DA8]">
                          {showSecound}
                        </span>
                      </div>
                      <p className="sm:text-[18px] text-[12px] font-500 text-center leading-8">
                        Secondes
                      </p>
                    </div>
                  </div>
                  <div className="countdown-title mb-4">
                    <h1 className="text-[44px] text-qblack font-600">
                      Télévision LED
                    </h1>
                  </div>
                  <div className="inline-flex space-x-2 items-center border-b border-qyellow">
                    <span className="text-sm font-600 tracking-wide leading-7">
                      Acheter
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div
              data-aos="fade-left"
              className="download-app flex-1 lg:h-full h-[430px] xl:p-12 p-5"
              style={{
                background: `url(${
                  counterbg || `/images/download-app-cover.png`
                }) no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="get-app">
                  <h1 className="text-[30px] font-600 text-qblack leading-10">
                    Obtenez notre
                    <span className="text-bleu-logo border-b-2 border-bleu-logo mx-2">
                      Gamme de produits électroménagers
                    </span>
                    <br />
                    Cela vous simplifie la vie !
                  </h1>

                  {/* <div className="flex justify-center mb-0 items-center ">
                    <Link>
                      <img
                        width="370"
                        height="90"
                        src={`/creation/image_ccbm_shop_10.png`}
                        alt="cuisiniere ccbm shop"
                      />
                    </Link>
                  </div> */}
                </div>
                <div className="app-screen flex justify-center items-center">
                  <img
                    src={appscreen || `/creation/image_ccbm_shop_10.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
