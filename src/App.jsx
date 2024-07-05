import { CartProvider } from "./contexts/CartContext ";
import { UserProvider } from "./contexts/UserContext";
import Routers from "./Routers";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routers />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
