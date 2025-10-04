/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Label } from "flowbite-react";
import Accodion from "../Helpers/Accodion";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, Loader2, OctagonAlert } from "lucide-react";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

export default function Faq() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.success("Contact envoyer !", {
      position: "top-center",
      autoClose: 5000,
    });

    setIsLoading(false);
  };
  return (
    <>
      <SEOHeader
        title="CCBM Shop | FAQ "
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses="pt-0 pb-0">
        <div className="faq-page-wrapper w-full mb-10">
          <div className="page-title w-full">
            <PageTitle
              title="Questions fréquemment posées"
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "FAQ", path: "/faq" },
              ]}
            />
          </div>
        </div>
        <div className="contact-wrapper w-full mb-10">
          <div className="container-x mx-auto">
            <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
                <h1 className="text-qblack font-bold text-[22px] mb-4">
                  Questions fréquemment posées
                </h1>
                <div className="flex flex-col space-y-7 justify-between">
                  {/* <Accodion
                    title="1. Précommande ?"
                    des="La précommande permet d’avoir des produits électroménagers jusqu’à une réduction de 50% garantie, moins chère sur le marché. Pour cela, au moment de la précommande, il faut verser un acompte pour confirmer la précommande. Le client peut continuer à compléter le versement en attendant la livraison du produit. Le paiement doit être complété avant la livraison du produit. Le délai de livraison est compris entre 30 et 60 jours. Une date de livraison sera communiquée après la confirmation de la précommande."
                  />
                  <Accodion
                    init
                    title=" 2. SERVICE APRES VENTE DE NOS PRODUITS ?"
                    des="Nos produits sont garantis d'un an. CCBM a une expérience de plus de 30 ans en termes de vente de produits électroménagers. Vous pouvez nous joindre sur le numéro affiché sur le site en cas de besoins ou de réclamation."
                  /> */}

                  <Accodion
                    title="1. Précommande ?"
                    des="La précommande permet d'avoir des produits électroménagers jusqu'à une réduction de 50% garantie, moins chère sur le marché. Pour cela, au moment de la précommande, il faut verser un acompte pour confirmer la précommande. Le client peut continuer à compléter le versement en attendant la livraison du produit. Le paiement doit être complété avant la livraison du produit. Le délai de livraison est compris entre 30 et 60 jours. Une date de livraison sera communiquée après la confirmation de la précommande."
                  />
                  <Accodion
                    init
                    title="2. SERVICE APRES VENTE DE NOS PRODUITS ?"
                    des="Nos produits sont garantis d'un an. CCBM a une expérience de plus de 30 ans en termes de vente de produits électroménagers. Vous pouvez nous joindre sur le numéro affiché sur le site en cas de besoins ou de réclamation."
                  />

                  <Accodion
                    title="3. Qu'est-ce que la commande à crédit chez CCBM Shop ?"
                    des="La commande à crédit est un service offert par CCBM Shop permettant aux employés d'entreprises partenaires d'acheter des produits et de les payer en plusieurs versements. Ce service est uniquement disponible pour les entreprises ayant une collaboration établie avec CCBM Shop."
                  />

                  <Accodion
                    title="4. Comment puis-je m'inscrire pour les commandes à crédit ?"
                    des={
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Créez votre compte sur CCBM Shop.</li>
                        <li>Obtenez l'identifiant unique de votre entreprise auprès de votre service RH.</li>
                        <li>Dans votre profil, saisissez l'identifiant de l'entreprise dans la section 'Informations Personnelles'.</li>
                        <li>Faites une demande d'adhésion au programme de commandes à crédit dans votre tableau de bord.</li>
                        <li>Attendez la validation de votre service RH (généralement sous 24 heures ouvrables).</li>
                      </ol>
                    }
                  />

                  <Accodion
                    title="5. Comment fonctionne le paiement pour les commandes à crédit ?"
                    des={
                      <div>
                        <p>Le paiement pour les commandes à crédit est échelonné comme suit :</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>50% à la validation de la commande</li>
                          <li>20% le mois suivant</li>
                          <li>15% le deuxième mois</li>
                          <li>15% le troisième mois</li>
                        </ul>
                        <p className="mt-2">Les moyens de paiement acceptés sont Wave et Orange Money.</p>
                      </div>
                    }
                  />

                  <Accodion
                    title="6. Que se passe-t-il si je manque un paiement ?"
                    des="Si un paiement n'est pas effectué dans les trois jours suivant l'échéance, votre service RH sera notifié. Ils pourront alors prélever le montant dû directement sur votre salaire pour régulariser la situation."
                  />



                  <Accodion
                    title="7. Puis-je annuler une commande à crédit ?"
                    des="Les conditions d'annulation pour les commandes à crédit sont les mêmes que pour les commandes standard. Cependant, une fois que le processus de paiement a commencé, l'annulation peut être plus complexe. Il est recommandé de contacter le service client de CCBM Shop dès que possible si vous souhaitez annuler une commande à crédit."
                  />



                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white sm:p-10 p-5">
                  <div className="title flex flex-col items-center">
                    <h1 className="text-[34px] font-bold text-qblack">
                      CCBM SHOP
                    </h1>

                    <span className="-mt-5 block">
                      <svg
                        width="354"
                        height="30"
                        viewBox="0 0 354 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                          stroke="#FFBB38"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="inputs mt-5">
                      <div className="mb-4">
                        <div className="mb-2 block">
                          <Label htmlFor="nom" value="Nom Complet" />
                        </div>
                        <input
                          type="text"
                          placeholder="Nom complet"
                          value={`${nom}`}
                          name="nom"
                          onChange={(e) => setNom(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 block">
                          <Label htmlFor="email" value="Adresse Email" />
                        </div>
                        <input
                          type="text"
                          placeholder="Adresse Email"
                          value={`${email}`}
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 block">
                          <Label htmlFor="sujet" value="Objet" />
                        </div>
                        <input
                          type="text"
                          placeholder="Objet"
                          value={`${sujet}`}
                          name="sujet"
                          onChange={(e) => setSujet(e.target.value)}
                          required
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        />
                      </div>
                      <div className="mb-5">
                        <div className="mb-2 block">
                          <Label htmlFor="message" value="Message" />
                        </div>
                        <textarea
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Entrez votre message ici"
                          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                        ></textarea>
                      </div>
                      <div>
                        <Button
                          type="submit"
                          variant="failure"
                          className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
 hover:bg-red-500  bg-purple items-center"
                          disabled={isLoading}
                        >
                          {isLoading == true ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span>en cours d'envoyer</span>
                            </>
                          ) : (
                            <span> Envoyer</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
