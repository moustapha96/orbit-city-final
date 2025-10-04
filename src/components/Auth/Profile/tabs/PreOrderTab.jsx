/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PreCommandeService from "../../../../services/precommandeService";
// import formatDate from "../../../../utils/date-format";
// import formatPrice from "../../../../utils/formatPrice";
// import { useAuthContext } from "../../../../contexts/useAuthContext";
// export default function PreOrderTab({ type = 3 }) {
//   const [precommandes, setPreCommandes] = useState([]);
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         const data = await PreCommandeService.getPreCommandes(user.id);
//         if (Array.isArray(data)) {
//           const filteredPreCommandes = data.filter((commande) => commande.state !== "cancel");
//           console.log("Filtered pre-commandes:", filteredPreCommandes);
//           setPreCommandes(filteredPreCommandes);
//         } else {
//           console.error("Received data is not an array:", data);
//           setPreCommandes([]);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des modèles", error);
//       }
//     };
//     fetchModels();
//   }, []);

//   const navigate = useNavigate();
//   const handleDetails = (e, commande) => {
//     e.preventDefault();
//     console.log(commande);
//     navigate(`/pre-commandes/${commande.id}/détails`, { state: { commande } });
//   };

//   return (
//     <>
//       <div className="relative w-full overflow-x-auto sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <tbody>
//             <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
//               <td className="py-4 block whitespace-nowrap text-center">
//                 Précommande
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Date
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Statut
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Payment
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Montant
//               </td>
//               <td className="py-4 whitespace-nowrap text-center">Action</td>
//             </tr>
//             {/* table heading end */}

//             {Array.isArray(precommandes) && precommandes.length != 0 && (
//               <>
//                 {precommandes && precommandes.map((commande) => (
//                   <tr
//                     className="bg-white border-b hover:bg-gray-50"
//                     key={commande.id}
//                   >
//                     <td className="text-center py-4">
//                       <span className="text-lg text-qgray font-medium">
//                         #{commande.name}
//                       </span>
//                     </td>
//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span className="text-base text-qgray whitespace-nowrap">
//                         {formatDate(commande.date_order)}{" "}
//                       </span>
//                     </td>


//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span className="text-base text-qgray whitespace-nowrap">

//                         {commande.state == "to_delivered" ? "en cours de livraison" : commande.state == "delivered" ? "livré" : "Validé"}
//                       </span>
//                     </td>


//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <div className=" ">
//                         {commande.advance_payment_status === "not_paid" && (
//                           <span className="text-red-500">Non Effectif</span>
//                         )}
//                         {commande.advance_payment_status === "partial" && (
//                           <span className="text-yellow-500">
//                             Partiellement payé
//                           </span>
//                         )}
//                         {commande.advance_payment_status === "paid" && (
//                           <span className="text-green-500">Effectif</span>
//                         )}
//                         <p>
//                           {commande.advance_payment_status === "partial" && (
//                             <>
//                               {" "}
//                               Reste : {formatPrice(commande.amount_residual)}
//                             </>
//                           )}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span className="text-base text-qblack whitespace-nowrap px-2 ">
//                         {commande.advance_payment_status == "partial" && (
//                           <>
//                             {" "}
//                             <span className="text-yellow-500">
//                               {" "}
//                               {formatPrice(commande.amount_total)}
//                             </span>
//                           </>
//                         )}
//                         {commande.advance_payment_status == "paid" && (
//                           <>
//                             {" "}
//                             <span className="text-green-500">
//                               {" "}
//                               {formatPrice(commande.amount_total)}
//                             </span>
//                           </>
//                         )}
//                         {commande.advance_payment_status == "not_paid" && (
//                           <>
//                             {" "}
//                             <span className="text-red-500">
//                               {" "}
//                               {formatPrice(commande.amount_total)}
//                             </span>
//                           </>
//                         )}
//                         <br />
//                       </span>
//                     </td>
//                     <td className="text-center py-4">
//                       <button
//                         type="button"
//                         title="voir les détails"
//                         onClick={(event) => handleDetails(event, commande)}
//                         className="w-[116px] h-[46px] bg-bleu-logo text-white hover:bg-bleu-claire font-bold"
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

//         {precommandes && precommandes.length == 0 && (
//           <p className="text-center mt-5 ">
//             Votre Liste de précommandes est vide{" "}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PreCommandeService from "../../../../services/precommandeService"
import formatDate from "../../../../utils/date-format"
import formatPrice from "../../../../utils/formatPrice"
import { useAuthContext } from "../../../../contexts/useAuthContext"
import { CheckCircle, Package, Truck, Eye, ChevronRight, ChevronLeft } from 'lucide-react'

export default function PreOrderTab({ type = 3 }) {
  const [precommandes, setPreCommandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const data = await PreCommandeService.getPreCommandes(user.id)
        if (Array.isArray(data)) {
          const filteredPreCommandes = data.filter((commande) => commande.state !== "cancel")
          console.log("Filtered pre-commandes:", filteredPreCommandes)
          setPreCommandes(filteredPreCommandes)
        } else {
          console.error("Received data is not an array:", data)
          setPreCommandes([])
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error)
      } finally {
        setLoading(false)
      }
    }
    fetchModels()
  }, [user.id])

  const handleDetails = (e, commande) => {
    e.preventDefault()
    console.log(commande)
    navigate(`/pre-commandes/${commande.id}/détails`, { state: { commande } })
  }

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = precommandes.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getStatusIcon = (state) => {
    switch (state) {
      case "to_delivered":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Package className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusText = (state) => {
    switch (state) {
      case "to_delivered":
        return "En cours de livraison"
      case "delivered":
        return "Livré"
      default:
        return "Validé"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "not_paid":
        return "text-red-500"
      case "partial":
        return "text-yellow-500"
      case "paid":
        return "text-green-500"
      default:
        return ""
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Précommandes</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : precommandes.length === 0 ? (
        <p className="text-center text-gray-500">Votre Liste de précommandes est vide</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Précommande</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Statut</th>
                <th className="py-2 px-4 text-left">Payment</th>
                <th className="py-2 px-4 text-left">Montant</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((commande) => (
                <tr key={commande.id} className="border-b">
                  <td className="py-2 px-4">#{commande.name}</td>
                  <td className="py-2 px-4">{formatDate(commande.date_order)}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(commande.state)}
                      <span className="ml-2 capitalize">{getStatusText(commande.state)}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className={getPaymentStatusColor(commande.advance_payment_status)}>
                      {commande.advance_payment_status === "not_paid" && "Non Effectif"}
                      {commande.advance_payment_status === "partial" && "Partiellement payé"}
                      {commande.advance_payment_status === "paid" && "Effectif"}
                      {commande.advance_payment_status === "partial" && (
                        <p className="text-sm">Reste : {formatPrice(commande.amount_residual)}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span className={getPaymentStatusColor(commande.advance_payment_status)}>
                      {formatPrice(commande.amount_total)}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={(e) => handleDetails(e, commande)}
                      className="flex items-center px-3 py-1 bg-bleu-logo text-white rounded hover:bg-bleu-claire transition-colors"
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

      {!loading && precommandes.length > ordersPerPage && (
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
            {Array.from({ length: Math.ceil(precommandes.length / ordersPerPage) }).map((_, index) => (
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
              disabled={currentPage === Math.ceil(precommandes.length / ordersPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}