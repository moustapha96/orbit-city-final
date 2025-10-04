/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import InputQuantityCommande from "../Helpers/InputQuantityCommande";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import formatPrice from "../../utils/formatPrice";
import { Trash } from "lucide-react";

export default function ProductsTable({ className }) {
  const { cart, removeFromCart } =
    useContext(CartContext);
  console.log(cart);

  const calculateCartTotal = () => {
    return cart.reduce((total, product) => {
      const price = product.en_promo ? product.promo_price : product.list_price;
      return total + (price * product.quantity);
    }, 0);
  };
  const isEligibleForFreeShipping = () => {
    return calculateCartTotal() > 300000;
  };
  const hasPromoProduct = () => {
    return cart.some(product => product.en_promo);
  };
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
                produit
              </td>

              <td className="py-4 whitespace-nowrap text-center">Prix</td>
              <td className="py-4 whitespace-nowrap  text-center">Quantité</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
            {cart.map((produit, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`${produit.image_256
                          ? "data:image/png;base64," + produit.image_256
                          : "https://readymadeui.com/images/coffee1.webp"
                          }`}
<<<<<<< HEAD
                        alt={`image produit ccbm shop ${produit.name}`}
=======
                        alt="product"
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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
                      {formatPrice(produit.en_promo ? produit.promo_price : produit.list_price)}
                    </span>
                  </div>
                </td>
                <td className=" py-4">
                  <div className="flex justify-center items-center">
                    <InputQuantityCommande produit={produit} />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {" "}
                      {formatPrice(
                        produit.en_promo
                          ? produit.promo_price * produit.quantity
                          : produit.list_price * produit.quantity
                      )}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <button
                      onClick={(e) => HandleDeleteProduct(e, produit)}
                      className="duration-200 hover:scale-150"
                    >
                      <Trash className="hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {isEligibleForFreeShipping() && !hasPromoProduct() && (
        <div className="mt-3 transition-all duration-300 ease-in-out bg-gray-200 text-[15px] rounded-lg font-medium text-black text-center py-2">
          Livraison gratuite sur Dakar
        </div>
      )}
    </div>
  );
}






// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useNavigate } from "react-router-dom";
// import InputQuantityCommande from "../Helpers/InputQuantityCommande";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/CartContext";
// import formatPrice from "../../utils/formatPrice";
// import { Trash } from "lucide-react";

// export default function ProductsTable({ className }) {
//   const { cart, removeFromCart } =
//     useContext(CartContext);
//   console.log(cart);

//   const HandleDeleteProduct = (e, produit) => {
//     e.preventDefault();
//     removeFromCart(produit);
//   };
//   return (
//     <div className={`w-full ${className || ""}`}>
//       <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <tbody>
//             {/* table heading */}
//             <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
//               <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
//                 product
//               </td>

//               <td className="py-4 whitespace-nowrap text-center">Prix</td>
//               <td className="py-4 whitespace-nowrap  text-center">Quantité</td>
//               <td className="py-4 whitespace-nowrap  text-center">total</td>
//               <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
//             </tr>
//             {/* table heading end */}
//             {cart.map((produit, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-50">
//                 <td className="pl-10  py-4  w-[380px]">
//                   <div className="flex space-x-6 items-center">
//                     <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
//                       <img
//                         src={`${produit.image_256
//                           ? "data:image/png;base64," + produit.image_256
//                           : "https://readymadeui.com/images/coffee1.webp"
//                           }`}
//                         alt={`image produit ccbm shop ${produit.name}`}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="font-medium text-[15px] text-qblack">
//                         {produit.name}
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="text-center py-4 px-2">
//                   <div className="flex space-x-1 items-center justify-center">
//                     <span className="text-[15px] font-normal">
//                       {" "}
//                       {formatPrice(produit.en_promo ? produit.promo_price : produit.list_price)}
//                     </span>
//                   </div>
//                 </td>
//                 <td className=" py-4">
//                   <div className="flex justify-center items-center">
//                     <InputQuantityCommande produit={produit} />
//                   </div>
//                 </td>
//                 <td className="text-right py-4">
//                   <div className="flex space-x-1 items-center justify-center">
//                     <span className="text-[15px] font-normal">
//                       {" "}
//                       {formatPrice(
//                         produit.en_promo
//                           ? produit.promo_price * produit.quantity
//                           : produit.list_price * produit.quantity
//                       )}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="text-right py-4">
//                   <div className="flex space-x-1 items-center justify-center">
//                     <button
//                       onClick={(e) => HandleDeleteProduct(e, produit)}
//                       className="duration-200 hover:scale-150"
//                     >
//                       <Trash className="hover:text-red-500" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className=" mt-3 transition-all duration-300 ease-in-out bg-gray-200 text-[15px]  rounded-lg font-medium text-black  text-center py-2">
//         Livraison gratuite sur Dakar
//       </div>

//     </div>
//   );
// }

