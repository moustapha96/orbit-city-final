/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import { Asterisk, Loader, Loader2, Menu, MoveRight, User } from "lucide-react";

// import { ProductContext } from "../../../../contexts/ProductContext";
import { useAuthContext } from "../../../../contexts/useAuthContext";
import { CategoryContext, useCategory } from "../../../../Provider/CategoryContext";
import { ProductContext } from "../../../../Provider/ProductContext";
import { PromoProductContext } from "../../../../Provider/PromoProductContext";


export default function Navbar({ className, type = 3 }) {
  const navigate = useNavigate();

  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");

  // const { updateFilters, filters, resetFilters } = useContext(ProductContext)
  // const { isLoadingCategorie, categories } = useContext(CategoryContext)
  const location = useLocation()
  const { user, logout } = useAuthContext();
  const [categorieSelected, setCategorieSelected] = useState(null)

  const { updateFilters: updateProductFilters, resetFilters: resetProductFilters } = useContext(ProductContext)
  const { updateFilters: updatePromoFilters, resetFilters: resetPromoFilters, produitHomeTabaski, produitHomeFlash, produitHomePromo } = useContext(PromoProductContext)
  const { categories, isLoadingCategorie, selectedCategory, updateSelectedCategory } = useCategory()



  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);



  useEffect(() => {
    if (location.pathname === "/boutique" || location.pathname === "/en-promo" || location.pathname === "/promo-ramadan" || location.pathname === "/promo-tabaski") {
      const params = new URLSearchParams(location.search)
      const categoryFromURL = params.get("category") || "All"
      const newFilters = {
        page: Number(params.get("page")) || 1,
        category: categoryFromURL,
        search: params.get("search") || "",
        min: Number(params.get("min")) || 4000,
        max: Number(params.get("max")) || 5000000,
        limit: 9,
        productType: "All",
        tag: "All"
      }

      if (location.pathname === "/en-promo" || location.pathname === "/promo-ramadan" || location.pathname === "/promo-tabaski") {
        updatePromoFilters(newFilters)
      } else {
        updateProductFilters(newFilters)
      }
      updateSelectedCategory(categoryFromURL)
    }
  }, [location.search, location.pathname, updateProductFilters, updatePromoFilters, updateSelectedCategory])

  const handleCategoryChange = (e, category) => {
    e.preventDefault()
    setToggle(false)

    const params = new URLSearchParams(location.search)
    params.set("page", "1")

    if (category.name !== "All") {
      params.set("category", category.name)
    } else {
      params.delete("category")
    }

    const newFilters = {
      category: category.name,
      page: 1,
      search: "",
    }

    updateSelectedCategory(category.name)

    console.log(location.pathname)
    if (location.pathname === "/en-promo") {
      updatePromoFilters(newFilters)
      navigate(`/en-promo?${params.toString()}`)
    } else if (location.pathname === "/promo-ramadan") {
      updatePromoFilters(newFilters)
      navigate(`/promo-ramadan?${params.toString()}`)
    } else if (location.pathname === "/promo-tabaski") {
      updatePromoFilters(newFilters)
      navigate(`/promo-tabaski?${params.toString()}`)
    }
    else {
      updateProductFilters(newFilters)
      navigate(`/boutique?${params.toString()}`)
    }
  }


  function HandleLout() {
    logout();
    navigate("/login");
  }


  return (
    <div
      className={`fixed nav-widget-wrapper w-full h-[60px]  z-30 bg-bleu-logo ${className || ""
        }`}
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
                      {selectedCategory === "All" ? "Nos Catégories" : selectedCategory.toUpperCase()}
                      {isLoadingCategorie && <Loader className="animate-spin" />}
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
                  style={{ height: `${elementsSize}` }}
                >
                  {isLoadingCategorie ? (
                    <>
                      {" "}
                      <div className="flex justify-center">
                        <Loader2
                          size={100}
                          className="mr-2 h-4 text-center w-4 animate-spin"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <ul className="categories-list h-[calc(97vh-150px)] overflow-y-auto">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              onClick={(e) => handleCategoryChange(e, category)}
                            >
                              <div
                                className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack ${type === 3
                                  ? "hover:bg-bleu-logo hover:text-white"
                                  : "hover:bg-qyellow"
                                  }`}
                              >
                                <div className="flex items-center space-x-6">
                                  <span>
                                    <Asterisk></Asterisk>
                                  </span>
                                  <span className="text-xs font-400  uppercase ">
                                    {category.name == "All"
                                      ? "Tout"
                                      : category.name}
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
                      </ul>{" "}
                    </>
                  )}
                </div>
              </div>

              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li className="relative">
                    <Link to="/">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Accueil</span>
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/boutique">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Boutique</span>
                      </span>
                    </Link>
                  </li>

                  {produitHomePromo && produitHomePromo.length > 0 && (

                    <li>
                      <Link to="/en-promo">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>En promo</span>
                        </span>
                      </Link>
                    </li>
                  )}

                  {produitHomeTabaski && produitHomeTabaski.length > 0 && (
                    <li>
                      <Link to="/promo-tabaski">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>Promo Tabaski</span>
                        </span>
                      </Link>
                    </li>
                  )}

                  {/* {produitHomeFlash && produitHomeFlash.length > 0 && (
                    <li>
                      <Link to="/promo-ramadan">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>Promo Ramadan</span>
                        </span>
                      </Link>
                    </li>
                  )} */}

                  {/* <li>
                    <Link to="/pre-commandes">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Précommandes</span>
                      </span>
                    </Link>
                  </li> */}

                  {/* {user && user.adhesion == "accepted" && (
                    <li>
                      <Link to="/credit-commandes">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>A Crédit</span>
                        </span>
                      </Link>
                    </li>
                  )} */}
                  <li>
                    <Link to="/credit-commandes">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>A Crédit</span>
                      </span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link to="/credit-commandes">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>À crédit</span>
                      </span>
                    </Link>
                  </li> */}



                  <li>
                    <Link to="/informations">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Informations</span>
                      </span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>A propos</span>
                      </span>
                    </Link>
                  </li> */}
                  {/* 
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li> */}



                  {!user ? <>
                    <li>
                      <Link to="/login">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>Connexion</span>
                        </span>
                      </Link>
                    </li>
                  </> : <>
                    <li>
                      <Link onClick={HandleLout}>
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span>Déconnexion</span>
                        </span>
                      </Link>
                    </li>
                  </>}

                  {user && <>
                    <li className="flex items-center">
                      <Link to="/profile">
                        <span
                          className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                            }`}
                        >
                          <span className="mr-2">
                            <User />
                          </span>
                          <span>Profil</span>
                        </span>
                      </Link>
                    </li>
                  </>}


                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
