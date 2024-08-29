/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreCommandeService from "../../../../services/precommandeService";
import formatDate from "../../../../utils/date-format";
import formatPrice from "../../../../utils/formatPrice";
export default function PreOrderTab({ type = 3 }) {
  const [precommandes, setPreCommandes] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await PreCommandeService.getPreCommandes();
        if (data.length > 0) {
          const pr = data.filter((commande) => commande.state !== "cancel");
          console.log(data);
          setPreCommandes(pr);
        }
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
    navigate(`/pre-commandes/${commande.id}/détails`, { state: { commande } });
  };

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                PréCommande
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Date
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Statut
              </td>
              <td className="py-4 whitespace-nowrap text-center hidden sm:table-cell">
                Montant
              </td>
              <td className="py-4 whitespace-nowrap text-center">Action</td>
            </tr>
            {/* table heading end */}

            {Array.isArray(precommandes) && precommandes.length != 0 && (
              <>
                {precommandes.map((commande) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={commande.id}
                  >
                    <td className="text-center py-4">
                      <span className="text-lg text-qgray font-medium">
                        # - {commande.name}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span className="text-base text-qgray whitespace-nowrap">
                        {formatDate(commande.date_order)}{" "}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <div className=" ">
                        {commande.advance_payment_status === "not_paid" && (
                          <span className="text-red-500">Non Effectif</span>
                        )}
                        {commande.advance_payment_status === "partial" && (
                          <span className="text-yellow-500">
                            Partiellement payé
                          </span>
                        )}
                        {commande.advance_payment_status === "paid" && (
                          <span className="text-green-500">Effectif</span>
                        )}
                        <p>
                          {commande.advance_payment_status === "partial" && (
                            <>
                              {" "}
                              Reste : {formatPrice(commande.amount_residual)}
                            </>
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 hidden sm:table-cell">
                      <span className="text-base text-qblack whitespace-nowrap px-2 ">
                        {commande.advance_payment_status == "not_paid" ||
                          (commande.advance_payment_status == "partial" && (
                            <>
                              {" "}
                              <span className="text-yellow-500">
                                {" "}
                                {formatPrice(commande.amount_total)}
                              </span>
                            </>
                          ))}
                        {commande.advance_payment_status == "paid" && (
                          <>
                            {" "}
                            <span className="text-green-500">
                              {" "}
                              {formatPrice(commande.amount_total)}
                            </span>
                          </>
                        )}
                        {commande.advance_payment_status == "not_paid" &&
                          commande.amount_residual == commande.amount_total && (
                            <>
                              {" "}
                              <span className="text-red-500">
                                {" "}
                                {formatPrice(commande.amount_total)}
                              </span>
                            </>
                          )}
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

        {!Array.isArray(precommandes) && (
          <p className="text-center mt-5 ">
            Votre Liste de précommandes est vide{" "}
          </p>
        )}
      </div>
    </>
  );
}
