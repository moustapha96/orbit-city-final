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
import { CircleX } from "lucide-react";
const PayTechPaymentForm = ({ handlePay, totalAmount, onClose, order }) => {
  console.log(order);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [openModal, setOpenModal] = useState(true);

  const [amount, setAmount] = useState(totalAmount);
  const [description, setDescription] = useState(order.name);
  const [storeName, setStoreName] = useState("Orbit city test paydunya");
  const [paymentUrl, setPaymentUrl] = useState("");

  console.log("payment moddal ");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create",
        {
          invoice: {
            total_amount: amount,
            description: description,
          },
          store: {
            name: storeName,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "PAYDUNYA-MASTER-KEY": "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
            "PAYDUNYA-PRIVATE-KEY": "test_private_rLI7U4b3J0SjDBJQ7cEC9OCayn9",
            "PAYDUNYA-TOKEN": "UWVccdmuTo5tusRDkoZQ",
          },
        }
      );
      console.log(response);
      console.log(response.data);

      if (response.data.response_code == "00") {
        toast.success("reponse =>" + response.data.description, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.success("code =>" + response.data.response_code, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        try {
          const response_confirm = await axios.get(
            `https://app.paydunya.com/sandbox-api/v1/checkout-invoice/confirm/${response.data.token}`,
            {
              headers: {
                "Content-Type": "application/json",
                "PAYDUNYA-MASTER-KEY": "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
                "PAYDUNYA-PRIVATE-KEY":
                  "test_private_rLI7U4b3J0SjDBJQ7cEC9OCayn9",
                "PAYDUNYA-TOKEN": "UWVccdmuTo5tusRDkoZQ",
              },
            }
          );
          console.log(response_confirm);
          const custom_data = response_confirm.custom_data;
          const customer = response_confirm.customer;
          const invoice = response_confirm.invoice;
          const mode = response_confirm.mode;
          const status = response_confirm.status;
          const fail_reason = response_confirm.fail_reason;

          toast.success(
            "Réponse confirmation => " +
              response_confirm.data.invoice.description +
              " total_amount " +
              response_confirm.data.invoice.total_amount,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } catch (error) {
          toast.error("erreur confirmation =>" + response_confirm, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Réponse =>" + response.data.response_text, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.error("code => " + response.data.response_code, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setPaymentUrl(response.data.response_text);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
    setOpenModal(false);
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
                {" "}
                <CircleX onClick={onClose} />{" "}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="my-8">
                <label className="text-gray-800 text-sm">
                  Noms des articles :
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
                  Total à payer (en F CFA)
                  <input
                    type="text"
                    value={order.amount_total}
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
