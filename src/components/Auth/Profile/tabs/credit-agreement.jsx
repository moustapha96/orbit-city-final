/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { Button, Checkbox } from "flowbite-react";

export default function CreditAgreement({ agreed, setAgreed, onSubmit, isLoadingAdhesion, stateUser }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Conditions Générales de Commande à Crédit</h2>

            <p className="mb-4 dark:text-white ">En acceptant ces conditions, vous reconnaissez et acceptez les termes suivants :</p>

            <ol className="list-decimal pl-5 space-y-4 dark:text-white">
                <li>
                    <strong>Processus de Validation :</strong>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Chaque commande à crédit sera soumise à un processus de validation rigoureux.</li>
                        <li>L'approbation conjointe de votre service des Ressources Humaines (RH) et de CCBM Shop sera requise pour toute commande à crédit.</li>
                    </ul>
                </li>

                <li>
                    <strong>Structure de Paiement :</strong>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Un acompte initial de 50% du montant total sera exigé au moment de la commande.</li>
                        <li>Le solde restant sera échelonné sur une période de trois mois, selon la répartition suivante :
                            <ul className="list-circle pl-5 mt-1">
                                <li>Premier mois : 20% du montant total</li>
                                <li>Deuxième mois : 15% du montant total</li>
                                <li>Troisième mois : 15% du montant total (solde final)</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Politique de Retard de Paiement :</strong>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Tout retard de paiement excédant trois (3) jours sera considéré comme un manquement aux présentes conditions.</li>
                        <li>En cas de retard, votre service RH sera immédiatement notifié.</li>
                        <li>Votre service RH se réserve le droit de procéder à un prélèvement direct sur votre salaire pour régulariser tout paiement en retard.</li>
                        <li>Tout manquement au paiement entraînera le blocage de votre groupe pur les commandes à crédit.</li>
                    </ul>
                </li>
            </ol>

            <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                    id="agree-terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="agree-terms" className="text-sm font-medium text-gray-700 dark:text-white">
                    J'ai lu, compris et j'accepte les conditions de commande à crédit énoncées ci-dessus.
                </label>
            </div>

            <Button
                type="submit"
                color="failure"
                pill
                className="w-full mt-4"
                disabled={isLoadingAdhesion || stateUser || !agreed}
            >
                {isLoadingAdhesion ? "Traitement en cours..." : "Accepter et Envoyer la Demande d'Adhésion"}
            </Button>
        </form>
    );
}

