/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useEffect, useState } from "react";
import PaiementService from "../../services/paimentService";

import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import PrecommandeService from "../../services/precommandeService";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import PaydunyaModalService from "../../services/PaydunyaModalService";
export default function PreOrderPage() {
  // const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [precommande, setPrecommande] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numpayment, setNumPayment] = useState(0);
  const [pricepayment, setPricePayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  console.log(id);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await PrecommandeService.getPreCommandeById(id);
        setPrecommande(data);
        console.log("page details precommande");
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const validerPaiment = async (e, idpayment, montant) => {
    e.preventDefault();
    setIsLoading(true);
    setNumPayment(idpayment);
    console.log(precommande);
    console.log("Num payment " + numpayment);
    console.log("id payment" + idpayment);
    setPricePayment(montant);
    if (idpayment != null && montant != null) {
      setShowPaymentModal(true);
    }

    setIsLoading(false);
  };
  const handlePay = async () => {
    console.log(numpayment, pricepayment);
    setIsLoading(true);
    try {
      const responsePaiment =
        await PaiementService.createPrecommandePaimentState(
          precommande.id,
          numpayment,
          pricepayment
        );
      navigate(`/profile#preorder`);
      console.log(precommande);
      console.log(responsePaiment);
      toast.success(" Pré Commande validé avec succés", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // navigate(`/pre-commandes/${precommande.id}/détails`);
    } catch (error) {
      console.error("Erreur lors de la creation de precommande", error);
      toast.error(" Pré Commande non éffectif", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Détails Pré Commande"
            breadcrumb={[
              { name: "Accueil", path: "/" },
              { name: "Pré Commandes", path: "/profile#preorder" },
              { name: "Détails Pré Commande " },
            ]}
          />
        </div>
        {precommande && (
          <div className="checkout-main-content w-full">
            <div className="container-x mx-auto">
              <div className="w-full sm:mb-10 mb-5">
                <div className="sm:flex sm:space-x-[18px] s">
                  <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                    <a href="#">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          N°Pré Commande <span>{precommande.name}</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="flex-1 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Statut :{" "}
                        {precommande.advance_payment_status === "not_paid" && (
                          <span className="text-red-500">(Non Payé)</span>
                        )}
                        {precommande.advance_payment_status === "paid" && (
                          <span className="text-green-500"> (Payé)</span>
                        )}
                        {precommande.advance_payment_status === "partial" && (
                          <span className="text-yellow-500">
                            {" "}
                            (Partiellement Payer)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:flex sm:space-x-[18px] s">
                  <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      Date de la commande &nbsp;
                      <span>{formatDate(precommande.date_order)}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      Date de prévisionnelle livraison &nbsp;
                      <span>{formatDate(precommande.commitment_date)}</span>
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
                        {precommande.order_lines.map((produit, index) => (
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

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Montant Total
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {formatPrice(precommande.amount_total)}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Premier Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              precommande.first_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {precommande.first_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              precommande.first_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(precommande.first_payment_amount)}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Deuxieme Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              precommande.second_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {precommande.second_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              precommande.second_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(precommande.second_payment_amount)}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Troisieme Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              precommande.third_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {precommande.third_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              precommande.third_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(precommande.third_payment_amount)}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {formatPrice(precommande.amount_tax)}
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(precommande.amount_total)}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Total Restant
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(precommande.amount_residual)}
                        </dd>
                      </dl>
                    </div>

                    {precommande.advance_payment_status == "not_paid" ||
                    precommande.advance_payment_status == "partial" ? (
                      <div>
                        <div className="w-full h-[50px] black-btn flex justify-center items-center">
                          {!precommande.first_payment_state && (
                            <Button
                              type="submit"
                              onClick={(e) =>
                                validerPaiment(
                                  e,
                                  1,
                                  precommande.first_payment_amount
                                )
                              }
                              className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                              disabled={isLoading}
                            >
                              {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Paiement de ({" "}
                              {formatPrice(precommande.first_payment_amount)} )
                            </Button>
                          )}
                          {precommande.first_payment_state &&
                            !precommande.second_payment_state && (
                              <Button
                                type="submit"
                                onClick={(e) =>
                                  validerPaiment(
                                    e,
                                    2,
                                    precommande.second_payment_amount
                                  )
                                }
                                className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                disabled={isLoading}
                              >
                                {isLoading && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Paiement de ({" "}
                                {formatPrice(precommande.second_payment_amount)}{" "}
                                )
                              </Button>
                            )}
                          {precommande.first_payment_state &&
                            precommande.second_payment_state &&
                            !precommande.third_payment_state && (
                              <>
                                <Button
                                  type="submit"
                                  onClick={(e) =>
                                    validerPaiment(
                                      e,
                                      3,
                                      precommande.third_payment_amount
                                    )
                                  }
                                  className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                  disabled={isLoading}
                                >
                                  {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  )}
                                  Paiement de ({" "}
                                  {formatPrice(
                                    precommande.third_payment_amount
                                  )}{" "}
                                  )
                                </Button>
                              </>
                            )}
                          <>
                            <PaydunyaModalService
                              handlePay={handlePay}
                              totalAmount={pricepayment}
                              onClose={() => setShowPaymentModal(false)}
                              order={precommande}
                              type={"precommande"}
                              tranche={numpayment}
                            />
                          </>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[50px] flex justify-center items-center">
                        <span className="text-green-500">
                          {" "}
                          Payment effectif
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
    </Layout>
  );
}
