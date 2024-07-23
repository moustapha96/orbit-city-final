/* eslint-disable no-unused-vars */
import { Button, Label } from "flowbite-react";
import Accodion from "../Helpers/Accodion";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function Faq() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.success("Contact envoyer !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setIsLoading(false);
  };
  return (
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
                <Accodion
                  title="1. Quels types de produits propose Orbit City ?"
                  des=" Orbit City propose une large gamme de produits, allant de l'électronique aux articles ménagers, en passant par les vêtements et les accessoires. Nous nous efforçons de répondre aux besoins de tous nos clients en offrant des produits de qualité."
                />
                <Accodion
                  init
                  title=" 2. Comment puis-je passer une commande ?"
                  des="Pour passer une commande, il vous suffit de naviguer sur notre site, de sélectionner les produits souhaités, de les ajouter à votre panier, puis de suivre le processus de paiement. Vous recevrez une confirmation par e-mail une fois votre commande validée."
                />
                <Accodion
                  title="3. Quels modes de paiement acceptez-vous ?"
                  des="Nous acceptons plusieurs modes de paiement, y compris les cartes de crédit, les virements bancaires et les paiements en espèces à la livraison. Vous pouvez choisir le mode de paiement qui vous convient le mieux lors de la finalisation de votre commande."
                />
                <Accodion
                  title="4. Quels sont les délais de livraison ?"
                  des="Les délais de livraison varient en fonction de votre emplacement et de la disponibilité des produits. En général, vous pouvez vous attendre à recevoir votre commande dans un délai de 3 à 7 jours ouvrables. Vous recevrez un e-mail de suivi une fois votre commande expédiée."
                />
                <Accodion
                  title=" 5. Puis-je retourner un produit ?"
                  des=" Oui, vous disposez d'un droit de rétractation de 14 jours pour retourner un produit, conformément à la loi en vigueur. Les produits doivent être dans leur état d'origine et accompagnés de tous les accessoires. Pour plus d'informations sur le processus de retour, veuillez consulter notre section 'Politique de retour'."
                />
                <Accodion
                  title="6. Comment puis-je contacter le service client ?"
                  des="Vous pouvez contacter notre service client par e-mail à l'adresse support@orbitcity.sn ou par téléphone au +221 00 000 00 00. Notre équipe est disponible pour répondre à vos questions et vous aider avec vos préoccupations."
                />

                <Accodion
                  title=" 7. Y a-t-il des promotions ou des réductions disponibles ?"
                  des=" Oui, nous proposons régulièrement des promotions et des réductions sur une sélection de produits. Pour rester informé des dernières offres, abonnez-vous à notre newsletter ou consultez notre section 'Promotions' sur le site."
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
                        <Label htmlFor="email" value="Email" />
                      </div>
                      <input
                        type="text"
                        placeholder="Email"
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
                        <Label htmlFor="sujet" value="Sujet" />
                      </div>
                      <input
                        type="text"
                        placeholder="sujet"
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
                        placeholder="Type your message here"
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
  );
}
