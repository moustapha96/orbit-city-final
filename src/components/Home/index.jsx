/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
import { useCallback, useContext, useEffect, useState } from "react";


import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import ViewMoreTitlePack from "../Helpers/ViewMoreTitlePack";

import ViewMoreTitleCategorie from "../Helpers/ViewMoreTitleCategorie";
import Layout from "../Partials/Layout";
import BannerSecond from "./BannerSecond";

import CategoriesSection from "./CategoriesSection";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import BannerPub from "../About/BannerPub";
import { Loader2 } from "lucide-react";
import { PromoProductContext } from "../../Provider/PromoProductContext";
import { ProductContext } from "../../Provider/ProductContext";
import PackPromoService from "../../services/PackPromoService";
import SectionStyleTwoPack from "../Helpers/SectionStyleTwoPack";
import ProductsAds from "./ProductsAds";
import { FaPhone } from "react-icons/fa";

export default function Home() {

  const [produits, setProduits] = useState([])

  const {
    fetchProduitsHomePromo,
    isLoadingProductPromo, produitHomePromo,
    produitHomeFlash, isLoadingProductFlash,
    fetchProductsHomeFlash, produitHomeTabaski, isLoadingProductTabaski, fetchProductsHomeTabaski } = useContext(PromoProductContext)

  const { fetchProduitsHome, isLoadingProduct, produitHome } = useContext(ProductContext)
  const [packs, setPacks] = useState([])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    })
    fetchPack();
  }, [])

  // useEffect(() => {
  //   const produits = produitHome.filter((produit) => produit.image_256 !== null && produit.list_price !== 0).slice(0, 4) || produitHome;
  //   setProduits(produits)
  // }, [produitHome])

  useEffect(() => {
    if (produitHome && produitHome.length > 0) {
      // Produits valides : image non null ET prix > 0
      const produitsValides = produitHome.filter(
        (produit) => produit.image_256 && produit.list_price > 0
      );

      // Si on en a 4 ou plus, on les prend
      if (produitsValides.length >= 4) {
        setProduits(produitsValides.slice(0, 4));
      } else {
        const produitsRestants = produitHome.filter(
          (p) => !produitsValides.includes(p)
        );

        const produitsComplets = [...produitsValides, ...produitsRestants].slice(0, 4);

        setProduits(produitsComplets);
      }
    }
  }, [produitHome]);



  useEffect(() => {
    fetchProduitsHomePromo()
    fetchProduitsHome()
    fetchProductsHomeFlash()
    fetchProductsHomeTabaski()


  }, [fetchProduitsHomePromo, fetchProduitsHome, fetchProductsHomeFlash, fetchProductsHomeTabaski])

  const fetchPack = async () => {
    try {
      const resultat = await PackPromoService.getPacks();
      setPacks(resultat.data);
      // console.log(resultat.data)
    } catch (error) {
      console.error(error);
    }
  }




  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  useEffect(() => {
    if (packs.length > 0) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [packs]);


  return (
    <>
      <SEOHeader
        title="CCBM Shop | Boutique en ligne d'électroménager | Meilleures Offres"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité."
        keywords="électroménager, boutique en ligne, appareils électroménagers, CCBM Shop, ccbme, smart TV, téléviseur, réfrigérateur, orbit city, climatiseur, cuisinière, split, congelateur, micro onde, machine a laver"
      />
      <Layout type={3} childrenClasses="pt-0">

        <BannerSecond className=" lg:mt-9 lg:mb-[20px] sm:mb-[10px] mobile-collapsed" />

        {/* <BannerPub /> */}


        {produitHomeTabaski && produitHomeTabaski.length > 0 && <>

          <ViewMoreTitle
            className="top-selling-product mb-[60px]"
            seeMoreUrl="/promo-tabaski"
            categoryTitle="Spécial Tabaski"
          >
            {isLoadingProductTabaski ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <SectionStyleTwo products={
                produitHomeTabaski && produitHomeTabaski.length > 4
                  ? produitHomeTabaski.slice(0, 4)
                  : produitHomeTabaski
              }
              />
            )}
          </ViewMoreTitle>
        </>}



        {produitHomeFlash && produitHomeFlash.length > 0 && <>

          <ViewMoreTitle
            className="top-selling-product mb-[60px]"
            seeMoreUrl="/promo-ramadan"
            categoryTitle="Spécial Ramadan"
          >
            {isLoadingProductFlash ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <SectionStyleTwo products={
                produitHomeFlash && produitHomeFlash.length > 4
                  ? produitHomeFlash.slice(0, 4)
                  : produitHomeFlash
              }
              />
            )}
          </ViewMoreTitle>
        </>}

        <ViewMoreTitleCategorie
          className="my-categories mb-[60px] mt-0 mobile-collapsed"
          seeMoreUrl="/boutique"
          categoryTitle="Nos Catégories"
        >
          <CategoriesSection />
        </ViewMoreTitleCategorie>


        {produitHomePromo && produitHomePromo.length > 0 && (
          <ViewMoreTitle
            className="mt-8 top-selling-product mb-[60px]"
            seeMoreUrl="/en-promo"
            categoryTitle="Produits En Promotion"
          >
            <SectionStyleTwo
              products={
                produitHomePromo && produitHomePromo.length > 4
                  ? produitHomePromo.slice(0, 4)
                  : produitHomePromo
              }
            />
          </ViewMoreTitle>
        )}

        {packs && packs.length > 0 && (
          <ViewMoreTitlePack
            className="mt-8 top-selling-product mb-[60px]"
            seeMoreUrl="/"
            categoryTitle="Spéciale Saint Valentin"
            id="valentine-packs"
          >
            <SectionStyleTwoPack products={packs} />
          </ViewMoreTitlePack>
        )}

        {/* {produitHome && produitHome.length > 0 && (

          <ViewMoreTitle
            className="top-selling-product mb-[60px]"
            seeMoreUrl="/boutique"
            categoryTitle="Produits Disponibles"
          >
            {isLoadingProduct ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <SectionStyleTwo

                products={
                  produitHome && produits
                    ? produits
                    : produitHome
                }
              />
            )}
          </ViewMoreTitle>
        )} */}

        {produits && produits.length > 0 && (
          <ViewMoreTitle
            className="top-selling-product mb-[60px]"
            seeMoreUrl="/boutique"
            categoryTitle="Produits Disponibles"
          >
            {isLoadingProduct ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <SectionStyleTwo products={produits} />
            )}
          </ViewMoreTitle>
        )}




        {/*  */}



        <BannerPub />

        {/* <SectionStyleThree
          products={produitHome}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        /> */}

        {/* <ProductsAds
          sectionHeight="164"
          ads={[`${import.meta.env.VITE_PUBLIC_URL}assets/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        /> */}
        {/* 
        <SectionStyleFour
          products={produitHome}
          sectionTitle="Ventes populaires"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}

      </Layout>
    </>

  );
}
