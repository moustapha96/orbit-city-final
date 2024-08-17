/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation, useNavigation, useParams } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import commandeService from "../../services/CommandeService";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/date-format";
import PaiementService from "../../services/paimentService";
import PrecommandeService from "../../services/precommandeService";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import paydunya from "paydunya";
import CheckoutInvoice from "paydunya/lib/checkout-invoice";
export default function PaymentCommandePage({ cart = true }) {
  const { idOrder } = useParams();

  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const tokenOrderPayement = localStorage.getItem("tokenOrderPayment");
  const statusOrderPayment = localStorage.getItem("statusOrderPayment");
  const tranche = parseInt(localStorage.getItem("tranchePayement"));
  const typePayment = localStorage.getItem("typePayment");

  const [commande, setCommande] = useState(null);
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [setup, setSetup] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      setToken(paymentToken);
      console.log(token);
      // const paydunyaSetup = new paydunya.Setup({
      //   masterKey: "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
      //   privateKey: "test_private_rLI7U4b3J0SjDBJQ7cEC9OCayn9",
      //   publicKey: "test_public_4FEHuOo9gsFwgPjoQv27L1deBlx",
      //   token: "UWVccdmuTo5tusRDkoZQ",
      //   mode: "test",
      // });
      // setSetup(paydunyaSetup);
      // const store = new paydunya.Store({
      //   name: "CCBM SHOP",
      //   email: "ccbm-shop@ccbm.sn",
      //   tagline: "Votre boutique a vos portés",
      //   phoneNumber: "784537547",
      //   postalAddress: "Dakar",
      //   logoURL: "https://orbitcitydev.com/logo.png",
      //   websiteURL: "https://orbitcitydev.com",
      // });
      // setStore(store);
      // const invoice = new CheckoutInvoice(setup, store);
      // invoice
      //   .confirm(paymentToken)
      //   .then(function () {
      //     console.log(invoice);
      //     toast.success("Payement validé avec succès", {
      //       position: "top-center",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   })
      //   .catch(function (e) {
      //     console.log(e);
      //     toast.error("Payement non effectif " + e, {
      //       position: "top-center",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   });
    }

    if (idOrder != null) {
      const fetchModels = async () => {
        try {
          const data = await commandeService.getCommandeById(idOrder);
          setCommande(data);
          console.log(data);

          console.log("order ");
        } catch (error) {
          console.error("Erreur lors de la récupération de la commande", error);
        }
      };

      fetchModels();
    }
  }, []);

  const validerPaimentCommande = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const reponse = await PaiementService.createCommandePaiment(commande.id);
      console.log(reponse);
      setIsLoading(false);
      toast.success("Payment Commande validé avec succés", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(`/commandes/${commande.id}/détails`);
    } catch (error) {
      console.error("Erreur lors de la creation du paiement", error);
      setIsLoading(false);
      navigate(`/commandes/${commande.id}/détails`);
      toast.error("Paiement Commande non éffectif", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profile" },
                { name: "Validation Payment Commande", path: "/payment" },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Statut Paiment Commande"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profile" },
                { name: "Validation Payment Commande", path: "/payment" },
              ]}
            />
          </div>
          {commande && typePayment === "commande" && (
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                {commande && typePayment === "commande" && (
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
                                  <span className="text-red-500">
                                    (Non Payé)
                                  </span>
                                )}
                                {commande.advance_payment_status === "paid" && (
                                  <span className="text-green-500">
                                    {" "}
                                    (Payé)
                                  </span>
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
                                {commande &&
                                  commande.order_lines.map((produit, index) => (
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

                            {commande.advance_payment_status === "not_paid" ? (
                              <div>
                                <Button
                                  type="submit"
                                  onClick={validerPaimentCommande}
                                  className="hover:bg-red-500   w-full h-[50px] black-btn flex justify-center items-center"
                                  disabled={isLoading}
                                >
                                  {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  )}
                                  Valider le Paiement de ({" "}
                                  {formatPrice(commande.amount_total)} )
                                </Button>
                              </div>
                            ) : (
                              <div className="w-full h-[50px] flex justify-center items-center">
                                <span className="text-green-500">
                                  {" "}
                                  le paiement a été effectué avec succès
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
