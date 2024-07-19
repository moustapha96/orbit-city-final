/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";

import ThinLove from "../../Helpers/icons/ThinLove";
import { Link } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext ";
import Categorieservice from "../../../services/CategorieService";
import { ChevronRight, Dot, Search, ShoppingCart } from "lucide-react";

export default function Drawer({ className, open, action }) {
  const backgroundColor = "var(--bleu-logo)";
  const hoverBackgroundColor = "var(--bleu-claire)";
  const [tab, setTab] = useState("category");
  const { cart, wishlist } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);
  return (
    <>
      <div
        className={`drawer-wrapper w-full  h-full relative block lg:hidden  ${
          className || ""
        }`}
      >
        {open && (
          <div
            onClick={action}
            className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
          ></div>
        )}
        <div
          className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 ${
            open ? "left-0" : "-left-[280px]"
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
                  <span
                    className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]"
                    style={{ backgroundColor }}
                  >
                    {cart ? cart.length : 0}
                  </span>
                </div>
                <div className="favorite relative">
                  <Link to="/wishlist">
                    <span>
                      <ThinLove />
                    </span>
                  </Link>
                  <span
                    className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]"
                    style={{ backgroundColor }}
                  >
                    {wishlist.length > 0 ? wishlist.length : 0}
                  </span>
                </div>
              </div>
              <button onClick={action} type="button">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0363 33.9994C7.66923 34.031 0.0436412 26.4423 0.000545718 17.0452C-0.0425497 7.68436 7.54917 0.0479251 16.9447 0.00021656C26.3072 -0.0467224 33.9505 7.54277 33.9998 16.9352C34.0483 26.3153 26.4411 33.9679 17.0363 33.9994Z"
                    fill="black"
                  />
                  <path
                    d="M17.0363 33.9994C26.4411 33.9679 34.0483 26.3153 33.9998 16.9352C33.9505 7.54277 26.3072 -0.0467224 16.9447 0.00021656C7.54917 0.0479251 -0.0425497 7.68436 0.000545718 17.0452C0.0436412 26.4423 7.66846 34.031 17.0363 33.9994ZM23.4629 21.5945C23.4514 21.8445 23.3321 22.0908 23.1305 22.3039C22.7865 22.6671 22.4479 23.0342 22.1039 23.3966C21.5236 24.0084 21.1458 24.0068 20.5648 23.3889C19.4581 22.2124 18.3492 21.0389 17.2533 19.8523C17.0633 19.6461 16.9686 19.6169 16.7608 19.8431C15.6511 21.0512 14.5222 22.2424 13.3978 23.4366C12.8753 23.9914 12.4697 23.9891 11.9388 23.4312C11.6032 23.0788 11.2715 22.7218 10.9399 22.3647C10.4089 21.7938 10.4081 21.3575 10.9376 20.7927C12.0503 19.6046 13.1593 18.4126 14.2836 17.2361C14.4822 17.0283 14.5037 16.9152 14.2921 16.6943C13.1654 15.5193 12.058 14.3266 10.9452 13.1385C10.4004 12.556 10.4042 12.1259 10.9545 11.5387C11.2785 11.1925 11.6009 10.8447 11.9272 10.5007C12.4821 9.91666 12.8822 9.92358 13.4417 10.5192C14.5468 11.6965 15.6588 12.8677 16.7516 14.0573C16.9671 14.2912 17.071 14.2651 17.271 14.0473C18.3831 12.8415 19.5082 11.6472 20.6363 10.4561C21.1273 9.93743 21.5521 9.94359 22.0469 10.4576C22.3848 10.8085 22.7157 11.1655 23.0474 11.5226C23.6115 12.1289 23.6122 12.5552 23.052 13.1539C21.9477 14.3328 20.8503 15.517 19.7321 16.6828C19.5058 16.9183 19.5382 17.0391 19.7475 17.2584C20.8641 18.4249 21.9623 19.6092 23.0681 20.7865C23.2721 21.002 23.456 21.229 23.4629 21.5945Z"
                    fill="#FE4949"
                  />
                  <path
                    d="M23.4614 21.5947C23.4545 21.2292 23.2706 21.0022 23.0659 20.7844C21.9608 19.6071 20.8619 18.4228 19.7452 17.2563C19.5359 17.0377 19.5036 16.9169 19.7298 16.6807C20.848 15.5157 21.9454 14.3307 23.0497 13.1518C23.61 12.5539 23.6084 12.1276 23.0451 11.5205C22.7134 11.1635 22.3825 10.8064 22.0447 10.4555C21.5498 9.9415 21.125 9.93611 20.6341 10.454C19.5059 11.6452 18.3808 12.8394 17.2688 14.0452C17.0679 14.263 16.964 14.2891 16.7493 14.0552C15.6565 12.8663 14.5445 11.6952 13.4394 10.5171C12.88 9.92149 12.4798 9.91456 11.9249 10.4986C11.5979 10.8426 11.2762 11.1904 10.9522 11.5367C10.402 12.1238 10.3981 12.5547 10.943 13.1364C12.0558 14.3245 13.1632 15.5172 14.2898 16.6922C14.5014 16.9131 14.4799 17.0254 14.2813 17.234C13.157 18.4113 12.0481 19.6025 10.9353 20.7906C10.4058 21.3561 10.4074 21.7917 10.9376 22.3626C11.2693 22.7197 11.601 23.076 11.9365 23.4291C12.4675 23.987 12.873 23.9893 13.3956 23.4345C14.5207 22.2403 15.6488 21.0491 16.7586 19.841C16.9671 19.614 17.061 19.644 17.2511 19.8502C18.3469 21.0368 19.4559 22.2103 20.5625 23.3868C21.1435 24.0047 21.5214 24.0063 22.1016 23.3945C22.4456 23.0321 22.7842 22.6643 23.1282 22.3018C23.3306 22.091 23.4507 21.8448 23.4614 21.5947Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mt-5 px-5">
            <div className="search-bar w-full h-[34px]  flex ">
              <div className="flex-1 bg-white h-full border border-r-0 border-[#E9E9E9]">
                <input
                  type="text"
                  className="w-full text-xs h-full focus:outline-none foucus:ring-0 placeholder:text-qgraytwo pl-2.5 "
                  placeholder="Search Product..."
                />
              </div>
              <div
                className="w-[40px] h-full  flex justify-center items-center"
                style={{ backgroundColor }}
              >
                <Search />
              </div>
            </div>
          </div>
          <div className="w-full mt-5 px-5 flex items-center space-x-3">
            <span
              onClick={() => setTab("category")}
              className={`text-base font-semibold  ${
                tab === "category" ? "text-qblack" : "text-qgray"
              }`}
            >
              Categories
            </span>
            <span className="w-[1px] h-[14px] bg-qgray"></span>
            <span
              onClick={() => setTab("menu")}
              className={`text-base font-semibold ${
                tab === "menu" ? "text-qblack" : "text-qgray "
              }`}
            >
              Menu
            </span>
          </div>
          {tab === "category" ? (
            <div className="category-item mt-5 w-full">
              <ul className="categories-list">
                {categories.map((categori) => (
                  <li key={categori.id} className="category-item">
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
                          <Dot></Dot>
                          <span className="text-sm font-400">
                            {categori.name}
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
                {/* <li className="category-item">
                  <Link to="/Blogs">
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
                        <span className="text-sm font-400">Blogs</span>
                      </div>
                      <div>
                        <ChevronRight></ChevronRight>
                      </div>
                    </div>
                  </Link>
                </li> */}
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
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
