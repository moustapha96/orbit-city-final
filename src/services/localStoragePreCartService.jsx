const PreCartService = {
  getPrecart: () => {
    const precart = localStorage.getItem("precart");
    return precart ? JSON.parse(precart) : [];
  },

  addToPrecart: (product) => {
    const precart = PreCartService.getPrecart();
    const existingProductIndex = precart.findIndex(
      (item) => item.product_id === product.product_id
    );

    if (existingProductIndex !== -1) {
      precart[existingProductIndex].quantity += product.quantity || 1;
    } else {
      precart.push({
        ...product,
        quantity: product.quantity || 1,
      });
    }

    localStorage.setItem("precart", JSON.stringify(precart));
  },

  removeFromPrecart: (productId) => {
    let precart = PreCartService.getPrecart();
    precart = precart.filter((item) => item.product_id !== productId);
    localStorage.setItem("precart", JSON.stringify(precart));
  },

  updatePrecart: (productId, quantity) => {
    const precart = PreCartService.getPrecart();
    const productIndex = precart.findIndex(
      (item) => item.product_id === productId
    );

    if (productIndex !== -1) {
      precart[productIndex].quantity = quantity;
      localStorage.setItem("precart", JSON.stringify(precart));
    }
  },

  clearPrecart: () => {
    localStorage.removeItem("precart");
  },
};

export default PreCartService;
