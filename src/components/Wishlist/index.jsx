/* eslint-disable react/prop-types */
import { useContext } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { CartContext } from "../../contexts/CartContext";

import { toast } from "react-toastify";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

export default function Wishlist({ wishlist = true }) {
  const { clearWishlist, addAllWhislistToCart } = useContext(CartContext);

  const addAllToCart = () => {
    try {
      addAllWhislistToCart();
      toast.success("Produits ajouter au panier avec succès", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const cleanWishist = () => {
    clearWishlist();
  };
  return (
    <>
      <SEOHeader
        title="CCBM Shop | Liste de souhaits"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
        {wishlist === false ? (
          <div className="wishlist-page-wrapper w-full">
            <div className="container-x mx-auto">
              <BreadcrumbCom
                paths={[
                  { name: "Accueil", path: "/" },
                  { name: "liste de souhaits", path: "/wishlist" },
                ]}
              />
              <EmptyWishlistError />
            </div>
          </div>
        ) : (
          <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
            <div className="w-full">
              <PageTitle
                title="liste de souhaits"
                breadcrumb={[
                  { name: "Accueil", path: "/" },
                  { name: "liste de souhaits", path: "/wishlist" },
                ]}
              />
            </div>
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                <ProductsTable
                  addAllToCart={addAllToCart}
                  cleanWishist={cleanWishist}
                  className="mb-[30px]"
                />
              </div>
            </div>
          </div>
        )}
      </Layout></>
  );
}
