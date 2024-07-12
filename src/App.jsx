import { CartProvider } from "./contexts/CartContext ";
import { UserProvider } from "./contexts/UserContext";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <CartProvider>
        <Routers />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
