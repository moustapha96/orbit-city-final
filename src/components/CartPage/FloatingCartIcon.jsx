// FloatingCartIcon.js
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // Utilisation de l'icône panier
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function FloatingCartIcon() {
    const { cart } = useContext(CartContext);

    return <>
        <Link to="/cart">
            <div className="fixed bottom-10 right-10 bg-bleu-logo text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-bleu-claire transition-all duration-300">
                <ShoppingCart className="w-6 h-6" />

                {cart.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute top-[-5px] right-[-5px]">
                        {cart.length}
                    </span>
                )}
            </div>

        </Link>

    </>
}
