<<<<<<< HEAD
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
=======



/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import InputCom from "../../../Helpers/InputQuantityCom";
import { CartContext } from "../../../../contexts/CartContext";

import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "../../../CartPage/ProductsTable";
import { UserContext } from "../../../../contexts/UserContext";
import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise, getCommandesCreditClientsEntreprise, setValidationStateCommande } from "../../../../services/entrepriseFunctionService";
import formatPrice from "../../../../utils/formatPrice";
import formatDate from "../../../../utils/date-format";
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, CreditCard, Loader2, Package, Truck, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import PaydunyaModalService from "../../../../services/PaydunyaModalService";
import { Button, Label, TextInput } from "flowbite-react";


export default function CommandeAcredit({ className }) {
    const { user } = useContext(UserContext);

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(2);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentAmounts, setPaymentAmounts] = useState({})
    const [processingPayments, setProcessingPayments] = useState({})
    const [paymentAmount, setPaymentAmount] = useState(null)


    useEffect(() => {
        if (user.company_id) {
            fetchCommandeAcredit(user.partner_id)
        }
    }, [user.partner_id]);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

    const fetchCommandeAcredit = async (id) => {
        setLoading(true)
        try {
<<<<<<< HEAD
            const res = await getCommandeCreditClient(id)
            console.log("res", res)
            setOrders(res)
        } catch (error) {
            console.error("Error fetching clients:", error)
=======
            const res = await getCommandesCreditClientsEntreprise(id);
            console.log("res")
            console.log(res)
            setOrders(res);

            const initialPaymentAmounts = res.reduce((acc, order) => ({
                ...acc,
                [order.id]: Math.max(order.amount_residual * 0.2, 1000)
            }), {})
            setPaymentAmounts(initialPaymentAmounts)
        } catch (error) {
            console.error("Error fetching clients:", error);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
        } finally {
            setLoading(false)
        }
    }
<<<<<<< HEAD

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
=======
    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
<<<<<<< HEAD
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'cancel':
                return <XCircle className="w-5 h-5 text-red-500" />
            case 'draft':
                return <Package className="w-5 h-5 text-yellow-500" />
            default:
                return <Truck className="w-5 h-5 text-blue-500" />
=======
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'cancel':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'draft':
                return <Package className="w-5 h-5 text-yellow-500" />;
            default:
                return <Truck className="w-5 h-5 text-blue-500" />;
        }
    };

    const getStatusIconValidation = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <XCircle className="w-5 h-5 text-yellow-500" />;
            case 'validated':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Truck className="w-5 h-5 text-blue-500" />;
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
        }
    }

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
<<<<<<< HEAD
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

