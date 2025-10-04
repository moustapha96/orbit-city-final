/* eslint-disable react/prop-types */

import { ArrowLeft, Package, Calendar, CreditCard, Truck, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCommandesClientsEntreprise, setValidationStateCommande } from '../../../../services/entrepriseFunctionService';
import { toast } from 'react-toastify';


const ClientOrders = ({ client, onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(2);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getCommandesClientsEntreprise(client.id);
                console.log(response)
                setOrders(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [client.id]);

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'cancel':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'draft':
                return <Package className="w-5 h-5 text-yellow-500" />;
            default:
                return <Truck className="w-5 h-5 text-blue-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
                return 'Confirmé';
            case 'cancel':
                return 'Annulé';
            case 'draft':
                return 'Brouillon';
            default:
                return 'En cours';
        }
    };

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
        }
    }


    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // const handleStatusChange = (orderId, newStatus) => {
    //     setOrders(prevOrders =>
    //         prevOrders.map(order =>
    //             order.id === orderId ? { ...order, validation_state: newStatus } : order
    //         )
    //     );
    // };

    const handleStatusChange = async (orderId, newStatus) => {
        const resultat = await setValidationStateCommande(orderId, newStatus);
        if (resultat) {
            toast.success("Opération reussie.", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            })
        }
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, validation_state: newStatus } : order
            )
        );
    };


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold">Commandes de {client.name}</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-500">Aucune commande trouvée pour ce client.</p>
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

                                <div className="flex items-center">
                                    {getStatusIconValidation(order.validation_state)}
                                    <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_state)}</span>
                                </div>

                            </div>

                            <div>

                                <div className="text-sm text-gray-600 mb-4">
                                    <strong>Client : </strong> {order.partner_name}
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                    <strong>Tél : </strong> {order.partner_phone}
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                    <strong>Adresse : </strong> {order.partner_city}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-4">

                                    <label className="font-semibold">Changer le statut:</label>
                                    <select
                                        className="ml-2 p-2 border rounded"
                                        value={order.validation_state}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="pending">En cours de validation</option>
                                        <option value="validated">Validé</option>
                                        <option value="rejected">Rejeté</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                    <span>Date: {new Date(order.date_order).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                                    <span>Total: {order.amount_total} F CFA</span>
                                </div>
                            </div>
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

            {/* Pagination */}
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
        </div>
    );
};

export default ClientOrders;