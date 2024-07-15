/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
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
import Categorieservice from "../../services/Categorieservice";
import ProduitService from "../../services/produitService";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [productS, setProducts] = useState([]);
  const [newProduits, setNewProduits] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        const dataProduct = await ProduitService.getProduits();
        setProducts(dataProduct);
        setNewProduits(dataProduct.slice(0, 6));
        console.log("produits new ", newProduits);
        console.log("Catégories récupérées", data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });
  // const [ads, setAds] = useState(false);
  // const adsHandle = () => {
  //   setAds(false);
  // };
  // useEffect(() => gs
  // {
  //   setAds(true);
  // }, []);
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
          products={productS}
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Gamer World"
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
          categoryTitle="Produits les plus vendus"
        >
          <SectionStyleTwo products={productS.slice(3, productS.length)} />
        </ViewMoreTitle>
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Meilleur vendeur"
        >
          <BestSellers />
        </ViewMoreTitle>
        <ProductsAds
          ads={[`/image1.jpg`, `/image2.jpg`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          categoryBackground={`${
            import.meta.env.VITE_PUBLIC_URL
          }/images/section-category-2.jpg`}
          products={productS.slice(4, productS.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Ventes populaires"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <ProductsAds
          ads={[`/image3.jpg`]}
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
          ads={[`/image4.jpg`]}
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
