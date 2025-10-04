


import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react"; // Utilisation de l'icône panier
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function FloatingPreCartIcon() {
    const { preorder } = useContext(CartContext);

    return <>
        <Link to="/pre-cart" >
            <div className="fixed bottom-24  right-10 bg-bleu-logo text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-bleu-claire transition-all duration-300">
                <ShoppingBag className="w-6 h-6" />
                {preorder.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute top-[-5px] right-[-5px]">
                        {preorder.length}
                    </span>
                )}
            </div>
        </Link>

    </>
}
