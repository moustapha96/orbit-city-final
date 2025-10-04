/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// // import { useAuthContext } from "./context/AuthContext";
// // import DefaultLayout from "./layouts/DefaultLayout";
// // import AuthLayout from "./layouts/AuthLayout";

// // Import all your components here
// import Home from "./components/Home";
// import AllProductPage from "./components/AllProductPage";
// import ProductPrecommandePage from "./components/ProductPrecommandePage";
// import SingleProductPage from "./components/SingleProductPage";
// import PreOrderPage from "./components/PreOrder";
// import CreditOrderPage from "./components/CreditOrder";
// import OrderPage from "./components/Order";
// import OrderPaymentPage from "./components/OrderPayment";
// import PaymentStatePage from "./components/PaymentState";
// import CardPage from "./components/CartPage";
// import PreCardPage from "./components/PreCardPage";
// import CheakoutPage from "./components/CheakoutPage";
// import Wishlist from "./components/Wishlist";
// import CreditCartPage from "./components/CreditCartPage";
// import ProductsCompaire from "./components/ProductsCompaire";
// import About from "./components/About";
// import TrackingOrder from "./components/TrackingOrder";
// import Contact from "./components/Contact";
// import Faq from "./components/Faq";
// import Login from "./components/Auth/Login";
// import NewPassword from "./components/Auth/NewPassword";
// import ResetPassword from "./components/Auth/ResetPassword";
// import Signup from "./components/Auth/Signup";
// import CreateCompte from "./components/Auth/CreateCompte";
// import Profile from "./components/Auth/Profile";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import TermsCondition from "./components/TermsCondition";
// import Entreprise from "./components/GestionEntreprise/Profile";
// import ConditionGeneralDeVentePage from "./components/ConditionsGeneralesDeVente";
// import LivraisonEtRetoursPage from "./components/LivraisonEtRetours";
// import AchatSecurisesPage from "./components/AchatsSecurises";
// import PolitiqueDeConfidentialitePage from "./components/PolitiqueDeConfidentialite";
// import FourZeroFour from "./components/FourZeroFour";
// import { useAuthContext } from "./contexts/useAuthContext";
// import ProductCreditPage from "./components/ProductCreditPage";
// import ProcessusCommandeCredit from "./components/ProcessusCommandeCredit";
// import PromoProductPage from "./components/EnPromo";
// import Information from "./components/About/information";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuthContext();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// function Routers() {
//   const router = createBrowserRouter([
//     {
//       // element: <DefaultLayout />,
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/boutique", element: <AllProductPage /> },
//         { path: "/en-promo", element: <PromoProductPage /> },
//         { path: "/all-products", element: <AllProductPage /> },
//         { path: "/pre-commandes", element: <ProductPrecommandePage /> },
//         { path: "/single-product/:id", element: <SingleProductPage /> },
//         { path: "/products-compaire", element: <ProductsCompaire /> },
//         // { path: "/about", element: <About /> },
//         { path: "/informations", element: <Information /> },
//         { path: "/tracking-order", element: <TrackingOrder /> },
//         // { path: "/contact", element: <Contact /> },
//         { path: "/faq", element: <Faq /> },
//         { path: "/privacy-policy", element: <PrivacyPolicy /> },
//         { path: "/terms-condition", element: <TermsCondition /> },
//         { path: "/conditions-generales-de-vente", element: <ConditionGeneralDeVentePage /> },
//         { path: "/livraison-et-retours", element: <LivraisonEtRetoursPage /> },
//         { path: "/achats-securises", element: <AchatSecurisesPage /> },
//         { path: "/politique-de-confidentialite", element: <PolitiqueDeConfidentialitePage /> },
//         {
//           path: "/processus-de-commande-de-credit", element: <ProcessusCommandeCredit />,
//         },

//         {
//           path: "/cart",
//           element: <CardPage />
//         },
//         {
//           path: "/pre-cart",
//           element: <PreCardPage />,
//         }, { path: "/credit-commandes", element: <ProductCreditPage /> },
//         {
//           path: "/wishlist",
//           element: <Wishlist />
//         },

