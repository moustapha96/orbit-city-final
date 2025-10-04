/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import { ShoppingCart } from "lucide-react"
// import formatPrice from "../../../utils/formatPrice"
// import { Link } from "react-router-dom"

// export default function ProductCardRowStyleOnePack({ className, pack, type = 3 }) {
//   return (

//     <div
//       className={`product-row-card-style-one w-full bg-white group relative overflow-hidden ${className || ""}`}

//     >

//       <div key={pack.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="relative">
//           <img src={pack.image || "/placeholder.svg"} alt={'ccbm shop promotion ' + pack.name} className="w-50 h-50 object-cover" />
//           <div className="absolute top-0 left-0 bg-bleu-logo text-white px-2 py-1 text-sm font-semibold">
//             Promo Pack
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>
//           <p className="text-gray-600 mb-4 hidden sm:block">
//             {pack.start_date && pack.end_date
//               ? `Valable du ${new Date(pack.start_date).toLocaleDateString()} au ${new Date(pack.end_date).toLocaleDateString()}`
//               : "Durée limitée"}
//           </p>
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-2xl font-bold text-bleu-logo">{formatPrice(pack.sommeTotal)}</span>
//           </div>
//           <div className="space-y-2">
//             {pack.produits.map((product) => (
//               <div key={product.id} className="flex items-center space-x-2">
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.name}
//                   className="w-10 h-10 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <Link to={`/single-product/${product.product_id}`} className="text-sm font-medium">{product.name}</Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-between">
//             <button
//               onClick={() => window.location.href = `/pack-promo?code=${pack.code}`}
//               className="bg-bleu-logo text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-bleu-logo transition duration-300">
//               <ShoppingCart size={16} />
//               <span>Commander</span>
//             </button>
//             {/* <div className="flex space-x-2">
//               <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
//                 <Eye size={16} />
//               </button>
//               <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
//                 <Heart size={16} />
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }





// import { useState } from "react";
// import { ShoppingCart, Plus, Minus } from "lucide-react";
// import formatPrice from "../../../utils/formatPrice";
// import { Link } from "react-router-dom";

// export default function ProductCardRowStyleOnePack({ className, pack, type = 3 }) {
//   const [showProducts, setShowProducts] = useState(false);

//   return (
//     <div className={`product-row-card-style-one w-full bg-white group relative overflow-hidden ${className || ""}`}>
//       <div key={pack.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="relative">
//           <img src={pack.image || "/placeholder.svg"} alt={'ccbm shop promotion ' + pack.name} className="w-32 h-32 object-cover" />
//           <div className="absolute top-0 left-0 bg-bleu-logo text-white px-2 py-1 text-sm font-semibold">
//             Promo Pack
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>

//           {/* Texte caché en mobile */}
//           <p className="text-gray-600 mb-4 hidden sm:block">
//             {pack.start_date && pack.end_date
//               ? `Valable du ${new Date(pack.start_date).toLocaleDateString()} au ${new Date(pack.end_date).toLocaleDateString()}`
//               : "Durée limitée"}
//           </p>

//           <div className="flex justify-between items-center mb-4">
//             <span className="text-2xl font-bold text-bleu-logo">{formatPrice(pack.sommeTotal)}</span>
//           </div>

//           {/* Liste des produits : visible sur desktop, masquée en mobile */}
//           <div className={`space-y-2 ${showProducts ? "block" : "hidden"} sm:block`}>
//             {pack.produits.map((product) => (
//               <div key={product.id} className="flex items-center space-x-2">
//                 <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-10 h-10 object-cover rounded" />
//                 <div className="flex-1">
//                   <Link to={`/single-product/${product.product_id}`} className="text-sm font-medium">{product.name}</Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bouton "+" en mobile pour afficher les produits */}
//           <button
//             onClick={() => setShowProducts(!showProducts)}
//             className="block sm:hidden mt-2 text-bleu-logo font-semibold flex items-center space-x-1"
//           >
//             {showProducts ? <Minus size={16} /> : <Plus size={16} />}
//             <span>{showProducts ? "Masquer les produits" : "Voir les produits"}</span>
//           </button>

//           <div className="mt-4 flex justify-between">
//             <button
//               onClick={() => window.location.href = `/pack-promo?code=${pack.code}`}
//               className="bg-bleu-logo text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-bleu-logo transition duration-300">
//               <ShoppingCart size={16} />
//               <span>Commander</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import formatPrice from "../../../utils/formatPrice";
import { Link } from "react-router-dom";

export default function ProductCardRowStyleOnePack({ className, pack, type = 3 }) {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className={`product-row-card-style-one w-full bg-white group relative overflow-hidden ${className || ""}`}>
      <div key={pack.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">


        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={pack.image || "/placeholder.svg"}
            alt={'ccbm shop promotion ' + pack.name}
            className="w-50 h-50 object-cover rounded-lg"
          />
        </div>

        {/* CONTENU À DROITE */}
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>

          {/* Texte caché en mobile */}
          <p className="text-gray-600 mb-4 hidden sm:block">
            {pack.start_date && pack.end_date
              ? `Valable du ${new Date(pack.start_date).toLocaleDateString()} au ${new Date(pack.end_date).toLocaleDateString()}`
              : "Durée limitée"}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-bleu-logo">{formatPrice(pack.sommeTotal)}</span>
          </div>

          {/* Liste des produits */}
          <div className={`space-y-2 ${showProducts ? "block" : "hidden"} sm:block`}>
            {pack.produits.map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <img src={product.image || "/placeholder.svg"} alt={'ccbm shop promo ' + product.name} className="w-8 h-8 object-cover rounded" />
                <div className="flex-1">
                  <Link to={`/produits/${product.product_id}/details`} className="text-sm font-medium">{product.name}</Link>
                </div>
              </div>
            ))}
          </div>

          {/* <button
            onClick={() => setShowProducts(!showProducts)}
            className="block sm:hidden mt-2 text-bleu-logo font-semibold flex items-center space-x-1"
          >
            {showProducts ? <Minus size={16} /> : <Plus size={16} />}
            <span>{showProducts ? "Masquer les produits" : "Voir les produits"}</span>
          </button> */}

          {/* <div className="mt-4 flex justify-between">
            <button
              onClick={() => window.location.href = `/pack-promo?code=${pack.code}`}
              className="bg-bleu-logo text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-bleu-logo transition duration-300">
              <ShoppingCart size={16} />
              <span>Commander</span>
            </button>
          </div> */}

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => window.location.href = `/pack-promo?code=${pack.code}`}
              className="bg-bleu-logo  text-white px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md flex items-center space-x-1 sm:space-x-2 hover:bg-bleu-logo-dark transition-all duration-300 ease-in-out"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Commander</span>
            </button>

            <button
              onClick={() => setShowProducts(!showProducts)}
              className="block sm:hidden text-bleu-logo font-medium text-sm flex items-center space-x-1"
            >
              {showProducts ? <Minus size={16} /> : <Plus size={16} />}
              <span className="hidden sm:inline">{showProducts ? "Masquer les produits" : "Voir les produits"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
