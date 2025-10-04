/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { CartContext } from "../../contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import CommandeService from "../../services/CommandeService";
import BannerPub from "../About/BannerPub";
import CreatePartnerModalService from "../../services/CreatePartnerModalService";
import { useAuthContext } from "../../contexts/useAuthContext";
import CrmService from "../../services/CrmService";

import { v4 as uuidv4 } from 'uuid';
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";



export default function CardPage({ cartt = true }) {
  const { cart, getCartTotal, clearCart } =
    useContext(CartContext);
  const { session, isAuthenticated, token, user, comapny, userContext, saveSession } = useAuthContext();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clickBUtton, setClickBUtton] = useState(false)
  const [showCreatePartnerModal, setShowCreatePartnerModal] = useState(false);
  const [data, setData] = useState(null)
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [crmExecuted, setCrmExecuted] = useState(false);




  const handlePaymentChange = (event) => {
    console.log(event.target.value);
    setIsLoading(false)
    setSelectedPayment(event.target.value);
  };

  const handleValidePanier = async () => {

    setIsLoading(true);
    if (!user) {
      toast.dismiss();
      toast.warning("Merci de vous connecter", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      if (cart.length === 0) {
        toast.dismiss();
        toast.error("Veuillez ajouter au moins un article dans votre panier", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {


        if (selectedPayment == "") {
          toast.dismiss();
          toast.error("Veuillez choisir un mode de paiement", {
            position: "top-center",
            autoClose: 5000,
          });
          setIsLoading(false)
          return;
        }
        console.log(user)
        console.log("user id ", user.id)
        const modelData = {
          partner_id: user.id,
          type_sale: "order",
          payment_mode: selectedPayment != "" ? selectedPayment : "online",
          state: "sale",
          commitment_date: new Date(),
          order_lines: cart.map((orde) => ({
            id: orde.id,
            quantity: orde.quantity,
            list_price: orde.list_price,
          })),
        };
        console.log(modelData);
        try {
          const response = await CommandeService.createCommande(modelData);
          console.log(response);
          toast.success("Commande créé avec succés", {
            position: "top-center",
            autoClose: 5000,
          });
          navigate(`/commandes/${response.id}/détails`);
          console.log(response);

          clearCart();

        } catch (error) {
          toast.error("Commande non validé ", {
            position: "top-center",
            autoClose: 5000,
          });
          console.error("Erreur lors de la récupération des modèles", error);
        }
        setIsLoading(false);
      }
    }
  };

  const handleCreatePanier = async (e) => {
    e.preventDefault();
    if (selectedPayment == "") {
      toast.dismiss();
      toast.error("Veuillez choisir un mode de paiement", {
        position: "top-center",
        autoClose: 5000,
      });
      setIsLoading(false)
      return;
    }
    if (user) {
      setIsLoading(true);
      const modelData = {
        partner_id: user.id,
        type_sale: "order",
        payment_mode: selectedPayment != "" ? selectedPayment : "domicile",
        state: "sale",
        commitment_date: new Date(),
        order_lines: cart.map((orde) => ({
          id: orde.id,
          quantity: orde.quantity,
          list_price: orde.en_promo ? orde.promo_price : orde.list_price,
        })),
      };
      console.log(modelData);
      try {
        const response = await CommandeService.createCommande(modelData);
        console.log(response);
        toast.success("Commande créé avec succés", {
          position: "top-center",
          autoClose: 5000,
        });
        setIsLoading(false);
        navigate(`/commandes/${response.id}/détails`);
        console.log(response);
        clearCart();
      } catch (error) {
        setIsLoading(false);
        toast.error("Commande non validé ", {
          position: "top-center",
          autoClose: 5000,
        });
        console.error("Erreur lors de la récupération des modèles", error);
      }
    }
    const modelData = {
      partner_id: null,
      type_sale: "order",
      payment_mode: selectedPayment != "" ? selectedPayment : "online",
      state: "sale",
      commitment_date: new Date(),
      order_lines: cart.map((orde) => ({
        id: orde.id,
        quantity: orde.quantity,
        list_price: orde.en_promo ? orde.promo_price : orde.list_price,
      })),
    };
    setData(modelData)
    setIsLoading(true);
    setShowCreatePartnerModal(true);
  }

  const handleCreatePartner = async (compteData) => {
    console.log("Payment data: ", compteData);

    setShowCreatePartnerModal(false)
    setIsLoading(true);

    try {
      const response = await CommandeService.createCommandeWitoutPartner(compteData);
      console.log(response);
      toast.success("Commande créé avec succés", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate(`/boutique`);
      console.log(response);
      clearCart();
      setIsLoading(false);
    } catch (error) {
      toast.error("Commande non validé ", {
        position: "top-center",
        autoClose: 5000,
      });
      console.error("Erreur lors de la récupération des modèles", error);
      setIsLoading(false);
    }

  };

  return (
    <>
      <SEOHeader
        title="CCBM Shop | Panier Commande"
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses={cartt ? "pt-0 pb-0" : ""}>
        {cartt === false ? (
          <div className="cart-page-wrapper w-full">
            <div className="container-x mx-auto">
              <BreadcrumbCom
                paths={[
                  { name: "Accueil", path: "/" },
                  { name: "Panier Commandes", path: "/cart" },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="cart-page-wrapper w-full bg-white pb-[60px]">
            <div className="w-full">
              <PageTitle
                title="Panier Commande"
                breadcrumb={[
                  { name: "Accueil", path: "/" },
                  { name: "Panier Commande", path: "/cart" },
                ]}
              />
            </div>
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                <ProductsTable className="mb-[30px]" />
                <div className="w-full sm:flex justify-between">
                  <div className="flex space-x-2.5 items-center">
                    <Link to="/boutique">
                      <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Continuer vos achats
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="w-full mt-[30px] flex sm:justify-end">

                  <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">

                    <span className="text-[15px] font-medium text-qblack mb-[18px]  items-center block">
                      {selectedPayment == "" && clickBUtton && <span className="text-red-500"> Choisir le mode de paiement </span>}
                    </span>
                    <div className="shipping mb-6">
                      <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                        Paiement
                      </span>
                      <ul className="flex flex-col space-y-1">
                        <li>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2.5 items-center">
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  name="price"
                                  value="domicile"
                                  className="bg-bleu-logo"
                                  onChange={handlePaymentChange}
                                />
                              </div>
                              <span className="text-[14px] text-normal text-qblack">
                                A domicile
                              </span>
                            </div>

                          </div>
                        </li>
                        <li>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2.5 items-center">
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  name="price"
                                  value="online"
                                  className="bg-bleu-logo"
                                  onChange={handlePaymentChange}
                                />
                              </div>
                              <span className="text-[14px] text-normal text-qblack ">
                                En ligne
                              </span>
                            </div>

                          </div>
                        </li>
                        <li>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2.5 items-center">
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  name="price"
                                  value="echelonne"
                                  className="bg-bleu-logo"
                                  onChange={handlePaymentChange}
                                />
                              </div>
                              <span className="text-[14px] text-normal text-qblack ">
                                Échelonné
                              </span>
                            </div>

                          </div>
                        </li>

                      </ul>
                    </div>

                    <div className="total mb-6">
                      <div className=" flex justify-between">
                        <p className="text-[18px] font-medium text-qblack">
                          Total
                        </p>
                        <p className="text-[18px] font-medium text-qred">
                          {" "}
                          {formatPrice(getCartTotal())}
                        </p>
                      </div>
                    </div>
                    {getCartTotal() != 0 && (
                      <Button
                        type="submit"
                        className="hover:bg-red-500  w-full bg-bleu-logo "
                        onClick={(e) => handleCreatePanier(e)}

                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Valider le Panier
                      </Button>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {showCreatePartnerModal && !user && (
              <>
                <CreatePartnerModalService
                  handleCreatePartner={handleCreatePartner}
                  order={cart}
                  data={data}
                  onClose={() => { setShowCreatePartnerModal(false); setIsLoading(false) }}
                />
              </>
            )}

          </div>
        )}
        <BannerPub />

      </Layout>
    </>
  );
}
