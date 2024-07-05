const formatPrice = (prix) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(prix);
};

export default formatPrice;
