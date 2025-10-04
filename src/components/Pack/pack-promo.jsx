/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { CartContext } from "../../contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { Loader, Loader2 } from "lucide-react";
import CommandeService from "../../services/CommandeService";

import CreatePartnerModalService from "../../services/CreatePartnerModalService";
import { useAuthContext } from "../../contexts/useAuthContext";

import PackPromoService from "../../services/PackPromoService";
import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";
import ProductsTable from "./ProductsTable";


export default function PackPromoPage() {

    const location = useLocation()
    const fullUrl = `${location.pathname}${location.search}${location.hash}`;

    const { cart, getCartTotal, clearCart } =
        useContext(CartContext);
    const { user } = useAuthContext();
    const [selectedPayment, setSelectedPayment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [clickBUtton, setClickBUtton] = useState(false)
    const [showCreatePartnerModal, setShowCreatePartnerModal] = useState(false);
    const [data, setData] = useState(null)
    const navigate = useNavigate();
    const [crmExecuted, setCrmExecuted] = useState(false);

    const [code_pack, setCodePack] = useState()
    const [pack, setPack] = useState()
    const [produits, setProduits] = useState([])
    const [montantTotal, setMontantTotal] = useState(0)



    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        if (!user) {
            toast.dismiss();
            toast.warning("Merci de vous connecter pour confirmer votre commande", {
                position: "top-center",
                autoClose: 5000,
            })
        }
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (code) {
            setCodePack(code);
            console.log("Code Pack:", code);
        } else {
            console.error("Aucun code pack trouvé");
        }
    }, [location]);


    useEffect(() => {
        const fetchPack = async () => {
            try {
                const resultat = await PackPromoService.getPackByCode(code_pack);
                if (resultat.data) {
                    setPack(resultat.data);
                    setProduits(resultat.data.produits);
                    setMontantTotal(resultat.data.sommeTotal);
                } else {
                    throw new Error("Pack non trouvé ou plus disponible.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du pack :", error);
                toast.error("Le pack n'est plus d'actualité ou indisponible.", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setPack(null);
            }
        };

        if (code_pack) {
            fetchPack();
        }
    }, [code_pack]);



    const handlePaymentChange = (event) => {
        console.log(event.target.value);
        setIsLoading(false)
        setSelectedPayment(event.target.value);
    };



    const handleCreatePanier = async (e) => {
        e.preventDefault();
        console.log('pack ')
        console.log(produits)

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
                type_order: "pack",
                commitment_date: new Date(),
                order_lines: produits.map((orde) => ({
                    id: orde.id,
                    quantity: orde.quantity,
                    list_price: orde.price_unit,
                })),
            };
            console.log(modelData);
            try {
                const response = await CommandeService.createCommandePack(modelData);
                console.log(response);
                toast.success("Commande créé avec succés", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setIsLoading(false);
                navigate(`/commandes/${response.id}/détails`);
                console.log(response);
                // clearCart();
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
            type_order: "pack",
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

    {
        !pack && (
            <>
                <div className="flex justify-center items-center ">
                    <Loader className="animate-spin"></Loader> Pack non trouvée
                </div>
            </>
        )
    }


    return (
        <>
            <SEOHeader
                title="CCBM Shop | Panier Commande"
                description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
                keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
            />
            <Layout childrenClasses="pt-0 pb-0">
                <div className="cart-page-wrapper w-full bg-white pb-[60px]">
                    <div className="w-full">
                        <PageTitle
                            title={`Panier Pack ${pack && pack.name ? pack.name : 'Commande'}`}
                            breadcrumb={[
                                { name: "Accueil", path: "/" },
                                { name: "Panier Pack Commande : " + (pack && pack.name ? pack.name : 'Commande'), path: "/pack-promo" },
                            ]}
                        />
                    </div>
                    <div className="w-full mt-[23px]">
                        <div className="container-x mx-auto">
                            <ProductsTable produits={produits} className="mb-[30px]" />
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

                            {user ? <>

                            </> : <>

                            </>}
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

                                        </ul>
                                    </div>

                                    <div className="total mb-6">
                                        <div className=" flex justify-between">
                                            <p className="text-[18px] font-medium text-qblack">
                                                Total
                                            </p>
                                            <p className="text-[18px] font-medium text-qred">
                                                {" "}
                                                {formatPrice(montantTotal)}
                                            </p>
                                        </div>
                                    </div>
                                    {user ? <>
                                        {montantTotal != 0 && (
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
                                    </> : <>
                                        <div className="w-full mt-[30px] flex sm:justify-end">
                                            <Link to={`/login?redirectTo=${fullUrl}`} >
                                                <Button
                                                    type="submit"
                                                    className="hover:bg-red-500  w-full bg-bleu-logo "
                                                >
                                                    Connectez-vous pour confirmer la commande
                                                </Button>
                                            </Link>
                                        </div>
                                    </>}

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
                                onClose={() => setShowCreatePartnerModal(false)}
                            />
                        </>
                    )}

                </div>



            </Layout>
        </>
    );
}
