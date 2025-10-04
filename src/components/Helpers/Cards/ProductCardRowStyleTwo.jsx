/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../../../utils/formatPrice";

export default function ProductCardRowStyleTwo({ className, datas }) {
  const navigate = useNavigate();
  const handleDetails = (e, produit) => {
    e.preventDefault();
    navigate("/single-product/" + produit.id, {
      state: { produit },
    });
  };
  return (
    <div
      data-aos="fade-up"
      className={`product-card-row-two w-full  ${className || ""}`}
    >
      <div className="w-full h-[105px] bg-white border border-primarygray px-5 ">
        <div className="w-full h-full flex space-x-5 justify-center items-center">
          <div className="w-[75px] h-[75px]">
            <img
              src={`data:image/png;base64,${datas.image_256}`}
              alt={`${datas.name} CCBM Shop`}
              className="w-full h-full object-contain"
            />

          </div>
          <div className="flex-1 h-full flex flex-col justify-center ">
            <Link onClick={(e) => handleDetails(e, datas)}>
              <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600">
                {datas.name}
              </p>
            </Link>

            <p className="price mb-2">
              <span className="offer-price line-through text-qred font-600 text-xs md:text-sm">
                {datas.creditorder_price > 0 && <>{formatPrice(datas.creditorder_price)}</>}
              </span>
              <br />
              {datas.en_promo ? (
                <span className="main-price text-bleu-logo font-600 text-xs md:text-sm">
                  {formatPrice(datas.promo_price)}
                </span>
              ) : (
                <span className="offer-price text-bleu-logo font-600 text-xs md:text-sm">
                  {formatPrice(datas.list_price)}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
