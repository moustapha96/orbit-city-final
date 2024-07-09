import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useEffect, useState } from "react";
import PaiementService from "../../services/paimentService";
import commandeService from "../../services/CommandeService";
import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import PrecommandeService from "../../services/precommandeService";
import { Button, Spinner } from "flowbite-react";
import { Loader2 } from "lucide-react";

export default function PreOrderPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [commande, setCommande] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(id);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await PrecommandeService.getPreCommandeById(id);
        setCommande(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);
  const handlePay = async (paymentData) => {
    console.log("Payment data: ", paymentData);
    setIsLoading(true);
    // try {
    //   const responsePaiment = await PaiementService.createCommandePaiment(
    //     commande.id
    //   );
    //   console.log(responsePaiment);
    //   navigate("/pre-commandes");
    //   //   setShowPaymentModal(false);
    // } catch (error) {
    //   console.error("Erreur lors de la creation de precommande", error);
    // }
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
              { name: "Détails Pré Commande" },
            ]}
          />
        </div>
        {commande && (
          <div className="checkout-main-content w-full">
            <div className="container-x mx-auto">
              <div className="w-full sm:mb-10 mb-5">
                <div className="sm:flex sm:space-x-[18px] s">
                  <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                    <a href="#">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          N°Commande <span>{commande.name}</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="flex-1 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Statut :{" "}
                        {commande.advance_payment_status === "not_paid" && (
                          <span className="text-red-500">(Non Payé)</span>
                        )}
                        {commande.advance_payment_status === "paid" && (
                          <span className="text-green-500"> (Payé)</span>
                        )}
                        {commande.advance_payment_status === "partial" && (
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
                      <span>{formatDate(commande.date_order)}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      Date de prévisionnelle livraison &nbsp;
                      <span>{formatDate(commande.commitment_date)}</span>
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
                        {commande.order_lines.map((produit, index) => (
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
                            {formatPrice(commande.amount_total)}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Premier Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              commande.first_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {commande.first_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              commande.first_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(commande.first_payment_amount)}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Deuxieme Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              commande.second_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {commande.second_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              commande.second_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(commande.second_payment_amount)}
                          </dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Troisieme Tranche
                          </dt>
                          <dd
                            className={`text-base font-medium ${
                              commande.third_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {commande.third_payment_date}
                          </dd>
                          <dd
                            className={`text-base font-medium ${
                              commande.third_payment_state
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {formatPrice(commande.third_payment_amount)}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {formatPrice(commande.amount_tax)}
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(commande.amount_total)}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Total Restant
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(commande.amount_residual)}
                        </dd>
                      </dl>
                    </div>

                    {commande.advance_payment_status == "not_paid" ||
                    commande.advance_payment_status == "partial" ? (
                      <div>
                        <div className="shipping mt-[30px]">
                          <ul className="flex flex-col space-y-1">
                            <li>
                              <div className="flex space-x-2.5 items-center mb-5">
                                <div className="input-radio">
                                  <input
                                    type="radio"
                                    name="price"
                                    className="accent-pink-500"
                                    id="bank"
                                  />
                                </div>
                                <label
                                  htmlFor="bank"
                                  className="text-[18px] text-normal text-qblack"
                                >
                                  Credit/Debit Cards or Paypal
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="w-full h-[50px] black-btn flex justify-center items-center">
                          {!commande.first_payment_state && (
                            <Button
                              type="submit"
                              onClick={(e) => handlePay(e)}
                              className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                              disabled={isLoading}
                            >
                              {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Paiement de ({" "}
                              {formatPrice(commande.first_payment_amount)} )
                            </Button>
                          )}
                          {commande.first_payment_state &&
                            !commande.second_payment_state && (
                              <Button
                                type="submit"
                                onClick={(e) => handlePay(e)}
                                className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                disabled={isLoading}
                              >
                                {isLoading && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Paiement de ({" "}
                                {formatPrice(commande.second_payment_amount)} )
                              </Button>
                            )}
                          {commande.first_payment_state &&
                            commande.second_payment_state &&
                            !commande.third_payment_state && (
                              <>
                                <Button
                                  type="submit"
                                  onClick={(e) => handlePay(e)}
                                  className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                  disabled={isLoading}
                                >
                                  {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  )}
                                  Paiement de ({" "}
                                  {formatPrice(commande.third_payment_amount)} )
                                </Button>
                              </>
                            )}
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
