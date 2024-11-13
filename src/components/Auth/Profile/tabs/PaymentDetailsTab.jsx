/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import formatDate from "../../../../utils/date-format";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../../utils/formatPrice";
import PaiementService from "../../../../services/paimentService";
import { UserContext } from "../../../../contexts/UserContext";

export default function PaymentDetailsTab() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await PaiementService.getPaymentsPartner(user.partner_id);
        setPayments(data.slice().reverse());
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const navigate = useNavigate();

  const handleDetails = (e, payment) => {
    e.preventDefault();
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleOpenInvoice = (e, facture) => {
    e.preventDefault();
    if (facture) {
      window.open(facture, "_blank", 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom">
              <td className="py-4 block whitespace-nowrap text-center">
                Commande
              </td>
              <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Date</td>
              <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Statut</td>
              <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Montant</td>
              <td className="py-4 whitespace-nowrap text-center">Action</td>
            </tr>
            {/* table heading end */}

            {Array.isArray(payments) && payments.length !== 0 && (
              <>
                {payments.map((pay) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={pay.id}>
                    <td className="text-center py-4">
                      <span className="text-lg text-qgray font-medium">
                        #{pay.order_name}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell text-center py-4 px-2">
                      <span className="text-base text-qgray whitespace-nowrap">
                        {formatDate(pay.payment_date)}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell text-center py-4 px-2">
                      <span
                        className={`text-sm rounded p-2 ${pay.payment_state !== "pending"
                          ? "text-green-500 bg-green-100"
                          : "text-red-500 bg-red-100"
                          }`}
                      >
                        {pay.payment_state === "pending" ? "Non Payé" : "Payé"}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell text-center py-4 px-2">
                      <span className="text-base text-qblack whitespace-nowrap px-2">
                        {pay.payment_state === "pending" ? (
                          <>
                            <span className="text-red-500">
                              {formatPrice(pay.amount)}
                            </span>
                          </>
                        ) : (
                          <span className="text-green-500">
                            {formatPrice(pay.amount)}
                          </span>
                        )}
                        <br />
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <button
                        type="button"
                        title="voir les détails"
                        onClick={(event) => handleDetails(event, pay)}
                        className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                      >
                        Voir les détails
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {!Array.isArray(payments) ||
          (payments.length === 0 && (
            <p className="text-center m-5">Aucun payments effectués</p>
          ))}
      </div>



      {/* Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Détails du paiement</h2>
            <div className="mb-4">
              <p className="text-gray-600">
                <strong>Transaction ID:</strong>{" "}
                {selectedPayment.transaction_id}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {formatDate(selectedPayment.payment_date)}
              </p>
              <p className="text-gray-600">
                <strong>Statut:</strong>{" "}
                {selectedPayment.payment_state === "pending"
                  ? "Non Payé"
                  : "Payé"}
              </p>
              <p className="text-gray-600">
                <strong>
                  Nom{" "}
                  {selectedPayment.order_type == "order"
                    ? "Commande"
                    : "Précommande"}{" "}
                  :{" "}
                </strong>{" "}
                {selectedPayment.order_name}
              </p>
              <p className="text-gray-600">
                <strong>Montant Payé : </strong>{" "}
                {formatPrice(selectedPayment.amount)}
              </p>
              <p className="text-gray-600">
                <strong>Prenom & Nom : </strong> {selectedPayment.customer_name}
              </p>
              <p className="text-gray-600">
                <strong>Email : </strong> {selectedPayment.customer_email}
              </p>
              <p className="text-gray-600">
                <strong>Téléphone : </strong> {selectedPayment.customer_phone}
              </p>
              Facture :
              <button
                className="text-[15px] text-qblack font-medium underline"
                onClick={(e) =>
                  handleOpenInvoice(e, selectedPayment.url_facture)
                }
              >
                Ouvrir la facture
              </button>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
