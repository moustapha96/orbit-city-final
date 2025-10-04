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
import { useAuthContext } from "../../contexts/useAuthContext";
import { checkExistingCreditCommande, createCreditCommande } from "../../services/creditCommandeService";

import CrmService from "../../services/CrmService";

import { v4 as uuidv4 } from 'uuid';
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

export default function CreditCartPage({ cartt = true }) {

  const { creditOrder, getCreditOrderTotal, clearCreditOrder } =
    useContext(CartContext);

  const { user, parent } = useAuthContext();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePartnerModal, setShowCreatePartnerModal] = useState(false);
  const [data, setData] = useState(null)
  const [resultatCheck, setResultatCheck] = useState({})
  const [location, setLocation] = useState(null);
  const [crmExecuted, setCrmExecuted] = useState(false);

  const navigate = useNavigate();

  console.log(creditOrder)

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


  useEffect(() => {
    const fetchCheck = async () => {
      const res = await checkExistingCreditCommande(user.id);
      setResultatCheck(res);
      console.log(res)
    }
    fetchCheck();
  }, [])

  const handleValidePanier = async () => {

    setIsLoading(true);
    if (!user) {
      toast.dismiss();
      toast.warning("Merci de vous connecter", {
        position: "top-center",
        autoClose: 5000,
      });
      navigate("/login");
    } else {
      if (creditOrder.length === 0) {
        toast.dismiss();
        toast.error("Veuillez ajouter au moins un article dans votre panier", {
          position: "top-center",
          autoClose: 5000
        });
      } else {

        const modelData = {
          partner_id: user.id,
          parent_id: parent.id,
          type_sale: "creditorder",
          payment_mode: "online",
          state: "draft",
          commitment_date: new Date(),
          order_lines: creditOrder.map((orde) => ({
            id: orde.id,
            quantity: orde.quantity,
            list_price: orde.creditorder_price,
          })),
        };
        console.log("modelData creditoder");
        console.log(modelData);
        try {

          const response = await createCreditCommande(modelData);
          console.log(response);
          toast.success("Commande crédit créé avec succés", {
            position: "top-center",
            autoClose: 5000,
          })
          setTimeout(() => {
            navigate(`/credit-commandes/${response.id}/détails`, { state: { commande: response } });
          }, 2000)
          clearCreditOrder();
        } catch (error) {
          console.log(error.response.data);
          toast.error(error.response.data || "Commande crédit non validé ", {
            position: "top-center",
            autoClose: 5000,
          });
          console.error("Erreur lors de la récupération des modèles", error);
        }
        setIsLoading(false);
      }
    }
  };


  return (
    <>
      <SEOHeader
        title="CCBM Shop | Panier crédit"
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
                  { name: "Panier crédit", path: "/credit-cart" },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="cart-page-wrapper w-full bg-white pb-[60px]">
            <div className="w-full">
              <PageTitle
                title="Panier crédit"
                breadcrumb={[
                  { name: "Accueil", path: "/" },
                  { name: "Panier crédit", path: "/credit-cart" },
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

                    {/* <div className="total mb-6">
                      <div className=" flex justify-between">
                        <p className="text-[18px] font-medium text-qblack">
                          Total
                        </p>
                        <p className="text-[18px] font-medium text-qred">
                          {" "}
                          {formatPrice(getCreditOrderTotal())}
                        </p>
                      </div>
                    </div> */}

                    {/* <div>
                      <div className="total mb-6">
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-qblack">
                            Premier Tranche
                          </p>
                          <p className="text-[18px] font-medium text-qred">
                            {" "}
                            {formatPrice(getCreditOrderTotal() * 0.5)}
                          </p>
                        </div>
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-qblack">
                            Deuxieme Tranche
                          </p>
                          <p className="text-[18px] font-medium text-qred">
                            {" "}
                            {formatPrice(getCreditOrderTotal() * 0.2)}
                          </p>
                        </div>
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-qblack">
                            Troisieme Tranche
                          </p>
                          <p className="text-[18px] font-medium text-qred">
                            {" "}
                            {formatPrice(getCreditOrderTotal() * 0.15)}
                          </p>
                        </div>
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-qblack">
                            Quatrieme Tranche
                          </p>
                          <p className="text-[18px] font-medium text-qred">
                            {" "}
                            {formatPrice(getCreditOrderTotal() * 0.15)}
                          </p>
                        </div>
                      </div>
                    </div> */}



                    {getCreditOrderTotal() != 0 && <>
                      <div className="border-t pt-4 space-y-2">
                        {[
                          { label: "Premier Tranche", value: formatPrice(getCreditOrderTotal() * 0.5) },
                          { label: "Deuxieme Tranche", value: formatPrice(getCreditOrderTotal() * 0.2) },
                          { label: "Troisieme Tranche", value: formatPrice(getCreditOrderTotal() * 0.15) },
                          { label: "Quatrième Tranche", value: formatPrice(getCreditOrderTotal() * 0.15) },
                        ].map((item, index) => (
                          <dl key={index} className="flex flex-wrap items-center justify-between gap-2">
                            <dt className="text-sm text-gray-500">{item.label}</dt>
                            <dd className={`text-sm sm:text-base font-medium text-gray-900")}`}>
                              {item.value}
                            </dd>
                          </dl>
                        ))}
                      </div>
                      <br />
                      <Button
                        type="submit"
                        className="hover:bg-red-500  w-full bg-bleu-logo "
                        onClick={(e) => handleValidePanier(e)}
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Veuillez patientez..." : "Valider le panier"}
                      </Button>

                    </>}
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
        <BannerPub />


      </Layout>
    </>

  );
}
