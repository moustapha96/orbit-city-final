/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../Helpers/PageTitle";

import Layout from "../Partials/Layout";

import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

import BannerPub from "./BannerPub";

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
    <>
      <SEOHeader
        title="CCBM Shop - A propos de nous"
        description="En savoir plus sur CCBM Shop et notre mission."
        keywords="CCBM Shop, histoire, boutique en ligne, électroménager"
      />

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
                  <img src={`logo.png`} alt="about" className="w-full h" />
                </div>
                <div className="content flex-1 bg-gray-100 p-6 rounded shadow-md">
                  <h1 className="text-[18px] font-medium text-qblack mb-2.5  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-bleu-logo duration-300 ">
                    À propos de la Boutique
                  </h1>
                  <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                    <b>CCBM Shop</b> &nbsp; est une filiale du Groupe CCBM, une
                    boutique de vente de matériels électroniques en ligne. Nous
                    nous engageons à offrir une large gamme de produits de haute
                    qualité à des prix compétitifs. Que vous soyez à la
                    recherche des dernières innovations technologiques ou
                    d'appareils électroménagers fiables, nous avons tout ce
                    qu'il vous faut.
                  </p>
                  <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                    <li>
                      Téléviseurs et home cinéma : Transformez votre salon en
                      véritable cinéma avec nos téléviseurs haute définition et
                      systèmes home cinéma.
                    </li>
                    <li>
                      Electroménager : Équipez votre maison avec des appareils
                      électroménagers modernes et efficaces pour simplifier
                      votre quotidien.
                    </li>
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
            <div className="w-full md:w-2/3 p-2">
              <img
                src={`banner_ccbme_shop_pub.png`}
                alt="Description de la première image"
                className="w-full h-auto"
              />
            </div>
            {/* <div className="w-full md:w-1/3 p-2">
              <img
                src={`creation/ccbm_shop_banner_5.png`}
                alt="Description de la deuxième image"
                className="w-full h-auto"
              />
            </div> */}
          </div>

          <BannerPub />

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
    </>
  );
}
