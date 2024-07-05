const CartService = {
  getCart: () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (product) => {
    const cart = CartService.getCart();
    const existingProductIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );

    if (existingProductIndex !== -1) {
      // Si le produit existe déjà, augmenter sa quantité
      cart[existingProductIndex].quantity += product.quantity || 1;
    } else {
      // Sinon, ajouter le produit avec une quantité par défaut de 1 si non spécifiée
      cart.push({
        ...product,
        quantity: product.quantity || 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  },

  removeFromCart: (productId) => {
    let cart = CartService.getCart();
    cart = cart.filter((item) => item.product_id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  updateCart: (productId, quantity) => {
    const cart = CartService.getCart();
    const productIndex = cart.findIndex(
      (item) => item.product_id === productId
    );

    if (productIndex !== -1) {
      cart[productIndex].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },

  clearCart: () => {
    localStorage.removeItem("cart");
  },
};

export default CartService;
