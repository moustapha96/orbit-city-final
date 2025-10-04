/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import InputQuantityCommande from "../Helpers/InputQuantityCommande";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import formatPrice from "../../utils/formatPrice";
import { Trash } from "lucide-react";

export default function ProductsTable({ className, produits }) {
  const { cart, removeFromCart } =
    useContext(CartContext);
  console.log(cart);

  const HandleDeleteProduct = (e, produit) => {
    e.preventDefault();
    removeFromCart(produit);
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                Produits
              </td>

              {/* <td className="py-4 whitespace-nowrap text-center">Prix</td> */}

            </tr>
            {/* table heading end */}
            {produits.map((produit, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={produit.image
                          ? `${produit.image}`
                          : "https://readymadeui.com/images/coffee1.webp"}
                        alt={`CCBM Shop pack promo ${produit.name}`}
                        className="w-full h-full object-contain"
                      />


                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack">
                        {produit.name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {" "}
                      {produit.quantity} x {formatPrice(produit.price_unit ? produit.price_unit : 0)}
                    </span>
                  </div>
                </td> */}


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" mt-3 transition-all duration-300 ease-in-out bg-gray-200 text-[15px]  rounded-lg font-medium text-black  text-center py-2">
        Livraison gratuite sur Dakar
      </div>

    </div>
  );
}
