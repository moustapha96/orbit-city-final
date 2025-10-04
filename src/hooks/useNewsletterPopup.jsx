

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNewsletterPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();

    // Fonction pour fermer le popup
    const handleClosePopup = () => {
        setShowPopup(false);
        const now = Date.now();
        localStorage.setItem('popupLastClosed', now.toString());

        // Réafficher le popup après 10 secondes si la page n'est pas rechargée
        setTimeout(() => {
            setShowPopup(true);
        }, 10000); // 10 secondes
    };

    useEffect(() => {
        // Liste des pages où le popup doit s'afficher
        const showPopupOnPages = ['/cart', '/pre-cart', '/credit-cart'];

        // Fonction pour déterminer si le popup doit s'afficher
        const shouldShowPopup = () => {
            const lastClosed = localStorage.getItem('popupLastClosed');
            if (!lastClosed) return true; // Si aucune fermeture n'est enregistrée, afficher immédiatement
            const timeSinceLastClosed = Date.now() - parseInt(lastClosed, 10);
            return timeSinceLastClosed >= 10000; // Réafficher après 10 secondes
        };

        // Si la page actuelle est autorisée
        if (showPopupOnPages.includes(location.pathname)) {
            // Afficher le popup immédiatement si la page est rechargée
            if (shouldShowPopup()) {
                setShowPopup(true);
            }
        }
    }, [location.pathname]); // Réexécuter à chaque changement de page

    return { showPopup, handleClosePopup };
};
