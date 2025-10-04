/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";

import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";

import Layout from "../Partials/Layout";
import ProductView from "./ProductView";

<<<<<<< HEAD
import { useNavigate, useParams } from "react-router-dom";
import ProduitService from "../../services/produitService";
import { Loader } from "lucide-react";
import Reviews from "./Reviews";
import { createCommentaire, getCommentaireByProduit } from "../../services/CommentaireService";
import { useAuthContext } from "../../contexts/useAuthContext";
import useGoogleAnalytics from "../../Hooks/useGoogleAnalytics";

=======
import { useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import { ProductContext } from "../../contexts/ProductContext";
import ProduitService from "../../services/produitService";
import { Loader, Loader2, LoaderCircle } from "lucide-react";
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
export default function SingleProductPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const { trackEvent, trackPageView } = useGoogleAnalytics();
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const [produit, setProduit] = useState(null);

<<<<<<< HEAD

  const [quantity, setQuantity] = useState(1);
  const [report, setReport] = useState(false);

  const [tab, setTab] = useState("review");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [author, setAuthor] = useState(user ? user.name : "");

  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commnets, setComments] = useState([]);
=======
  const navigate = useNavigation();
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  // const produit = location.state.produit;
  const { id } = useParams();



  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      try {
        const res = await ProduitService.getProduitByCategorie(produit.categ_id);
<<<<<<< HEAD
        // exclude the product seletced
        const filteredProducts = res.filter((p) => p.id !== produit.id);
        console.log("produit reccueperer")
        console.log(filteredProducts, res)
        setProduits(filteredProducts);
=======
        setProduits(res);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    if (produit) {
<<<<<<< HEAD
      fetchRelatedProducts();
    }
    window.scrollTo(0, 0);
  }, [produit]);



  useEffect(() => {

    setIsLoadingProduct(true);
    if (!id) {
      navigate("/boutique")
      return
    }
=======
      fetchRelatedProducts(); // Appel de la fonction pour récupérer les produits relatés
    }

  }, [produit]);



  useEffect(() => {
    setIsLoadingProduct(true);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await ProduitService.getProduitById(id);
          setProduit(response);
<<<<<<< HEAD
          trackEvent('Image', 'image_produit', response.name, 1);
          console.log(response);
          fetchComment();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/boutique")
=======
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      }
      setIsLoadingProduct(false)
    };

    fetchProduct();
  }, [id]);


<<<<<<< HEAD
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    trackPageView(window.location.pathname);
  }, []);


  const fetchComment = async () => {
    setIsLoadingComments(true);
    try {
      if (id) {
        const response = await getCommentaireByProduit(id);
        setComments(response);
        // console.log("reponse commentaire ", response);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };



  const commentSectionRef = useRef(null);
  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const reviewAction = async () => {
    const data = {
      author,
      text: message,
      date: new Date().toISOString(),
      produit_id: id || "",
      review: rating || 0,
    };
    setLoading(true);
    try {
      const response = await createCommentaire(data);
      setComments((prev) => [...prev, response])
      setAuthor("");
      setMessage("");
      setRating(0);
      setHover(0);
      // window.scrollTo({
      //   top: 100,
      //   left: 0,
      //   behavior: "smooth",
      // });
      scrollToComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };
=======
  const [quantity, setQuantity] = useState(1);
  const [report, setReport] = useState(false);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74



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
<<<<<<< HEAD

=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
                <div className="container-x mx-auto">
                  <ProductView
                    produit={produit}
                    quantity={quantity}
                    reportHandler={() => setReport(!report)}
                  />
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <div
              className="product-des-wrapper w-full relative pb-[60px]"
              ref={reviewElement}
            >
              <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
                <div className="container-x mx-auto">
                  <ul className="flex space-x-12 ">

                    <li>
                      <span
                        onClick={() => setTab("review")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                          }`}
                      >
                        Commentaires
                      </span>
                    </li>

                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
              </div>
              <div className="tab-contents w-full min-h-[400px] ">
                <div className="container-x mx-auto">

                  {tab === "review" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">

                      {/* review-comments */}
                      <div className="w-full" ref={commentSectionRef}>
                        <Reviews
                          reviewLoading={reviewLoading}
                          reviewAction={reviewAction}
                          comments={commnets && commnets.reverse().slice(0, 4)}
                          author={author}
                          authorHandler={(e) => setAuthor(e.target.value)}
                          message={message}
                          messageHandler={(e) => setMessage(e.target.value)}
                          rating={rating}
                          ratingHandler={setRating}
                          hoverRating={hover}
                          hoverHandler={setHover}
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

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
<<<<<<< HEAD

                  {isLoadingProduct ? (
                    <div className="flex justify-center items-center w-full h-full">
                      <Loader size={50} className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      {/* <p className="text-xl font-semibold">Produit non disponible</p> */}
                      <button
                        className="bg-bleu-logo hover:bg-bleu-claire text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() => navigate("/boutique", { replace: true })}
                      >
                        Retour à la page boutique
                      </button>
                    </>
                  )}
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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
<<<<<<< HEAD
                    ) : <>
                      {produits && produits.length > 0 && <>

                        <DataIteration
                          datas={produits}
                          startLength={0}
                          endLength={produits.length > 5 ? 5 : produits.length}
                        >
                          {({ datas }) => (
                            <div key={datas.id} className="item">
                              <ProductCardStyleOne datas={datas} />
                            </div>
                          )}
                        </DataIteration>
                      </>}
                    </>}
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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