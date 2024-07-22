/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import PaymentContext from "./PaymentContext";

const PaymentProvider = ({ children }) => {
  const [payment, setPayment] = useState(
    JSON.parse(localStorage.getItem("payment")) || {}
  );

  useEffect(() => {
    localStorage.setItem("payment", JSON.stringify(payment));
  }, [payment]);

  const setUserPayment = (user) => {
    setPayment({ ...payment, userPayment: user });
  };

  const setOrder = (order) => {
    setPayment({ ...payment, order });
  };

  const setPaymentDetails = (details) => {
    setPayment({ ...payment, details });
  };

  const setTotalAmount = (amount) => {
    setPayment({ ...payment, totalAmount: amount });
  };

  const clearPayment = () => {
    setPayment({});
    localStorage.removeItem("payment");
  };

  return (
    <PaymentContext.Provider
      value={{
        payment,
        setUserPayment,
        setOrder,
        setPaymentDetails,
        clearPayment,
        setTotalAmount,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
