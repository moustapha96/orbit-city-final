
"use client"

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import Cart from "../../../Cart"

import { Link, useNavigate } from "react-router-dom"
import { Heart, HeartHandshake, ShoppingBag, ShoppingCart } from "lucide-react"
import PreCart from "../../../PreCart"

import ThinPeople from "../../../Helpers/icons/ThinPeople"
import { useAuthContext } from "../../../../contexts/useAuthContext"
import CreditCart from "../../../CreditCart"
import { CartContext } from "../../../../contexts/CartContext"
import SearchBox from "../../../Helpers/SearchBox"
import { useCategory } from "../../../../Provider/CategoryContext"
import { ProductContext } from "../../../../Provider/ProductContext"
import { PromoProductContext } from "../../../../Provider/PromoProductContext"

export default function Middlebar({ className, type = 3 }) {
  // const user = JSON.parse(localStorage.getItem("user"));

  const { user } = useAuthContext()
  const { updateFilters: updateProductFilters, resetFilters: resetProductFilters } = useContext(ProductContext)
  const { updateFilters: updatePromoFilters, resetFilters: resetPromoFilters } = useContext(PromoProductContext)
  const { updateSelectedCategory } = useCategory()

  const backgroundColor = type === 3 ? "var(--bleu-logo)" : "var(--qyellow)"
  const textColor = type === 3 ? "white" : "var(--qblack)"
  const { cart, wishlist, preorder, creditOrder } = useContext(CartContext)

  const navigate = useNavigate()
  const handleCart = (e) => {
    e.preventDefault()
    navigate("/cart")
    console.log(cart)
  }
  const handlePreCart = (e) => {
    e.preventDefault()
    navigate("/pre-cart")
    console.log(cart)
  }
  const handleCreditCart = (e) => {
    e.preventDefault()
    navigate("/credit-cart")
  }

  useEffect(() => {
    if (
      location.pathname === "/boutique" ||
      location.pathname === "/en-promo" ||
      location.pathname == "/promo-ramadan" ||
      location.pathname == "/promo-tabaski"
    ) {
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
        tag: params.get("tag") || "All",
      }

      if (location.pathname === "/en-promo" || location.pathname == "/promo-tabaski") {
        updatePromoFilters(newFilters)
      } else {
        updateProductFilters(newFilters)
      }
      updateSelectedCategory(categoryFromURL)
    }
  }, [location.search, location.pathname, updateProductFilters, updatePromoFilters, updateSelectedCategory])

  const onSearch = (query, category) => {
    console.log(query, category)

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
      search: query,
    }

    console.log(newFilters)
    console.log(location.pathname)
    console.log(params.toString())
    // if (location.pathname === "/en-promo") {
    //   updatePromoFilters(newFilters)
    //   navigate(`/en-promo?${params.toString()}`)
    // } else if (location.pathname == "/promo-ramadan") {
    //   updatePromoFilters(newFilters)
    //   navigate(`/promo-ramadan?${params.toString()}`)
    // }
    // else if (location.pathname == "/promo-korite") {
    //   updatePromoFilters(newFilters)
    //   navigate(`/promo-korite?${params.toString()}`)
    // }
    // else {
    //   updateProductFilters(newFilters)
    //   navigate(`/boutique?${params.toString()}`)
    // }
  }
  return (
    <div className={`w-full h-[86px] bg-white  ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              {type === 3 ? (
                <Link to="/">
                  <img width="120" height="36" src="/logo.png" alt="logo" />
                </Link>
              ) : type === 4 ? (
                <Link to="/">
                  <img width="80" height="36" src="/logo.png" alt="logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img width="80" height="36" src="/logo.png" alt="logo" />
                </Link>
              )}
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" onSearch={onSearch} searchOnInput={true} />
            </div>
            <div className="flex space-x-6 items-center">
              {wishlist.length > 0 && (
                <>
                  <div className="favorite relative">
                    <Link to="/wishlist">
                      <span>
                        <Heart />
                      </span>
                    </Link>
                    <span
                      className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]`}
                      style={{ backgroundColor, color: textColor }}
                    >
                      {wishlist.length > 0 ? wishlist.length : 0}
                    </span>
                  </div>
                </>
              )}

              {cart.length > 0 && (
                <>
                  <div className="cart-wrapper group relative py-4">
                    <div className="cart relative cursor-pointer">
                      <button onClick={handleCart}>
                        <ShoppingCart />
                        <span
                          className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] `}
                          style={{ backgroundColor, color: textColor }}
                        >
                          {cart && cart.length > 0 ? cart.length : 0}
                        </span>
                        <Cart type={type} className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {preorder.length > 0 && (
                <>
                  <div className="cart-wrapper group relative py-4">
                    <div className="cart relative cursor-pointer">
                      <button onClick={handlePreCart}>
                        <span>
                          <ShoppingBag />
                        </span>
                        <span
                          className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] `}
                          style={{ backgroundColor, color: textColor }}
                        >
                          {preorder.length > 0 ? preorder.length : 0}
                        </span>
                        <PreCart type={type} className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
                      </button>
                    </div>
                  </div>
                </>
              )}
              {user && user.adhesion == "accepted" && (
                <>
                  {creditOrder.length > 0 && (
                    <>
                      <div className="cart-wrapper group relative py-4">
                        <div className="cart relative cursor-pointer">
                          <button onClick={handleCreditCart}>
                            <span>
                              <HeartHandshake />
                            </span>
                            <span
                              className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] `}
                              style={{ backgroundColor, color: textColor }}
                            >
                              {creditOrder && creditOrder.length > 0 ? creditOrder.length : 0}
                            </span>
                            <CreditCart
                              type={type}
                              className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                            />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                {!user ? (
                  <>
                    {" "}
                    <Link to="/login">
                      <span>
                        <ThinPeople />
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <span>
                        <ThinPeople />
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

