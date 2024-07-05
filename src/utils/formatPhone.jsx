const formatPhone = (phone) => {
  return phone
    .toString()
    .replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
};

export default formatPhone;
