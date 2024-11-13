/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

import { getClientsEntreprise, setCompteEnable } from "../../../../services/entrepriseFunctionService";
import { UserContext } from "../../../../contexts/UserContext";
import { Eye, Info, Loader2, Lock, LockKeyhole, ShoppingCart } from "lucide-react";


import { Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ClientsTab({ onClientSelect, onViewOrders }) {
  const { user } = useContext(UserContext);

  const [clients, setClients] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(4);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    if (user.company_id) {
      fetchClients(user.company_id)
    }
  }, [user.company_id]);

  const fetchClients = async (id) => {
    setLoading(true)
    try {
      const res = await getClientsEntreprise(id);
      setClients(res);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false)
    }
  }


  const viewClientDetails = (client) => {
    console.log("client")
    console.log(client)
    onClientSelect(client);
  };

  const viewClientOrders = (e, client) => {
    e.preventDefault();
    console.log("client")
    console.log(client)
    onViewOrders(client);
  };

  const VerifiedCompte = async (e, id, statut) => {
    e.preventDefault();
    const res = await setCompteEnable(id);
    if (res) {
      console.log(`Desable client ${id}`);
      if (statut) {
        toast.success("Compte activé avec succes");
      } else {
        toast.success("Compte desactivé avec succes");
      }
      fetchClients(user.company_id);
    }
    console.log(`Desable client ${id}`);
  };



  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="w-full" >
        <h1 className="text-[22px] font-bold text-qblack sm:text-xl">
          Gestion des Clients
        </h1>
      </div>
      <div className={`w-full }`}>
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nom</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Téléphone</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Ville</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Statut</th>
              <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <Loader2 size={40} className="animate-spin" />
                  </div>
                </td>
              </tr>
            ) :
              <>
                {currentClients.map((client) => (
                  <tr key={client.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td className=" whitespace-normal">{client.name}</td>
                    <td className=" whitespace-normal">{client.email}</td>
                    <td className=" whitespace-normal">{client.partner_phone}</td>
                    <td className=" whitespace-normal">{client.partner_city}</td>
                    <td className=" whitespace-normal">
                      {client.is_verified ? (
                        <Tooltip content="Client actif"> <Lock onClick={(e) => VerifiedCompte(e, client.id, !client.is_verified)} className="text-green-500"  ></Lock> </Tooltip>
                      ) : (
                        <Tooltip content="Client inactif"  > <LockKeyhole onClick={(e) => VerifiedCompte(e, client.id, !client.is_verified)} className="text-red-500"  ></LockKeyhole>  </Tooltip>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium  ">
                      <button
                        onClick={() => viewClientDetails(client)}
                        className="p-2"
                      >
                        <Tooltip content="Détails Client" >   <Info className="text-blue-500"  ></Info>  </Tooltip>
                      </button>

                      <button
                        onClick={(e) => viewClientOrders(e, client)}
                        className="p-2"
                      >
                        <Tooltip content="Commandes Client" >   <ShoppingCart className="text-dark"  ></ShoppingCart>  </Tooltip>
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            }

          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(clients.length / clientsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              style={{
                margin: '0 0.25rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: currentPage === i + 1 ? '#3b82f6' : '#f3f4f6',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

    </>
  );
}
