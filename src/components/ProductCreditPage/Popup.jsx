/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom"; // Assurez-vous d'avoir installé react-router-dom

const Popup = ({ children, linkText, linkTo }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showPopup && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-6 bg-white border border-gray-300 rounded-md shadow-lg text-gray-800 text-sm w-80 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="mb-2">
            Profiter d'une réduction de 50% sur certains articles disponibles en
            précommande.
          </p>
          <p className="mb-2">Sur nos télévisions TCL</p>
          <Link to={linkTo} className="text-blue-500 underline">
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Popup;
