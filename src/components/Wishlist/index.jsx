import { useContext } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { CartContext } from "../../contexts/CartContext ";

export default function Wishlist({ wishlist = true }) {
  const { clearWishlist } = useContext(CartContext);

  const cleanWishist = () => {
    clearWishlist();
  };
  return (
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
              <ProductsTable className="mb-[30px]" />
              <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                <div className="sm:flex sm:space-x-[30px] items-center">
                  <button type="button" onClick={cleanWishist}>
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      Nettoyer la liste
                    </div>
                  </button>
                  <div className="w-[180px] h-[50px]">
                    <button type="button" className="blue-logo-btn">
                      <div className="w-full text-sm font-semibold">
                        Ajouter au panier
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
