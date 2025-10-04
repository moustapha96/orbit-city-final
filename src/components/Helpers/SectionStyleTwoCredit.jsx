/* eslint-disable react/prop-types */

import ProductCardRowStyleOneCredit from "./Cards/ProductCardRowStyleOneCredit";
import DataIteration from "./DataIteration";

export default function SectionStyleTwoCredit({ className, products, type = 3 }) {
  return (
    <div
      className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${className || ""
        }`}
    >
      <DataIteration datas={products} startLength={0} endLength={products.length > 6 ? 6 : products.length}>
        {({ datas }) => (
          <div key={datas.id} className="item w-full">
            <ProductCardRowStyleOneCredit type={type} datas={datas} />
          </div>
        )}
      </DataIteration>
    </div>
  );
}
