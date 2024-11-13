/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";

import ThinLove from "../../Helpers/icons/ThinLove";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { ChevronRight, CircleX, Dot, Search, ShoppingCart } from "lucide-react";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { UserContext } from "../../../contexts/UserContext";

export default function Drawer({ className, open, action }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("menu");
  const { cart, wishlist } = useContext(CartContext);

  const { user, logout } = useContext(UserContext);
  const { searchContext, setSearchContext, setSelectedCategory, categories, selectedCategory } =
    useContext(ProductContext);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    console.log(category.name);
    setSelectedCategory(category.name);
    const isAllProductPage = window.location.pathname === "/all-products";
    const isPrecommandePage = window.location.pathname === "/pre-commandes";
    if (isPrecommandePage) {
      navigate("/pre-commandes");
    } else {
      navigate("/all-products");
    }
  };

  function HandleLogout() {
    // localStorage.removeItem("authToken");
    logout();
    navigate("/login");
  }

  return (
    <>
      <div
        className={`drawer-wrapper w-full  h-full relative block lg:hidden  ${className || ""
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
              <div className="flex space-x-5 items-center">
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
              </div>
              <button onClick={action} type="button">
                <CircleX className="text-red-500"></CircleX>
              </button>
            </div>
          </div>
          <div className="w-full mt-5 px-5">
            <div className="search-bar w-full h-[34px] flex">
              <div className="w-full bg-white h-full border border-[#E9E9E9]">
                <input
                  type="search"
                  className="w-full md:w-auto px-2 py-2 border  rounded-md  focus:ring-2 focus:ring-blue-500 focus:border-transparent   focus:outline-none foucus:ring-0 placeholder:text-qgraytwo pl-2.5"
                  placeholder="Recherche de produit..."
                  value={searchContext}
                  onChange={(e) => {
                    setSearchContext(e.target.value);
                  }}
                />
              </div>
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

              {!selectedCategory ? <> Catégories </> : <> {selectedCategory == "All" ? "Tous les produits" : selectedCategory.toUpperCase()} </>}

            </span>
          </div>
          {tab === "category" ? (
            <div className="category-item mt-5 w-full">
              <ul className="categories-list">
                {categories.map((categori) => (
                  <li key={categori.id} className="category-item">
                    <Link onClick={(e) => handleCategoryChange(e, categori)}>
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
                          <Dot></Dot>
                          <span className="text-sm font-400">
                            {categori.name == "All" ? "Tout" : categori.name.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <ChevronRight></ChevronRight>
                        </div>
                      </div>
                    </Link>
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
                  <Link to="/all-products">
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

                <li className="category-item">
                  <Link to="/pre-commandes">
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
                        <span className="text-sm font-400">Précommande</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li>

                <li className="category-item">
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
                </li>

                <li className="category-item">
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
                </li>

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
