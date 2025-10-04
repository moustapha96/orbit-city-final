// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import formatDate from "../../../../utils/date-format";
// import { useNavigate } from "react-router-dom";
// import formatPrice from "../../../../utils/formatPrice";
// import PaiementService from "../../../../services/paimentService";
// import { UserContext } from "../../../../contexts/UserContext";
// import { useAuthContext } from "../../../../contexts/useAuthContext";

// export default function PaymentDetailsTab() {
//   const [payments, setPayments] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const { session, isAuthenticated, token, user, comapny, userContext, saveSession } = useAuthContext();

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         const data = await PaiementService.getPaymentsPartner(user.partner_id);
//         setPayments(data.slice().reverse());
//         console.log(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des modèles", error);
//       }
//     };
//     fetchModels();
//   }, []);

//   const navigate = useNavigate();

//   const handleDetails = (e, payment) => {
//     e.preventDefault();
//     setSelectedPayment(payment);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedPayment(null);
//   };

//   const handleOpenInvoice = (e, facture) => {
//     e.preventDefault();
//     if (facture) {
//       window.open(facture, "_blank", 'noopener,noreferrer');
//     }
//   };

//   return (
//     <>
//       <div className="relative w-full overflow-x-auto sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <tbody>
//             {/* table heading */}
//             <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom">
//               <td className="py-4 block whitespace-nowrap text-center">
//                 Commande
//               </td>
//               <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Date</td>
//               <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Statut</td>
//               <td className="hidden sm:table-cell py-4 whitespace-nowrap text-center">Montant</td>
//               <td className="py-4 whitespace-nowrap text-center">Action</td>
//             </tr>
//             {/* table heading end */}

//             {Array.isArray(payments) && payments.length !== 0 && (
//               <>
//                 {payments.map((pay) => (
//                   <tr className="bg-white border-b hover:bg-gray-50" key={pay.id}>
//                     <td className="text-center py-4">
//                       <span className="text-lg text-qgray font-medium">
//                         #{pay.order_name}
//                       </span>
//                     </td>
//                     <td className="hidden sm:table-cell text-center py-4 px-2">
//                       <span className="text-base text-qgray whitespace-nowrap">
//                         {formatDate(pay.payment_date)}
//                       </span>
//                     </td>
//                     <td className="hidden sm:table-cell text-center py-4 px-2">
//                       <span
//                         className={`text-sm rounded p-2 ${pay.payment_state !== "pending"
//                           ? "text-green-500 bg-green-100"
//                           : "text-red-500 bg-red-100"
//                           }`}
//                       >
//                         {pay.payment_state === "pending" ? "Non Payé" : "Payé"}
//                       </span>
//                     </td>
//                     <td className="hidden sm:table-cell text-center py-4 px-2">
//                       <span className="text-base text-qblack whitespace-nowrap px-2">
//                         {pay.payment_state === "pending" ? (
//                           <>
//                             <span className="text-red-500">
//                               {formatPrice(pay.amount)}
//                             </span>
//                           </>
//                         ) : (
//                           <span className="text-green-500">
//                             {formatPrice(pay.amount)}
//                           </span>
//                         )}
//                         <br />
//                       </span>
//                     </td>
//                     <td className="text-center py-4">
//                       <button
//                         type="button"
//                         title="voir les détails"
//                         onClick={(event) => handleDetails(event, pay)}
//                         className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
//                       >
//                         Voir les détails
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}
//           </tbody>
//         </table>
//         {!Array.isArray(payments) ||
//           (payments.length === 0 && (
//             <p className="text-center m-5">Aucun payments effectués</p>
//           ))}
//       </div>



