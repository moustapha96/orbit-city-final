/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";

import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
// import Ads from "./Ads";
import BannerSecond from "./BannerSecond";

import ProductsAds from "./ProductsAds";

import { ProductContext } from "../../contexts/ProductContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import CategoriesSection from "./CategoriesSection";
import { Link } from "react-router-dom";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import BannerPub from "../About/BannerPub";

export default function Home() {
  const { products, isLoadingProduct } = useContext(ProductContext);
  const { categories, isLoadingCategorie } = useContext(CategoryContext);

  const [newProduits, setNewProduits] = useState([]);

  const [precommandes, setPrecommandes] = useState([]);
  const [enpromo, setEnpromo] = useState([]);

  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      const inStockProducts = products.filter((product) => product.sale_ok);
      setNewProduits(inStockProducts.slice(0, 6));
      setCommandes(
        products.filter((p) => p.sale_ok && p.quantite_en_stock > 0)
      );
      const productsToDisplay =
        precommandes.length > 6 ? precommandes.slice(0, 6) : precommandes;
      setPrecommandes(
        products.filter((p) => p.sale_ok && p.is_preorder == true)
      );
      console.log(precommandes);
      setEnpromo(
        products.filter((p) => p.sale_ok == true && p.en_promo == true)
      );
    }
  }, [products]);

  // const { products } = datas;
  const brands = [];
  if (products.length != 0) {
    products.forEach((product) => {
      brands.push(product.categ_id);
    });
  }

  return (
    <>
      <SEOHeader
        title="CCBM SHOP - Accueil"
        description="Découvrez les meilleures offres sur CCBM Shop, votre boutique en ligne d'électroménager."
        keywords="électroménager, boutique en ligne, appareils électroménagers, CCBM Shop"
      />
      <Layout type={3} childrenClasses="pt-0">
        <BannerSecond className="lg:mb-[20px] sm:mb-[10px] mobile-collapsed" />
        <BannerPub />
        <ViewMoreTitle
          className="my-categories mb-[60px] mt-0 mobile-collapsed"
          seeMoreUrl="/all-products"
          categoryTitle="Nos Catégories"
        >
          <CategoriesSection />
        </ViewMoreTitle>
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/pre-commandes"
          categoryTitle="Disponible en précommandes"
        >
          <div className="flex justify-center  ">
            <p className="mb-2 text-center bg-bleu-logo text-base md:text-xl  font-700 leading-snug py-[6px] px-3 uppercase rounded-full tracking-wider text-white animate-up-down  animate-up-down">
              50% de réduction en précommande &nbsp;
              <Link
                to="/faq"
                className="text-qyellow underline hover:text-white transition-colors duration-300"
              >
                en savoir plus
              </Link>
            </p>
          </div>
          <SectionStyleTwo
            products={
              precommandes.length > 4 ? precommandes.slice(0, 4) : precommandes
            }
          />
        </ViewMoreTitle>
        {/* <ProductsAds
          sectionHeight="164"
          ads={[`creation/banner_ccbm_shop_reduction_tele.png`]}
          className="products-ads-section mb-[60px]"
        /> */}

        <ProductsAds
          sectionHeight="130"
          ads={[`banner_ccbme_shop_3.jpg`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleThree
          products={newProduits}
          sectionTitle="Nouvelles Arrivées"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        {/* {enpromo.length > 3 && (
          <>
            <SectionStyleFour
              products={enpromo}
              sectionTitle="Produits en promo"
              seeMoreUrl="/all-products"
              className="category-products mb-[60px]"
            />
          </>
        )} */}
        {/* <BannerPub /> */}
      </Layout>
    </>
  );
}
