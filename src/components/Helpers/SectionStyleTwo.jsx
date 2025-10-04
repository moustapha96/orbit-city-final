/* eslint-disable react/prop-types */

import ProductCardRowStyleOne from "./Cards/ProductCardRowStyleOne";
import DataIteration from "./DataIteration";

export default function SectionStyleTwo({ className, products, type = 3 }) {
  return (
    <div
      className={`section-content w-full grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 ${className || ""}`}
    >
      <DataIteration datas={products} startLength={0} endLength={products.length > 6 ? 6 : products.length}>
        {({ datas }) => <>
          {datas.image_256 && (
            <div key={datas.id} className="item w-full">
              <ProductCardRowStyleOne type={type} datas={datas} />
            </div>
          )}
        </>}
      </DataIteration>
    </div>
  );
}
