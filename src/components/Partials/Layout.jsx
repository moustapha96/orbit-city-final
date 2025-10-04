/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import DiscountBanner from "../Home/DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footers/Footer";
import Header from "./Headers/HeaderOne";
import CommentSection from "../chatBot/commentSection";
import { useAuthContext } from "../../contexts/useAuthContext";
import { useNewsletterPopup } from "../../Hooks/useNewsletterPopup";
import NewsletterPopup from "../Popup/NewsletterPopup";
import { useLocation, useNavigate } from "react-router-dom";
import useGoogleAnalytics from "../../Hooks/useGoogleAnalytics";
import FloatingCartIcon from "../CartPage/FloatingCartIcon";
import FloatingPreCartIcon from "../PreCardPage/FloatingPreCartIcon";
import FloatingCreditCartIcon from "../CreditCartPage/FloatingCreditCartIcon";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function Layout({ children, childrenClasses }) {


  const location = useLocation();
  const { trackPageView } = useGoogleAnalytics();
  const [drawer, setDrawer] = useState(false);
  const { user } = useAuthContext();
  const { preorder, creditOrder, cart } = useContext(CartContext);
  const { showPopup, handleClosePopup } = useNewsletterPopup();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location, trackPageView]);



  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full min-h-screen flex flex-col  ">
        <Header drawerAction={() => setDrawer(!drawer)} />
        {/* <div className={`w-full flex-grow overflow-visible mt-[150px]   ${childrenClasses || "lg:mt-[190px] md:mt-10 pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div> */}

        <main
          className={`w-full flex-grow overflow-visible lg:mt-[130px]  sm:mt-[50px] mt-[50px] ${childrenClasses || "lg:mt-[190px] md:mt-10 pt-[30px] pb-[60px]"
            }`}
        >
          <div className="container mx-auto px-4">{children}</div>
        </main>

        <Footer />
      </div>

      {showPopup && !user && (
        <NewsletterPopup
          onClose={handleClosePopup}
          isVisible={showPopup}
        />
      )}
      {/* <div className="sm:block hidden">
        <CommentSection />
      </div> */}
      <CommentSection />
      {/* {cart && cart.length > 0 && <FloatingCartIcon />}
      {preorder && preorder.length > 0 && <FloatingPreCartIcon />}
      {creditOrder && creditOrder.length > 0 && <FloatingCreditCartIcon />} */}

    </>
  );
}
