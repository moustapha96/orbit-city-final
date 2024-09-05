/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";

export default function Footer({ type = 3 }) {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="container-x block mx-auto pt-[56px]">
        <div className="w-full flex flex-col items-center mb-[50px]">
          {/* logo area */}
          <div className="mb-[40px]">
            {type === 3 ? (
              <Link to="/">
                <img width="160" height="40" src="/logo.png" alt="logo" />
              </Link>
            ) : (
              <Link to="/">
                <img width="120" height="30" src="/logo.png" alt="logo" />
              </Link>
            )}
          </div>
          <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <div className="lg:flex justify-between mb-[50px]">
          <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0">
            <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">
              À propos de nous
            </h1>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
              CCBM Shop, la plateforme de vente du groupe CCBM, propose une
              vaste sélection de produits et un service après-vente avec des
              options de garantie étendues.
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">
                  Liens Utiles
                </h6>
              </div>
              <div>
                <ul className="flex flex-col space-y-4 ">
                  <li>
                    <Link to="/about">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        À propos de nous
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/terms-condition">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Termes et conditions
                      </span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/tracking-order">
                      <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                        Suivre Commande
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Liens généraux
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <Link to="/blogs">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Blog
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/all-products">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Meilleurs produits
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/conditions-generales-de-vente">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Conditions générales de vente
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/achats-securises">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Achats Sécurises
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/become-saller">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Devenez vendeur
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="lg:w-1/2 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Nos Services
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    {/* <li>
                      <Link to="/flash-sale">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Vente flash
                        </span>
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/faq">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          FAQ
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/politique-de-confidentialite">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Politique de confidentialité
                        </span>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/livraison-et-retours">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Livraison et Retours
                        </span>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              <Link href="#">
                <Instagram className="fill-current text-qgray hover:text-qblack" />
              </Link>
              <Link href="https://www.facebook.com/Orbitcityccbm">
                <Facebook className="fill-current text-qgray hover:text-qblack" />
              </Link>
              <Link href="https://www.youtube.com/@orbitcitybyccbm2908">
                <Youtube className="fill-current text-qgray hover:text-qblack" />
              </Link>
            </div>
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2024
              <a
                href="http://www.ccbm.sn/"
                target="_blank"
                rel="noreferrer"
                className="font-500 text-qblack mx-1"
              >
                CCBM-Shop
              </a>
              Tous droits réservés
            </span>
          </div>
          <div className="">
            <Link tp="/">
              <img
                width="318"
                height="28"
                src={`/paydunya.png`}
                alt="payment-getways"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
