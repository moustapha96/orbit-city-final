/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { CheckCircle, OctagonAlert } from "lucide-react";

import PageTitle from "../Helpers/PageTitle";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import Layout from "../Partials/Layout";
import { useEffect } from "react";

export default function ProcessusCommandeCredit() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);


    return (
        <>
            <SEOHeader
                title="CCBM Shop | Politique De Confidentialité"
                description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
                keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
            />
            <Layout childrenClasses="pt-0 pb-0">
                <div className="terms-condition-page w-full bg-white pb-[30px]">
                    <div className="w-full mb-[30px]">
                        <PageTitle
                            breadcrumb={[
                                { name: "Accueil", path: "/" },
                                {
                                    name: "Processus De Commande De Crédit",
                                    path: "/processus-de-commande-de-credit",
                                },
                            ]}
                            title="Processus d'Inscription et d'Adhésion pour Commandes à Crédit"
                        />
                    </div>

                    <div className="w-full lg:flex lg:space-x-[30px]">
                        <div className="flex-1">
                            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Processus d'Inscription et d'Adhésion pour Commandes à Crédit</h1> */}

                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-yellow-700">
                                        <strong>Note importante :</strong> Ce processus est destiné aux employés des entreprises ayant déjà une collaboration établie avec CCBM Shop pour les commandes à crédit. Si votre entreprise fait partie de ce programme, suivez les étapes ci-dessous pour activer vos commandes à crédit.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <Step title="Création du compte">
                                        <p className="text-gray-600">Après avoir créé votre compte sur notre plateforme, si vous souhaitez effectuer des commandes à crédit, veuillez suivre les étapes suivantes :</p>
                                    </Step>

                                    <Step number={1} title="Demande de l'identifiant de l'entreprise">
                                        <p className="text-gray-600">Contactez votre service des Ressources Humaines pour obtenir l'identifiant unique de votre entreprise. Cet identifiant est essentiel pour lier votre compte à votre employeur et activer les fonctionnalités de crédit.</p>
                                    </Step>

                                    <Step number={2} title="Saisie de l'identifiant de l'entreprise">
                                        <p className="text-gray-600">Une fois connecté à votre compte, accédez à la section "Profil" puis "Informations Personnelles" et entrez l'identifiant de votre entreprise fourni par votre service RH.</p>
                                    </Step>

                                    <Step number={3} title="Demande d'adhésion au programme de crédit">
                                        <p className="text-gray-600">Après avoir saisi l'identifiant de votre entreprise, vous pourrez faire une demande d'adhésion au programme de commandes à crédit et en acceptant les conditions pré établies pour la commande à crédit. Cette option sera disponible dans votre tableau de bord.</p>
                                    </Step>

                                    <Step number={4} title="Validation de la demande">
                                        <p className="text-gray-600">Votre demande d'adhésion sera examinée uniquement par votre service RH. Ce processus sera traité sous 24 heures ouvrables.</p>
                                    </Step>

                                    <Step number={5} title="Confirmation de l'adhésion">
                                        <p className="text-gray-600">Une fois votre demande approuvée, vous recevrez une notification par email et par SMS. Votre compte sera alors activé pour les commandes à crédit.</p>
                                    </Step>
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start space-x-3">
                                    <OctagonAlert className="w-6 h-6 text-bleu-logo flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-blue-800">Important :</h4>
                                        <p className="text-blue-700">
                                            L'approbation de votre demande d'adhésion au programme de crédit est soumise à la validation de votre service RH. Assurez-vous de fournir des informations exactes pour faciliter le processus. De plus, si un paiement n'est pas effectué dans les trois jours suivant l'échéance, votre service RH sera notifié et pourra prélever le montant dû directement sur votre salaire.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-6">
                                    <h3 className="text-xl font-semibold mb-4">Après l'activation de votre compte crédit</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700">Vous pourrez passer des commandes à crédit selon les conditions établies.</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700">Chaque commande à crédit sera soumise à une validation spécifique.</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <span>

                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            </span>
                                            <span className="text-gray-700">Les paiements seront échelonnés comme suit : 50% à la validation de la commande, puis 20%, 15% et 15% sur les trois mois suivants.</span>
                                        </li>


                                        <li className="flex items-center space-x-2">
                                            <span>
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            </span>
                                            <span className="text-gray-700">Si un paiement n'est pas effectué dans les trois jours suivant l'échéance, votre service RH sera notifié et pourra prélever le montant dû directement sur votre salaire.</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700">Les moyens de paiement acceptés sur la plateforme sont Wave et Orange Money.</span>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </Layout></>
    );
}

const Step = ({ number, title, children }) => (
    <div className="flex items-start space-x-4 mb-6">
        {number && <>
            <div className="flex-shrink-0 w-8 h-8 bg-bleu-logo text-white rounded-full flex items-center justify-center font-bold">
                {number}
            </div>
        </>}
        <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {children}
        </div>
    </div>
);
