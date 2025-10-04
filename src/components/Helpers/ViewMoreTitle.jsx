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
          <div className="relative">
            <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
              {categoryTitle}
            </h1>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
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
