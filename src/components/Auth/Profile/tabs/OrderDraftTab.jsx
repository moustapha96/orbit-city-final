

// import { useEffect, useState, useMemo } from "react";
// import CommandeService from "../../../../services/CommandeService";
// import formatDate from "../../../../utils/date-format";
// import { useNavigate } from "react-router-dom";
// import formatPrice from "../../../../utils/formatPrice";
// import { toast } from "react-toastify";
// import { useAuthContext } from "../../../../contexts/useAuthContext";

// export default function OrderDraftTab() {
//   const [commandes, setCommandes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(2);
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         const data = await CommandeService.getCommandes(user.id);
//         const pr = data.filter((commande) => commande.state === "draft");
//         setCommandes(pr);
//         console.log(pr);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des modèles", error);
//       }
//     };
//     fetchModels();
//   }, [user.id]);

//   const handleDetails = (e, commande) => {
//     e.preventDefault();
//     console.log(commande);
//     navigate(`/commandes/${commande.id}/détails`, { state: { commande } });
//   };

//   const deleteCommande = (e, commande) => {
//     e.preventDefault();
//     console.log(commande);
//     if (window.confirm("Voulez-vous supprimer cette commande?")) {
//       CommandeService.deleteCommande(commande.id)
//         .then(() => {
//           const updatedCommandes = commandes.filter(
//             (c) => c.id !== commande.id
//           );
//           setCommandes(updatedCommandes);
//           console.log("Commande supprimée avec succès");
//           toast.success("Commande supprimée avec succès", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         })
//         .catch((error) => {
//           console.error("Erreur lors de la suppression", error);
//           toast.error(error.message, {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         });
//     }
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = useMemo(() => {
//     return commandes.slice(indexOfFirstItem, indexOfLastItem);
//   }, [commandes, indexOfFirstItem, indexOfLastItem]);

//   const totalPages = Math.ceil(commandes.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <div className="relative w-full overflow-x-auto sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <tbody>
//             {/* table heading */}
//             <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
//               <td className="py-4 block whitespace-nowrap text-center">
//                 Commande
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Date
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Statut
//               </td>
//               <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
//                 Montant
//               </td>
//               <td className="py-4 whitespace-nowrap text-center">Action</td>
//             </tr>
//             {/* table heading end */}

//             {Array.isArray(currentItems) && currentItems.length > 0 && (
//               <>
//                 {currentItems.map((commande) => (
//                   <tr
//                     className="bg-white border-b hover:bg-gray-50"
//                     key={commande.id}
//                   >
//                     <td className="text-center py-4">
//                       <span className="text-lg text-qgray font-medium">
//                         #{commande.id} - {commande.name}
//                       </span>
//                     </td>
//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span className="text-base text-qgray whitespace-nowrap">
//                         {formatDate(commande.date_order)}{" "}
//                       </span>
//                     </td>
//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span
//                         className={`text-sm rounded p-2 ${commande.advance_payment_status !== "not_paid"
//                           ? "text-green-500 bg-green-100"
//                           : "text-red-500 bg-red-100"
//                           }`}
//                       >
//                         {commande.advance_payment_status === "not_paid"
//                           ? "Non Payé"
//                           : "Payé"}
//                       </span>
//                     </td>
//                     <td className="text-center py-4 px-2 hidden sm:table-cell">
//                       <span className="text-base text-qblack whitespace-nowrap px-2 ">
//                         {commande.advance_payment_status === "not_paid" ? (
//                           <span className="text-red-500">
//                             {formatPrice(commande.amount_total)}
//                           </span>
//                         ) : (
//                           <span className="text-green-500">
//                             {formatPrice(commande.amount_total)}
//                           </span>
//                         )}
//                       </span>
//                     </td>
//                     <td className="text-center py-4">
//                       <button
//                         type="button"
//                         title="voir les détails"
//                         onClick={(event) => handleDetails(event, commande)}
//                         className="w-[116px] h-[46px] bg-bleu-logo text-white hover:bg-bleu-claire font-bold mr-2"
//                       >
//                         Voir les détails
//                       </button>
//                       <button
//                         type="button"
//                         title="supprimer commande"
//                         onClick={(event) => deleteCommande(event, commande)}
//                         className="w-[116px] h-[46px] bg-red-500 text-white hover:bg-red-900 font-bold duration-200"
//                       >
//                         Supprimer
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </>
//             )}
//           </tbody>
//         </table>

//         {(!Array.isArray(commandes) || commandes.length === 0) && (
//           <p className="text-center m-5">
//             Votre Liste de commande est vide
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4">
//           <nav>
//             <ul className="flex list-none">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                 <li key={number} className="mx-1">
//                   <button
//                     onClick={() => paginate(number)}
//                     className={`px-3 py-1 rounded ${currentPage === number
//                       ? "bg-bleu-logo text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                       }`}
//                   >
//                     {number}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CommandeService from "../../../../services/CommandeService"
import formatDate from "../../../../utils/date-format"
import formatPrice from "../../../../utils/formatPrice"
import { useAuthContext } from "../../../../contexts/useAuthContext"
import { Package, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from "react-toastify"

export default function OrderDraftTab() {
  const [commandes, setCommandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const data = await CommandeService.getCommandes(user.id)
        const draftCommandes = data.filter((commande) => commande.state === "draft")
        setCommandes(draftCommandes)
        console.log(draftCommandes)
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
    navigate(`/commandes/${commande.id}/détails`, { state: { commande } })
  }

  const deleteCommande = (e, commande) => {
    e.preventDefault()
    console.log(commande)
    if (window.confirm("Voulez-vous supprimer cette commande?")) {
      CommandeService.deleteCommande(commande.id)
        .then(() => {
          setCommandes(commandes.filter((c) => c.id !== commande.id))
          console.log("Commande supprimée avec succès")
          toast.success("Commande supprimée avec succès", {
            position: "top-center",
          })
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression", error)
          toast.error(error.message, {
            position: "top-center",
          })
        })
    }
  }

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = commandes.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Commandes brouillon</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : commandes.length === 0 ? (
        <p className="text-center text-gray-500">Aucune commande brouillon trouvée</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Commande</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Statut</th>
                <th className="py-2 px-4 text-left">Montant</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((commande) => (
                <tr key={commande.id} className="border-b">
                  <td className="py-2 px-4">#{commande.name}</td>
                  <td className="py-2 px-4">{formatDate(commande.date_order)}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>Brouillon</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">{formatPrice(commande.amount_total)}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleDetails(e, commande)}
                        className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Détails
                      </button>
                      <button
                        onClick={(e) => deleteCommande(e, commande)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && commandes.length > ordersPerPage && (
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
            {Array.from({ length: Math.ceil(commandes.length / ordersPerPage) }).map((_, index) => (
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
              disabled={currentPage === Math.ceil(commandes.length / ordersPerPage)}
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