/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useEffect, useState } from "react";
import PaiementService from "../../services/paimentService";

import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import PrecommandeService from "../../services/precommandeService";
import { Button, Label, TextInput } from "flowbite-react";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import PaydunyaModalService from "../../services/PaydunyaModalService";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import { useAuthContext } from "../../contexts/useAuthContext";
export default function PreOrderPage() {
  // const { state } = useLocation();
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [precommande, setPrecommande] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numpayment, setNumPayment] = useState(0);
  const [pricepayment, setPricePayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [montantAPayer, setMontantAPayer] = useState(0);
  const [errorMontantAPayer, setErrorMontantAPayer] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [stateButton, setStateButton] = useState(false);
  console.log(id);
  useEffect(() => {
    let isMounted = true;
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const data = await PrecommandeService.getPreCommandeById(user.id, id);
        if (isMounted) {
          setPrecommande(data);
          console.log(data)
          const responsePaymentDetails =
            await PaiementService.getPaymentDetailsByIdOrder(data.id);
          setPaymentDetails(responsePaymentDetails);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (precommande) {
      const shouldDisableButton =
        (precommande.first_payment_state && montantAPayer < 1000) ||
        (!precommande.first_payment_state &&
          montantAPayer < precommande.first_payment_amount) ||
        isLoading;

      setStateButton(shouldDisableButton);
    }
  }, [precommande, montantAPayer, isLoading]);

  const handleOpenInvoice = (url) => {
    if (url) {
      window.open(url, "_blank", 'noopener,noreferrer');
    }
  };

  const handleVerifyPayment = async (e, payment) => {
    console.log(payment)

    try {
      const resultaPayment = await PaiementService.confirmInvoice(payment.payment_token);

      if (resultaPayment.response_code === "00" && resultaPayment.status === "completed") {
        const url_facture = resultaPayment.receipt_url;
        let name = resultaPayment.customer.name;
        let email = resultaPayment.customer.email;
        let phone = resultaPayment.customer.phone;
        let token_status = true
        const responsePaymentDetails =
          await PaiementService.updatePaymentDetails(
            payment.id, resultaPayment.status, url_facture,
            name, email, phone, token_status);
        if (responsePaymentDetails) {

          try {

            const reponse = await PaiementService.createPrecommandePaimentMontant(
              payment.order_id,
              payment.amount,
              payment.payment_token
            );
            if (reponse) {

              toast.success("Paiement validé avec succès", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false);
          }
        }
      } else {
        toast.error("Vérification du paiement echouée", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la confirmation de l'invoice :",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  }
  const validerPaimentMontant = async (e, montantAPayer) => {
    e.preventDefault();
    if (montantAPayer < 1000) {
      toast.warning("Le Montant doit être strictement supérieur à 1000 F CFA", {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
      setShowPaymentModal(true);
      // console.log("show modal");
    }
    console.log(montantAPayer, precommande.id);
  };


  const handlePay = async () => {
    console.log(numpayment, pricepayment);
  };

  return (

    <>
      <SEOHeader
        title="CCBM Shop | Détails Précommande"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses="pt-0 pb-0">
        <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full mb-5">
            <PageTitle
              title="Détails Pré Commande"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                // { name: "Précommandes", path: "/profile#preorder" },
                { name: "Précommandes", path: "/profile#preorder" },
                { name: "Détails Précommande " },
              ]}
            />
          </div>
          {isLoading && (
            <div className="flex justify-center items-center w-full h-full">
              <Loader size={60} className="animate-spin" />
            </div>
          )}
          {precommande && (
            <div className="checkout-main-content w-full">
              <div className="container-x mx-auto">
                <div className="w-full sm:mb-10 mb-5">

                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/3 w-full mb-5 h-[70px]">

                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          N°Précommande <span>{precommande.name}</span>
                        </span>
                      </div>

                    </div>
                    <div className=" sm:w-1/3  flex-1 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Paiement :{" "}
                          {precommande.advance_payment_status === "not_paid" && (
                            <span className="text-red-500">Non Payé</span>
                          )}
                          {precommande.advance_payment_status === "paid" && (
                            <span className="text-green-500"> Payé </span>
                          )}
                          {precommande.advance_payment_status === "partial" && (
                            <span className="text-yellow-500">
                              {" "}
                              Partiellement Payé
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="sm:w-1/3 flex-1 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Statut :{" "}
                          {precommande.state == "sale" && <span className="text-green-500" > Validée </span>}
                          {precommande.state == "to_delivered" && <span className="text-yellow-500" > En cours de livraison </span>}
                          {precommande.state == "delivered" && <span className="text-green-600" > Livrée </span>}
                          {precommande.state != "delivered" && precommande.state != "sale" && precommande.state != "to_delivered" && <span className="text-gray-500" > Non validé </span>}
                        </span>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-[18px] space-y-5 sm:space-y-0 mb-5">
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong> Date Précommande </strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{formatDate(precommande.date_order)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>Date de livraison</strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">

                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{formatDate(precommande.commitment_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">

                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>  Total Payé &nbsp; </strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">
                            {formatPrice(
                              precommande.amount_total - precommande.amount_residual
                            )}
                          </span>
                        </div>
                      </div>

                    </div>
                    <div className="flex-1 h-[70px]">


                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>     Total Restant &nbsp; </strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">
                            {formatPrice(precommande.amount_residual)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>



                  {paymentDetails && paymentDetails.length > 0 && (
                    <>

                      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl sm:text-3xl text-qblack font-medium mb-5 text-center">
                          Récapitulatif Paiement
                        </h1>
                        <div className="w-full px-4 sm:px-10 py-6 sm:py-[30px] border border-[#EDEDED] rounded-lg">
                          <div className="mb-6">
                            <p className="text-sm sm:text-base font-medium text-qblack uppercase mb-2">
                              Détails Paiements
                            </p>
                            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                              <thead className="hidden sm:table-header-group">
                                <tr>
                                  <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Prénom & Nom
                                  </th>
                                  <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Téléphone
                                  </th>
                                  <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Montant Payé
                                  </th>
                                  <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Facture
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {paymentDetails.map((payment, index) =>
                                  payment.payment_state === 'completed' && (
                                    <tr key={index} className="sm:bg-white flex flex-col sm:table-row mb-6 sm:mb-0">
                                      <td className="px-4 py-3 sm:border-b border-gray-200">
                                        <div className="flex items-center justify-between sm:table-cell">
                                          <span className="sm:hidden font-medium">Prénom & Nom:</span>
                                          <span className="text-sm leading-5 text-gray-900">{payment.customer_name}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 sm:border-b border-gray-200">
                                        <div className="flex items-center justify-between sm:table-cell">
                                          <span className="sm:hidden font-medium">Téléphone:</span>
                                          <span className="text-sm leading-5 text-gray-900">{payment.customer_phone}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 sm:border-b border-gray-200">
                                        <div className="flex items-center justify-between sm:table-cell">
                                          <span className="sm:hidden font-medium">Email:</span>
                                          <span className="text-sm leading-5 text-gray-900">{payment.customer_email}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 sm:border-b border-gray-200">
                                        <div className="flex items-center justify-between sm:table-cell">
                                          <span className="sm:hidden font-medium">Montant Payé:</span>
                                          <span className="text-sm leading-5 text-gray-900">{formatPrice(payment.amount)}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 sm:border-b border-gray-200">
                                        <div className="flex items-center justify-between sm:table-cell">
                                          <span className="sm:hidden font-medium">Facture:</span>
                                          {!payment.token_status ? (
                                            <button
                                              className="text-sm leading-5 text-blue-600 underline"
                                              onClick={(e) => handleVerifyPayment(e, payment)}
                                            >
                                              Vérifier le paiement
                                            </button>
                                          ) : (
                                            <button
                                              className="text-sm leading-5 text-blue-600 underline"
                                              onClick={() => handleOpenInvoice(payment.url_facture)}
                                            >
                                              Ouvrir la facture
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>


                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl sm:text-3xl text-qblack font-medium mb-5 text-center">
                    Récapitulatif de la commande
                  </h1>
                  <div className="w-full p-4 sm:p-6 border border-[#EDEDED] rounded-lg shadow-sm">
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

                      <div className="border-t pt-4 space-y-2">
                        {[
                          { label: "Montant Total", value: formatPrice(precommande.amount_total) },
                          { label: "Premier Tranche", value: formatPrice(precommande.first_payment_amount), date: precommande.first_payment_date, state: precommande.first_payment_state },
                          { label: "Deuxieme Tranche", value: formatPrice(precommande.second_payment_amount), date: precommande.second_payment_date, state: precommande.second_payment_state },
                          { label: "Troisieme Tranche", value: formatPrice(precommande.third_payment_amount), date: precommande.third_payment_date, state: precommande.third_payment_state },
                        ].map((item, index) => (
                          <dl key={index} className="flex flex-wrap items-center justify-between gap-2">
                            <dt className="text-sm text-gray-500">{item.label}</dt>
                            {item.date && (
                              <dd className={`text-xs sm:text-sm font-medium ${item.state ? "text-green-500" : "text-red-500"}`}>
                                {item.date}
                              </dd>
                            )}
                            <dd className={`text-sm sm:text-base font-medium ${item.state ? "text-green-500" : (item.date ? "text-red-500" : "text-gray-900")}`}>
                              {item.value}
                            </dd>
                          </dl>
                        ))}
                      </div>
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Total à payer
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(precommande.amount_total)}
                        </dd>
                      </dl>
                      {precommande.amount_residual >= 0 && (
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-lg font-bold text-gray-900 dark:text-white">
                            Total Payé
                          </dt>
                          <dd className="text-lg font-bold text-green-500 dark:text-white">
                            {formatPrice(
                              precommande.amount_total -
                              precommande.amount_residual
                            )}
                          </dd>
                        </dl>
                      )}
                      {precommande.amount_residual >= 0 && (
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-lg font-bold text-gray-900 dark:text-white">
                            Total Restant
                          </dt>
                          <dd className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(precommande.amount_residual)}
                          </dd>
                        </dl>
                      )}
                    </div>

                    <div className="w-full" >

                      {(precommande.advance_payment_status === "not_paid" ||
                        precommande.advance_payment_status === "partial") && (
                          <>
                            <div className="input-item mb-5">
                              <div className="mb-2 inline-block">
                                <Label
                                  htmlFor="montant"
                                  value="Montant à payer"
                                />
                              </div>

                              <TextInput
                                id="montant"
                                placeholder="1000"
                                label="Montant*"
                                name="montantAPayer"
                                type="number"
                                value={montantAPayer}
                                max={precommande.amount_residual}
                                min={
                                  !precommande.first_payment_state
                                    ? precommande.first_payment_amount
                                    : 1000
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value <= precommande.amount_residual) {
                                    setMontantAPayer(value);
                                  }
                                  if (
                                    !precommande.first_payment_state &&
                                    value < precommande.first_payment_amount
                                  ) {
                                    setErrorMontantAPayer(
                                      `Le montant entré doit être supérieur ou égal à la première tranche de ${formatPrice(
                                        precommande.first_payment_amount
                                      )}.`
                                    );
                                  } else {
                                    setErrorMontantAPayer("");
                                  }
                                }}
                                required
                                className="invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                              />
                              {errorMontantAPayer && (
                                <p className="text-red-600">
                                  {errorMontantAPayer}
                                </p>
                              )}
                            </div>

                            {precommande && (
                              <>
                                {precommande.state !== "sale" &&
                                  precommande.state !== "draft" ? (
                                  <div className="flex justify-center items-center mt-2">
                                    <span className="text-lg font-medium text-red-500 dark:text-white">
                                      La précommande est annulée, vous ne pouvez
                                      pas passer à la caisse.
                                    </span>
                                  </div>
                                ) : (
                                  <Button
                                    type="submit"
                                    onClick={(e) =>
                                      validerPaimentMontant(e, montantAPayer)
                                    }
                                    className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                    disabled={stateButton}
                                  >
                                    {isLoading && (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Passer à la caisse (
                                    {formatPrice(montantAPayer)})
                                  </Button>
                                )}
                              </>
                            )}

                            {showPaymentModal && precommande && (
                              <PaydunyaModalService
                                handlePay={handlePay}
                                totalAmount={montantAPayer}
                                onClose={() => setShowPaymentModal(false)}
                                order={precommande}
                                idOrder={precommande.id}
                              />
                            )}
                          </>
                        )}
                      {precommande.advance_payment_status === "paid" && (
                        <div className="flex justify-center items-center mt-2">
                          <span className="text-lg font-medium text-green-500 dark:text-white">
                            Votre paiement est déjà réglé
                          </span>
                        </div>
                      )}
                    </div>


                  </div>
                </div>

              </div>
            </div>
          )}
          {!precommande && (
            <>
              <div className="flex justify-center items-center ">
                <Loader className="animate-spin"></Loader> Précommande non trouvée
              </div>
            </>
          )}
        </div>
      </Layout></>
  );
}
