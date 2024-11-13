/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ViewMoreTitle({
  categoryTitle = "",
  className,
  children,
  seeMoreUrl = "",
}) {
  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none">
              {categoryTitle}
            </h1>
          </div>
          <div>
            <Link to={seeMoreUrl}>
              <div className="flex space-x-2 items-center">
                <p className="text-base font-600 text-qblack">Voir plus</p>
                <span className="animate-right-dir">
                  <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="section-content">{children && children}</div>
      </div>
    </div>
  );
}
