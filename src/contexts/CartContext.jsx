/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// CartContext.js
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [preorder, setPreorder] = useState([]);
  const [preorderState, setPreorderState] = useState(null);
  const [orderState, setOrderState] = useState(null);

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  useEffect(() => {
    saveDataToLocalStorage();
  }, [cart, wishlist, preorder]);

  const addToCart = (product, quantity) => {
    const index = cart.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      const updatedCart = cart.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const updateCart = (product, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    // setOrderState(null);
  };

  const addAllWhislistToCart = () => {
    wishlist.map((item) => {
      addToCart(item, item.quantity);
    });
  };
  const addToWishlist = (product, quantity) => {
    console.log(product);
    if (!isProductInWishlist(product)) {
      setWishlist([...wishlist, { ...product, quantity }]);
    }
  };

  const removeFromWishlist = (product) => {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
  };

  const updateWishlist = (product, quantity) => {
    setWishlist(
      wishlist.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const isProductInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.list_price * item.quantity,
      0
    );
  };

  const getWishlistTotal = () => {
    return wishlist.reduce(
      (total, item) => total + item.list_price * item.quantity,
      0
    );
  };

  const addToPreorder = (product, quantity) => {
    const index = preorder.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      preorder[index].quantity += quantity;
    } else {
      setPreorder([...preorder, { ...product, quantity }]);
    }
  };

  const removeFromPreorder = (product) => {
    setPreorder(preorder.filter((item) => item.id !== product.id));
  };

  const updatePreorder = (product, quantity) => {
    setPreorder(
      preorder.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const clearPreorder = () => {
    setPreorder([]);
  };

  const isProductInPreorder = (product) => {
    return preorder.some((item) => item.id === product.id);
  };

  const getPreorderTotal = () => {
    const preorderTotal = preorder.reduce(
      (total, item) => total + item.preorder_price * item.quantity,
      0
    );

    return preorderTotal;
  };
  const getPremierTranche = () => {
    const preorderTotal = preorder.reduce(
      (total, item) => total + item.preorder_price * item.quantity,
      0
    );
    const premierTranche = preorderTotal * 0.3;

    return premierTranche;
  };

  const getDeuxiemeTranche = () => {
    const preorderTotal = preorder.reduce(
      (total, item) => total + item.preorder_price * item.quantity,
      0
    );
    const deuxiemeTranche = preorderTotal * 0.3;

    return deuxiemeTranche;
  };
  const getTroisiemeTranche = () => {
    const preorderTotal = preorder.reduce(
      (total, item) => total + item.preorder_price * item.quantity,
      0
    );
    const troisiemeTranche = preorderTotal * 0.4;

    return troisiemeTranche;
  };
  const saveDataToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("preorder", JSON.stringify(preorder));
  };

  const loadDataFromLocalStorage = () => {
    const cartData = localStorage.getItem("cart");
    const wishlistData = localStorage.getItem("wishlist");
    const preorderData = localStorage.getItem("preorder");

    if (cartData) {
      setCart(JSON.parse(cartData));
    }
    if (wishlistData) {
      setWishlist(JSON.parse(wishlistData));
    }
    if (preorderData) {
      setPreorder(JSON.parse(preorderData));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        setWishlist,
        wishlist,
        preorder,
        setPreorderState,
        setOrderState,
        orderState,
        preorderState,
        setPreorder,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        addToWishlist,
        addAllWhislistToCart,
        removeFromWishlist,
        updateWishlist,
        clearWishlist,
        isProductInCart,
        isProductInWishlist,
        addToPreorder,
        removeFromPreorder,
        updatePreorder,
        clearPreorder,
        isProductInPreorder,
        getCartTotal,
        getWishlistTotal,
        getPreorderTotal,
        getPremierTranche,
        getDeuxiemeTranche,
        getTroisiemeTranche,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
