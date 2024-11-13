/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";

import { Button, Modal } from "flowbite-react";
import formatPrice from "../utils/formatPrice";
import { toast } from "react-toastify";
import { CircleX, Loader2 } from "lucide-react";

import paydunya from "paydunya";
import CheckoutInvoice from "paydunya/lib/checkout-invoice";
import PaymentContext from "../contexts/PaymentContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PaiementService from "./paimentService";

// import initializePaydunya from "../config/paydunyaInitializer"
const PaydunyaModalService = ({
  handlePay,
  totalAmount,
  onClose,
  order,
  idOrder,
}) => {
  localStorage.setItem("idOrderPayment", null);
  localStorage.setItem("montant", null);
  localStorage.setItem("tokenOrderPayment", null);
  localStorage.setItem("statusOrderPayment", null);
  const navigate = useNavigate();
  const {
    payment,
    setUserPayment,
    setOrder,
    setPaymentDetails,
    setTotalAmount,
  } = useContext(PaymentContext);

  const { user } = useContext(UserContext);

  const [isLoading, setIsloading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [setup, setSetup] = useState(null);
  const [store, setStore] = useState(null);
  const [facture, setFacture] = useState(null)

  useEffect(() => {
    setUserPayment(user);
    setOrder(order);
    console.log("order " + idOrder);
    console.log("motant " + totalAmount);
    console.log("user");
    console.log(user);

    const paydunyaSetup = new paydunya.Setup({
      masterKey: "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      privateKey: "test_private_LJfJe2zAiwndwRq6ZF4qIDIoApZ",
      publicKey: "test_public_Cg2nELkXvHleRmby9NfaKWofWQS",
      token: "VaZUkYb6b1JOpZfxUe3R",
      mode: "test",
      // masterKey: "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      // privateKey: "live_private_KvbXuQU1IJ4z68hQOU9YeEtrUjW",
      // publicKey: "live_public_wgK4JebXd3SfGDWN64sEIffD5XR",
      // token: "cjTGi71WL8xOTCrsJisR",
      // mode: "live",
    });
    setSetup(paydunyaSetup);
    const store = new paydunya.Store({
      name: "CCBM SHOP",
      email: "shop@ccbm.sn",
      tagline: "Votre boutique pour vos matériels électroménéger",
      phoneNumber: "+221 70 922 17 75",
      postalAddress: "Avenue Lamine Gueye,x Rue Marchand,Dakar-Senegal",
      logoURL: "https://ccbme.sn/logo_192.png",
      websiteURL: "https://ccbme.sn/",
    });
    setStore(store);
  }, []);


  const handleSubmit = (event) => {
    console.log("arrivé");
    setIsloading(true);
    event.preventDefault();
    if (setup && store && totalAmount > 0) {
      const invoice = new CheckoutInvoice(setup, store);
      console.log(invoice);

      order.order_lines.forEach((article) => {
        invoice.addItem(
          article.product_name,
          article.product_uom_qty,
          article.price_unit,
          article.price_subtotal
        );
      });
      console.log(invoice);

      invoice.totalAmount = Math.ceil(totalAmount);
      if (order.type_sale === "order") {
        invoice.description = `Paiement de ${formatPrice(Math.ceil(totalAmount))} pour la commande ${order.name}`;
      } else if (order.type_sale === "preorder") {
        if (order.amount_residual > 0) {
          invoice.description = `Paiement de ${formatPrice(Math.ceil(totalAmount))} pour la précommande ${order.name} avec un montant total restant de ${order.amount_total - totalAmount}`;
        } else {
          invoice.description = `Paiement de ${formatPrice(Math.ceil(totalAmount))} pour la précommande ${order.name}`;
        }
      }

      invoice.callbackURL = "https://orbitcity.sn/api/facture/paydunya";

      if (order.type_sale === "order") {
        invoice.cancelURL = `https://ccbme.sn/commandes/${idOrder}/détails`;
      } else {
        invoice.cancelURL = `https://ccbme.sn/pre-commandes/${idOrder}/détails`;
      }
      // invoice.returnURL = `https://ccbme.sn/payment-state`;
      invoice.returnURL = `http://localhost:5173/payment-state`;

      setPaymentDetails(invoice);
      setTotalAmount(invoice.totalAmount);
      console.log(invoice);
      invoice
        .create()
        .then(async function () {
          setFacture(invoice);

          console.log(invoice);
          let transaction = null;

          if (order.type_sale === "order") {
            transaction = `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}`;
          } else if (order.type_sale === "preorder") {
            if (!order.first_payment_state && !order.second_payment_state && !order.third_payment_state) {
              transaction = `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}-1`;
            } else if (order.first_payment_state && !order.second_payment_state && !order.third_payment_state) {
              transaction = `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}-2`;
            } else {
              transaction = `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}-3`;
            }
          }
          const data = {
            transaction_id: transaction,
            amount: totalAmount,
            order_id: idOrder,
            order_type: order.type_sale,
            order_name: order.name,
            partner_id: user.partner_id,
            payment_token: invoice.token,
            payment_state: invoice.status,
          };

          console.log(data);
          try {
            const response = await PaiementService.setPaymentDetails(data);
            if (response.order_type == "preorder") {
              console.log("precommande");
              toast.success("Merci de passer au payment sur paydunya", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate(`/pre-commandes/${idOrder}/détails`);
            } else {
              if (response.payment_state == "completed") {
                toast.success("Merci de passer au payment sur paydunya", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                navigate(`/commandes/${idOrder}/détails`);
              }
            }

            localStorage.setItem("urlOrderPayment", invoice.url);
            localStorage.setItem("statusOrderPayment", invoice.status);
            localStorage.setItem("tokenOrderPayment", invoice.token);
            localStorage.setItem("idDataPayment", response.id);
            localStorage.setItem("idOrderPayment", idOrder);
            localStorage.setItem("montant", totalAmount);

            localStorage.setItem(
              "responseTextOrderPayment",
              invoice.responseText
            );

          } catch (error) {
            console.error("erreur lors de l'enregistrement details payment");
            console.error(error);
            toast.error("Payment non effectif " + error.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(function (e) {
          console.log(e);
          toast.error("Payment non effectif " + e, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }).finally(() => {
          setIsloading(false);
        });
    }
  };

  const handleClick = (e) => {
    e.preventDefault()
    openInNewTab(facture.url);
    setOpenModal(false)
    navigate('/profile')
  };

  return (
    <Modal
      size="xl"
      className="h-auto"
      show={openModal}
      popup
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div className="flex items-start border-b border-gray-300 pb-4">
              <div className="flex-1">
                <h3 className="text-gray-800 text-xl font-bold">
                  Paiement{" "}
                  {order.type_sale == "order" ? "Commande" : "Pré Commande"}{" "}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Résumé détaillé de votre commande.
                </p>
              </div>

              <p>
                <CircleX
                  onClick={onClose}
                  className={`cursor-pointer hover:text-red-500 hover:scale-150 duration-300`}
                />
              </p>
            </div>
            {/* {facture && (
              <div className="flex flex-wrap justify-center items-center" >
                <p> token de payment:  <span> {facture.token}  </span>  </p>
              </div>
            )} */}
            {order && (

              <>
                <div className="my-8">



                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-gray-800 text-sm py-2">Nom de la commande :</th>
                        <th className="text-right text-gray-800 text-sm py-2">{order.name}</th>
                      </tr>
                    </thead>
                  </table>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-gray-800 text-sm py-2">Nom produit</th>
                        <th className="text-right text-gray-800 text-sm py-2">Prix total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order &&
                        order.order_lines.map((article, index) => (
                          <tr key={index}>
                            <td className="text-left text-gray-800 text-sm py-2">{article.product_name} ({article.product_uom_qty})  </td>
                            <td className="text-right text-gray-800 text-sm py-2 font-medium">{formatPrice(article.price_total)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>


                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-gray-800 text-sm py-2">Total à payer (en FCFA) :</th>
                        <th className="text-right text-gray-800 text-sm py-2">{formatPrice(Math.ceil(order.amount_total))}</th>
                      </tr>
                    </thead>
                  </table>


                  <br />
                  <div className="flex max-sm:flex-col items-center gap-4 mt-8">
                    {setup && store && !facture && (
                      <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        pill
                        className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                      >
                        {" "}
                        {isLoading && (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <p>Validation</p>
                          </>
                        )}
                        {!isLoading && "Valider"}

                      </Button>
                    )}
                    {setup && store && facture && (
                      <Button
                        disabled={!facture}
                        onClick={(e) => handleClick(e)}
                        color="success"
                        pill
                        className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                      >
                        Passer au payment
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

function openInNewTab(url) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
}


export default PaydunyaModalService;
