import { useNavigate } from "react-router-dom";
import InputQuantityPreCommande from "../Helpers/InputQuantityPreCommande";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext ";
import formatPrice from "../../utils/formatPrice";
import { CircleX } from "lucide-react";

export default function ProductsTable({ className }) {
  const { preorder, removeFromPreorder } = useContext(CartContext);
  console.log(preorder);

  const HandleDeleteProduct = (e, produit) => {
    e.preventDefault();
    removeFromPreorder(produit);
  };
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                product
              </td>

              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap  text-center">quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {preorder.map((produit, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
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
                    <InputQuantityPreCommande produit={produit} />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {" "}
                      {formatPrice(produit.list_price * produit.quantity)}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <CircleX
                      onClick={(e) => HandleDeleteProduct(e, produit)}
                    ></CircleX>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
