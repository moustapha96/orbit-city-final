/* eslint-disable react-hooks/exhaustive-deps */
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
import PaiementService from "../../services/paimentService";


import { Loader, } from "lucide-react";
import { Button, } from "flowbite-react";
<<<<<<< HEAD
import { useAuthContext } from "../../contexts/useAuthContext";
=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
export default function PaymentStatePage({ cart = true }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [commande, setCommande] = useState(null);
  const [precommande, setPreCommande] = useState(null);
  const [creditCommande, setCreditCommande] = useState(null);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);



  const handleOpenInvoice = () => {
    if (data && data.receipt_url) {
      window.open(data.receipt_url, "_blank", 'noopener,noreferrer');
    }
  };

<<<<<<< HEAD
  useEffect(() => {

    const fetchPayment = async (paymentToken) => {
      try {
        const response = await PaiementService.getPaymentDetailsByToken(paymentToken);
        console.log(response);
        console.log("response details payment ");
        if (response && response.payment_state === "completed" && response.token_status == true) {
          if (response.order_type === "order") {
            console.log("arrive commande")
            navigate(`/commandes/${response.order_id}/détails`);
          } else if (response.order_type === "preorder") {
            console.log('arrive precommande')
            navigate(`/pre-commandes/${response.order_id}/détails`);
          } else if (response.order_type == "creditorder") {
            console.log('arrive creditorder')
            navigate(`/credit-commandes/${response.order_id}/détails`);
          }
        } else {
          console.log("arrive payment state")
          console.log("response details payment ", response)
          toast.warning("Le payment est en attente", {
            position: "top-right",
            autoClose: 5000,
          });
          navigate(`/credit-commandes/${response.order_id}/détails`);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };
    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      fetchPayment(paymentToken);
    }
  }, [location.search])


  useEffect(() => {
    const fetchPaymentDetails = async (paymentToken) => {
      setIsLoading(true);
      const timeoutId = setTimeout(async () => {
        try {
          const resultaPayment = await PaiementService.confirmInvoice(paymentToken);
          setData(resultaPayment);

          if (resultaPayment.response_code === "00" && resultaPayment.status === "completed") {
            let url_facture = resultaPayment.receipt_url
            let customer_name = resultaPayment.customer.name
            let customer_email = resultaPayment.customer.email
            let customer_phone = resultaPayment.customer.phone
            let payment_state = resultaPayment.status
            console.log(payment_state, url_facture, customer_name, customer_email, customer_phone)


            const responseUpdatePayment = await PaiementService.putPaymentDetailByToken(paymentToken,
              url_facture, customer_name,
              customer_email, customer_phone,
              payment_state)
            console.log(responseUpdatePayment)

            if (responseUpdatePayment) {
              if (responseUpdatePayment.type_sale === "order") {
                navigate(`/commandes/${responseUpdatePayment.id}/détails`);
              } else if (responseUpdatePayment.type_sale === "preorder") {
                navigate(`/pre-commandes/${responseUpdatePayment.id}/détails`);
              } else if (responseUpdatePayment.type_sale == "creditorder") {
                navigate(`/credit-commandes/${responseUpdatePayment.id}/détails`)
              }
            }
          }
          else if (resultaPayment.status === "cancelled") {

            toast.error("Le payment a été annule", {
              position: "top-right",
              autoClose: 5000,
            });

            const responseUpdatePayment = await PaiementService.putPaymentDetailByToken(paymentToken)
            console.log(responseUpdatePayment)
            if (responseUpdatePayment) {
              if (responseUpdatePayment.order_type === "order") {
                navigate(`/commandes/${commande.id}/détails`);
              } else if (responseUpdatePayment.order_type === "preorder") {
                navigate(`/pre-commandes/${precommande.id}/détails`);
              } else if (responseUpdatePayment.order_type === "creditorder") {
                navigate(`/credit-commandes/${creditCommande.id}/détails`)
              }
            }
          } else if (resultaPayment.status === "pending") {
            toast.error("Le payment est en attente", {
              position: "top-right",
              autoClose: 5000,
            });
          }
          setIsLoading(false);
        } catch (error) {
          // navigate(`/profile`);
          console.log(error)
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
          });
          console.error(
            "Erreur lors de l'enregistrement des détails du paiement :",
            error
          );
          setIsLoading(false);
        }
=======
  useEffect(() => {

    const fetchPayment = async (paymentToken) => {
      try {
        const response = await PaiementService.getPaymentDetailsByToken(paymentToken);
        console.log(response);
        console.log("response details payment ");
        if (response && response.payment_state === "completed" && response.token_status == true) {
          if (response.order_type === "order") {
            console.log("arrive commande")
            navigate(`/commandes/${response.order_id}/détails`);
          } else if (response.order_type === "preorder") {
            console.log('arrive precommande')
            navigate(`/pre-commandes/${response.order_id}/détails`);
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };
    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      fetchPayment(paymentToken);
    }
  }, [location.search])


  useEffect(() => {
    const fetchPaymentDetails = async (paymentToken) => {
      setIsLoading(true);
      const timeoutId = setTimeout(async () => {
        try {
          const resultaPayment = await PaiementService.confirmInvoice(paymentToken);
          setData(resultaPayment);

          if (resultaPayment.response_code === "00" && resultaPayment.status === "completed") {
            let url_facture = resultaPayment.receipt_url
            let customer_name = resultaPayment.customer.name
            let customer_email = resultaPayment.customer.email
            let customer_phone = resultaPayment.customer.phone
            let payment_state = resultaPayment.status
            console.log(payment_state, url_facture, customer_name, customer_email, customer_phone)


            const responseUpdatePayment = await PaiementService.putPaymentDetailByToken(paymentToken,
              url_facture, customer_name,
              customer_email, customer_phone,
              payment_state)
            console.log(responseUpdatePayment)

            if (responseUpdatePayment) {
              if (responseUpdatePayment.type_sale === "order") {
                navigate(`/commandes/${responseUpdatePayment.id}/détails`);
              } else if (responseUpdatePayment.type_sale === "preorder") {
                navigate(`/pre-commandes/${responseUpdatePayment.id}/détails`);
              }
            }
          }
          else if (resultaPayment.status === "cancelled") {

            toast.error("Le payment a été annule", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            const responseUpdatePayment = await PaiementService.putPaymentDetailByToken(paymentToken)
            console.log(responseUpdatePayment)
            if (responseUpdatePayment) {
              if (responseUpdatePayment.order_type === "order") {
                navigate(`/commandes/${commande.id}/détails`);
              } else if (responseUpdatePayment.order_type === "preorder") {
                navigate(`/pre-commandes/${precommande.id}/détails`);
              }
            }
          }
          setIsLoading(false);
        } catch (error) {
          // navigate(`/profile`);
          console.log(error)
          // toast.error(error, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
          console.error(
            "Erreur lors de l'enregistrement des détails du paiement :",
            error
          );
          setIsLoading(false);
        }
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
      }, 2000)

      return () => clearTimeout(timeoutId);
    };

    const searchParams = new URLSearchParams(location.search);
    const paymentToken = searchParams.get("token");
    if (paymentToken) {
      setToken(paymentToken);
      fetchPaymentDetails(paymentToken);
    }
  }, [location.search]);



  const handleVerification = async () => {
    try {
      const resultaPayment = await PaiementService.confirmInvoice(token);
      setData(resultaPayment);
      if (resultaPayment.response_code === "00" && resultaPayment.status === "completed") {
        if (data.order_type == "order") {
          navigate(`/commandes/${data.order_id}/détails`);
<<<<<<< HEAD
        } else if (data.order_type == "creditorder") {
          navigate(`/credit-commandes/${data.order_id}/détails`);
=======
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
        } else {
          navigate(`/pre-commandes/${data.order_id}/détails`);
        }
      }
      console.log(resultaPayment);
    } catch (error) {
      console.error(
        "Erreur lors de la confirmation de l'invoice :",
        error.message
      );
    } finally {
      setIsLoading(false);
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
              title={`Statut Paiment`}
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
          {data && (
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                {data && data.customer && (
                  <div className="checkout-main-content w-full">
                    <div className="container-x mx-auto">


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

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}


          {!token && (
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
                            <Button className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl" > <Link to="/boutique"  > Retour à la boutique </Link> </Button>
                          </span>
                        </div>

                        <br />
                        <div className="w-full h-full  text-qblack flex justify-center items-center">
                          <span className="text-[15px] font-medium   ">
                            <Button color="yellow" onClick={handleVerification} className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-black text-xl" > Vérifier le payment </Button>
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
