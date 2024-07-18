/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { CartContext } from "../../contexts/CartContext ";
import { useContext, useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";

import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import commandeService from "../../services/commandeService";

export default function CardPage({ cartt = true }) {
  const { cart, getCartTotal, clearCart, setOrderState, orderState } =
    useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleValidePanier = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("creation dela commande sur le odoo ");
    console.log(cart);

    const modelData = {
      partner_id: parseInt(localStorage.getItem("partner_id")),
      type_sale: "order",
      state: "sale",
      commitment_date: new Date(),
      order_lines: cart.map((orde) => ({
        id: orde.id,
        quantity: orde.quantity,
        list_price: orde.list_price,
      })),
    };
    try {
      const response = await commandeService.createCommande(modelData);
      console.log(response);
      toast.success("Commande créé avec succés", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(`/commandes/${response.id}/détails`);
      console.log(response);
      setOrderState(response);
      clearCart();
      console.log(orderState);
    } catch (error) {
      toast.error("Commande non validé ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Erreur lors de la récupération des modèles", error);
    }
    setIsLoading(false);
  };
  return (
    <Layout childrenClasses={cartt ? "pt-0 pb-0" : ""}>
      {cartt === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "Panier Commandes", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Panier Commande"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Panier Commande", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" />
              <div className="w-full sm:flex justify-between">
                <div className="flex space-x-2.5 items-center">
                  <Link to="/all-products">
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Continuer vos achats
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Sous Total
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {formatPrice(getCartTotal())}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>

                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total Non taxé
                      </p>
                      <p className="text-[18px] font-medium text-qred">
                        {" "}
                        {formatPrice(getCartTotal())}
                      </p>
                    </div>
                  </div>
                  {getCartTotal() != 0 && (
                    <Button
                      type="submit"
                      className="hover:bg-red-500  w-full"
                      onClick={(e) => handleValidePanier(e)}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Valider le Panier
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
