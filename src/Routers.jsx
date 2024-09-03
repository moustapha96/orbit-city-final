import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import AllProductPage from "./components/AllProductPage";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import CardPage from "./components/CartPage";

import CheakoutPage from "./components/CheakoutPage";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import FourZeroFour from "./components/FourZeroFour";
import Home from "./components/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ProductsCompaire from "./components/ProductsCompaire/index";

import SingleProductPage from "./components/SingleProductPage";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder";
import Wishlist from "./components/Wishlist";
import PreCardPage from "./components/PreCardPage/index.jsx";
import PreOrderPage from "./components/PreOrder/index.jsx";
import OrderPage from "./components/Order/index.jsx";
import OrderPaymentPage from "./components/OrderPayment/index.jsx";
import PreOrderPaymentPage from "./components/PreCartValidation/index.jsx";

import PreCartValidationPage from "./components/PreCartValidation/index.jsx";
import CartValidationPage from "./components/CartValidation/index.jsx";
import PaymentStatePage from "./components/PaymentState/index.jsx";
import LivraisonEtRetoursPage from "./components/LivraisonEtRetours/index.jsx";
import AchatSecurisesPage from "./components/AchatsSecurises/index.jsx";
import ConditionGeneralDeVentePage from "./components/ConditionsGeneralesDeVente/index.jsx";
import PolitiqueDeConfidentialitePage from "./components/PolitiqueDeConfidentialite/index.jsx";
import ResetPassword from "./components/Auth/ResetPassword/index.jsx";
import ProductPrecommandePage from "./components/ProductPrecommandePage/index.jsx";
import NewPassword from "./components/Auth/NewPassword/index.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },




  { path: "/all-products", element: <AllProductPage /> },
  { path: "/pre-commandes", element: <ProductPrecommandePage /> },

  { path: "/single-product/:id", element: <SingleProductPage /> },

  {
    path: "/pre-commandes/:id/détails",
    element: <PreOrderPage />,
  },
  {
    path: "/commandes/:id/détails",
    element: <OrderPage />,
  },
  {
    path: "/commande-validation",
    element: <OrderPaymentPage />,
  },
  {
    path: "/pre-commande-validation",
    element: <PreOrderPaymentPage />,
  },
  {
    path: "/validation-precommande",
    element: <PreCartValidationPage />,
  },
  {
    path: "/validation-commande",
    element: <CartValidationPage />,
  },

  {
    path: "/payment-state",
    element: <PaymentStatePage />,
  },

  { path: "/cart", element: <CardPage /> },
  { path: "/pre-cart", element: <PreCardPage /> },
  { path: "/checkout", element: <CheakoutPage /> },
  { path: "/wishlist", element: <Wishlist /> },

  { path: "/products-compaire", element: <ProductsCompaire /> },

  { path: "/about", element: <About /> },
  { path: "/tracking-order", element: <TrackingOrder /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <Faq /> },
  { path: "/login", element: <Login /> },
  { path: "/new-password", element: <NewPassword /> },
  { path: "/forgot-password", element: <ResetPassword /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-condition", element: <TermsCondition /> },
  {
    path: "/conditions-generales-de-vente",
    element: <ConditionGeneralDeVentePage />,
  },
  { path: "/livraison-et-retours", element: <LivraisonEtRetoursPage /> },
  { path: "/achats-securises", element: <AchatSecurisesPage /> },
  {
    path: "/politique-de-confidentialite",
    element: <PolitiqueDeConfidentialitePage />,
  },
  { path: "*", element: <FourZeroFour /> },
]);

function Routers() {
  return <RouterProvider router={router} />;
}

export default Routers;
