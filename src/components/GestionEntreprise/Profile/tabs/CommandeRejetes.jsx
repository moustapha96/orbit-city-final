

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import InputCom from "../../../Helpers/InputQuantityCom";
import { CartContext } from "../../../../contexts/CartContext";

import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "../../../CartPage/ProductsTable";
import { UserContext } from "../../../../contexts/UserContext";
import { getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "../../../../services/entrepriseFunctionService";
import formatPrice from "../../../../utils/formatPrice";
import formatDate from "../../../../utils/date-format";
<<<<<<< HEAD
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, CreditCard, LucideChevronLeft, LucideChevronRight, LucideSearch, Package, Truck, XCircle } from "lucide-react";
import { useAuthContext } from "../../../../contexts/useAuthContext";
import cn from "../../../../utils/cn";


export default function CommandeRejetes({ className }) {
  const { session, isAuthenticated, token, userInfo, parent, comapny, userContext, saveSession } = useAuthContext();
=======
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, CreditCard, Package, Truck, XCircle } from "lucide-react";


export default function CommandeRejetes({ className }) {
  const { user } = useContext(UserContext);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  const [orders, setOrders] = useState([])

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchOrders = async (id) => {
      setLoading(true);
      try {
        let res =
          await getCommandeRejeteClientsEntreprise(id);
        setOrders(res);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo && parent.id) {
      fetchOrders(parent.id);
    }
  }, [userInfo, parent]);
=======


  useEffect(() => {
    if (user.company_id) {
      fetchCommandeRejetceted(user.company_id)
    }
  }, [user.company_id]);

  const fetchCommandeRejetceted = async (id) => {
    setLoading(true)
    try {
      const res = await getCommandeRejeteClientsEntreprise(id);
      console.log("res")
      console.log(res)
      setOrders(res);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false)
    }
  }
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
<<<<<<< HEAD

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement des commandes...</div>;


  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(filter.toLowerCase()) ||
    order.partner_name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

=======
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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

<<<<<<< HEAD
=======
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

>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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

<<<<<<< HEAD
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

=======
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, validation_state: newStatus } : order
      )
    );
  };
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74


  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">Commandes rejetées</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">Aucune commande trouvée </p>
        ) : (
<<<<<<< HEAD
          <div className="container">
            <div className="my-6 space-y-6">
              <div className="grid grid-cols-1">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h4 className="text-xl font-semibold text-gray-800 uppercase">
                      Liste des Commandes Rejetées
                    </h4>
                  </div>

                  <div className="p-6">
                    <div className="flex mb-4">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Rechercher par numéro de commande ou nom du client..."
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentItems.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.date_order).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.amount_total.toLocaleString()} FCFA
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {getStatusIcon(order.state)}
                                  <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {getStatusIconValidation(order.validation_rh_state)}
                                  <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_rh_state)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link
                                  to={`/admin/commandes/${order.id}/details`}
                                  className="text-primary hover:text-primary-700 transition-colors duration-200"
                                >
                                  Détails
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-700">
                        Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredOrders.length)} sur {filteredOrders.length} entrées
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={cn(
                            "px-3 py-1 rounded-md",
                            currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <LucideChevronLeft className="h-5 w-5" />
                        </button>
                        {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={cn(
                              "px-3 py-1 rounded-md",
                              currentPage === index + 1 ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
                          className={cn(
                            "px-3 py-1 rounded-md",
                            currentPage === Math.ceil(filteredOrders.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <LucideChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
          </div>
        )}


<<<<<<< HEAD

=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      </div>
    </>
  );
}