//       {/* Modal */}
//       {showModal && selectedPayment && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Détails du paiement</h2>
//             <div className="mb-4">
//               <p className="text-gray-600">
//                 <strong>Transaction ID:</strong>{" "}
//                 {selectedPayment.transaction_id}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Date:</strong>{" "}
//                 {formatDate(selectedPayment.payment_date)}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Statut:</strong>{" "}
//                 {selectedPayment.payment_state === "pending"
//                   ? "Non Payé"
//                   : "Payé"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>
//                   Nom{" "}
//                   {selectedPayment.order_type == "order"
//                     ? "Commande"
//                     : "Précommande"}{" "}
//                   :{" "}
//                 </strong>{" "}
//                 {selectedPayment.order_name}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Montant Payé : </strong>{" "}
//                 {formatPrice(selectedPayment.amount)}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Prenom & Nom : </strong> {selectedPayment.customer_name}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Email : </strong> {selectedPayment.customer_email}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Téléphone : </strong> {selectedPayment.customer_phone}
//               </p>
//               Facture :
//               <button
//                 className="text-[15px] text-qblack font-medium underline"
//                 onClick={(e) =>
//                   handleOpenInvoice(e, selectedPayment.url_facture)
//                 }
//               >
//                 Ouvrir la facture
//               </button>
//             </div>
//             <button
//               onClick={closeModal}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Fermer
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useState } from "react"
import PaiementService from "../../../../services/paimentService"
import formatDate from "../../../../utils/date-format"
import formatPrice from "../../../../utils/formatPrice"
import { useAuthContext } from "../../../../contexts/useAuthContext"
import { CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

export default function PaymentDetailsTab() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentsPerPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const data = await PaiementService.getPaymentsPartner(user.partner_id)
        setPayments(data.slice().reverse())
        console.log(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error)
      } finally {
        setLoading(false)
      }
    }
    fetchModels()
  }, [user.partner_id])

  const handleDetails = (e, payment) => {
    e.preventDefault()
    setSelectedPayment(payment)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  const handleOpenInvoice = (e, facture) => {
    e.preventDefault()
    if (facture) {
      window.open(facture, "_blank", 'noopener,noreferrer')
    }
  }

  // Get current payments
  const indexOfLastPayment = currentPage * paymentsPerPage
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
<<<<<<< HEAD
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Détails des paiements</h2>
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500">Aucun paiement effectué</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Commande</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Statut</th>
                <th className="py-2 px-4 text-left">Montant</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((pay) => (
                <tr key={pay.id} className="border-b">
                  <td className="py-2 px-4">#{pay.order_name}</td>
                  <td className="py-2 px-4">{formatDate(pay.payment_date)}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      {pay.payment_state === "pending" ? (
                        <XCircle className="w-5 h-5 text-red-500 mr-2" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      )}
                      <span className={pay.payment_state === "pending" ? "text-red-500" : "text-green-500"}>
                        {pay.payment_state === "pending" ? "Non Payé" : "Payé"}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span className={pay.payment_state === "pending" ? "text-red-500" : "text-green-500"}>
                      {formatPrice(pay.amount)}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={(e) => handleDetails(e, pay)}
                      className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && payments.length > paymentsPerPage && (
        <div className="mt-6 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {Array.from({ length: Math.ceil(payments.length / paymentsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                  ${currentPage === index + 1
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(payments.length / paymentsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Détails du paiement</h2>
            <div className="mb-4">
              <p className="text-gray-600"><strong>Transaction ID:</strong> {selectedPayment.transaction_id}</p>
              <p className="text-gray-600"><strong>Date:</strong> {formatDate(selectedPayment.payment_date)}</p>
              <p className="text-gray-600"><strong>Statut:</strong> {selectedPayment.payment_state === "pending" ? "Non Payé" : "Payé"}</p>
              <p className="text-gray-600">
                <strong>Nom {selectedPayment.order_type === "order" ? "Commande" : "Précommande"} : </strong> {selectedPayment.order_name}
              </p>
              <p className="text-gray-600"><strong>Montant Payé : </strong> {formatPrice(selectedPayment.amount)}</p>
              <p className="text-gray-600"><strong>Prenom & Nom : </strong> {selectedPayment.customer_name}</p>
              <p className="text-gray-600"><strong>Email : </strong> {selectedPayment.customer_email}</p>
              <p className="text-gray-600"><strong>Téléphone : </strong> {selectedPayment.customer_phone}</p>
              <p className="text-gray-600">
                <strong>Facture : </strong>
                <button
                  className="text-blue-500 underline"
                  onClick={(e) => handleOpenInvoice(e, selectedPayment.url_facture)}
                >
                  Ouvrir la facture
                </button>
              </p>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}