//       ],
//     },
//     {
//       // element: <AuthLayout />,
//       children: [
//         { path: "/login", element: <Login /> },
//         { path: "/new-password", element: <NewPassword /> },
//         { path: "/forgot-password", element: <ResetPassword /> },
//         { path: "/signup", element: <Signup /> },
//         { path: "/create-compte", element: <CreateCompte /> },
//       ],
//     },
//     {
//       // element: <ProtectedLayout />,
//       children: [
//         {
//           path: "/pre-commandes/:id/détails",
//           element: <ProtectedRoute><PreOrderPage /></ProtectedRoute>,
//         },
//         {
//           path: "/credit-commandes/:id/détails",
//           element: <ProtectedRoute><CreditOrderPage /></ProtectedRoute>,
//         },
//         {
//           path: "/commandes/:id/détails",
//           element: <ProtectedRoute><OrderPage /></ProtectedRoute>,
//         },
//         {
//           path: "/commande-validation",
//           element: <ProtectedRoute><OrderPaymentPage /></ProtectedRoute>,
//         },
//         {
//           path: "/payment-state",
//           element: <PaymentStatePage />,
//         },
//         // {
//         //   path: "/cart",
//         //   element: <ProtectedRoute><CardPage /></ProtectedRoute>,
//         // },
//         // {
//         //   path: "/pre-cart",
//         //   element: <ProtectedRoute><PreCardPage /></ProtectedRoute>,
//         // },
//         {
//           path: "/checkout",
//           element: <ProtectedRoute><CheakoutPage /></ProtectedRoute>,
//         },

//         {
//           path: "/credit-cart",
//           element: <ProtectedRoute><CreditCartPage /></ProtectedRoute>,
//         },
//         {
//           path: "/profile",
//           element: <ProtectedRoute><Profile /></ProtectedRoute>,
//         },
//         {
//           path: "/entreprise",
//           element: <ProtectedRoute><Entreprise /></ProtectedRoute>,
//         },
//       ],
//     },
//     { path: "*", element: <FourZeroFour /> },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default Routers;

import React, { Suspense, lazy, useContext, useEffect } from "react"
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "./contexts/useAuthContext"
import PackPromoPage from "./components/Pack/pack-promo"
import PromoFalshKoritePage from "./components/PromoFalshKoritePage"
import VerifyOTP from "./components/Auth/VerifyOTP"
import PromoFalshTabaskiPage from "./components/PromoFalshKoritePage"

// Lazy load all components
const Home = lazy(() => import("./components/Home"))
const AllProductPage = lazy(() => import("./components/AllProductPage"))
const SingleProductPage = lazy(() => import("./components/SingleProductPage"))
const PromoFalshPage = lazy(() => import("./components/PromoFalshPage"))
const PreOrderPage = lazy(() => import("./components/PreOrder"))
const CreditOrderPage = lazy(() => import("./components/CreditOrder"))
const OrderPage = lazy(() => import("./components/Order"))
const OrderPaymentPage = lazy(() => import("./components/OrderPayment"))
const PaymentStatePage = lazy(() => import("./components/PaymentState"))
const CardPage = lazy(() => import("./components/CartPage"))
const PreCardPage = lazy(() => import("./components/PreCardPage"))
const CheakoutPage = lazy(() => import("./components/CheakoutPage"))
const Wishlist = lazy(() => import("./components/Wishlist"))
const CreditCartPage = lazy(() => import("./components/CreditCartPage"))
const ProductsCompaire = lazy(() => import("./components/ProductsCompaire"))
const TrackingOrder = lazy(() => import("./components/TrackingOrder"))
const Faq = lazy(() => import("./components/Faq"))
const Login = lazy(() => import("./components/Auth/Login"))
const NewPassword = lazy(() => import("./components/Auth/NewPassword"))
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"))
const Signup = lazy(() => import("./components/Auth/Signup"))
const CreateCompte = lazy(() => import("./components/Auth/CreateCompte"))
const Profile = lazy(() => import("./components/Auth/Profile"))
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"))
const TermsCondition = lazy(() => import("./components/TermsCondition"))
const ConditionGeneralDeVentePage = lazy(() => import("./components/ConditionsGeneralesDeVente"))
const LivraisonEtRetoursPage = lazy(() => import("./components/LivraisonEtRetours"))
const AchatSecurisesPage = lazy(() => import("./components/AchatsSecurises"))
const PolitiqueDeConfidentialitePage = lazy(() => import("./components/PolitiqueDeConfidentialite"))

const ProductCreditPage = lazy(() => import("./components/ProductCreditPage"))
const ProcessusCommandeCredit = lazy(() => import("./components/ProcessusCommandeCredit"))
const PromoProductPage = lazy(() => import("./components/EnPromo"))
const Information = lazy(() => import("./components/About/information"))

// Create a loading component
// const Loading = () => <div className="flex items-center justify-center min-h-screen">
//   <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
//     <span className="visually-hidden"></span>
//   </div>
// </div>




