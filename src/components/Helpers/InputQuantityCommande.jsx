/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function InputQuantityCommande({ produit }) {
  const { updateCart } = useContext(CartContext);

  const handleIncrement = (e) => {
    e.preventDefault();
    updateCart(produit, produit.quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (produit.quantity > 1) {
      updateCart(produit, produit.quantity - 1);
    }
  };

  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={handleDecrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">
          {produit.quantity ? produit.quantity : 0}
        </span>
        <button
          onClick={handleIncrement}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
