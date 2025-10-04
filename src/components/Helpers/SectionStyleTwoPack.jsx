/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// import ProductCardRowStyleOnePack from "./Cards/ProductCardRowStyleOnePack";
// import DataIteration from "./DataIteration";

// export default function SectionStyleTwoPack({ className, products, type = 3 }) {
//   return (
//     <div
//       // className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${className || "" }`}
//       className={`section-content w-full grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ${className || ""}`}
//     >
//       <DataIteration datas={products} startLength={0} endLength={products.length > 6 ? 6 : products.length}>
//         {({ datas }) => (
//           <div key={datas.id} className="item w-full">
//             <ProductCardRowStyleOnePack type={type} pack={datas} />
//           </div>
//         )}
//       </DataIteration>
//     </div>
//   );
// }

import ProductCardRowStyleOnePack from "./Cards/ProductCardRowStyleOnePack"
import DataIteration from "./DataIteration";
export default function SectionStyleTwoPack({ className, products, type = 3 }) {
  return (
    <div className={`section-content flex space-x-4 w-full ${className || ""}`}>
      <DataIteration datas={products} startLength={0} endLength={products.length}>
        {({ datas }) => (
          <div key={datas.id} className="item flex-grow w-1/2 min-w-[50%]">
            <ProductCardRowStyleOnePack type={type} pack={datas} />
          </div>
        )}
      </DataIteration>
    </div>
  )
}

