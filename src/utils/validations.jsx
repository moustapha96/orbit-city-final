const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// const isValidPhoneNumber = (phoneNumber) => {
//   const phoneRegex = /^2217[0-9]{8}$/;
//   return phoneRegex.test(phoneNumber);
// };

const isValidPhoneNumber = (phoneNumber) => {
  // Si le numéro ne commence pas par 221, on l'ajoute
  const formattedNumber = phoneNumber.startsWith('221') ? phoneNumber : `221${phoneNumber}`;
  const phoneRegex = /^2217[0-9]{8}$/;
  return phoneRegex.test(formattedNumber);
};


const isValidString = (name) => {
  const phoneRegex = /[a-zA-Z]{3,}$/;
  return phoneRegex.test(name);
};

export { isValidEmail, isValidPhoneNumber, isValidString };
