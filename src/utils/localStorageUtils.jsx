const CART_STORAGE_KEY = "cart";

export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Could not load cart from local storage", err);
    return undefined;
  }
};

export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (err) {
    console.error("Could not save cart to local storage", err);
  }
};

export const clearCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (err) {
    console.error("Could not clear cart from local storage", err);
  }
};

const WISHLIST_STORAGE_KEY = "wishlist";

export const loadWishlistFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (serializedWishlist === null) {
      return undefined;
    }
    return JSON.parse(serializedWishlist);
  } catch (err) {
    console.error("Could not load wishlist from local storage", err);
    return undefined;
  }
};

export const saveWishlistToLocalStorage = (wishlist) => {
  try {
    const serializedWishlist = JSON.stringify(wishlist);
    localStorage.setItem(WISHLIST_STORAGE_KEY, serializedWishlist);
  } catch (err) {
    console.error("Could not save wishlist to local storage", err);
  }
};

export const clearWishlistFromLocalStorage = () => {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (err) {
    console.error("Could not clear wishlist from local storage", err);
  }
};

const PRECART_STORAGE_KEY = "preorder";

export const loadpreCartFromLocalStorage = () => {
  try {
    const serializedpreCart = localStorage.getItem(PRECART_STORAGE_KEY);
    if (serializedpreCart === null) {
      return undefined;
    }
    return JSON.parse(serializedpreCart);
  } catch (err) {
    console.error("Could not load cart from local storage", err);
    return undefined;
  }
};

export const savepreCartToLocalStorage = (cart) => {
  try {
    const serializedpreCart = JSON.stringify(cart);
    localStorage.setItem(PRECART_STORAGE_KEY, serializedpreCart);
  } catch (err) {
    console.error("Could not save precart to local storage", err);
  }
};

export const clearpreCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(PRECART_STORAGE_KEY);
  } catch (err) {
    console.error("Could not clear cart from local storage", err);
  }
};
