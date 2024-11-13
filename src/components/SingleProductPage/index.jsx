/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";

import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";

import Layout from "../Partials/Layout";
import ProductView from "./ProductView";

import { useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import { ProductContext } from "../../contexts/ProductContext";
import ProduitService from "../../services/produitService";
import { Loader, Loader2, LoaderCircle } from "lucide-react";
export default function SingleProductPage() {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const [produit, setProduit] = useState(null);

  const navigate = useNavigation();

  // const produit = location.state.produit;
  const { id } = useParams();



  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      try {
        const res = await ProduitService.getProduitByCategorie(produit.categ_id);
        setProduits(res);
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    if (produit) {
      fetchRelatedProducts(); // Appel de la fonction pour récupérer les produits relatés
    }

  }, [produit]);



  useEffect(() => {
    setIsLoadingProduct(true);
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await ProduitService.getProduitById(id);
          setProduit(response);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setIsLoadingProduct(false)
    };

    fetchProduct();
  }, [id]);


  const [quantity, setQuantity] = useState(1);
  const [report, setReport] = useState(false);



  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full ">
          {produit ? <>

            <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
              <div className="breadcrumb-wrapper w-full ">
                <div className="container-x mx-auto">
                  <BreadcrumbCom
                    paths={[
                      { name: "Accueil", path: "/" },
                      { name: "Page Détails", path: "/single-product" },
                    ]}
                  />
                </div>
              </div>
              <div className="w-full bg-white pb-[60px]">
                <div className="container-x mx-auto">
                  <ProductView
                    produit={produit}
                    quantity={quantity}
                    reportHandler={() => setReport(!report)}
                  />
                </div>
              </div>
            </div>

          </> : <>
            <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
              <div className="breadcrumb-wrapper w-full ">
                <div className="container-x mx-auto">
                  <BreadcrumbCom
                    paths={[
                      { name: "Accueil", path: "/" },
                      { name: "Page Détails", path: "/single-product" },
                    ]}
                  />
                </div>
              </div>

              <div className="product-view-main-wrapper bg-white pt-[30px] w-full flex justify-center items-center min-h-screen">
                <div className="text-center">
                  {isLoadingProduct && (
                    <div className="flex justify-center items-center w-full h-full">
                      <Loader size={50} className="animate-spin" />
                    </div>
                  )}
                  <p className="text-xl font-semibold">Produit non disponible</p>
                  <button
                    className="bg-bleu-logo hover:bg-bleu-claire text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => navigate('/all-products')}
                  >
                    Retour à la page boutique
                  </button>
                </div>
              </div>
            </div>
          </>}

          {produits && produit && <>
            <div className="related-product w-full bg-white">
              <div className="container-x mx-auto">
                <div className="w-full py-[60px]">
                  <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                    Produits Relatés
                  </h1>

                  <div
                    data-aos="fade-up"
                    className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                  >

                    {isLoading ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <Loader size={50} className="animate-spin" />
                      </div>
                    ) : (
                      <DataIteration
                        datas={produits}
                        startLength={0}
                        endLength={produits.length > 4 ? 4 : produits.length}
                      >
                        {({ datas }) => (
                          <div key={datas.id} className="item">
                            <ProductCardStyleOne datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
          }
        </div>
      </Layout>
    </>
  );
}