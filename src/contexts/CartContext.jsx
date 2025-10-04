/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// CartContext.js
import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";
import ExcelService from "../services/excelService";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
<<<<<<< HEAD
  const { user } = useAuthContext();
  const { trackEvent, trackAddToCart, trackAddToPreCart, trackAddToCreditCart } = useGoogleAnalytics();
=======

  const { user } = useContext(UserContext);
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [preorder, setPreorder] = useState([]);
<<<<<<< HEAD
  const [creditOrder, setCreditOrder] = useState([]);
  const [location, setLocation] = useState(null);
  const guestId = getOrCreateGuestId();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=a7bca817c4bc37');
        if (!response.ok) {
          throw new Error('Error fetching location data');
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
=======
  const [location, setLocation] = useState(null);

  useEffect(() => {
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
    fetchLocation();
    loadDataFromLocalStorage();
  }, []); // Charge les données une seule fois au démarrage

  useEffect(() => {
    if (cart.length > 0) {
      crmCart();
    }
  }, [cart]);

  useEffect(() => {
    if (preorder.length > 0) {
      crmPreorder();
    }
  }, [preorder]);

  useEffect(() => {
    if (creditOrder.length > 0) {
      crmCreditCart();
    }
  }, [creditOrder]);

  const crmCart = async () => {

    if (!cart.length) {
      console.warn("Panier vide : aucune donnée à envoyer au CRM.");
      return;
    }

    const produits = removeDuplicates(cart);

    const crmData = {
      guest_id: guestId || 'Guest-Id',
      location: location ? `${location.city}/${location.region}/${location.country} Ip: ${location.ip}` : "",
      localisation: location.loc,
      name: user ? user.name : 'Guest',
      phone: user ? user.partner_phone : 'Guest',
      email: user ? user.email : 'Guest',
      type: "commande",
      total: getCartTotal(),
      date: new Date().toLocaleString(),
      produits: produits.map((item) => ({
        id: item.id,
        nom: item.name,
        quantité: item.quantity,
        prix: item.en_promo ? item.promo_price : item.list_price,
        location: item.location,
        panier: "Commande",
        date: item.date,
      })),
    };
    console.log(crmData);
    try {
      const response = await CrmService.sendCRMData(crmData);
      console.log(response);
    } catch (error) {
      console.error('Error sending CRM data:', error);
    }
  }

  const crmPreorder = async () => {

    const produits = removeDuplicates(preorder);

    const crmData = {
      guest_id: guestId,
      location: location ? `${location.city}/${location.region}/${location.country} Ip: ${location.ip}` : "",
      localisation: location.loc,
      name: user ? user.name : 'Guest',
      phone: user ? user.partner_phone : 'Guest',
      email: user ? user.email : 'Guest',
      type: "precommande",
      total: getPreorderTotal(),
      date: new Date().toLocaleString(),
      produits: produits.map((item) => ({
        id: item.id,
        nom: item.name,
        quantité: item.quantity,
        prix: item.en_promo ? item.promo_price : item.list_price,
        location: item.location,
        panier: "PreCommande",
        date: item.date,
      })),
    };
    console.log(crmData);
    try {
      const response = await CrmService.sendCRMData(crmData);
      console.log(response);
    } catch (error) {
      console.error('Error sending CRM data:', error);
    }

  }

  const crmCreditCart = async () => {

    const produits = removeDuplicates(creditOrder);

    const crmData = {
      guest_id: guestId,
      location: location ? `${location.city}/${location.region}/${location.country} Ip: ${location.ip}` : "",
      localisation: location.loc,
      name: user ? user.name : 'Guest',
      phone: user ? user.partner_phone : 'Guest',
      email: user ? user.email : 'Guest',
      type: "acredit",
      total: getCreditOrderTotal(),
      date: new Date().toLocaleString(),
      produits: produits.map((item) => ({
        id: item.id,
        nom: item.name,
        quantité: item.quantity,
        prix: item.en_promo ? item.promo_price : item.list_price,
        location: item.location,
        panier: "Crédit",
        date: item.date,
      })),
    };
    console.log(crmData);
    try {
      const response = await CrmService.sendCRMData(crmData);
      console.log(response);
    } catch (error) {
      console.error('Error sending CRM data:', error);
    }
  }


  useEffect(() => {
    saveDataToLocalStorage();
<<<<<<< HEAD
  }, [cart, wishlist, preorder, creditOrder]);



  const addToCreditOrder = (product, quantity) => {
    const index = creditOrder.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updatedCart = creditOrder.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCreditOrder(updatedCart);
    } else {
      const newCartItem = {
        ...product,
        quantity,
        date: new Date().toLocaleString(),
        location: location
          ? `${location.city}/${location.region}/${location.country} IP: ${location.ip}`
          : "Localisation non disponible",
      };

      setCreditOrder([...creditOrder, newCartItem]);

    }

    trackEvent('Ecommerce', 'Add to CreditCart', product.name, product.creditorder_price * quantity);
    // trackEvent('Ecommerce', 'Add to CreditCart', product.name, product.creditorder_price * quantity);
    trackAddToCreditCart(product, quantity);
  }
