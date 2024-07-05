/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Modal, TextInput, Button, Label } from "flowbite-react";
import formatPrice from "../utils/formatPrice";
import { toast } from "react-toastify";
const PayTechPaymentForm = ({ handlePay, totalAmount, onClose, order }) => {
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [openModal, setOpenModal] = useState(true);

  const [amount, setAmount] = useState(totalAmount);
  const [description, setDescription] = useState(order.name);
  const [storeName, setStoreName] = useState("Orbit city test paydunya");
  const [paymentUrl, setPaymentUrl] = useState("");

  console.log("payment moddal ");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";
    const params = {
      item_name: "Iphone 19",
      item_price: amount,
      currency: "XOF",
      ref_command: order.name,
      command_name: order.name,
      env: "test",
      ipn_url: "https://domaine.com/ipn",
      success_url: "https://domaine.com/success",
      cancel_url: "https://domaine.com/cancel",
      // custom_field: JSON.stringify({
      //   custom_fiel1: "value_1",
      //   custom_fiel2: "value_2",
      // }),
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      API_KEY:
        "1c61ce29453f2e9132fd928b28a494927381c893e4fb380df9003ad2485a6bf6",
      API_SECRET:
        "c15ffd3e54419db9a03389cd26133311bf0c9674f692462ffaad9f5625632ccb",
    };

    fetch(paymentRequestUrl, {
      method: "POST",
      body: JSON.stringify(params),
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
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

              <p>close</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="my-8">
                <label className="text-gray-800 text-sm">
                  Nom de l'article :
                  <select
                    multiple
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  >
                    {order.order_lines.map((article, index) => (
                      <option key={index} value={article.product_name}>
                        {article.product_name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-gray-800 text-sm">
                  <label className="text-gray-800 text-sm mt-4">
                    Prix de l'article :
                    <input
                      type="text"
                      value={formatPrice(totalAmount)}
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
                  Total à payer
                  <input
                    type="text"
                    value={order.name}
                    disabled
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <br />
                <div className="flex max-sm:flex-col items-center gap-4 mt-8">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-sm px-4 py-2.5 w-full tracking-wide bg-red-400 hover:bg-red-700 text-white rounded-lg"
                  >
                    Effectuer le paiement
                  </button>
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

export default PayTechPaymentForm;
