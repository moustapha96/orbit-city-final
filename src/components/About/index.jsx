/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Helpers/Cards/BlogCard";
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import SimpleSlider from "../Helpers/SliderCom";
import Layout from "../Partials/Layout";

import blog from "../../data/blogs.json";
import DataIteration from "../Helpers/DataIteration";
import { RotateCw, ShieldCheck, Trophy, Truck } from "lucide-react";

export default function About() {
  const bgColor = "var(--bleu-logo)";
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: false,
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const slider = useRef(null);
  const prev = () => {
    slider.current.slickPrev();
  };
  const next = () => {
    slider.current.slickNext();
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          <PageTitle
            title="A propos de CCBM - SHOP"
            breadcrumb={[
              { name: "Accueil", path: "/" },
              { name: "A propos", path: "/about" },
            ]}
          />
        </div>

        <div className="aboutus-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0">
                <img
                  src={`creation/ccbm_shop_banner_2.png`}
                  alt="about"
                  className="w-full h"
                />
              </div>
              <div className="content flex-1">
                <h1 className="text-[18px] font-medium text-qblack mb-2.5">
                  À propos de la Boutique
                </h1>
                <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                  <b>CCBM SHOP</b> &nbsp; est une filiale du Groupe CCBM, une
                  boutique de vente des matériels électroniques en ligne.
                </p>
                <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                  <li>Téléphones et accessoires</li>
                  <li>Ordinateurs et périphériques</li>
                  <li>Téléviseurs et home cinéma</li>
                  <li>Electroménager</li>
                </ul>

                <Link to="/contact">
                  <div className="w-[121px] h-10">
                    <span className="blue-logo-btn">Contacter nous</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center ">
          <div className="w-full md:w-1/3 p-2">
            <img
              src={`creation/ccbm_shop_banner_4.png`}
              alt="Description de la première image"
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/3 p-2">
            <img
              src={`creation/ccbm_shop_banner_5.png`}
              alt="Description de la deuxième image"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* <div className="container-x mx-auto my-[60px]">
          <div
            data-aos="fade-down"
            className="best-services w-full  flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
            style={{ backgroundColor: bgColor }}
          >
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <Truck color="white" size={40} />
                  </span>
                </div>
                <div>
                  <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Livraison gratuite
                  </p>
                  <p className="text-sm text-white">
                    Lors d'une commande de plus de 10000 F CFA
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <RotateCw size={40} color="white" />
                  </span>
                </div>
                <div>
                  <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Retour gratuit
                  </p>
                  <p className="text-sm text-white">
                    Obtenez un retour dans les 30 jours
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    <ShieldCheck size={40} color="white" />
                  </span>
                </div>
                <div>
                  <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Paiement sécurisé
                  </p>
                  <p className="text-sm text-white">
                    Paiement en ligne 100% sécurisé
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span>
                    {" "}
                    <Trophy size={40} color="white" />{" "}
                  </span>
                </div>
                <div>
                  <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                    Meilleure qualité
                  </p>
                  <p className="text-sm text-white">
                    Garantie du produit original
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="blog-post-wrapper w-full mb-[30px]">
          <div className="container-x mx-auto">
            <div className="blog-post-title flex justify-center items-cente mb-[30px]">
              <h1 className="text-3xl font-semibold text-qblack">
                My Latest News
              </h1>
            </div>

            <div className="blogs-wrapper w-full">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
                <DataIteration datas={blog.blogs} startLength={0} endLength={2}>
                  {({ datas }) => (
                    <div
                      data-aos="fade-up"
                      key={datas.id}
                      className="item w-full"
                    >
                      <BlogCard datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
