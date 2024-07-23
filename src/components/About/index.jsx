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
                <img src={`image3.jpg`} alt="about" className="w-full h" />
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

        <div className="customer-feedback w-full bg-white py-[60px]">
          <div className="title flex justify-center mb-5">
            <h1 className="text-[30px] font-semibold text-qblack">
              Customers Feedback
            </h1>
          </div>
          <div className="feedback-slider-wrapper w-vw relative overflow-hidden">
            <SimpleSlider selector={slider} settings={settings}>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item h-[385px] bg-primarygray sm:px-10 sm:py-9 p-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="rating flex space-x-1 items-center">
                    <div className="flex items-center">
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                      <Star w="20" h="20" />
                    </div>
                    <span className="text-[13px] text-qblack">(5.0)</span>
                  </div>
                  <div className="text-[15px] text-qgraytwo leading-[30px] text-justify line-clamp-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an into the find unknown printer took a galley of type
                    and scrambled it to make a type inot the specimen book. It
                    has survived not only five centuries but also the on leap
                    into find it a electronic typesetting, remaining end to make
                    it.
                  </div>
                  <div className="flex items-center space-x-2.5 mt-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img src={`/images/comment-user-1.png`} alt="user" />
                    </div>
                    <div>
                      <p className="text-[18px] text-qblack font-medium">
                        Ridoy Rock
                      </p>
                      <p className="text-qgraytwo text-[13px]">London,UK</p>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleSlider>

            <div className="slider-btns flex justify-center mt-[40px]">
              <div className="flex space-x-5 item-center">
                <button
                  onClick={prev}
                  type="button"
                  className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qyellow text-qyellow focus:bg-qyellow focus:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  type="button"
                  className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qyellow text-qyellow focus:bg-qyellow focus:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-x mx-auto my-[60px]">
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
        </div>

        <div className="blog-post-wrapper w-full mb-[30px]">
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
        </div>
      </div>
    </Layout>
  );
}
