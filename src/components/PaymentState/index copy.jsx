/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BreadcrumbCom from "../BreadcrumbCom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";
import formatDate from "../../utils/date-format";
import PaiementService from "../../services/paimentService";

import PrecommandeService from "../../services/precommandeService";

import { Loader, } from "lucide-react";
import { Button, } from "flowbite-react";
import CommandeService from "../../services/CommandeService";
<<<<<<< HEAD
import { useAuthContext } from "../../contexts/useAuthContext";
export default function PaymentStatePageC({ cart = true }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const location = useLocation();
=======
export default function PaymentStatePageC({ cart = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
  const payment = JSON.parse(localStorage.getItem("payment"));

  const idDataPayment = localStorage.getItem("idDataPayment");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [commande, setCommande] = useState(null);
  const [precommande, setPreCommande] = useState(null);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async (paymentToken) => {
      setIsLoading(true);
      try {
        const responsePd = await PaiementService.getPaymentDetailsByToken(
          paymentToken
        );

        if (responsePd.token_status && responsePd.payment_state === "completed") {
          if (responsePd.order_type == "order") {
            navigate(`/commandes/${responsePd.order_id}/détails`);
            return;
          } else if (responsePd.order_type == "preorder") {
            navigate(`/pre-commandes/${responsePd.order_id}/détails`);
            return;
          }
          setPaymentDetails(null);
          setToken(null);
        } else {
          setPaymentDetails(responsePd);
          setToken(responsePd.payment_token);
          if (responsePd.order_type === "order") {
            const responseCommande = await CommandeService.getCommandeById(
              responsePd.order_id
            );
            setCommande(responseCommande);
          } else if (responsePd.order_type == "preorder") {
            const responsePrecommande =
<<<<<<< HEAD
              await PrecommandeService.getPreCommandeById(user.id, responsePd.order_id);
=======
              await PrecommandeService.getPreCommandeById(responsePd.order_id);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
            setPreCommande(responsePrecommande);
            console.log(responsePrecommande);
          }
          setIsLoading(false);
        }

      } catch (error) {
        setIsLoading(false);
        toast.error("Erreur lors de la recuperation des données du paiement", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(
          "Erreur lors de l'enregistrement des détails du paiement :",
          error.message
        );
      } finally {
        setIsLoading(false);
      }

    };

    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      setToken(paymentToken);
      fetchPaymentDetails(paymentToken);
    }
  }, [location.search]);

  useEffect(() => {
    if (paymentDetails && paymentDetails.token_status && paymentDetails.payment_state === "completed") {
      return;
    }
    if (token) {
      setIsLoading(true);
      const timeoutId = setTimeout(async () => {
        console.log("2 seconde");
        setIsLoading(true);
        try {
          const resultaPayment = await PaiementService.confirmInvoice(token);
          setData(resultaPayment);
          console.log("resultaPayment");
          console.log(resultaPayment);
        } catch (error) {
          console.error(
            "Erreur lors de la confirmation de l'invoice :",
            error.message
          );
        } finally {
          setIsLoading(false);
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  useEffect(() => {

    if (paymentDetails && paymentDetails.token_status && paymentDetails.payment_state === "completed") {
      return;
    }

    if (data && token && paymentDetails && !paymentDetails.token_status) {
      console.log('arrivé 4 seconde')
      console.log(paymentDetails);
      setIsLoading(true);

      const timeoutId = setTimeout(async () => {

        if (data.response_code === "00" && data.status === "completed") {
          const url_facture = data.receipt_url;
          try {

            let name = data.customer.name;
            let email = data.customer.email;
            let phone = data.customer.phone;
            let token_status = true

            const responsePaymentDetails =
              await PaiementService.updatePaymentDetails(parseInt(paymentDetails.id), data.status,
                url_facture,
                name,
                email,
                phone,
                token_status);

            if (responsePaymentDetails) {
              if (responsePaymentDetails.order_type === "order") {
                if (
                  commande &&
                  commande.advance_payment_status === "not_paid"
                ) {
                  validerPaimentCommande();
                  console.log("arrivé commande");
                }
                else if (commande && commande.advance_payment_status === "paid") {
                  toast.success("Commande validé avec succés", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  navigate(`/commandes/${commande.id}/détails`);
                } else {
                  toast.error("Commande non trouvée", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  navigate(`/commandes/${commande.id}/détails`);
                }
              } else if (responsePaymentDetails.order_type === "preorder") {
                if (precommande) {
                  console.log("arrivé");
                  validerPaimentPreCommande(token);
                } else {
                  console.log("erreur ");
                  toast.error("Précommande non trouvée", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  navigate(`/pre-commandes/${precommande.id}/détails`);
                }
              }
            }
          } catch (error) {
            console.error(
              "Erreur lors de la mise à jour des détails du paiement :",
              error.message
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log("error ");
          console.log(data);
          toast.error("Payment non effectif , Veuillez reéssayer", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
          if (paymentDetails.order_type == "order") {
            navigate(`/commandes/${commande.id}/détails`);
          } else {
            navigate(`/pre-commandes/${precommande.id}/détails`);
          }
        }
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [data, token, paymentDetails, commande, precommande]);

  const confirmInvoice = async () => {
    if (data.response_code === "00" && data.status === "completed") {
      const url_facture = data.receipt_url;
      console.log(data);
      const responsePaymentDetails = await PaiementService.updatePaymentDetails(
        idDataPayment,
        data.status,
        url_facture,
        data.customer.name,
        data.customer.email,
        data.customer.phone
      );

      if (responsePaymentDetails) {
        if (responsePaymentDetails.order_type === "order") {
          if (commande && commande.advance_payment_status === "not_paid") {
            validerPaimentCommande();
          } else {
            navigate(`/commandes/${commande.id}/détails`);
          }
        } else if (responsePaymentDetails.order_type === "preorder") {
          if (
            precommande &&
            precommande.advance_payment_status === "not_paid"
          ) {
            validerPaimentPreCommande();
          } else {
            navigate(`/pre-commandes/${precommande.id}/détails`);
          }
        }
      }
    }
  };

  const validerPaimentCommande = async () => {
    console.log("arrivé");
    setIsLoading(true);
    try {
      const reponse = await PaiementService.createCommandePaiment(commande.id);
      toast.success("Paiement de la commande validé avec succès", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(`/commandes/${commande.id}/détails`);
    } catch (error) {
      console.error("Erreur lors de la création du paiement :", error);
      navigate(`/commandes/${commande.id}/détails`);
      toast.error("Paiement de la commande non effectif", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validerPaimentPreCommande = async (token) => {
    setIsLoading(true);
    try {
      const reponse = await PaiementService.createPrecommandePaimentMontant(
        paymentDetails.order_id,
        paymentDetails.amount,
        token
      );
      setIsLoading(false);
      toast.success("Paiement de la pré-commande validé avec succès", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // navigate(`/profile`);
      navigate(`/pre-commandes/${paymentDetails.order_id}/détails`);
    } catch (error) {
      console.error("Erreur lors de la création du paiement :", error);
      setIsLoading(false);
      navigate(`/pre-commandes/${precommande.id}/détails`);
      toast.error("Paiement de la pré-commande non effectif", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenInvoice = () => {
    if (data && data.receipt_url) {
      window.open(data.receipt_url, "_blank", 'noopener,noreferrer');
    }
  };

  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profile" },
                {
                  name: "Validation Payment",
                  path: `/payment-state`,
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title={`Statut Paiment ${commande && commande.type_sale == "preorder"
                ? "Pré commande"
                : "Commande"
                } `}
              breadcrumb={[
                { name: "Accueil", path: "/" },
                { name: "Tableau de bord", path: "/profile" },
                {
                  name: "Validation Payment",
                  path: `/payment-state`,
                },
              ]}
            />
          </div>
          {isLoading && (
            <div className="flex justify-center items-center w-full h-full">
              <Loader size={50} className="animate-spin" />
            </div>
          )}
          {commande && (
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                {commande && (
                  <div className="checkout-main-content w-full">
                    <div className="container-x mx-auto">
                      <div className="w-full sm:mb-10 mb-5">
                        <div className="sm:flex sm:space-x-[18px] s">
                          <div className="flex-1 w-full mb-5 h-[70px]">
                            <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                              <span className="text-[15px] font-medium">

                                <span>
                                  {token && (
                                    <>

                                      <p> Paiement de (
                                        {formatPrice(paymentDetails.amount)} ) en cours de validation....</p>
                                    </>
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:mb-10 mb-5">
                        <div className="sm:flex sm:space-x-[18px] s">
                          <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                            <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                              <span className="text-[15px] font-medium">
                                N°Commande <span>{commande.name}</span>
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
                                {commande.advance_payment_status === "paid" && (
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
                                  {formatDate(commande.commitment_date)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {data && data.customer && (
                        <>
                          <div className="w-full lg:flex lg:space-x-[30px]">
                            <div className="flex-1">
                              <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                                Récapitulatif paiement
                              </h1>
                              <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                                <div className="sub-total mb-6">
                                  <div className=" flex justify-between mb-5">
                                    <p className="text-[13px] font-medium text-qblack uppercase">
                                      Détails Payment
                                    </p>
                                  </div>
                                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                </div>
                                <div className="product-list w-full mb-[30px]">
                                  <ul className="flex flex-col space-y-5">
                                    {data && data.customer && (
                                      <>
                                        <li>
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="text-[15px] text-qblack mb-2.5">
                                                Prenom & Nom
                                              </h4>
                                            </div>
                                            <div>
                                              <span className="text-[15px] text-qblack font-medium">
                                                {" "}
                                                {data.customer.name}{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="text-[15px] text-qblack mb-2.5">
                                                Téléphone
                                              </h4>
                                            </div>
                                            <div>
                                              <span className="text-[15px] text-qblack font-medium">
                                                {" "}
                                                {data.customer.phone}{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="text-[15px] text-qblack mb-2.5">
                                                Email
                                              </h4>
                                            </div>
                                            <div>
                                              <span className="text-[15px] text-qblack font-medium">
                                                {" "}
                                                {data.customer.email}{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="text-[15px] text-qblack mb-2.5">
                                                Montant Payé
                                              </h4>
                                            </div>
                                            <div>
                                              <span className="text-[15px] text-qblack font-medium">
                                                {" "}
                                                {formatPrice(
                                                  data.invoice.total_amount
                                                )}{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <h4 className="text-[15px] text-qblack mb-2.5">
                                                Facture
                                              </h4>
                                            </div>
                                            <div>
                                              <button
                                                className="text-[15px] text-qblack font-medium underline"
                                                onClick={handleOpenInvoice}
                                              >
                                                Ouvrir la facture
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                      </>
                                    )}
                                  </ul>
                                </div>
                                <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

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
                                  commande.order_lines.map((produit, index) => (
                                    <>
                                      <li key={produit.id}>
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
                                <p className="text-2xl font-medium text-qblack">
                                  Total à payer
                                </p>
                                <p className="text-2xl font-medium">
                                  <span
                                    className={`text-${commande.advance_payment_status ===
                                      "not_paid" ||
                                      commande.advance_payment_status ===
                                      "partial"
                                      ? "red"
                                      : "green"
                                      }-500`}
                                  >
                                    {" "}
                                    {formatPrice(commande.amount_total)}
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
                                      {formatPrice(commande.amount_residual)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )}
                            {/* <div>
                              {commande && isLoading && (
                                <>
                                  <Button
                                    type="submit"
                                    // onClick={confirmInvoice}
                                    className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                    disabled={isLoading}
                                  >
                                    {isLoading && (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                     Validation de paiement ({" "}
                                    {formatPrice(paymentDetails.amount)} )
                                  </Button>
                                </>
                              )}
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {precommande && (
            <>
              <div className="w-full mt-[23px]">
                <div className="container-x mx-auto">
                  {precommande && (
                    <div className="checkout-main-content w-full">
                      <div className="container-x mx-auto">
                        <div className="w-full sm:mb-10 mb-5">
                          <div className="sm:flex sm:space-x-[18px] s">
                            <div className="flex-1 w-full mb-5 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                <span className="text-[15px] font-medium">

                                  <span>
                                    {token && (
                                      <>
                                        <p> Paiement de (
                                          {formatPrice(paymentDetails.amount)} ) en cours de validation....</p>
                                      </>
                                    )}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:mb-10 mb-5">
                          <div className="sm:flex sm:space-x-[18px] s">
                            <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                              <a href="#">
                                <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                  <span className="text-[15px] font-medium">
                                    N° PréCommande{" "}
                                    <span>{precommande.name}</span>
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="flex-1 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                <span className="text-[15px] font-medium">
                                  Statut :{" "}
                                  {precommande.advance_payment_status ===
                                    "not_paid" && (
                                      <span className="text-red-500">
                                        (Non Payé)
                                      </span>
                                    )}
                                  {precommande.advance_payment_status ===
                                    "paid" && (
                                      <span className="text-green-500">
                                        {" "}
                                        (Payé)
                                      </span>
                                    )}
                                  {precommande.advance_payment_status ===
                                    "partial" && (
                                      <span className="text-yellow-500">
                                        {" "}
                                        (Partiellement Payer)
                                      </span>
                                    )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="sm:flex sm:space-x-[18px] s">
                            <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                Date de la commande &nbsp;
                                <span>
                                  {formatDate(precommande.date_order)}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                Date de prévisionnelle livraison &nbsp;
                                <span>
                                  {formatDate(precommande.commitment_date)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="sm:flex sm:space-x-[18px] s">
                            <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                Total Payé &nbsp;
                                <span>
                                  {" "}
                                  {formatPrice(
                                    precommande.amount_total -
                                    precommande.amount_residual
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 h-[70px]">
                              <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                                Total Restant &nbsp;
                                <span>
                                  {" "}
                                  {formatPrice(precommande.amount_residual)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {data && data.customer && (
                          <>
                            <div className="w-full lg:flex lg:space-x-[30px]">
                              <div className="flex-1">
                                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                                  Récapitulatif paiement
                                </h1>
                                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                                  <div className="sub-total mb-6">
                                    <div className=" flex justify-between mb-5">
                                      <p className="text-[13px] font-medium text-qblack uppercase">
                                        Détail Payment
                                      </p>
                                    </div>
                                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                  </div>
                                  <div className="product-list w-full mb-[30px]">
                                    <ul className="flex flex-col space-y-5">
                                      {data && data.customer && (
                                        <>
                                          <li>
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="text-[15px] text-qblack mb-2.5">
                                                  Prenom & Nom
                                                </h4>
                                              </div>
                                              <div>
                                                <span className="text-[15px] text-qblack font-medium">
                                                  {" "}
                                                  {data.customer.name}{" "}
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="text-[15px] text-qblack mb-2.5">
                                                  Téléphone
                                                </h4>
                                              </div>
                                              <div>
                                                <span className="text-[15px] text-qblack font-medium">
                                                  {" "}
                                                  {data.customer.phone}{" "}
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="text-[15px] text-qblack mb-2.5">
                                                  Email
                                                </h4>
                                              </div>
                                              <div>
                                                <span className="text-[15px] text-qblack font-medium">
                                                  {" "}
                                                  {data.customer.email}{" "}
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="text-[15px] text-qblack mb-2.5">
                                                  Montant Payé
                                                </h4>
                                              </div>
                                              <div>
                                                <span className="text-[15px] text-qblack font-medium">
                                                  {" "}
                                                  {formatPrice(
                                                    data.invoice.total_amount
                                                  )}{" "}
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="flex justify-between items-center">
                                              <div>
                                                <h4 className="text-[15px] text-qblack mb-2.5">
                                                  Facture
                                                </h4>
                                              </div>
                                              <div>
                                                <button
                                                  className="text-[15px] text-qblack font-medium underline"
                                                  onClick={handleOpenInvoice}
                                                >
                                                  Ouvrir la facture
                                                </button>
                                              </div>
                                            </div>
                                          </li>
                                        </>
                                      )}
                                    </ul>
                                  </div>
                                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

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
                                  {precommande.order_lines.map(
                                    (produit, index) => (
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

                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-gray-500 dark:text-gray-400">
                                      Montant Total
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                      {formatPrice(precommande.amount_total)}
                                    </dd>
                                  </dl>

                                  <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-gray-500 dark:text-gray-400">
                                      Premier Tranche
                                    </dt>
                                    <dd
                                      className={`text-base font-medium ${precommande.first_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      A payer avant le{" "}
                                      {precommande.first_payment_date}
                                    </dd>
                                    <dd
                                      className={`text-base font-medium ${precommande.first_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      {formatPrice(
                                        precommande.first_payment_amount
                                      )}
                                    </dd>
                                  </dl>
                                  <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-gray-500 dark:text-gray-400">
                                      Deuxieme Tranche
                                    </dt>
                                    <dd
                                      className={`text-base font-medium ${precommande.second_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      {precommande.second_payment_date}
                                    </dd>
                                    <dd
                                      className={`text-base font-medium ${precommande.second_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      {formatPrice(
                                        precommande.second_payment_amount
                                      )}
                                    </dd>
                                  </dl>
                                  <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-gray-500 dark:text-gray-400">
                                      Troisieme Tranche
                                    </dt>
                                    <dd
                                      className={`text-base font-medium ${precommande.third_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      {precommande.third_payment_date}
                                    </dd>
                                    <dd
                                      className={`text-base font-medium ${precommande.third_payment_state
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                    >
                                      {formatPrice(
                                        precommande.third_payment_amount
                                      )}
                                    </dd>
                                  </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                  <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                    Total à payer
                                  </dt>
                                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                                    {formatPrice(precommande.amount_total)}
                                  </dd>
                                </dl>
                                {precommande.amount_residual >= 0 && (
                                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                      Total Payé
                                    </dt>
                                    <dd className="text-lg font-bold text-green-500 dark:text-white">
                                      {formatPrice(
                                        precommande.amount_total -
                                        precommande.amount_residual
                                      )}
                                    </dd>
                                  </dl>
                                )}
                                {precommande.amount_residual >= 0 && (
                                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                      Total Restant
                                    </dt>
                                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                                      {formatPrice(precommande.amount_residual)}
                                    </dd>
                                  </dl>
                                )}
                                {/* <div>
                                  {precommande && isLoading && (
                                    <>
                                      <Button
                                        type="submit"
                                        // onClick={confirmInvoice}
                                        className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl"
                                        disabled={isLoading}
                                      >
                                        {isLoading && (
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Validation de paiement (
                                        {formatPrice(paymentDetails.amount)} )
                                      </Button>
                                    </>
                                  )}
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {!paymentDetails && (
            <>
              <div className="checkout-main-content w-full">
                <div className="container-x mx-auto">
                  <div className="w-full sm:mb-10 mb-5">
                    <div className="sm:flex sm:space-x-[18px] s">
                      <div className="flex-1 w-full mb-5 h-[70px]">
                        <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                          <span className="text-[15px] font-medium">
                            <span>Token Non valide</span>
                          </span>
                        </div>
                        <br />
                        <div className="w-full h-full  text-qblack flex justify-center items-center">
                          <span className="text-[15px] font-medium   ">
<<<<<<< HEAD
                            <Button className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl" > <Link to="/boutique"  > Retour à la boutique </Link> </Button>
=======
                            <Button className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl" > <Link to="/all-products"  > Retour à la boutique </Link> </Button>
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
