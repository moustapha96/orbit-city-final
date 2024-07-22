import { CartProvider } from "./contexts/CartContext ";
import { UserProvider } from "./contexts/UserContext";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import CategoryProvider from "./contexts/CategoryProvider";
import PaymentProvider from "./contexts/PaymentProvider";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <CategoryProvider>
        <PaymentProvider>
          <CartProvider>
            <Routers />
          </CartProvider>
        </PaymentProvider>
      </CategoryProvider>
    </UserProvider>
  );
}

export default App;
