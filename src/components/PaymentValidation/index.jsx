/* eslint-disable react/prop-types */
import { useLocation, useParams } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

import { useEffect, useState } from "react";
import commandeService from "../../services/CommandeService";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/date-format";
export default function PaymentValidationPage({ cart = true }) {
  //   const user = useSelector((state) => state.user.user);
  //   const tokenUser = useSelector((state) => state.user.token);
  //   const uid = useSelector((state) => state.user.uid);
  //   const [isLoading, setIsLoading] = useState(false);

  const { idCommande } = useParams();

  const [commande, setCommande] = useState(null);
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      setToken(paymentToken);
      console.log(token);
      // Vous pouvez également effectuer d'autres actions ici, comme mettre à jour l'état de la commande dans votre base de données
    }
    if (idCommande) {
      const fetchModels = async () => {
        try {
          const data = await commandeService.getCommandeById(idCommande);
          setCommande(data);
          console.log(data);
        } catch (error) {
          console.error("Erreur lors de la récupération de la commande", error);
        }
      };
      fetchModels();
    }
  }, [location, idCommande, token]);
  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profil" },
                { name: "Validation Payment Commande", path: "/payment" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Statut Paiment Commande"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profil" },
                { name: "Validation Payment Commande", path: "/payment" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              {commande && (
                <div className="checkout-main-content w-full">
                  <div className="container-x mx-auto">
                    <div className="w-full sm:mb-10 mb-5">
                      <div className="sm:flex sm:space-x-[18px] s">
                        <div className="flex-1 w-full mb-5 h-[70px]">
                          <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                            <span className="text-[15px] font-medium">
                              Token &nbsp;
                              <span>
                                {token && (
                                  <p>Le jeton de paiement est : {token}</p>
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:mb-10 mb-5">
                      <div className="sm:flex sm:space-x-[18px] s">
                        <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                          <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                            <span className="text-[15px] font-medium">
                              N°Commande <span>{commande.name}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 h-[70px]">
                          <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                            <span className="text-[15px] font-medium">
                              Statut :{" "}
                              {commande.advance_payment_status ===
                                "not_paid" && (
                                <span className="text-red-500">(Non Payé)</span>
                              )}
                              {commande.advance_payment_status === "paid" && (
                                <span className="text-green-500"> (Payé)</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:flex sm:space-x-[18px] s">
                        <div className="flex-1 w-full mb-5 h-[70px]">
                          <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                            <span className="text-[15px] font-medium">
                              Date de livraison &nbsp;
                              <span>
                                {formatDate(commande.commitment_date)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:flex lg:space-x-[30px]">
                      <div className="flex-1">
                        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                          Récapitulatif de la commande
                        </h1>
                        <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                          <div className="sub-total mb-6">
                            <div className=" flex justify-between mb-5">
                              <p className="text-[13px] font-medium text-qblack uppercase">
                                Produit
                              </p>
                              <p className="text-[13px] font-medium text-qblack uppercase">
                                total
                              </p>
                            </div>
                            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                          </div>
                          <div className="product-list w-full mb-[30px]">
                            <ul className="flex flex-col space-y-5">
                              {commande.order_line.map((produit, index) => (
                                <>
                                  <li key={index}>
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="text-[15px] text-qblack mb-2.5">
                                          {produit.product_name}
                                          <sup className="text-[13px] text-qgray ml-2 mt-2">
                                            x {produit.product_uom_qty}
                                          </sup>
                                        </h4>
                                        <p className="text-[13px] text-qgray">
                                          {produit.description}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-[15px] text-qblack font-medium">
                                          {formatPrice(produit.price_total)}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                          <div className="mt-[30px]">
                            <div className=" flex justify-between mb-5">
                              <p className="text-[13px] font-medium text-qblack uppercase">
                                SUBTOTAL
                              </p>
                              <p className="text-[15px] font-medium text-qblack uppercase">
                                {formatPrice(commande.amount_untaxed)}
                              </p>
                            </div>
                          </div>

                          <div className="w-full mt-[30px]">
                            <div className="sub-total mb-6">
                              <div className=" flex justify-between mb-5">
                                <div>
                                  <p className="text-base font-medium text-qblack">
                                    TAX
                                  </p>
                                </div>
                                <p className="text-[15px] font-medium text-qblack">
                                  {formatPrice(commande.amount_tax)}
                                </p>
                              </div>
                              <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                            </div>
                          </div>

                          <div className="mt-[30px]">
                            <div className=" flex justify-between mb-5">
                              <p className="text-2xl font-medium text-qblack">
                                Total
                              </p>
                              <p className="text-2xl font-medium">
                                {" "}
                                {["not_paid", "paid"].includes(
                                  commande.advance_payment_status
                                ) && (
                                  <span
                                    className={`text-${
                                      commande.advance_payment_status ===
                                      "not_paid"
                                        ? "red"
                                        : "green"
                                    }-500`}
                                  >
                                    {" "}
                                    {formatPrice(commande.amount_total)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
