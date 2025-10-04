import { createContext, useState, useEffect } from "react";

// Initial state
const getInitialState = () => {
    const storedPreviousRoute = localStorage.getItem("previousRoute");
    const storedPreviousRouteFromHeader = localStorage.getItem("previousRouteFromHeader");
    return {
        previousRoute: storedPreviousRoute || null, // Si aucune route précédente n'est enregistrée, retourne null
        previousRouteFromHeader: storedPreviousRouteFromHeader || null, // Si aucune route précédente n'est enregistrée, retourne null
    };
};

export const PreviousRouteContext = createContext();

// eslint-disable-next-line react/prop-types
export const PreviousRouteProvider = ({ children }) => {
    const [previousRoute, setPreviousRoute] = useState(null);
    const [previousRouteFromHeader, setPreviousRouteFromHeader] = useState(null);

    // Charger les valeurs initiales du localStorage après le premier rendu
    useEffect(() => {
        const { previousRoute, previousRouteFromHeader } = getInitialState();
        setPreviousRoute(previousRoute);
        setPreviousRouteFromHeader(previousRouteFromHeader);
    }, []);

    // Sauvegarder les valeurs dans localStorage lorsque elles changent
    useEffect(() => {
        if (previousRoute) {
            localStorage.setItem("previousRoute", previousRoute); // Sauvegarde la route précédente dans localStorage
        }

        // On ne met à jour previousRouteFromHeader que si la route précédente n'est pas /pack-promo
        if (previousRouteFromHeader && previousRoute !== "/pack-promo") {
            localStorage.setItem("previousRouteFromHeader", previousRouteFromHeader); // Sauvegarde la route de l'en-tête dans localStorage
        }
    }, [previousRoute, previousRouteFromHeader]);

    const resetPreviousRoute = () => {
        setPreviousRoute(null); // Fonction pour réinitialiser la route précédente
        localStorage.removeItem("previousRoute"); // Supprimer la route précédente dans localStorage
    };

    const resetPreviousRouteFromHeader = () => {
        setPreviousRouteFromHeader(null); // Réinitialise la route de l'en-tête
        localStorage.removeItem("previousRouteFromHeader"); // Supprime la route de l'en-tête du localStorage
    };

    const value = {
        previousRoute,
        setPreviousRoute,
        resetPreviousRoute,
        setPreviousRouteFromHeader,
        previousRouteFromHeader,
        resetPreviousRouteFromHeader,
    };

    return (
        <PreviousRouteContext.Provider value={value}>
            {children}
        </PreviousRouteContext.Provider>
    );
};
