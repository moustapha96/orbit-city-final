/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import datas from "../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
// import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";

import { ProductContext } from "../../contexts/ProductContext";
import { CategoryContext } from "../../contexts/CategoryContext";

export default function Home() {
  const { products, isLoadingProduct } = useContext(ProductContext);
  const { categories, isLoadingCategorie } = useContext(CategoryContext);

  const [newProduits, setNewProduits] = useState([]);

  const [precommandes, setPrecommandes] = useState([]);

  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      setNewProduits(products.slice(0, 6));
      setCommandes(products.filter((p) => p.quantite_en_stock > 0));
      setPrecommandes(
        products.filter((p) => p.quanitty_virtuelle_disponible > 0)
      );
    }
  }, []);

  // const { products } = datas;
  const brands = [];
  if (products.length != 0) {
    products.forEach((product) => {
      brands.push(product.categ_id);
    });
  }
  const [ads, setAds] = useState(false);

  return (
    <>
      <Layout type={3} childrenClasses="pt-0">
        {/* {ads && <Ads handler={adsHandle} />} */}
        {/* <div className="btn w-5 h-5 "></div> */}
        <Banner className="banner-wrapper mb-[60px]" />
        <BrandSection
          type={3}
          sectionTitle="Nos Marques"
          className="brand-section-wrapper mb-[60px]"
        />
        <SectionStyleOne
          products={products}
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Nos Catégories"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2024-9-07 10:00:00"
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Disponible en commande"
        >
          <SectionStyleTwo products={commandes.slice(3, commandes.length)} />
        </ViewMoreTitle>
        {/* <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Meilleur vendeur"
        >
          <BestSellers />
        </ViewMoreTitle> */}
        <ProductsAds
          ads={[`/creation/television1.png`, `creation/television2.png`]}
          sectionHeight="sm:h-[295px]  h-full"
          className="products-ads-section mb-[60px] "
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/pre-commandes"
          categoryTitle="Disponible en précommandes"
        >
          <SectionStyleTwo
            products={precommandes.slice(3, precommandes.length)}
          />
        </ViewMoreTitle>
        <SectionStyleOne
          categoryBackground={`/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Ventes populaires"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        <ProductsAds
          ads={[`/creation/image_ccbm_shop_4.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleThree
          products={newProduits}
          sectionTitle="Nouvelles Arrivées"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          sectionHeight="164"
          ads={[`/creation/image_ccbm_shop_6.png`]}
          className="products-ads-section mb-[60px]"
        />
        {/* <SectionStyleFour
          products={productS}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}
      </Layout>
    </>
  );
}
