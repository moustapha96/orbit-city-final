/* eslint-disable react/prop-types */
// src/context/AppContext.js
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [urlApi, setUrlApi] = useState(import.meta.env.VITE_API_URL);

    return (
        <AppContext.Provider value={{ urlApi, setUrlApi }}>
            {children}
        </AppContext.Provider>
    );
};
