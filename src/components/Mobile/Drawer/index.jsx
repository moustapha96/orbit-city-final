/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";

import ThinLove from "../../Helpers/icons/ThinLove";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CircleX, Dot, HeartHandshake, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { ProductContext } from "../../../Provider/ProductContext";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { CartContext } from "../../../contexts/CartContext";
import { CategoryContext, useCategory } from "../../../Provider/CategoryContext";
import { PromoProductContext } from "../../../Provider/PromoProductContext";

export default function Drawer({ className, open, action }) {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext()
  const [tab, setTab] = useState("menu");
  const { cart, wishlist, creditOrder, preorder } = useContext(CartContext);


  const { updateFilters: updateProductFilters, resetFilters: resetProductFilters, filters: productFilters } = useContext(ProductContext)

  const { updateFilters: updatePromoFilters, resetFilters: resetPromoFilters, filters: promoFilters, produitHomeTabaski, produitHomeFlash, produitHomePromo } = useContext(PromoProductContext)
  const { categories, selectedCategory, updateSelectedCategory } = useCategory()


  const handleCategoryChange = (e, category) => {
    e.preventDefault()
    const params = new URLSearchParams(location.search)

    if (category.name !== "All") {
      params.set("category", category.name)
    } else {
      params.delete("category")
    }
    params.set("page", "1")

    action()
    updateSelectedCategory(category.name)

    const newFilters = {
      category: category.name,
      page: 1,
      search: "",
      min: 4000,
      max: 5000000,
      limit: 9,
      productType: "All",
      tag: "All"
    }

    if (location.pathname === "/en-promo") {
      updatePromoFilters(newFilters)
      navigate(`/en-promo?${params.toString()}`)
    } else if (location.pathname === "/promo-ramadan") {
      updatePromoFilters(newFilters)
      navigate(`/promo-ramadan?${params.toString()}`)
    }
    else if (location.pathname === "/promo-tabaski") {
      updatePromoFilters(newFilters)
      navigate(`/promo-tabaski?${params.toString()}`)
    }
    else {
      updateProductFilters(newFilters)
      navigate(`/boutique?${params.toString()}`)
    }
  }

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
        productType: params.get("productType") || "All",
        tag: params.get("tag") || "All"
      }

      if (location.pathname === "/en-promo" || location.pathname === "/promo-ramadan" || location.pathname === "/promo-tabaski") {
        updatePromoFilters(newFilters)
      } else {
        updateProductFilters(newFilters)
      }
      updateSelectedCategory(categoryFromURL)
    }
  }, [location.search, location.pathname, updateProductFilters, updatePromoFilters, updateSelectedCategory])



  function HandleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <div
        className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden bg-white fixed top-0 z-[100] ${open ? "left-0" : "-left-[280px]"
          }`}
      >
        {open && (
          <div
            onClick={action}
            className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
          ></div>
        )}
        <div
          className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 ${open ? "left-0" : "-left-[280px]"
            }`}
        >
          <div className="w-full px-5 mt-5 mb-4">
            <div className="flex justify-between items-center">

              <div className="text-center h-auto rounded overflow-hidden my-5 lg:my-0">
                <Link to="/" >
                  <img src={`logo.png`} alt="about" className="w-10 " />
                </Link>
              </div>

              <div className="flex space-x-5 items-center">

                {cart && cart.length > 0 && <>

                  <div className="compaire relative">
                    <Link to="/cart">
                      <span>
                        <ShoppingCart />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] bg-bleu-logo rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                      {cart ? cart.length : 0}
                    </span>
                  </div>
                </>}

                {preorder && preorder.length > 0 && <>

                  <div className="compaire relative">
                    <Link to="/pre-cart">
                      <span>
                        <ShoppingBag />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] bg-bleu-logo rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                      {preorder ? preorder.length : 0}
                    </span>
                  </div>
                </>}


                {creditOrder && creditOrder.length > 0 && <>

                  <div className="compaire relative">
                    <Link to="/credit-cart">
                      <span>
                        <HeartHandshake />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] bg-bleu-logo rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                      {creditOrder ? creditOrder.length : 0}
                    </span>
                  </div>
                </>}
                {wishlist && wishlist.length > 0 && <>
                  <div className="favorite relative">
                    <Link to="/wishlist">
                      <span>
                        <ThinLove />
                      </span>
                    </Link>
                    <span className="  bg-bleu-logo  w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                      {wishlist.length > 0 ? wishlist.length : 0}
                    </span>
                  </div>
                </>}

              </div>
              <button onClick={action} type="button">
                <CircleX className="text-red-500"></CircleX>
              </button>
            </div>

          </div>


          <div className="w-full mt-5 px-5 flex items-center space-x-3">


            <span
              onClick={() => setTab("menu")}
              className={`text-base font-semibold ${tab === "menu" ? "text-qblack" : "text-qgray "
                }`}
            >
              Menu
            </span>
            <span className="w-[1px] h-[14px] bg-qgray"></span>
            <span
              onClick={() => setTab("category")}
              className={`text-base font-semibold  ${tab === "category" ? "text-qblack" : "text-qgray"
                }`}
            >

              {!selectedCategory ? <> Catégories </> : <> {selectedCategory == "All" ? "Catégories" : selectedCategory.toUpperCase()} </>}

            </span>


          </div>

          {tab === "category" ? (
            <div className="category-item mt-5 w-full h-[calc(97vh-150px)] overflow-y-auto">
              <ul className="categories-list">
                {categories.map((category) => (
                  <li key={category.id} className="category-item">
                    <a href="#" onClick={(e) => handleCategoryChange(e, category)}>
                      <div
                        className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                        style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--hover-bg-color)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                      >
                        <div className="flex items-center space-x-6">
                          <Dot />
                          <span className="text-sm font-400">
                            {category.name === "All" ? "Tout" : category.name.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <ChevronRight />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="menu-item mt-5 w-full">
              <ul className="categories-list">


                <li className="category-item">
                  <Link to="/">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Accueil</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li>


                <li className="category-item">
                  <Link to="/boutique">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Boutique</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li>

                {produitHomePromo && produitHomePromo.length > 0 && (
                  <li className="category-item">
                    <Link to="/en-promo">
                      <div
                        className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                        style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hover-bg-color)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <div className="flex items-center space-x-6">
                          <span className="text-sm font-400">En promo</span>
                        </div>
                        <div>
                          <ChevronRight></ChevronRight>
                        </div>
                      </div>
                    </Link>
                  </li>
                )}



                {produitHomeTabaski && produitHomeTabaski.length > 0 && (
                  <li className="category-item">
                    <Link to="/promo-tabaski">
                      <div
                        className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                        style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hover-bg-color)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <div className="flex items-center space-x-6">
                          <span className="text-sm font-400">Promo Tabaski</span>
                        </div>
                        <div>
                          <ChevronRight></ChevronRight>
                        </div>
                      </div>
                    </Link>
                  </li>
                )}

                {/* {produitHomeFlash && produitHomeFlash.length > 0 && (
                  <li className="category-item">
                    <Link to="/promo-ramadan">
                      <div
                        className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                        style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hover-bg-color)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <div className="flex items-center space-x-6">
                          <span className="text-sm font-400">Promo Ramadan</span>
                        </div>
                        <div>
                          <ChevronRight></ChevronRight>
                        </div>
                      </div>
                    </Link>
                  </li>
                )} */}

                <li className="category-item">
                  <Link to="/credit-commandes">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">À crédit</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li>


                <li className="category-item">
                  <Link to="/informations">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Informations</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li>

                {/* <li className="category-item">
                  <Link to="/about">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">A propos</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li> */}


                {/* <li className="category-item">
                  <Link to="/contact">
                    <div
                      className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                      style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                      onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--hover-bg-color)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-400">Contact</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li> */}


                {user && (

                  <li className="category-item">
                    <Link onClick={HandleLogout} >
                      <div
                        className="flex justify-between items-center px-5 h-12 bg-white transition-all duration-300 ease-in-out cursor-pointer"
                        style={{ "--hover-bg-color": "var(--bleu-logo)" }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hover-bg-color)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        <div className="flex items-center space-x-6">
                          <span className="text-sm font-400">Deconnexion</span>
                        </div>
                        <div>
                          <ChevronRight></ChevronRight>
                        </div>
                      </div>
                    </Link>
                  </li>

                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
