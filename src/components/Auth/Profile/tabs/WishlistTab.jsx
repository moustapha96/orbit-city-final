import React, { useContext } from "react";
import InputQuantityCom from "../../../Helpers/InputQuantityCom";
import { CartContext } from "../../../../contexts/CartContext ";
import { PlusCircleIcon, Trash } from "lucide-react";
import formatPrice from "../../../../utils/formatPrice";
import { toast } from "react-toastify";

export default function WishlistTab({ className }) {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    cart,
    preorder,
    addToPreorder,
  } = useContext(CartContext);
  console.log(wishlist);

  const handleRemoveFromCart = (e, produit) => {
    e.preventDefault();
    removeFromWishlist(produit);
  };
  const HandleAddToCart = (e, produit) => {
    e.preventDefault();
    addToCart(produit, produit.quantity);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Ajout au panier :", cart);
  };
  const HandleAddToPreCart = (e, produit) => {
    e.preventDefault();
    addToPreorder(produit, produit.quantity);
    console.log("Ajout au pré-commande :", preorder);
    toast.success("Produit ajouté", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {/* table heading */}
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                  Produit
                </td>

                <td className="py-4 whitespace-nowrap text-center">PRIX</td>
                <td className="py-4 whitespace-nowrap  text-center">
                  Quantité
                </td>
                <td className="py-4 whitespace-nowrap  text-center">Total</td>
                <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
              </tr>
              {wishlist.map((produit, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="pl-10  py-4 ">
                      <div className="flex space-x-6 items-center">
                        <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                          <img
                            src={`${
                              produit.image_1920
                                ? "data:image/png;base64," + produit.image_1920
                                : "https://readymadeui.com/images/coffee1.webp"
                            }`}
                            alt="product"
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

                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">
                          {" "}
                          {formatPrice(produit.list_price)}
                        </span>
                      </div>
                    </td>
                    <td className=" py-4">
                      <div className="flex justify-center items-center">
                        <InputQuantityCom produit={produit} />
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex space-x-1 items-center justify-center">
                        <span className="text-[15px] font-normal">
                          {" "}
                          {formatPrice(produit.list_price * produit.quantity)}
                        </span>
                      </div>
                    </td>

                    <td className="text-right py-4">
                      <div className="flex space-x-5 items-center justify-center">
                        <button
                          onClick={(event) =>
                            handleRemoveFromCart(event, produit)
                          }
                          className="duration-200 hover:scale-150"
                        >
                          <Trash className="hover:text-red-500" />
                        </button>
                        <button
                          onClick={(event) => HandleAddToCart(event, produit)}
                          className="duration-200 hover:scale-150"
                        >
                          <PlusCircleIcon className="hover:text-yellow-500" />
                        </button>

                        <button
                          onClick={(event) =>
                            HandleAddToPreCart(event, produit)
                          }
                          className="duration-200 hover:scale-150"
                        >
                          <PlusCircleIcon className="hover:text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full mt-[30px] flex sm:justify-end justify-start">
        <div className="sm:flex sm:space-x-[30px] items-center">
          <button type="button">
            <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
              Supprimer la liste
            </div>
          </button>
          <div className="w-[180px] h-[50px]">
            <button type="button" className="blue-logo-btn">
              <div className="w-full text-sm font-semibold">
                Ajouter au panier
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
