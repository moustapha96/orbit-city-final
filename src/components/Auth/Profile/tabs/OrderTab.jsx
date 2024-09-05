/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CommandeService from "../../../../services/CommandeService";
import formatDate from "../../../../utils/date-format";

import { useNavigate } from "react-router-dom";
import formatPrice from "../../../../utils/formatPrice";
export default function OrderTab() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await CommandeService.getCommandes();
        const pr = data.filter((commande) => commande.state !== "draft" && commande.state !== "cancel");
        setCommandes(pr);
        console.log(pr);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);
  const navigate = useNavigate();
  const handleDetails = (e, commande) => {
    e.preventDefault();
    console.log(commande);
    navigate(`/commandes/${commande.id}/détails`, { state: { commande } });
  };
  return (
    <>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Commande
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Date
              </td>

              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Statut
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Payment
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Montant
              </td>
              <td className="py-4 whitespace-nowrap text-center">Action</td>
            </tr>
            {/* table heading end */}

            {Array.isArray(commandes) && commandes.length != 0 && (
              <>
                {commandes.map((commande) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={commande.id}
                  >
                    <td className="text-center py-4">
                      <span className="text-lg text-qgray font-medium">
                        #{commande.name}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span className="text-base text-qgray whitespace-nowrap">
                        {formatDate(commande.date_order)}{" "}
                      </span>
                    </td>

                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span className="text-base text-qgray whitespace-nowrap">

                        {commande.state == "to_delivered" ? "en cours de livraison" : commande.state == "delivered" ? " - livrer" : "Validé"}
                      </span>
                    </td>

                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span
                        className={`text-sm rounded p-2 ${commande.advance_payment_status !== "not_paid"
                          ? "text-green-500 bg-green-100"
                          : "text-red-500 bg-red-100"
                          }`}
                      >
                        {commande.advance_payment_status == "not_paid"
                          ? "Non Payé"
                          : "Payé"}
                      </span>
                    </td>


                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span className="text-base text-qblack whitespace-nowrap px-2 ">
                        {commande.advance_payment_status == "not_paid" ? (
                          <>
                            {" "}
                            <span className="text-red-500">
                              {" "}
                              {formatPrice(commande.amount_total)}{" "}
                            </span>
                          </>
                        ) : (
                          <span className="text-green-500">
                            {" "}
                            {formatPrice(commande.amount_total)}{" "}
                          </span>
                        )}{" "}
                        <br />
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <button
                        type="button"
                        title="voir les détails"
                        onClick={(event) => handleDetails(event, commande)}
                        className="w-[116px] h-[46px] bg-bleu-logo text-white hover:bg-bleu-claire font-bold"
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

        {!Array.isArray(commandes) ||
          (commandes.length == 0 && (
            <p className="text-center m-5">
              {" "}
              Votre Liste de commande est vide{" "}
            </p>
          ))}
      </div>
    </>
  );
}
