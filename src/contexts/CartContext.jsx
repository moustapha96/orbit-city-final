/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// CartContext.js
import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";
import ExcelService from "../services/excelService";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const { user } = useContext(UserContext);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [preorder, setPreorder] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchLocation();
    loadDataFromLocalStorage();
  }, []); // Charge les données une seule fois au démarrage

  useEffect(() => {
    saveDataToLocalStorage();
  }, [cart, wishlist, preorder]); // Sauvegarde uniquement lorsque ces états changent




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

      // const cartItem = {
      //   productName: product.name,
      //   date: new Date().toLocaleString(),
      //   user: user ? user.name : 'Guest',
      //   phone: user ? user.partner_phone : 'Guest',
      //   email: user ? user.email : 'Guest',
      //   type: 'order',
      //   price: product.list_price,
      //   location: location ? location.city + '/' + location.region + '/' + location.country + ' Ip : ' + location.ip : ""
      // };
      // try {
      //   const response = ExcelService.createCrm([...cart, cartItem]);
      //   console.log(response);
      // } catch (error) {
      //   console.error("Erreur creation crm preorder :", error);
      // }
    }



  };


  const fetchLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json?token=a7bca817c4bc37');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données de localisation');
      }
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  const addToPreorder = (product, quantity) => {
    const index = preorder.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      preorder[index].quantity += quantity;
    } else {
      setPreorder([...preorder, { ...product, quantity }]);




      // const preorderItem = {
      //   productName: product.name,
      //   date: new Date().toLocaleString(),
      //   user: user ? user.name : 'Guest',
      //   phone: user ? user.partner_phone : 'Guest',
      //   email: user ? user.email : 'Guest',
      //   type: 'preorder',
      //   price: product.preorder_price,
      //   location: location ? location.city + '/' + location.region + '/' + location.country + ' Ip : ' + location.ip : ""
      // };

      // try {
      //   const response = ExcelService.createCrm([...preorder, preorderItem]); // Passer le bon tableau ici
      //   console.log(response);
      // } catch (error) {
      //   console.error("Erreur creation crm preorder :", error);
      // }
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
