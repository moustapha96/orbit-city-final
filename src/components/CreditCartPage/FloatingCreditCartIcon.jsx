





import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react"; // Utilisation de l'icône panier
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useAuthContext } from "../../contexts/useAuthContext";

export default function FloatingCreditCartIcon() {
    const { creditOrder } = useContext(CartContext);
    const { user } = useAuthContext();
    return <>
        {user && user.adhesion == "accepted" && <>
            <Link to="/credit-cart"  >
                <div className="fixed bottom-36 right-10 bg-bleu-logo text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-bleu-claire transition-all duration-300">
                    <HeartHandshake className="w-6 h-6" />
                    {creditOrder.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center absolute top-[-5px] right-[-5px]">
                            {creditOrder.length}
                        </span>
                    )}
                </div>
            </Link>
        </>}
    </>
}