=======
                return 'Confirmé';
            case 'cancel':
                return 'Annulé';
            case 'draft':
                return 'Brouillon';
            default:
                return 'En cours';
        }
    };

    const handlePay = async (order) => {
        const amount = paymentAmounts[order.id]
        if (amount < Math.max(order.amount_residual * 0.2, 1000) || amount > order.amount_residual) {
            alert(`Le montant doit être entre ${formatPrice(Math.max(order.amount_residual * 0.2, 1000))} et ${formatPrice(order.amount_residual)}`)
            return
        }

        setProcessingPayments(prev => ({ ...prev, [order.id]: true }))

        try {
            // Implement payment logic here
            console.log(`Processing payment of ${amount} for order ${order.id}`)

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // After successful payment, update the order
            const updatedOrders = orders.map(o =>
                o.id === order.id
                    ? { ...o, amount_residual: Math.max(o.amount_residual - amount, 0) }
                    : o
            )
            setOrders(updatedOrders)

            // Reset payment amount
            // setPaymentAmounts(prev => ({ ...prev, [order.id]: Math.max(updatedOrders.find(o => o.id === order.id)!.amount_residual * 0.2, 1000) }))

            alert(`Paiement de ${formatPrice(amount)} effectué avec succès pour la commande ${order.name}`)
        } catch (error) {
            console.error("Payment failed:", error)
            alert("Le paiement a échoué. Veuillez réessayer.")
        } finally {
            setProcessingPayments(prev => ({ ...prev, [order.id]: false }))
        }
    }

    const handlePaymentAmountChange = (orderId, amount) => {
        setPaymentAmounts(prev => ({ ...prev, [orderId]: amount }))
    }

    const handleOpenPaymentModal = (order, paymentAmount) => {
        setSelectedOrder(order)
        setPaymentAmount(paymentAmount)
        setShowPaymentModal(true)
    }

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false)
        setSelectedOrder(null)
    }

    const getStatusTextValidation = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'En cours de validation';
            case 'validated':
                return 'Validé';
            case 'rejected':
                return 'Rejeté';
            default:
                return 'En cours';
        }
    };


    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-bold">Commandes à crédit</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-500">Aucune commande trouvée </p>
                ) : (
                    <div className="space-y-6">
                        {currentOrders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{order.name}</h3>
                                    <div className="flex items-center">
                                        {getStatusIcon(order.state)}
                                        <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Statut demande</h3>
                                    <div className="flex items-center">
                                        {getStatusIconValidation(order.validation_state)}
                                        <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_state)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Date: {new Date(order.date_order).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Total: {formatPrice(order.amount_total)} </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Payé</h3>
                                    <div className="flex items-center">
                                        <span className="ml-2 capitalize"> {formatPrice(order.amount_total - order.amount_residual)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Restant à Payé</h3>
                                    <div className="flex items-center">
                                        <span className="ml-2 capitalize"> {formatPrice(order.amount_residual)}</span>
                                    </div>
                                </div>
                                {/* {order.amount_residual > 0 && (
                                    <Button onClick={() => handleOpenPaymentModal(order)} className="w-full">
                                        Payer {formatPrice(order.amount_residual)}
                                    </Button>
                                )} */}
                                {order.amount_residual > 0 && (
                                    <div className="mt-4 w-full">
                                        <Label htmlFor={`payment-${order.id}`} className="block mb-2">Montant à payer</Label>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                            <div className="w-full sm:w-2/3">
                                                <TextInput
                                                    id={`payment-${order.id}`}
                                                    placeholder="1000"
                                                    label="Montant*"
                                                    name="montantAPayer"
                                                    type="number"
                                                    value={paymentAmount}
                                                    max={order.amount_residual}
                                                    min={Math.max(order.amount_residual * 0.2, 1000)}
                                                    onChange={(e) => handlePaymentAmountChange(order.id, Number(e.target.value))}
                                                    required
                                                    className="w-full invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleOpenPaymentModal(order, paymentAmount)}
                                                disabled={processingPayments[order.id] || paymentAmounts[order.id] < Math.max(order.amount_residual * 0.2, 1000)}
                                                className="w-full sm:w-1/3"
                                            >
                                                {processingPayments[order.id] ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        Payer
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Montant minimum: {formatPrice(Math.max(order.amount_residual * 0.2, 1000))}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2">Articles:</h4>

                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 border-b-2 border-gray-300">Produit</th>
                                                <th className="py-2 border-b-2 border-gray-300">Quantité</th>
                                                <th className="py-2 border-b-2 border-gray-300">Prix Unitaire</th>
                                                <th className="py-2 border-b-2 border-gray-300">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.order_lines.map((item) => (
                                                <tr key={item.id} className="text-center">
                                                    <td className="py-2 border-b border-gray-300">{item.product_name}</td>
                                                    <td className="py-2 border-b border-gray-300">{item.product_uom_qty}</td>
                                                    <td className="py-2 border-b border-gray-300">{item.price_unit} F CFA</td>
                                                    <td className="py-2 border-b border-gray-300">{item.price_total} F CFA</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {!loading && orders.length > ordersPerPage && (
                    <div className="mt-6 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                )}

                {showPaymentModal && selectedOrder && (
                    <PaydunyaModalService
                        handlePay={handlePay}
                        totalAmount={selectedOrder.amount_residual}
                        onClose={handleClosePaymentModal}
                        order={selectedOrder}
                        idOrder={selectedOrder.id}
                    />
                )}
            </div>
        </>
    );
}
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
