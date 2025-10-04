/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/useAuthContext";
import { getCreditCommandeById } from "../../services/creditCommandeService";
import PaiementService from "../../services/paimentService";
import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import Layout from "../Partials/Layout";
import PageTitle from "../Helpers/PageTitle";
import { CheckCircle, Loader, Loader2, Truck, XCircle } from "lucide-react";
import { Button, Label, TextInput } from "flowbite-react";
import PaydunyaModalService from "../../services/PaydunyaModalService";

export default function CreditOrderPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [order, setOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [montantAPayer, setMontantAPayer] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errorMontantAPayer, setErrorMontantAPayer] = useState("");
  const [stateButton, setStateButton] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getCreditCommandeById(user.id, id);
        setOrder(data);
        // console.log(data)
        const responsePaymentDetails = await PaiementService.getPaymentDetailsByIdOrder(data.id);
        setPaymentDetails(responsePaymentDetails || []); // Ensure it's always an array
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande", error);
        toast.error("Impossible de charger les détails de la commande");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id, user.id]);

  useEffect(() => {
    if (order) {
      const shouldDisableButton =
        (order.first_payment_state && montantAPayer < 1000) ||
        (!order.first_payment_state &&
          montantAPayer < order.first_payment_amount) ||
        isLoading;
      setStateButton(shouldDisableButton);
    }
    // console.log(order, montantAPayer, isLoading);
  }, [order, montantAPayer, isLoading]);


  const handleOpenInvoice = (url) => {
    if (url) {
      window.open(url, "_blank", 'noopener,noreferrer');
    }
  };

  const handleVerifyPayment = async (payment) => {
    try {
      const resultPayment = await PaiementService.confirmInvoice(payment.payment_token);
      if (resultPayment.response_code === "00" && resultPayment.status === "completed") {
        await PaiementService.updatePaymentDetails(
          payment.id,
          resultPayment.status,
          resultPayment.receipt_url,
          resultPayment.customer.name,
          resultPayment.customer.email,
          resultPayment.customer.phone,
          true
        );
        await PaiementService.createorderPaimentMontant(
          payment.order_id,
          payment.amount,
          payment.payment_token
        );
        toast.success("Paiement validé avec succès");
      } else {
        toast.error("Vérification du paiement échouée");
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation de l'invoice :", error);
      toast.error("Erreur lors de la vérification du paiement");
    }
  };

  const validerPaimentMontant = async (e, montantAPayer) => {
    e.preventDefault();
    if (montantAPayer < 1000) {
      toast.warning("Le Montant doit être strictement supérieur à 1000 F CFA", {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
      setShowPaymentModal(true);
      console.log("show modal");
    }
    console.log(montantAPayer, order.id);
  };

  const getStatusTextValidation = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'En cours de validation';
      case 'validated':
        return 'Validé';
      case 'rejected':
        return 'Rejeté';
      default:
        return 'En cours';
    }
  };
  const getStatusIconValidation = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <XCircle className="w-5 h-5 text-yellow-500" />;
      case 'validated':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Truck className="w-5 h-5 text-blue-500" />;
    }
  }
  const handlePay = () => {
    if (montantAPayer < 1000) {
      toast.warning("Le montant doit être supérieur à 1000 F CFA");
      return;
    }
    setShowPaymentModal(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!order) {
    return <div className="text-center text-red-500 text-xl mt-10">Commande non trouvée</div>;
  }

  return (

    <>
      <SEOHeader
        title="CCBM Shop | Détails Commande à Crédit"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses="pt-0 pb-0">
        <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full mb-5">
            <PageTitle
              title="Détails Commande à Crédit"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Commande à Crédits", path: "/profile#commandes-a-credit" },
                { name: "Détails Commande à crédit " },
              ]}
            />
          </div>
          {isLoading && (
            <div className="flex justify-center items-center w-full h-full">
              <Loader size={60} className="animate-spin" />
            </div>
          )}
          {order && (
            <div className="checkout-main-content w-full">
              <div className="container-x mx-auto">
                {/* debut */}
                <div className="w-full sm:mb-10 mb-5">

                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/3 w-full mb-5 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          N°Commande à Crédit <span>{order.name}</span>
                        </span>
                      </div>
                    </div>
                    <div className=" sm:w-1/3  flex-1 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Paiement :{" "}
                          {order.advance_payment_status === "not_paid" && (
                            <span className="text-red-500">Non Payé</span>
                          )}
                          {order.advance_payment_status === "paid" && (
                            <span className="text-green-500"> Payé </span>
                          )}
                          {order.advance_payment_status === "partial" && (
                            <span className="text-yellow-500">
                              {" "}
                              Partiellement Payé
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="sm:w-1/3 flex-1 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong> Statut : </strong>{" "}
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">
                            {order.state == "sale" && <span className="text-green-500" >Validé</span>}
                            {order.state == "draft" && <span className="text-yellow-500" >En cours de traitement</span>}
                            {order.state == "cancel" && <span className="text-yellow-500" >Annulée</span>}
                            {order.state == "delivered" && <span className="text-green-600" >Livrée</span>}
                            {order.state == "to_delivered" && <span className="text-yellow-500" >En cours de livraison</span>}
                            {order.state == "validation" && <span className="text-yellow-500" >En cours de validation</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="flex flex-col sm:flex-row sm:space-x-[18px] space-y-5 sm:space-y-0 mb-5">
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>Validation RH</strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="hidden sm:inline-block">
                            {getStatusIconValidation(order.validation_rh_state)}
                          </span>
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{getStatusTextValidation(order.validation_rh_state)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>Approbation CCBM</strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="hidden sm:inline-block">
                            {getStatusIconValidation(order.validation_admin_state)}
                          </span>
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{getStatusTextValidation(order.validation_admin_state)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-[18px] space-y-5 sm:space-y-0 mb-5">
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong> Date commande </strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">

                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{formatDate(order.date_order)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-auto sm:h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>Date de livraison</strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">

                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">{formatDate(order.commitment_date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">

                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong>  Total Payé &nbsp;</strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">
                            {formatPrice(
                              order.amount_total - order.amount_residual
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 h-[70px]">


                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex flex-col sm:flex-row justify-center items-center p-3 sm:p-0">
                        <strong> Total Restant &nbsp; </strong>
                        <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-2">
                          <span className="mt-1 sm:mt-0 sm:ml-2 capitalize">
                            {formatPrice(order.amount_residual)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentDetails && paymentDetails.length > 0 && (
                    <>
                      <div className="w-full lg:flex lg:space-x-[30px]">
                        <div className="flex-1">
                          <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                            Récapitulatif paiement
                          </h1>
                          <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                            <div className="sub-total mb-6">
                              <div className="flex justify-between mb-5">
                                <p className="text-[13px] font-medium text-qblack uppercase">
                                  Détails Payments
                                </p>
                              </div>
                              <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                            </div>
                            <div className="product-list w-full mb-[30px]">
                              <table className="min-w-full bg-white">
                                <thead>
                                  <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Prénom & Nom
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Téléphone
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Email
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Montant Payé
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                      Facture
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.isArray(paymentDetails) && paymentDetails.map((payment, index) =>
                                    payment.payment_state === 'completed' && (
                                      <tr key={index} className="bg-white">
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                          <div className="text-sm leading-5 text-gray-900">
                                            {payment.customer_name}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                          <div className="text-sm leading-5 text-gray-900">
                                            {payment.customer_phone}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                          <div className="text-sm leading-5 text-gray-900">
                                            {payment.customer_email}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                          <div className="text-sm leading-5 text-gray-900">
                                            {formatPrice(payment.amount)}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                          {!payment.token_status ? <>
                                            <button
                                              className="text-sm leading-5 text-gray-900 underline"
                                              onClick={(e) => handleVerifyPayment(e, payment)}
                                            >
                                              Vérifier le payment
                                            </button>
                                          </> :
                                            <>

                                              <button
                                                className="text-sm leading-5 text-gray-900 underline"
                                                onClick={() => handleOpenInvoice(payment.url_facture)}
                                              >
                                                Ouvrir la facture
                                              </button>
                                            </>}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* fin */}


                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl sm:text-3xl text-qblack font-medium mb-5 text-center">
                    Récapitulatif de la commande
                  </h1>

                  <div className="w-full p-4 sm:p-6 border border-[#EDEDED] rounded-lg shadow-sm">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b pb-4">
                        <p className="text-sm font-medium text-qblack uppercase">Produit</p>
                        <p className="text-sm font-medium text-qblack uppercase">Total</p>
                      </div>

                      <div className="space-y-4">
                        {Array.isArray(order.order_lines) && order.order_lines.map((produit, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-sm sm:text-base text-qblack mb-1">
                                {produit.product_name}
                                <sup className="text-xs text-qgray ml-1">
                                  x {produit.product_uom_qty}
                                </sup>
                              </h4>
                              <p className="text-xs sm:text-sm text-qgray">{produit.description}</p>
                            </div>
                            <span className="text-sm sm:text-base text-qblack font-medium">
                              {formatPrice(produit.price_total)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        {[
                          { label: "Montant Total", value: formatPrice(order.amount_total) },
                          { label: "Premier Tranche", value: formatPrice(order.first_payment_amount), date: order.first_payment_date, state: order.first_payment_state },
                          { label: "Deuxieme Tranche", value: formatPrice(order.second_payment_amount), date: order.second_payment_date, state: order.second_payment_state },
                          { label: "Troisieme Tranche", value: formatPrice(order.third_payment_amount), date: order.third_payment_date, state: order.third_payment_state },
                          { label: "Quatrième Tranche", value: formatPrice(order.fourth_payment_amount), date: order.fourth_payment_date, state: order.fourth_payment_state },
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

                      <div className="border-t pt-4 space-y-2">
                        <dl className="flex items-center justify-between gap-2">
                          <dt className="text-base sm:text-lg font-bold text-gray-900">Total à payer</dt>
                          <dd className="text-base sm:text-lg font-bold text-gray-900">{formatPrice(order.amount_total)}</dd>
                        </dl>
                        {order.amount_residual >= 0 && (
                          <>
                            <dl className="flex items-center justify-between gap-2">
                              <dt className="text-base sm:text-lg font-bold text-gray-900">Total Payé</dt>
                              <dd className="text-base sm:text-lg font-bold text-green-500">
                                {formatPrice(order.amount_total - order.amount_residual)}
                              </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-2">
                              <dt className="text-base sm:text-lg font-bold text-gray-900">Total Restant</dt>
                              <dd className="text-base sm:text-lg font-bold text-gray-900">{formatPrice(order.amount_residual)}</dd>
                            </dl>
                          </>
                        )}
                      </div>

                      {order.validation_rh_state === "validated" && order.validation_admin_state === "validated" && (
                        order.advance_payment_status === "not_paid" || order.advance_payment_status === "partial"
                      ) && (
                          <div className="mt-6">
                            <Label htmlFor="montant">Montant à payer</Label>
                            <TextInput
                              id="montant"
                              type="number"
                              value={montantAPayer}
                              onChange={(e) => {
                                const value = Number(e.target.value)
                                if (value <= order.amount_residual) {
                                  setMontantAPayer(value)
                                  if (!order.first_payment_state && value < order.first_payment_amount) {
                                    setErrorMontantAPayer(`Le montant entré doit être supérieur ou égal à la première tranche de ${formatPrice(order.first_payment_amount)}.`)
                                  } else {
                                    setErrorMontantAPayer("")
                                  }
                                }
                              }}
                              // min={!order.first_payment_state ? order.first_payment_amount : 1000}
                              max={order.amount_residual}
                              min={
                                !order.first_payment_state
                                  ? order.first_payment_amount
                                  : 1000
                              }
                              className="mt-1"
                            />
                            {errorMontantAPayer && <p className="text-red-500 mt-1">{errorMontantAPayer}</p>}
                            <Button
                              onClick={validerPaimentMontant}
                              className="mt-4 w-full"
                              // disabled={montantAPayer < 1000 || (order.first_payment_state && montantAPayer < order.first_payment_amount)}
                              disabled={stateButton}
                            >
                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Passer à la caisse ({formatPrice(montantAPayer)})
                            </Button>
                          </div>
                        )}

                      {(order.validation_rh_state !== "validated" || order.validation_admin_state !== "validated") && (
                        <p className="text-yellow-500 mt-4 text-center text-xl">
                          Merci d'attendre la validation de la commande à crédit par la RH et CCBM
                        </p>
                      )}

                      {order.validation_rh_state === "rejected" && order.validation_admin_state === "rejected" && (
                        <p className="text-red-500 mt-4 text-center text-xl">
                          La Commande à Crédit n'est pas acceptée
                        </p>
                      )}

                      {order.advance_payment_status === "paid" && (
                        <p className="text-green-500 mt-4 text-center text-xl">
                          Votre paiement est déjà réglé
                        </p>
                      )}
                    </div>
                  </div>

                  {showPaymentModal && order && (
                    <PaydunyaModalService
                      handlePay={handlePay}
                      totalAmount={montantAPayer}
                      onClose={() => setShowPaymentModal(false)}
                      order={order}
                      idOrder={order.id}
                    />
                  )}
                </div>

              </div>
            </div>
          )}
          {!order && (
            <>
              <div className="flex justify-center items-center ">
                <Loader className="animate-spin"></Loader> Commande à Crédit non trouvée
              </div>
            </>
          )}
        </div>
      </Layout></>
  );
}