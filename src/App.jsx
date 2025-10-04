import { CartProvider } from "./contexts/CartContext";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import PaymentProvider from "./contexts/PaymentProvider";
import { ProductProvider } from "./Provider/ProductContext";
import { AuthProvider } from "./contexts/useAuthContext";
import { CategoryProvider } from "./Provider/CategoryContext";
import { PromoProductProvider } from "./Provider/PromoProductContext";



function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <CategoryProvider>
        <ProductProvider>
          <PromoProductProvider>
            <PaymentProvider>
              <CartProvider>
                <Routers />
              </CartProvider>
            </PaymentProvider>
          </PromoProductProvider>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
