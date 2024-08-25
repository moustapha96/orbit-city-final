import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import PaymentProvider from "./contexts/PaymentProvider";
import { ProductProvider } from "./contexts/ProductContext";
import CategoryProvider from "./contexts/CategoryContext";
import ScrollToTop from "./contexts/ScrollToTop";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <ProductProvider>
        <CategoryProvider>
          <PaymentProvider>
            <CartProvider>
              <Routers />
            </CartProvider>
          </PaymentProvider>
        </CategoryProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
