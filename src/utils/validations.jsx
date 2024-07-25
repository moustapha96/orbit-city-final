const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^7[0-9]{8}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidString = (name) => {
  const phoneRegex = /[a-zA-Z]{3,}$/;
  return phoneRegex.test(name);
};

export { isValidEmail, isValidPhoneNumber, isValidString };
