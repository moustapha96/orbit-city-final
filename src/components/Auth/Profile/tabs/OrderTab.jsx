

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CommandeService from "../../../../services/CommandeService"
import formatDate from "../../../../utils/date-format"
import formatPrice from "../../../../utils/formatPrice"
import { useAuthContext } from "../../../../contexts/useAuthContext"
import { CheckCircle, Package, Truck, Eye, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { toast } from "react-toastify"

export default function OrderTab() {
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
        const filteredCommandes = data.filter((commande) => commande.state !== "draft" && commande.state !== "cancel")
        setCommandes(filteredCommandes)
        console.log(filteredCommandes)
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
    if (window.confirm("Voulez-vous annuler la commande?")) {
      CommandeService.deleteCommande(commande.id)
        .then(() => {
          setCommandes(commandes.filter((c) => c.id !== commande.id))

          toast.success("Commande annulée avec succès", {
            position: "top-center",
          })
        })
        .catch((error) => {

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
    return status === "not_paid" ? "text-red-500" : "text-green-500"
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Commandes</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : commandes.length === 0 ? (
        <p className="text-center text-gray-500">Votre Liste de commande est vide</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Commande</th>
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
                    <span className={`${getPaymentStatusColor(commande.advance_payment_status)} px-2 py-1 rounded-full text-xs font-medium`}>
                      {commande.advance_payment_status === "not_paid" ? "Non Payé" : "Payé"}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className={getPaymentStatusColor(commande.advance_payment_status)}>
                      {formatPrice(commande.amount_total)}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">

                      <button
                        onClick={(e) => handleDetails(e, commande)}
                        className="flex items-center px-3 py-1 bg-bleu-logo text-white rounded hover:bg-bleu-claire transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Détails
                      </button>

                      {commande.state === "to_delivered" || commande.advance_payment_status === "not_paid" && (

                        <button
                          onClick={(e) => deleteCommande(e, commande)}
                          className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </button>
                      )}
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