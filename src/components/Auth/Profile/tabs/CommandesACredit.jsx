/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */


// import { useEffect, useState } from "react"
// import { getCommandeCreditClient } from "../../../../services/entrepriseFunctionService"
// import formatPrice from "../../../../utils/formatPrice"
// import { CheckCircle, ChevronLeft, ChevronRight, XCircle, Package, Truck, Eye } from 'lucide-react'
// import { useAuthContext } from "../../../../contexts/useAuthContext"
// import { useNavigate } from "react-router-dom"
// export default function CommandeAcredit({ className }) {
//     const navigate = useNavigate()
//     const { user } = useAuthContext()

//     const [orders, setOrders] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [ordersPerPage] = useState(5)

//     useEffect(() => {
//         if (user.id) {
//             fetchCommandeAcredit(user.id)
//         }
//     }, [user.id])

//     const fetchCommandeAcredit = async (id) => {
//         setLoading(true)
//         try {
//             const res = await getCommandeCreditClient(id)
//             console.log("res", res)
//             setOrders(res)
//         } catch (error) {
//             console.error("Error fetching clients:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleDetails = (e, commande) => {
//         e.preventDefault()
//         console.log(commande)
//         navigate(`/credit-commandes/${commande.id}/détails`, { state: { commande } })
//     }

//     // Get current orders
//     const indexOfLastOrder = currentPage * ordersPerPage
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
//     const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber)

//     const getStatusIcon = (status) => {
//         switch (status.toLowerCase()) {
//             case 'sale':
//                 return <CheckCircle className="w-5 h-5 text-green-500" />
//             case 'cancel':
//                 return <XCircle className="w-5 h-5 text-red-500" />
//             case 'draft':
//                 return <Package className="w-5 h-5 text-yellow-500" />
//             default:
//                 return <Truck className="w-5 h-5 text-blue-500" />
//         }
//     }

//     const getStatusText = (status) => {
//         switch (status.toLowerCase()) {
//             case 'sale':
//                 return 'Confirmé'
//             case 'cancel':
//                 return 'Annulé'
//             case 'draft':
//                 return 'Brouillon'
//             default:
//                 return 'En cours'
//         }
//     }

//     return (
//         <div className="bg-white shadow-md rounded-lg p-6">
//             <div className="flex items-center mb-6">
//                 <h2 className="text-2xl font-bold">Commandes à crédit</h2>
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//                 </div>
//             ) : orders.length === 0 ? (
//                 <p className="text-center text-gray-500">Aucune commande trouvée </p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="py-2 px-4 text-left">Nom</th>
//                                 <th className="py-2 px-4 text-left">Somme</th>
//                                 <th className="py-2 px-4 text-left">Date</th>
//                                 <th className="py-2 px-4 text-left">État</th>
//                                 <th className="py-2 px-4 text-left">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentOrders.map((order) => (
//                                 <tr key={order.id} className="border-b">
//                                     <td className="py-2 px-4">{order.name}</td>
//                                     <td className="py-2 px-4">{formatPrice(order.amount_total)}</td>
//                                     <td className="py-2 px-4">{new Date(order.date_order).toLocaleDateString()}</td>
//                                     <td className="py-2 px-4">
//                                         <div className="flex items-center">
//                                             {getStatusIcon(order.state)}
//                                             <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
//                                         </div>
//                                     </td>
//                                     <td className="py-2 px-4">
//                                         <button
//                                             onClick={(e) => handleDetails(e, order)}
//                                             className="flex items-center px-3 py-1 bg-bleu-logo text-white rounded hover:bg-bleu-claire transition-colors"
//                                         >
//                                             <Eye className="w-4 h-4 mr-2" />
//                                             Détails
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {!loading && orders.length > ordersPerPage && (
//                 <div className="mt-6 flex justify-center">
//                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                         <button
//                             onClick={() => paginate(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                         >
//                             <span className="sr-only">Previous</span>
//                             <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                         {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => paginate(index + 1)}
//                                 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
//                   ${currentPage === index + 1
//                                         ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                                         : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                                     }`}
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                         <button
//                             onClick={() => paginate(currentPage + 1)}
//                             disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
//                             className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                         >
//                             <span className="sr-only">Next</span>
//                             <ChevronRight className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                     </nav>
//                 </div>
//             )}
//         </div>
//     )
// }

import { useEffect, useState } from "react"
import { getCommandeCreditClient } from "../../../../services/entrepriseFunctionService"
import formatPrice from "../../../../utils/formatPrice"
import { CheckCircle, ChevronLeft, ChevronRight, XCircle, Package, Truck, Eye } from 'lucide-react'
import { useAuthContext } from "../../../../contexts/useAuthContext"
import { useNavigate } from "react-router-dom"

export default function CommandeAcredit({ className }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(5)

    useEffect(() => {
        if (user.id) {
            fetchCommandeAcredit(user.id)
        }
    }, [user.id])

    const fetchCommandeAcredit = async (id) => {
        setLoading(true)
        try {
            const res = await getCommandeCreditClient(id)
            console.log("res", res)
            setOrders(res)
        } catch (error) {
            console.error("Error fetching clients:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDetails = (e, commande) => {
        e.preventDefault()
        console.log(commande)
        navigate(`/credit-commandes/${commande.id}/détails`, { state: { commande } })
    }

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'cancel':
                return <XCircle className="w-5 h-5 text-red-500" />
            case 'draft':
                return <Package className="w-5 h-5 text-yellow-500" />
            default:
                return <Truck className="w-5 h-5 text-blue-500" />
        }
    }

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
                return 'Confirmé'
            case 'cancel':
                return 'Annulé'
            case 'draft':
                return 'Brouillon'
            default:
                return 'En cours'
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Commandes à crédit</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-500">Aucune commande trouvée </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Nom</th>
                                <th className="py-2 px-4 text-left">Somme</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">État</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="py-2 px-4 whitespace-nowrap">{order.name}</td>
                                    <td className="py-2 px-4 whitespace-nowrap">{formatPrice(order.amount_total)}</td>
                                    <td className="py-2 px-4 whitespace-nowrap">{new Date(order.date_order).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(order.state)}
                                            <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 whitespace-nowrap">
                                        <button
                                            onClick={(e) => handleDetails(e, order)}
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

            {!loading && orders.length > ordersPerPage && (
                <div className="mt-6 flex flex-wrap justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px overflow-x-auto max-w-full py-2" aria-label="Pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
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
                            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
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

