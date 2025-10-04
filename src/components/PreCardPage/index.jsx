/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import formatPrice from "../../utils/formatPrice";

import PrecommandeService from "../../services/precommandeService";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import BannerPub from "../About/BannerPub";
import { UserContext } from "../../contexts/UserContext";
import CreatePartnerModalService from "../../services/CreatePartnerModalService";
import { useAuthContext } from "../../contexts/useAuthContext";
import { v4 as uuidv4 } from 'uuid';
import CrmService from "../../services/CrmService";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

export default function PreCardPage({ cart = true }) {
  const { getPreorderTotal, preorder, clearPreorder } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePartnerModal, setShowCreatePartnerModal] = useState(false);
  const [data, setData] = useState(null)
  const navigate = useNavigate();
  const [crmExecuted, setCrmExecuted] = useState(false);
  const { user } = useAuthContext();
  const [location, setLocation] = useState(null);

  // function getOrCreateGuestId() {
  //   let guestId = localStorage.getItem('guestId');
  //   if (!guestId) {
  //     guestId = uuidv4();
  //     localStorage.setItem('guestId', guestId);
  //   }
  //   return guestId;
  // }

  const handleSubscribe = (email) => {
    console.log(`Subscribed with email: ${email}`);
  };


  // useEffect(() => {
  //   const guestId = getOrCreateGuestId();
  //   console.log(guestId);
  //   const crm = async () => {
  //     const crmData = {
  //       guest_id: guestId,
  //       location: location ? `${location.city}/${location.region}/${location.country} Ip: ${location.ip}` : "",
  //       localisation: location.loc,
  //       name: user ? user.name : 'Guest',
  //       phone: user ? user.partner_phone : 'Guest',
  //       email: user ? user.email : 'Guest',
  //       type: "precommande",
  //       total: getPreorderTotal(),
  //       date: new Date().toLocaleString(),
  //       produits: preorder.map((item) => ({
  //         id: item.id,
  //         nom: item.name,
  //         quantité: item.quantity,
  //         prix: item.preorder_price,
  //         location: item.location,
  //         date: item.date,
  //       })),
  //     };
  //     console.log(crmData);
  //     try {
  //       const response = await CrmService.sendCRMData(crmData);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error sending CRM data:', error);
  //     }

  //   }
  //   if (location && preorder.length > 0 && !crmExecuted) {
  //     crm();
  //   }
  // }, [location, preorder, crmExecuted]);



  const handleValidePanier = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!user) {
      toast.dismiss();
      toast.warning("Merci de vous connecter", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate("/login");
    } else {

      if (preorder.length === 0) {
        toast.dismiss();
        toast.error("Veuillez ajouter au moins un article dans votre panier", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        console.log("creation de la commande sur le odoo ");
        console.log(preorder);

        const modelData = {
          partner_id: user.id,
          type_sale: "preorder",
          state: "sale",
          commitment_date: new Date(),
          order_lines: preorder.map((orde) => ({
            id: orde.id,
            quantity: orde.quantity,
            list_price: orde.preorder_price,
          })),
        };
        console.log(modelData);
        setIsLoading(true);
        try {
          const response = await PrecommandeService.createPreCommande(modelData);
          console.log(response);
          if (response.status == "error") {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 5000,
            });
            setIsLoading(false);
            return;
          } else {
            toast.success("Pré Commande enregistrée avec succés", {
              position: "top-center",
              autoClose: 5000,
            });
            setIsLoading(false);
            navigate(`/pre-commandes/${response.id}/détails`);
            console.log(response);

            clearPreorder();

          }
        } catch (error) {
          toast.error("Pré Commande non enregistrée " + error, {
            position: "top-center",
            autoClose: 5000,
          });
          console.error("Erreur lors de la récupération des modèles", error);
        }
        setIsLoading(false);
      }
    }
    setIsLoading(false);

  };


  const handleCreatePanier = async (e) => {
    e.preventDefault();
    if (user) {
      setIsLoading(true);
      const modelData = {
        partner_id: user.id,
        type_sale: "preorder",
        state: "sale",
        commitment_date: new Date(),
        order_lines: preorder.map((orde) => ({
          id: orde.id,
          quantity: orde.quantity,
          list_price: orde.preorder_price,
        })),
      };
      console.log(modelData);
      try {
        const response = await PrecommandeService.createPreCommande(modelData);
        console.log(response);
        toast.success("Commande créé avec succés", {
          position: "top-center",
          autoClose: 5000,
        });
        setIsLoading(false);
        navigate(`/pre-commandes/${response.id}/détails`);
        console.log(response);
        clearPreorder()
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
      type_sale: "preorder",
      state: "sale",
      commitment_date: new Date(),
      order_lines: preorder.map((orde) => ({
        id: orde.id,
        quantity: orde.quantity,
        list_price: orde.preorder_price,
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
      const response = await PrecommandeService.createCommandeWitoutPartner(compteData);
      console.log(response);
      toast.success("Précommande créé avec succés", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate(`/boutique`);
      console.log(response);
      clearPreorder();
      setIsLoading(false);
    } catch (error) {
      toast.error("Précommande non validé ", {
        position: "top-center",
        autoClose: 5000,
      });
      console.error("Erreur lors de la récupération des modèles", error);
      setIsLoading(false);
    }

  };


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=a7bca817c4bc37');
        if (!response.ok) {
          throw new Error('Error fetching location data');
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (preorder.length > 0) {
      fetchLocation();
    }
  }, [preorder]);


  return (
    <>
      <SEOHeader
        title="CCBM Shop | Panier Précommande "
        description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
        keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
      />
      <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
        {cart === false ? (
          <div className="cart-page-wrapper w-full">
            <div className="container-x mx-auto">
              <BreadcrumbCom
                paths={[
                  { name: "Accueil", path: "/" },
                  { name: "Validation panier Pré commande", path: "/pre-cart" },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="cart-page-wrapper w-full bg-white pb-[60px]">
            <div className="w-full">
              <PageTitle
                title="Panier Précommande"
                breadcrumb={[
                  { name: "Accueil", path: "/" },
                  { name: "Validation panier Précommande", path: "/pre-cart" },
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


                    <div className="total mb-6">
                      <div className=" flex justify-between">
                        <p className="text-[18px] font-medium text-qblack">
                          Total panier
                        </p>
                        <p className="text-[18px] font-medium text-qred">
                          {" "}
                          {formatPrice(getPreorderTotal())}{" "}
                        </p>
                      </div>
                    </div>
                    {getPreorderTotal() != 0 && (
                      <Button
                        type="submit"
                        className="hover:bg-red-500  w-full bg-bleu-logo"
                        // onClick={(e) => handleValidePanier(e)}
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
                  order={preorder}
                  data={data}
                  onClose={() => setShowCreatePartnerModal(false)}
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
