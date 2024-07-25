import { Button, Label, TextInput } from "flowbite-react";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import commandeService from "../../services/commandeService";
import { toast } from "react-toastify";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/date-format";

export default function TrackingOrder() {
  const [commande, setCommande] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleTotrack = async (e) => {
    e.preventDefault();
    setCommande(null);
    setIsLoading(true);
    const newCommand = { name: name, email: email };
    console.log(newCommand);
    try {
      const response = await commandeService.getCommandeTracking(newCommand);
      setCommande(response);

      toast.success("La commande est trouvée", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("La commande n'est pas trouvée", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setIsLoading(false);
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="tracking-page-wrapper w-full">
        <div className="page-title mb-[40px]">
          <PageTitle
            title="Suivi de commande"
            breadcrumb={[
              { name: "Accueil", path: "/" },
              { name: "Suivi de commande", path: "/tracking-order" },
            ]}
          />
        </div>
        <div className="content-wrapper w-full mb-[40px]">
          <div className="container-x mx-auto">
            <h1 className="text-[22px] text-qblack font-semibold leading-9">
              Suivre votre commande
            </h1>
            <p className="text-[15px] text-qgraytwo leading-8 mb-5">
              Saisissez votre nom de commande et votre identifiant secret.
            </p>
            <div className="w-full bg-white lg:px-[30px] px-5 py-[23px] lg:flex items-center">
              <div className="lg:w-[400px] w-full">
                {commande && (
                  <div className="items-center">
                    <Thumbnail />{" "}
                  </div>
                )}
                <div className="mb-3">
                  <div className="input-item mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Nom de la commande" />
                    </div>
                    <TextInput
                      id="name"
                      placeholder="S000001"
                      label="Nom de la commande"
                      name="name"
                      type="text"
                      value={name}
                      minLength={4}
                      maxLength={20}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="
                      invalid:border-red-500 invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-item mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Adresse Email" />
                    </div>
                    <TextInput
                      id="email"
                      placeholder="exemple@test.com"
                      label="Adresse Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="
                      invalid:border-red-500 invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="failure"
                    className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                              hover:bg-red-500  bg-purple items-center"
                    disabled={isLoading || !email || !name}
                    onClick={handleTotrack}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Vérifier Commande
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center mt-5 lg:mt-0">
                <>
                  {isLoading && (
                    <>
                      <Loader2 size={30} color="green"></Loader2>
                    </>
                  )}
                </>
                {!commande ? (
                  <>
                    {" "}
                    <p className="text-red-500">commande non trouvée</p>
                    <Thumbnail />{" "}
                  </>
                ) : (
                  <>
                    {commande && (
                      <div className="w-full mt-[23px]">
                        <div className="container-x mx-auto">
                          {commande && (
                            <div className="checkout-main-content w-full">
                              <div className="container-x mx-auto">
                                <div className="w-full sm:mb-10 mb-5">
                                  <div className="sm:flex sm:space-x-[18px] s">
                                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                        <span className="text-[15px] font-medium">
                                          N°Commande{" "}
                                          <span>{commande.name}</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-1 h-[70px]">
                                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                        <span className="text-[15px] font-medium">
                                          Statut :{" "}
                                          {commande.advance_payment_status ===
                                            "not_paid" && (
                                            <span className="text-red-500">
                                              (Non Payé)
                                            </span>
                                          )}
                                          {commande.advance_payment_status ===
                                            "paid" && (
                                            <span className="text-green-500">
                                              {" "}
                                              (Payé)
                                            </span>
                                          )}
                                          {commande.advance_payment_status ===
                                            "partial" && (
                                            <span className="text-yellow-500">
                                              {" "}
                                              (Payé Partiellement)
                                            </span>
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
                                          <span>
                                            {formatDate(
                                              commande.commitment_date
                                            )}
                                          </span>
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
                                          {commande &&
                                            commande.order_lines.map(
                                              (produit, index) => (
                                                <>
                                                  <li key={index}>
                                                    <div className="flex justify-between items-center">
                                                      <div>
                                                        <h4 className="text-[15px] text-qblack mb-2.5">
                                                          {produit.product_name}
                                                          <sup className="text-[13px] text-qgray ml-2 mt-2">
                                                            x{" "}
                                                            {
                                                              produit.product_uom_qty
                                                            }
                                                          </sup>
                                                        </h4>
                                                        <p className="text-[13px] text-qgray">
                                                          {produit.description}
                                                        </p>
                                                      </div>
                                                      <div>
                                                        <span className="text-[15px] text-qblack font-medium">
                                                          {formatPrice(
                                                            produit.price_total
                                                          )}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </li>
                                                </>
                                              )
                                            )}
                                        </ul>
                                      </div>
                                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                                      {commande.type_sale === "preorder" && (
                                        <div className="mt-[30px]">
                                          <div className=" flex justify-between mb-5">
                                            <p className="text-[13px] font-medium text-qblack uppercase">
                                              Premier Tranche
                                            </p>
                                            <p
                                              className={`text-base text-[15px] uppercase font-medium ${
                                                commande.first_payment_state
                                                  ? "text-green-500"
                                                  : "text-red-500"
                                              }`}
                                            >
                                              {formatPrice(
                                                commande.first_payment_amount
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      <div className="mt-[30px]">
                                        <div className=" flex justify-between mb-5">
                                          <p className="text-[13px] font-medium text-qblack uppercase">
                                            Sous Total
                                          </p>
                                          <p className="text-[15px] font-medium text-qblack uppercase">
                                            {formatPrice(
                                              commande.amount_untaxed
                                            )}
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
                                            Total à payer
                                          </p>
                                          <p className="text-2xl font-medium">
                                            <span
                                              className={`text-${
                                                commande.advance_payment_status ===
                                                  "not_paid" ||
                                                commande.advance_payment_status ===
                                                  "partial"
                                                  ? "red"
                                                  : "green"
                                              }-500`}
                                            >
                                              {" "}
                                              {formatPrice(
                                                commande.amount_total
                                              )}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      {commande.amount_residual > 0 && (
                                        <div className="mt-[30px]">
                                          <div className=" flex justify-between mb-5">
                                            <p className="text-2xl font-medium text-qblack">
                                              Total restant
                                            </p>
                                            <p className="text-xl font-medium">
                                              <span className={`text-grew-500`}>
                                                {" "}
                                                {formatPrice(
                                                  commande.amount_residual
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      )}

                                      <>
                                        {commande.type_sale === "preorder" ? (
                                          <>
                                            {commande.advance_payment_status ===
                                              "not_paid" ||
                                            commande.advance_payment_status ==
                                              "partial" ? (
                                              <div className="w-full h-[50px] flex justify-center items-center">
                                                <span className="text-red-500">
                                                  {" "}
                                                  Payment non effectif
                                                </span>
                                              </div>
                                            ) : (
                                              <div className="w-full h-[50px] flex justify-center items-center">
                                                <span className="text-green-500">
                                                  {" "}
                                                  Payment effectif
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {commande.advance_payment_status ===
                                            "not_paid" ? (
                                              <div className="w-full h-[50px] flex justify-center items-center">
                                                <span className="text-red-500">
                                                  {" "}
                                                  Payment non effectif
                                                </span>
                                              </div>
                                            ) : (
                                              <div className="w-full h-[50px] flex justify-center items-center">
                                                <span className="text-green-500">
                                                  {" "}
                                                  Payment effectif
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
