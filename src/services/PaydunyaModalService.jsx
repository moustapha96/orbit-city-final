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
  const [tokenP, setTokenP] = useState(null);
  const [status, setStatus] = useState(null);
  const [responseText, setResponseText] = useState(null);

  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const [returnUtl, setReturnUrl] = useState(null);
  const [setup, setSetup] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    setUserPayment(user);
    setOrder(order);
    console.log("order " + idOrder);
    console.log("motant " + totalAmount);
    console.log("user");
    console.log(user);

    const paydunyaSetup = new paydunya.Setup({
      masterKey: "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
      privateKey: "test_private_rLI7U4b3J0SjDBJQ7cEC9OCayn9",
      publicKey: "test_public_4FEHuOo9gsFwgPjoQv27L1deBlx",
      token: "UWVccdmuTo5tusRDkoZQ",
      mode: "test",
      // masterKey: "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
      // publicKey: "live_public_YHBiR9AiLB8scwCFpcd5U2A62zU",
      // privateKey: "live_private_vu4eNlAlyVQ15Z77gclxMiKtFkN",
      // token: "J5rKrbWZxGitf5nXGrrh",
      // mode: "live",
    });
    setSetup(paydunyaSetup);
    const store = new paydunya.Store({
      name: "CCBM SHOP",
      email: "contact@ccbm.sn",
      tagline: "Votre boutique pour vos matériels électroménéger",
      phoneNumber: "784537547",
      postalAddress: "Dakar",
      logoURL: "https://ccbme.sn/logo.png",
      websiteURL: "https://ccbme.sn/",
    });
    setStore(store);
  }, []);

  const handleSubmit = (event) => {
    setIsloading(true);
    event.preventDefault();
    if (setup && store && totalAmount > 0) {
      const invoice = new CheckoutInvoice(setup, store);

      order.order_lines.forEach((article) => {
        invoice.addItem(
          article.product_name,
          article.product_uom_qty,
          article.price_unit,
          article.price_subtotal
        );
      });

      invoice.totalAmount = Math.ceil(totalAmount);
      invoice.description =
        "Payment de " +
        formatPrice(Math.ceil(totalAmount)) +
        " pour la commande " +
        order.name;
      invoice.callbackURL = "https://ccbme.sn/profile";
      if (order.type_sale === "order") {
        invoice.cancelURL = `https://ccbme.sn/commandes/${idOrder}/détails`;
      } else {
        invoice.cancelURL = `https://ccbme.sn/pre-commandes/${idOrder}/détails`;
      }
      invoice.returnURL = `https://ccbme.sn/payment-state`;

      invoice.addChannels([
        "card",
        "jonijoni-senegal",
        "orange-money-senegal",
        "wave-senegal",
      ]);
      setPaymentDetails(invoice);
      setTotalAmount(invoice.totalAmount);

      invoice
        .create()
        .then(async function () {
          setPaymentResponse(invoice);
          console.log(invoice);
          const data = {
            transaction_id: `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}`,
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
            if (Array.isArray(response)) {
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
            localStorage.setItem("idDataPayment", response.id);
            setPaymentUrl(invoice.url);
            localStorage.setItem("idOrderPayment", idOrder);
            localStorage.setItem("tokenOrderPayment", invoice.token);
            localStorage.setItem("statusOrderPayment", invoice.status);
            localStorage.setItem("montant", totalAmount);

            localStorage.setItem(
              "responseTextOrderPayment",
              invoice.responseText
            );
            window.open(invoice.url, "_blank");
            setOpenModal(false);
            setTimeout(() => {
              window.close();
            }, 1000);
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
        });
    }
    setIsloading(false);
  };

  // const handleSubmit = (event) => {
  //   setIsloading(true);
  //   event.preventDefault();
  //   console.log("passer au paiment");
  //   localStorage.setItem("idOrderPayment", idOrder);
  //   localStorage.setItem("montant", totalAmount);
  //   // localStorage.setItem("tokenOrderPayment", invoice.token);
  //   // localStorage.setItem("statusOrderPayment", invoice.status);
  //   // localStorage.setItem("montant", totalAmount);
  //   navigate("/payment-state");
  //   console.log(payment);

  //   setIsloading(false);
  // };
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

            {order && (
              <form onSubmit={handleSubmit}>
                <div className="my-8">
                  <label className="text-gray-800 text-sm">
                    Noms des articles :
                    <select
                      multiple
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                    >
                      {order &&
                        order.order_lines.map((article, index) => (
                          <option key={index} value={article.product_name}>
                            {article.product_name} : {article.product_uom_qty} x{" "}
                            {formatPrice(article.price_unit)}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label className="text-gray-800 text-sm">
                    <br />
                    <label className="text-gray-800 text-sm mt-4">
                      Nom de la commande :
                      <input
                        type="text"
                        value={order.name}
                        disabled
                        className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                      />
                    </label>
                    <br />
                    Total à payer (en FCFA)
                    <input
                      type="text"
                      value={formatPrice(Math.ceil(order.amount_total))}
                      disabled
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                    />
                    <br />
                    Montant à payer (en FCFA)
                    <input
                      type="text"
                      value={formatPrice(Math.ceil(totalAmount))}
                      disabled
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                    />
                  </label>
                  <br />
                  <div className="flex max-sm:flex-col items-center gap-4 mt-8">
                    {setup && store && (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                      >
                        {" "}
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Passer au paiement
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaydunyaModalService;
