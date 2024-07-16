import { useParams } from "react-router-dom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useEffect, useState } from "react";

import commandeService from "../../services/CommandeService";
import formatDate from "../../utils/date-format";
import formatPrice from "../../utils/formatPrice";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import PaydunyaModalService from "../../services/PaydunyaModalService";
export default function OrderPage() {
  const { id } = useParams();

  const [commande, setCommande] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await commandeService.getCommandeById(id);
        setCommande(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const validerPaiment = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(commande);
    setShowPaymentModal(true);
  };

  const handlePay = async (paymentData) => {
    console.log("Payment data: ", paymentData);
    setIsLoading(true);
    toast.success("Payement valider avec succés", {
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
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Détails Commande"
            breadcrumb={[
              { name: "Accueil", path: "/" },
              { name: "Commandes", path: "/profile#order" },
              { name: "Détails Commande" },
            ]}
          />
        </div>
        {commande && (
          <div className="checkout-main-content w-full">
            <div className="container-x mx-auto">
              <div className="w-full sm:mb-10 mb-5">
                <div className="sm:flex sm:space-x-[18px] s">
                  <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                    <a href="#">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          N°Commande <span>{commande.name}</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="flex-1 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Statut :{" "}
                        {commande.advance_payment_status === "not_paid" && (
                          <span className="text-red-500">(Non Payé)</span>
                        )}
                        {commande.advance_payment_status === "paid" && (
                          <span className="text-green-500"> (Payé)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:flex sm:space-x-[18px] s">
                  <div className="flex-1 w-full mb-5 h-[70px]">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Date de livraison &nbsp;
                        <span>{formatDate(commande.commitment_date)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:flex lg:space-x-[30px]">
                <div className="flex-1">
                  <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                    Récapitulatif de la commande
                  </h1>
                  <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Produit
                        </p>
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          total
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                    <div className="product-list w-full mb-[30px]">
                      <ul className="flex flex-col space-y-5">
                        {commande.order_lines.map((produit, index) => (
                          <>
                            <li key={index}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="text-[15px] text-qblack mb-2.5">
                                    {produit.product_name}
                                    <sup className="text-[13px] text-qgray ml-2 mt-2">
                                      x {produit.product_uom_qty}
                                    </sup>
                                  </h4>
                                  <p className="text-[13px] text-qgray">
                                    {produit.description}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-[15px] text-qblack font-medium">
                                    {formatPrice(produit.price_total)}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          SUBTOTAL
                        </p>
                        <p className="text-[15px] font-medium text-qblack uppercase">
                          {formatPrice(commande.amount_untaxed)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full mt-[30px]">
                      <div className="sub-total mb-6">
                        <div className=" flex justify-between mb-5">
                          <div>
                            <p className="text-base font-medium text-qblack">
                              TAX
                            </p>
                          </div>
                          <p className="text-[15px] font-medium text-qblack">
                            {formatPrice(commande.amount_tax)}
                          </p>
                        </div>
                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                      </div>
                    </div>

                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-2xl font-medium text-qblack">
                          Total
                        </p>
                        <p className="text-2xl font-medium">
                          {" "}
                          {["not_paid", "paid"].includes(
                            commande.advance_payment_status
                          ) && (
                            <span
                              className={`text-${
                                commande.advance_payment_status === "not_paid"
                                  ? "red"
                                  : "green"
                              }-500`}
                            >
                              {" "}
                              {formatPrice(commande.amount_total)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {commande.advance_payment_status == "not_paid" ? (
                      <div>
                        <Button
                          type="submit"
                          onClick={validerPaiment}
                          className="hover:bg-red-500   w-full h-[50px] black-btn flex justify-center items-center"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Valider le Panier de ({" "}
                          {formatPrice(commande.amount_total)} )
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full h-[50px] flex justify-center items-center">
                        <span className="text-green-500">
                          {" "}
                          Payment effectif
                        </span>
                      </div>
                    )}
                    {showPaymentModal && (
                      <>
                        <PaydunyaModalService
                          handlePay={handlePay}
                          totalAmount={commande.amount_total}
                          onClose={() => setShowPaymentModal(false)}
                          order={commande}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
