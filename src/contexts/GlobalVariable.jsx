/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import paydunya from "paydunya"; // Assurez-vous d'importer correctement la bibliothèque paydunya
// Importez la configuration
import axios from "axios"; // Assurez-vous d'importer axios
import { paymentConfig } from "../config/paymentConfig";
import { useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import PaiementService from "../services/paimentService";

export const GlobalPaymentContext = createContext();

export const GlobalPaymentProvider = ({ children, mode = "test" }) => {
  const [setup, setSetup] = useState(null);
  const [store, setStore] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = paymentConfig[mode];
    const paydunyaSetup = new paydunya.Setup({
      masterKey: config.masterKey,
      privateKey: config.privateKey,
      publicKey: config.publicKey,
      token: config.token,
      mode: config.mode,
    });
    setSetup(paydunyaSetup);

    const store = new paydunya.Store({
      name: "CCBM SHOP",
      email: "shop@ccbm.sn",
      tagline: "Votre boutique pour vos matériels électroménagers",
      phoneNumber: "784537547",
      postalAddress: "Dakar",
      logoURL: "https://ccbme.sn/logo.png",
      websiteURL: "https://ccbme.sn/",
    });
    setStore(store);
  }, [mode]);

  const confirmInvoice = async (token) => {
    const config = paymentConfig[mode];
    const headers = {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": config.masterKey,
      "PAYDUNYA-PRIVATE-KEY": config.privateKey,
      "PAYDUNYA-TOKEN": config.token,
    };

    const url = `${config.apiUrl}${token}`;

    try {
      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.response_text);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const createInvoice = async (order, idOrder, user) => {
    const invoice = new paydunya.CheckoutInvoice(setup, store);

    order.order_lines.forEach((article) => {
      invoice.addItem(
        article.product_name,
        article.product_uom_qty,
        article.price_unit,
        article.price_subtotal
      );
    });

    invoice.totalAmount = Math.ceil(totalAmount);
    invoice.description =
      "Payment de " +
      formatPrice(Math.ceil(totalAmount)) +
      " pour la commande " +
      order.name;
    invoice.callbackURL = "https://ccbme.sn/profile";
    if (order.type_sale === "order") {
      invoice.cancelURL = `https://ccbme.sn/commandes/${idOrder}/détails`;
    } else {
      invoice.cancelURL = `https://ccbme.sn/pre-commandes/${idOrder}/détails`;
    }
    invoice.returnURL = `https://ccbme.sn/payment-state`;

    invoice.addChannels([
      "card",
      "jonijoni-senegal",
      "orange-money-senegal",
      "wave-senegal",
    ]);
    setPaymentDetails(invoice);
    setTotalAmount(invoice.totalAmount);

    try {
      await invoice.create();
      setPaymentResponse(invoice);
      console.log(invoice);
      const data = {
        transaction_id: `${user.partner_id}-${idOrder}-${totalAmount}-${order.name}-${order.type_sale}`,
        amount: totalAmount,
        order_id: idOrder,
        order_type: order.type_sale,
        order_name: order.name,
        partner_id: user.partner_id,
        payment_token: invoice.token,
        payment_state: invoice.status,
      };
      console.log(data);
      const response = await PaiementService.setPaymentDetails(data);

      localStorage.setItem("idDataPayment", response.id);
      setPaymentUrl(invoice.url);
      localStorage.setItem("idOrderPayment", idOrder);
      localStorage.setItem("tokenOrderPayment", invoice.token);
      localStorage.setItem("statusOrderPayment", invoice.status);
      localStorage.setItem("montant", totalAmount);
      localStorage.setItem("responseTextOrderPayment", invoice.responseText);
      window.open(invoice.url, "_blank", 'noopener,noreferrer');

      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (error) {
      console.error("erreur lors de l'enregistrement details payment");
      console.error(error);
    }
  };

  return (
    <GlobalPaymentContext.Provider
      value={{ setup, store, confirmInvoice, createInvoice }}
    >
      {children}
    </GlobalPaymentContext.Provider>
  );
};

export default GlobalPaymentProvider;
