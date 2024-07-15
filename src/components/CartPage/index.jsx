/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { CartContext } from "../../contexts/CartContext ";
import { useContext, useEffect, useState } from "react";
import formatPrice from "../../utils/formatPrice";

import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { Loader2 } from "lucide-react";

import paydunya from "paydunya";

import commandeService from "../../services/CommandeService";
export default function CardPage({ cartt = true }) {
  const { cart, getCartTotal, clearCart, setOrderState, orderState } =
    useContext(CartContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [amount, setAmount] = useState(1000);
  const [description, setDescription] = useState("Commande teste paydynya");
  const [isLoading, setIsLoading] = useState(false);
  const [setup, setSetup] = useState(null);
  const [store, setStore] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const paydunyaSetup = new paydunya.Setup({
    //   masterKey: "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
    //   privateKey: "test_private_rLI7U4b3J0SjDBJQ7cEC9OCayn9",
    //   publicKey: "test_public_4FEHuOo9gsFwgPjoQv27L1deBlx",
    //   token: "UWVccdmuTo5tusRDkoZQ",
    //   mode: "test", // Optionnel. Utilisez cette option pour les paiements tests.
    // });
    // const store = new paydunya.Store({
    //   name: "Orbit city",
    //   email: "moustaphakhouma964@gmail.com",
    //   phone: "784537547",
    //   address: "Dakar",
    //   city: "dakar",
    //   country: "senegal",
    //   zipCode: "code postal de votre magasin",
    //   logoURL: "https://orbitcitydev.com/logo.png",
    // });
    // setSetup(paydunyaSetup);
    // console.log(setup);
    // console.log(store);
    // const invoice = new paydunya.CheckoutInvoice(setup, store);
    // setInvoice(invoice);
    // invoice.addItem("Article 1", 1, 1000, 1000);
    // invoice.addItem("Article 2", 2, 500, 1000);
    // invoice.totalAmount = 2000;
    // console.log(invoice);
  }, []);

  const createInvoice = () => {
    try {
      const response = invoice.create();
      console.log(response);
      alert(response);
      // window.location.href = invoice.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleValidePanier = async (event) => {
    event.preventDefault();

    try {
      const invoice = new paydunya.Invoice({
        amount: amount,
        description: description,
        store: {
          name: "payment duynya",
        },
      });

      const response = await setup.createInvoice(invoice);

      if (response.response_code === "00") {
        console.log("payment effectif" + response);
      } else {
        // Gérez les erreurs ici
        console.error("Error creating invoice:", response);
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleValidePaniere = async (e) => {
    e.preventDefault();
    setShowPaymentModal(true);
    console.log("creation dela commande sur le odoo ");
    console.log(cart);

    const modelData = {
      partner_id: parseInt(localStorage.getItem("partner_id")),
      type_sale: "order",
      state: "sale",
      commitment_date: new Date(),
      order_lines: cart.map((orde) => ({
        id: orde.id,
        quantity: orde.quantity,
        list_price: orde.list_price,
      })),
    };
    setIsLoading(true);
    try {
      const response = await commandeService.createCommande(modelData);
      console.log(response);
      toast.success(" Commande validé avec succés", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/validation-commande");
      console.log(response);
      setOrderState(response);
      clearCart();
      console.log(orderState);
    } catch (error) {
      toast.error("Commande non validé ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Erreur lors de la récupération des modèles", error);
    }
    setIsLoading(false);
  };
  return (
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
            <EmptyCardError />
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
                  <Link to="/all-products">
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
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Sous Total
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {formatPrice(getCartTotal())}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>

                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total Non taxé
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
                      className="hover:bg-red-500  w-full"
                      onClick={(e) => createInvoice(e)}
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
        </div>
      )}
    </Layout>
  );
}
