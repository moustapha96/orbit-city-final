/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import Categorieservice from "../../../../services/CategorieService";
import { Asterisk, Menu, MoveRight } from "lucide-react";

export default function Navbar({ className, type = 3 }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [categories, setCategories] = useState([]);

  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);
  const backgroundColor = type === 3 ? "var(--bleu-logo)" : "bg-qyellow";
  return (
    <div
      className={`nav-widget-wrapper w-full h-[60px] relative z-30 ${
        className || ""
      }`}
      style={{ backgroundColor }}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <Menu></Menu>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      Nos Catégories
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link to={`/all-products/${category.name}`}>
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack ${
                              type === 3
                                ? "hover:bg-qh3-blue hover:text-white"
                                : "hover:bg-qyellow"
                            }`}
                          >
                            <div className="flex items-center space-x-6">
                              <span>
                                <Asterisk></Asterisk>
                              </span>
                              <span className="text-xs font-400">
                                {category.name}
                              </span>
                            </div>
                            <div>
                              <span>
                                <MoveRight></MoveRight>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li className="relative">
                    <Link to="/">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Accueil</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-products">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Boutique</span>
                      </span>
                    </Link>
                  </li>
                  {/* <li className="relative">
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer ${
                        type === 3 ? "text-white" : "text-qblacktext"
                      }`}
                    >
                      <span>Pages</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/privacy-policy">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${
                                        type === 3
                                          ? "hover:text-qh3-blue hover:border-qh3-blue"
                                          : "hover:text-qyellow hover:border-qyellow"
                                      }`}
                                    >
                                      Privacy Policy
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/terms-condition">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${
                                        type === 3
                                          ? "hover:text-qh3-blue hover:border-qh3-blue"
                                          : "hover:text-qyellow hover:border-qyellow"
                                      }`}
                                    >
                                      Terms and Conditions
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/faq">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${
                                        type === 3
                                          ? "hover:text-qh3-blue hover:border-qh3-blue"
                                          : "hover:text-qyellow hover:border-qyellow"
                                      }`}
                                    >
                                      FAQ
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${
                                        type === 3
                                          ? "hover:text-qh3-blue hover:border-qh3-blue"
                                          : "hover:text-qyellow hover:border-qyellow"
                                      }`}
                                    >
                                      Shop Category Icon
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${
                                        type === 3
                                          ? "hover:text-qh3-blue hover:border-qh3-blue"
                                          : "hover:text-qyellow hover:border-qyellow"
                                      }`}
                                    >
                                      Shop List View
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>A propos</span>
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${
                          type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                      >
                        <span>Connexion</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
