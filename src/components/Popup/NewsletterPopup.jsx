/* eslint-disable react/no-unescaped-entities */

// import { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const NewsletterPopup = ({ onClose }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Vérifie si l'utilisateur a déjà vu la popup
//         const hasSeenPopup = localStorage.getItem('hasSeenPopup');

//         // Affiche la popup si elle n'a pas encore été vue
//         if (!hasSeenPopup) {
//             setIsVisible(true);
//         }
//     }, []);

//     const handleClose = () => {
//         setIsVisible(false);
//         localStorage.setItem('hasSeenPopup', 'true'); // Marque la popup comme vue
//         if (onClose) onClose(); // Exécute la callback si fournie
//     };

//     if (!isVisible) {
//         return null; // Ne rend pas la popup si elle n'est pas visible
//     }

//     return (
//         <div
//             className={`fixed bottom-4 right-4 bg-gradient-to-r from-bleu-logo to-indigo-600 p-6 rounded-lg shadow-2xl z-50
//                         text-white max-w-sm sm:max-w-xs w-full
//                         transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
//         >
//             <button
//                 onClick={handleClose}
//                 className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
//             >
//                 <X size={24} />
//             </button>
//             <div>
//                 <h3 className="text-2xl sm:text-xl font-bold mb-3">Offre Spéciale CCBM Shop!</h3>
//                 <p className="text-lg sm:text-sm mb-4">
//                     Inscrivez-vous dès maintenant et obtenez une réduction jusqu'à 20 000 FCFA sur votre premier achat.
//                 </p>
//                 <button
//                     onClick={() => {
//                         navigate('/signup');
//                         handleClose();
//                     }}
//                     className="w-full bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg sm:text-base"
//                 >
//                     J'en profite!
//                 </button>
//                 <p className="text-sm mt-3 text-center">
//                     *Offre valable pour tout nouvel client sur CCBM Shop
//                 </p>
//             </div>
//         </div>
//     );
// };



import { useNavigate } from "react-router-dom";
import { useNewsletterPopup } from "../../Hooks/useNewsletterPopup";
import { X } from "lucide-react";

const NewsletterPopup = () => {
    const { showPopup, handleClosePopup } = useNewsletterPopup();
    const navigate = useNavigate();

    if (!showPopup) {
        return null; // Ne rend pas la popup si elle n'est pas visible
    }

    return (
        <>
            {/* Popup pour les écrans moyens et plus grands */}
            <div
                className={`hidden md:block fixed bottom-4 right-4 bg-gradient-to-r from-bleu-logo to-indigo-500 p-6 rounded-lg shadow-2xl z-50
                            text-white max-w-sm sm:max-w-xs w-full
                            transition-opacity duration-300 ease-in-out opacity-100`}
            >
                <button
                    onClick={handleClosePopup}
                    className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
                >
                    <X size={24} />
                </button>
                <div>
                    <h3 className="text-2xl sm:text-xl font-bold mb-3">Offre Spéciale CCBM Shop!</h3>
                    <p className="text-lg sm:text-sm mb-4">
                        Inscrivez-vous dés maintenant et obtenez une réduction jusqu à 20 000 FCFA sur votre premier achat sur tout nos produits.
                    </p>
                    {/* rendre le texte minuscule */}
                    <p className="mb-2 text-center text-sm">
                        *Excepté les produits en promotion
                    </p>
                    <button
                        onClick={() => {
                            navigate('/signup');
                            handleClosePopup();
                        }}
                        className="w-full bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-semibold text-lg sm:text-base"
                    >
                        J'en profite!
                    </button>
                    <p className="text-sm mt-3 text-center">
                        *Offre valable pour tout nouvel client sur CCBM Shop
                    </p>
                </div>
            </div>

            {/* Popup pour les écrans petits */}
            <div
                className={`block md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-bleu-logo to-indigo-600 p-2 shadow-lg z-50 
                        text-white w-full
                        transition-opacity duration-300 ease-in-out opacity-100`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-grow mr-2">
                        <h3 className="text-sm font-bold">Offre Spéciale!</h3>
                        <p className="text-xs">Jusqu&apos;à 20 000 FCFA de réduction</p>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/signup");
                            handleClosePopup();
                        }}
                        className="bg-white text-blue-600 py-1 px-2 rounded-md hover:bg-gray-100 transition-colors font-semibold text-xs whitespace-nowrap"
                    >
                        J&apos;en profite!
                    </button>
                    <button
                        onClick={handleClosePopup}
                        className="ml-2 text-white hover:text-gray-200 transition-colors"
                        aria-label="Close popup"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewsletterPopup;