const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <img
      src="/logo_192.png"
      alt="CCBM Shop - Loading logo"
      className="max-w-[150px] max-h-[150px] mb-4 animate-pulse object-contain"
    />
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"
      role="status"
    >
      <span className="visually-hidden"></span>
    </div>
  </div>
);


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function Routers() {


  const router = createBrowserRouter([
    {
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/boutique",
          element: (
            <Suspense fallback={<Loading />}>
              <AllProductPage />
            </Suspense>
          ),
        },
        {
          path: "/produits",
          element: (
            <Suspense fallback={<Loading />}>
              <AllProductPage />
            </Suspense>
          ),
        },
        {
          path: "/en-promo",
          element: (
            <Suspense fallback={<Loading />}>
              <PromoProductPage />
            </Suspense>
          ),
        },
        {
          path: '/promo-ramadan',
          element: (
            <Suspense fallback={<Loading />}>
              <PromoFalshPage />
            </Suspense>
          )
        },
        {
          path: '/promo-tabaski',
          element: (
            <Suspense fallback={<Loading />}>
              <PromoFalshTabaskiPage />
            </Suspense>
          )
        },
        {
          path: "/all-products",
          element: (
            <Suspense fallback={<Loading />}>
              <AllProductPage />
            </Suspense>
          ),
        },
        {
          path: "/pre-commandes",
          element: (
            <Suspense fallback={<Loading />}>
              <AllProductPage />
            </Suspense>
          ),
        },
        {
          path: "/single-product/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <SingleProductPage />
            </Suspense>
          ),
        },
        {
          path: "/produits/:id/details",
          element: (
            <Suspense fallback={<Loading />}>
              <SingleProductPage />
            </Suspense>
          ),
        },
        {
          path: "/products-compaire",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductsCompaire />
            </Suspense>
          ),
        },
        {
          path: "/informations",
          element: (
            <Suspense fallback={<Loading />}>
              <Information />
            </Suspense>
          ),
        },
        {
          path: "/tracking-order",
          element: (
            <Suspense fallback={<Loading />}>
              <TrackingOrder />
            </Suspense>
          ),
        },
        {
          path: "/faq",
          element: (
            <Suspense fallback={<Loading />}>
              <Faq />
            </Suspense>
          ),
        },
        {
          path: "/privacy-policy",
          element: (
            <Suspense fallback={<Loading />}>
              <PrivacyPolicy />
            </Suspense>
          ),
        },
        {
          path: "/terms-condition",
          element: (
            <Suspense fallback={<Loading />}>
              <TermsCondition />
            </Suspense>
          ),
        },
        {
          path: "/conditions-generales-de-vente",
          element: (
            <Suspense fallback={<Loading />}>
              <ConditionGeneralDeVentePage />
            </Suspense>
          ),
        },
        {
          path: "/livraison-et-retours",
          element: (
            <Suspense fallback={<Loading />}>
              <LivraisonEtRetoursPage />
            </Suspense>
          ),
        },
        {
          path: "/achats-securises",
          element: (
            <Suspense fallback={<Loading />}>
              <AchatSecurisesPage />
            </Suspense>
          ),
        },
        {
          path: "/politique-de-confidentialite",
          element: (
            <Suspense fallback={<Loading />}>
              <PolitiqueDeConfidentialitePage />
            </Suspense>
          ),
        },
        {
          path: "/processus-de-commande-de-credit",
          element: (
            <Suspense fallback={<Loading />}>
              <ProcessusCommandeCredit />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<Loading />}>
              <CardPage />
            </Suspense>
          ),
        },
        {
          path: "/pre-cart",
          element: (
            <Suspense fallback={<Loading />}>
              <PreCardPage />
            </Suspense>
          ),
        },
        {
          path: "/credit-commandes",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductCreditPage />
            </Suspense>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <Suspense fallback={<Loading />}>
              <Wishlist />
            </Suspense>
          ),
        },
      ],
    },
    {
      children: [
        {
          path: "/login",
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/new-password",
          element: (
            <Suspense fallback={<Loading />}>
              <NewPassword />
            </Suspense>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "/signup",
          element: (
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          ),
        },
        {
          path: "/verification-code",
          element: (
            <Suspense fallback={<Loading />}>
              <VerifyOTP />
            </Suspense>
          ),
        },
        {
          path: "/inscription",
          element: (
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          ),
        },
        {
          path: "/create-compte",
          element: (
            <Suspense fallback={<Loading />}>
              <CreateCompte />
            </Suspense>
          ),
        },
        {
          path: "/pack-promo",
          element: (
            <Suspense fallback={<Loading />}>
              <PackPromoPage />
            </Suspense>
          )
        }
      ],
    },
    {
      children: [
        {
          path: "/pre-commandes/:id/détails",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <PreOrderPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/credit-commandes/:id/détails",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CreditOrderPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/commandes/:id/détails",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <OrderPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/commande-validation",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <OrderPaymentPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/payment-state",
          element: (
            <Suspense fallback={<Loading />}>
              <PaymentStatePage />
            </Suspense>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CheakoutPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/credit-cart",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CreditCartPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "/entreprise",
        //   element: (
        //     <ProtectedRoute>
        //       <Suspense fallback={<Loading />}>
        //         <Entreprise />
        //       </Suspense>
        //     </ProtectedRoute>
        //   ),
        // },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          {/* <FourZeroFour /> */}
          <Home />
        </Suspense>
      ),
    },
  ])


  return <RouterProvider router={router} />
}

export default Routers

