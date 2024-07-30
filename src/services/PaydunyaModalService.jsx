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
const PaydunyaModalService = ({
  handlePay,
  totalAmount,
  onClose,
  order,
  idOrder,
}) => {
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
      email: "ccbm-shop@ccbm.sn",
      tagline: "Votre boutique pour vos matériels électroménéger",
      phoneNumber: "784537547",
      postalAddress: "Dakar",
      // logoURL: "http://orbitcity.sn/logo.png",
      logoURL: "https://orbitcitydev.com/logo.png",
      // websiteURL: "http://orbitcity.sn",
      websiteURL: "https://orbitcitydev.com/",
    });
    setStore(store);
  }, []);

  const handleSubmit = (event) => {
    setIsloading(true);
    event.preventDefault();
    console.log("passer au paiment");
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
      // invoice.callbackURL = "http://orbitcity.sn/profile";
      invoice.callbackURL = "https://orbitcitydev.com/profile";
      if (order.type_sale === "order") {
        // invoice.cancelURL = `http://orbitcity.sn/commandes/${idOrder}/détails`;
        invoice.cancelURL = `https://orbitcitydev.com/commandes/${idOrder}/détails`;
      } else {
        // invoice.cancelURL = `http://orbitcity.sn/pre-commandes/${idOrder}/détails`;
        invoice.cancelURL = `https://orbitcitydev.com/pre-commandes/${idOrder}/détails`;
      }
      // invoice.returnURL = `http://orbitcity.sn/payment-state`;
      invoice.returnURL = `https://orbitcitydev.com/payment-state`;
      // invoice.returnURL = `http://orbitcity.sn/payment-state/${idOrder}/${invoice.totalAmount}`;

      invoice.addChannels([
        "card",
        "jonijoni-senegal",
        "orange-money-senegal",
        "wave-senegal",
      ]);
      console.log(invoice);
      setPaymentDetails(invoice);
      setTotalAmount(invoice.totalAmount);
      console.log("amount " + invoice.totalAmount);
      console.log("desc " + invoice.description);
      console.log("creation de la facture ");
      invoice
        .create()
        .then(function () {
          setPaymentResponse(invoice);
          toast.success("Payment validé avec succès", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPaymentUrl(invoice.url);
          localStorage.setItem("idOrderPayment", idOrder);
          localStorage.setItem("tokenOrderPayment", invoice.token);
          localStorage.setItem("statusOrderPayment", invoice.status);
          localStorage.setItem("montant", totalAmount);

          localStorage.setItem(
            "responseTextOrderPayment",
            invoice.responseText
          );
          setStatus(invoice.status);
          setTokenP(invoice.token);
          setResponseText(invoice.responseText);
          // setPaymentDetails(invoice);
          console.log(payment);
          window.open(invoice.url, "_blank");
          setOpenModal(false);
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
                    <label className="text-gray-800 text-sm mt-4">
                      Montant Tax :
                      <input
                        type="text"
                        value={formatPrice(order.amount_tax)}
                        disabled
                        className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                      />
                    </label>
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
                    Total à payer (en F CFA)
                    <input
                      type="text"
                      value={formatPrice(Math.ceil(order.amount_total))}
                      disabled
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                    />
                    <br />
                    Montant à payer (en F CFA)
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
                  {paymentResponse && (
                    <div className="mt-8">
                      <p className="text-gray-800 text-sm">
                        Réponse du paiement :
                      </p>
                      <pre className="text-gray-600 text-sm mt-1">
                        {JSON.stringify(paymentResponse, null, 2)}
                      </pre>
                    </div>
                  )}
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
