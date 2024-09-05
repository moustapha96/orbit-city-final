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
export default function CallBackPaydunyaPage({ cart = true }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
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
                setData(responsePd);
                if (responsePd) {
                    if (responsePd.order_type == "order") {
                        navigate(`/commandes/${responsePd.order_id}/détails`);
                    } else {
                        navigate(`/pre-commandes/${responsePd.order_id}/détails`);
                    }
                }
            } catch (error) {
                setIsLoading(false);
                toast.error("Erreur lors de la recuperation de la commande", {
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
                                                        <Button className="rounded-lg px-5 py-2.5 font-medium w-full hover:bg-red-500 hover:text-white text-xl" > <Link to="/all-products"  > Retour à la boutique </Link> </Button>
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
