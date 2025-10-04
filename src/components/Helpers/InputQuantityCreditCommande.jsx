/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Minus, Plus } from "lucide-react";

export default function InputQuantityCreditCommande({ produit }) {
  const { updateCreditOrder } = useContext(CartContext);

  const handleIncrement = (e) => {
    e.preventDefault();
    updateCreditOrder(produit, produit.quantity + 1);
  };

  const handleDecrement = (e) => {
    console.log("produit.quantity");
    console.log(produit.quantity);
    e.preventDefault();
    if (produit.quantity > 1) {
      updateCreditOrder(produit, produit.quantity - 1);
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
          <Minus></Minus>
        </button>
        <span className="text-qblack">
          {produit.quantity ? produit.quantity : 0}
        </span>
        <button
          onClick={handleIncrement}
          type="button"
          className="text-base text-qgray"
        >
          <Plus></Plus>
        </button>
      </div>
    </div>
  );
}
