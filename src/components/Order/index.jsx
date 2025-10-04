/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

'use client'

import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Loader, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import commandeService from "../../services/CommandeService";
import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import PaydunyaModalService from "../../services/PaydunyaModalService";
import PaiementService from "../../services/paimentService";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import { useAuthContext } from "../../contexts/useAuthContext";

export default function OrderPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [commande, setCommande] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMontantAPayer, setErrorMontantAPayer] = useState("");
  const [montantAPayer, setMontantAPayer] = useState(0);
  const [stateButton, setStateButton] = useState(true);


  const fetchModels = useCallback(async () => {
    try {
      const data = await commandeService.getCommandeById(user.id, id);
      setCommande(data);
      console.log(data);
      const responsePaymentDetails = await PaiementService.getPaymentDetailsByIdOrder(data.id);
      setPaymentDetails(responsePaymentDetails);
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles", error);
      toast.error("Erreur lors de la récupération des données de la commande");
    }
  }, [user.id, id]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (commande && paymentDetails && paymentDetails.payment_state === "completed" &&
        commande.advance_payment_status === "not_paid" && !paymentDetails.token_status) {
        validerPaimentCommande();
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [paymentDetails, commande]);

  useEffect(() => {
    if (montantAPayer < 1000) {
      setErrorMontantAPayer("Le montant minimum est de 1000 FCFA");
      setStateButton(true);
    } else {
      setErrorMontantAPayer("");
      setStateButton(false);
    }
    if (commande && commande.payment_mode == "echelonne") {
      if (montantAPayer > commande.amount_residual) {
        setErrorMontantAPayer("Le montant à payer ne doit pas dépasser le montant restant à payer");
        setStateButton(true);
      } else {
        setErrorMontantAPayer("");
        setStateButton(false);
      }
    }
  }, [montantAPayer])
  const validerPaimentCommande = async () => {
    setIsLoading(true);
    try {
      await PaiementService.createCommandePaiment(commande.id);
      window.location.reload();
      toast.success("Paiement de la commande validé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du paiement :", error);
      toast.error("Erreur lors de la création du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  const validerPaiment = (e, amount) => {
    e.preventDefault();
    setMontantAPayer(amount);
    if (amount < 1000) {
      setErrorMontantAPayer("Le montant minimum est de 1000 FCFA");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePay = async (paymentData) => {
    console.log("Payment data: ", paymentData);
    setIsLoading(false);
    toast.success("Payment validé avec succès");
  };

  const handleOpenInvoice = () => {
    if (paymentDetails?.url_facture) {
      window.open(paymentDetails.url_facture, "_blank", 'noopener,noreferrer');
    }
  };

  const handleVerifeCommandePayment = async () => {
    try {
      if (commande?.advance_payment_status === "paid" && paymentDetails?.payment_state === "completed") {
        toast.success("Commande déjà validée");
      } else {
        await PaiementService.createCommandePaiment(commande.id);
        toast.success("Commande validée avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du paiement :", error);
      toast.error("Erreur lors de la vérification du paiement");
    }
  };


  if (!commande) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin mr-2" /> Chargement de la commande...
      </div>
    );
  }

  return (
    <>
      <SEOHeader
        title="CCBM Shop | Détails commande"
        description="Consultez les détails de votre commande sur CCBM Shop, votre destination pour l'électroménager de qualité."
        keywords="détails commande, CCBM Shop, ccbme, suivi commande, paiement électroménager"
      />
      <Layout childrenClasses=" pt-0 pb-0">
        <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full mb-5">
            <PageTitle
              title="Détails Commande"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Commandes", path: "/profile#order" },
                { name: "Détails Commande" },
              ]}
            />
          </div>

          <div className="checkout-main-content w-full">
            <div className="container-x mx-auto">
              {/* Order summary section */}
              <div className="w-full sm:mb-10 mb-5">
                <div className="sm:flex sm:space-x-[18px]">
                  <OrderInfoItem label="N°Commande" value={commande.name} />
                  <OrderInfoItem
                    label="Paiement"
                    value={
                      commande.payment_mode === "domicile" ? "A domicile" :
                        commande.payment_mode === "online" ?
                          commande.advance_payment_status === "not_paid" ? "Non Payé" : "Payé" :
                          commande.payment_mode === "echelonne" ?
                            commande.advance_payment_status === "not_paid" ? "Non Payé" :
                              commande.advance_payment_status === "paid" ? "Payé" :
                                "Partiellement Payé" : ""
                    }
                    className={
                      commande.advance_payment_status === "not_paid" ? "text-red-500" :
                        commande.advance_payment_status === "paid" ? "text-green-500" :
                          commande.advance_payment_status === "partial" ? "text-yellow-500" : ""
                    }
                  />
                  <OrderInfoItem
                    label="Statut"
                    value={
                      commande.state === "sale" ? "Validée" :
                        commande.state === "to_delivered" ? "En cours de livraison" :
                          commande.state === "delivered" ? "Livrée" : "Non validé"
                    }
                    className={
                      commande.state === "sale" ? "text-green-500" :
                        commande.state === "to_delivered" ? "text-yellow-500" :
                          commande.state === "delivered" ? "text-green-600" : "text-gray-500"
                    }
                  />
                </div>

                {commande.payment_mode === "echelonne" && <>
                  <div className="sm:flex sm:space-x-[18px] mt-5">

                    <OrderInfoItem
                      label="Montant Restant"
                      value={
                        formatPrice(commande.amount_residual) + " FCFA"
                      }
                    />
                    <OrderInfoItem
                      label="Montant Total"
                      value={
                        ["not_paid", "paid"].includes(commande.advance_payment_status) ?
                          <span className={`text-${commande.advance_payment_status === "not_paid" ? "red" : "green"}-500`}>
                            {formatPrice(commande.amount_total)}
                          </span> : ""
                      } />

                    <OrderInfoItem
                      label="Montant Avancé"
                      value={
                        formatPrice(commande.amount_total - commande.amount_residual)
                      }
                    />

                  </div>
                </>}

                <div className="sm:flex sm:space-x-[18px] mt-5">

                  <OrderInfoItem
                    label="Mode de Paiement"
                    value={
                      commande.payment_mode === "online" ? "En ligne" :
                        commande.payment_mode === "domicile" ? "A domicile" : "Echelonné"
                    }
                  />
                  <OrderInfoItem label="Date de livraison" value={formatDate(commande.commitment_date)} />
                </div>
              </div>

              {/* Payment details section */}
              {paymentDetails && commande.advance_payment_status === "paid" && (
                <PaymentDetailsSection
                  paymentDetails={paymentDetails}
                  handleOpenInvoice={handleOpenInvoice}
                  handleVerifeCommandePayment={handleVerifeCommandePayment}
                  commande={commande}
                />
              )}

              {/* Order details section */}
              <OrderDetailsSection commande={commande} />

              {/* Payment actions section */}
              <PaymentActionsSection
                commande={commande}
                montantAPayer={montantAPayer}
                setMontantAPayer={setMontantAPayer}
                errorMontantAPayer={errorMontantAPayer}
                stateButton={stateButton}
                isLoading={isLoading}
                validerPaiment={validerPaiment}
              />

              {showPaymentModal && commande && (
                <PaydunyaModalService
                  handlePay={handlePay}
                  totalAmount={montantAPayer}
                  onClose={() => setShowPaymentModal(false)}
                  order={commande}
                  idOrder={commande.id}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const OrderInfoItem = ({ label, value, className = "" }) => (
  <div className="sm:w-1/3 w-full mb-5 h-[70px]">
    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
      <span className="text-[15px] font-medium">
        {label} &nbsp;: <span className={className}>{value}</span>
      </span>
    </div>
  </div>
);

const PaymentDetailsSection = ({ paymentDetails, handleOpenInvoice, handleVerifeCommandePayment, commande }) => (
  <div className="w-full lg:flex lg:space-x-[30px] mb-10">
    <div className="flex-1">
      <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">Récapitulatif paiement</h1>
      <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
        <div className="sub-total mb-6">
          <div className="flex justify-between mb-5">
            <p className="text-[13px] font-medium text-qblack uppercase">Détail Payment</p>
          </div>
          <div className="w-full h-[1px] bg-[#EDEDED]"></div>
        </div>
        <div className="product-list w-full mb-[30px]">
          <ul className="flex flex-col space-y-5">
            <li>
              <div className="flex justify-between items-center">
                <h4 className="text-[15px] text-qblack mb-2.5">Montant Payé</h4>
                <span className="text-[15px] text-qblack font-medium">{formatPrice(paymentDetails.amount)}</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <h4 className="text-[15px] text-qblack mb-2.5">Facture</h4>
                <button className="text-[15px] text-qblack font-medium underline" onClick={handleOpenInvoice}>
                  Ouvrir la facture
                </button>
              </div>
            </li>
            {commande && commande.advance_payment_status === "not_paid" && paymentDetails.payment_state === "completed" && (
              <li>
                <div className="flex justify-between items-center">
                  <h4 className="text-[15px] text-qblack mb-2.5">Vérifier la commande</h4>
                  <button className="text-[15px] text-qblack font-medium underline" onClick={handleVerifeCommandePayment}>
                    Verifier
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
      </div>
    </div>
  </div>
);

const OrderDetailsSection = ({ commande }) => (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">Récapitulatif de la commande</h1>
    <div className="w-full p-4 sm:p-6 border border-[#EDEDED] rounded-lg shadow-sm">
      <div className="sub-total mb-6">
        <div className="flex justify-between mb-5">
          <p className="text-[13px] font-medium text-qblack uppercase">Produit</p>
          {commande.type_order == "commande" && <p className="text-[13px] font-medium text-qblack uppercase">Total</p>}
        </div>
        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
      </div>
      <div className="product-list w-full mb-[30px]">
        <ul className="flex flex-col space-y-5">
          {commande.order_lines.map((produit, index) => (
            <li key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-[15px] text-qblack mb-2.5">
                    {produit.product_name}
                    <sup className="text-[13px] text-qgray ml-2 mt-2">
                      {commande.type_order == "commande" && <span>   = {produit.product_uom_qty} x {produit.price_total}</span>}
                    </sup>
                  </h4>
                  <p className="text-[13px] text-qgray">{produit.description}</p>
                </div>
                <div>
                  {commande.type_order == "commande" && <span className="text-[15px] text-qblack font-medium">{formatPrice(produit.price_total)}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
      <div className="mt-[30px]">
        <div className="flex justify-between mb-5">
          <p className="text-2xl font-medium text-qblack">Total</p>
          <p className="text-2xl font-medium">
            {["not_paid", "paid"].includes(commande.advance_payment_status) && (
              <span className={`text-${commande.advance_payment_status === "not_paid" ? "red" : "green"}-500`}>
                {formatPrice(commande.amount_total)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PaymentActionsSection = ({
  commande,
  montantAPayer,
  setMontantAPayer,
  errorMontantAPayer,
  stateButton,
  isLoading,
  validerPaiment
}) => (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    {commande.advance_payment_status === "not_paid" || commande.advance_payment_status === "partial" ? (
      <>
        {commande.payment_mode === "domicile" && (
          <div className="flex justify-center items-center mt-2">
            <span className="text-lg font-medium text-red-500 dark:text-white">
              Le paiement se fera à domicile
            </span>
          </div>
        )}

        {commande.payment_mode === "echelonne" && (
          <div>
            {(commande.advance_payment_status === "not_paid" || commande.advance_payment_status === "partial") && (
              <>
                <div className="input-item mb-5">
                  <div className="mb-2 inline-block">
                    <Label htmlFor="montant" value="Montant à payer" />
                  </div>
                  <TextInput
                    id="montant"
                    placeholder="Minimum 1000 F CFA"
                    label="Montant*"
                    name="montantAPayer"
                    type="number"
                    value={montantAPayer}
                    onChange={(e) => setMontantAPayer(e.target.value)}
                    max={commande.amount_residual}
                    min={1000}
                    required
                    className="invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                  />
                  {errorMontantAPayer && (
                    <p className="text-yellow-500">{errorMontantAPayer}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  onClick={(e) => validerPaiment(e, montantAPayer)}
                  className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                  disabled={stateButton}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Passer à la caisse ({formatPrice(montantAPayer)})
                </Button>
              </>
            )}
          </div>
        )}

        {commande.payment_mode === "online" && (
          <Button
            type="submit"
            onClick={(e) => validerPaiment(e, commande.amount_total)}
            className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Passer à la caisse ({formatPrice(commande.amount_total)})
          </Button>
        )}
      </>
    ) : (
      <div className="w-full h-[50px] flex justify-center items-center">
        <span className="text-green-500">Le paiement a été effectué avec succès</span>
      </div>
    )}
  </div>
);

