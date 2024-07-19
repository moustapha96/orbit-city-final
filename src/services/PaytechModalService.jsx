/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { Button, Modal } from "flowbite-react";
import formatPrice from "../utils/formatPrice";
import { toast } from "react-toastify";
import { CircleX, Loader2 } from "lucide-react";

const PaytechModalService = ({
  handlePay,
  totalAmount,
  onClose,
  order,
  type,
  tranche,
}) => {
  console.log(order);
  console.log(totalAmount);
  console.log(type);
  console.log(tranche);

  const [isLoading, setIsloading] = useState(false);

  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    localStorage.setItem("idOrderPayment", null);
    localStorage.setItem("tokenOrderPayment", null);
    localStorage.setItem("statusOrderPayment", null);
    localStorage.setItem("tranchePayement", null);
    localStorage.setItem("typePayment", null);
    localStorage.setItem("responseTextOrderPayment", null);
  }, []);

  const handleSubmit = async (event) => {
    setIsloading(true);
    event.preventDefault();

    const items = [];
    order.order_lines.forEach((article) => {
      items.push({
        name: article.product_name,
        quantity: article.product_uom_qty,
        price: article.price_unit,
        total: article.price_subtotal,
      });
    });
    const paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";
    const params = {
      item_name: "Commande",
      item_price: totalAmount,
      currency: "XOF",
      ref_command: order.name,
      command_name: `Paiement ${order.name} via PayTech`,
      env: "test",
      ipn_url: "https://www.orbitcitydev.com/profile#dashboard",
      success_url: "https://www.orbitcitydev.com/payment",
      cancel_url: "https://www.orbitcitydev.com/profile",
      payment_method: [
        "Carte Bancaire",
        "PayPal",
        "Orange Money",
        "Joni Joni",
        "Wari",
        "Poste Cash",
      ],

      custom_field: JSON.stringify({
        custom_field1: "value_1",
        custom_field2: "value_2",
      }),
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      API_KEY:
        "cce7a3dc76b2f65ac76cd7bfe239e9e3fdd6acbec7583be33571032107932ea5",
      API_SECRET:
        "7459d044c961cb9cefa13c00941880ca4f7e199b747b61bcfe172c877bb8250a",
    };

    try {
      const response = await fetch(paymentRequestUrl, {
        method: "POST",
        body: JSON.stringify(params),
        headers: headers,
      });
      console.log(headers, params);
      const jsonResponse = await response.json();

      if (jsonResponse.success === 1) {
        toast.success("Payment validé avec succès", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPaymentUrl(jsonResponse.redirect_url);
        localStorage.setItem("idOrderPayment", order.id);
        localStorage.setItem("tokenOrderPayment", jsonResponse.token);
        localStorage.setItem("statusOrderPayment", jsonResponse.success);
        localStorage.setItem("tranchePayement", tranche);
        localStorage.setItem("typePayment", type);
        localStorage.setItem("responseTextOrderPayment", jsonResponse.message);
        console.log(jsonResponse);
        window.open(jsonResponse.redirect_url, "_blank");
        setOpenModal(false);
      } else {
        toast.error("Payment non effectif", {
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

    setIsloading(false);
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
                <h3 className="text-gray-800 text-xl font-bold">Commande</h3>
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

            <form onSubmit={handleSubmit}>
              <div className="my-8">
                <label className="text-gray-800 text-sm">
                  Nom de larticle :
                  <select
                    multiple
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  >
                    {order.order_lines.map((article, index) => (
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
                  <br />
                  Total à payer (en F CFA)
                  <input
                    type="text"
                    value={totalAmount}
                    disabled
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <br />
                <div className="flex max-sm:flex-col items-center gap-4 mt-8">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                  >
                    {" "}
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Effectuer le paiement
                  </Button>
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
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaytechModalService;