=======
  }, [cart, wishlist, preorder]); // Sauvegarde uniquement lorsque ces états changent



>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

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
<<<<<<< HEAD

      const newCartItem = {
        ...product,
        quantity,
        date: new Date().toLocaleString(),
        location: location
          ? `${location.city}/${location.region}/${location.country} IP: ${location.ip}`
          : "Localisation non disponible",
      };
      setCart([...cart, newCartItem]);
    }
    trackAddToCart(product, quantity);
    trackEvent('Ecommerce', 'Add to Cart', product.name, product.list_price * quantity);
    // trackEvent('Ecommerce', 'Add to Cart', product.name, product.list_price * quantity);
    // trackAddToCart(product, quantity);
=======
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
>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74

  };

  const removeDuplicates = (array) => {
    const uniqueItems = array.reduce((acc, current) => {
      const found = acc.find((item) => item.id === current.id);
      if (!found) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueItems;
  };


  const addToPreorder = (product, quantity) => {
    const index = preorder.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      preorder[index].quantity += quantity;
    } else {
      const newCartItem = {
        ...product,
        quantity,
        date: new Date().toLocaleString(),
        location: location
          ? `${location.city}/${location.region}/${location.country} IP: ${location.ip}`
          : "Localisation non disponible",
      };
      setPreorder([...preorder, newCartItem]);
    }

    trackEvent('Ecommerce', 'Add to PreCart', product.name, product.preorder_price * quantity);
    trackAddToPreCart(product, quantity);

  };

  const updateCreditOrder = (product, quantity) => {

    setCreditOrder(
      creditOrder.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  }

  const clearCreditOrder = () => {
    setCreditOrder([])
  }

  const removeFromCreditOrder = (product) => {
    setCreditOrder(creditOrder.filter((item) => item.id !== product.id));
  }

  const getCreditOrderTotal = () => {
    return creditOrder.reduce((total, item) => total + item.creditorder_price * item.quantity, 0)
  }


  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    // supprimer aussi dans local storage
    // localStorage.setItem("cart", JSON.stringify(cart));
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
    // console.log(product);
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
      (total, item) => total + (item.en_promo ? item.promo_price : item.list_price) * item.quantity,
      0
    );
  };

  const getWishlistTotal = () => {
    return wishlist.reduce(
      (total, item) => total + (item.en_promo ? item.promo_price : item.list_price) * item.quantity,
      0
    );
  };

<<<<<<< HEAD
=======


>>>>>>> 7f3902b8dd82ec00aeab216f4a37b7a1a12e7b74
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
    localStorage.setItem("creditOrder", JSON.stringify(creditOrder));
  };

  const loadDataFromLocalStorage = () => {
    const cartData = localStorage.getItem("cart");
    const wishlistData = localStorage.getItem("wishlist");
    const preorderData = localStorage.getItem("preorder");
    const creditorderData = localStorage.getItem("creditOrder");

    if (cartData) {
      setCart(JSON.parse(cartData));
    }
    if (wishlistData) {
      setWishlist(JSON.parse(wishlistData));
    }
    if (preorderData) {
      setPreorder(JSON.parse(preorderData));
    }
    if (creditorderData) {
      setCreditOrder(JSON.parse(creditorderData));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        creditOrder,
        addToCreditOrder,
        removeFromCreditOrder,
        updateCreditOrder,
        clearCreditOrder,
        getCreditOrderTotal,
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


import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "./useAuthContext";
import CrmService from "../services/CrmService";
import useGoogleAnalytics from "../Hooks/useGoogleAnalytics";

function getOrCreateGuestId() {
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
}

