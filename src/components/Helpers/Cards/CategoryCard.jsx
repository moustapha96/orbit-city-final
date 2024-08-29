/* eslint-disable react/prop-types */
import { ArrowBigRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { useContext } from "react";

export default function CategoryCard({ background, title, brands = [] }) {
  const { setSelectedCategory } = useContext(CategoryContext);

  const navigate = useNavigate();
  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    console.log(category);
    setSelectedCategory(category.name);
    const isAllProductPage = window.location.pathname === "/all-products";
    if (!isAllProductPage) {
      navigate("/all-products");
    }
  };
  return (
    <div
      className="category-card-wrappwer w-full h-full p-[30px]"
      style={{
        background: `url(${
          background || `/creation/side_bar_image_ccbm_shop.png`
        }) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-base font-600 tracking-wide mb-2">{title}</h1>
        <div className="brands-list mb-[7px]">
          <ul>
            {brands.map((brand) => (
              <li key={brand + Math.random()}>
                <Link onClick={(e) => handleCategoryChange(e, brand)}>
                  <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                    {brand}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/all-products">
          <div className="flex space-x-2 items-center">
            <span className="text-qblack font-600 text-sm">
              Achetez maintenant
            </span>
            <span>
              <ArrowBigRight></ArrowBigRight>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
