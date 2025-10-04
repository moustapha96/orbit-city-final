// src/config/paymentConfig.js

const paymentConfig = {
  test: {
    headers: {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      "PAYDUNYA-PRIVATE-KEY": "test_private_LJfJe2zAiwndwRq6ZF4qIDIoApZ",
      "PAYDUNYA-TOKEN": "VaZUkYb6b1JOpZfxUe3R",
    },
    url: `https://app.paydunya.com/sandbox-api/v1/checkout-invoice/confirm/`,
  },
  live: {
    headers: {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
      "PAYDUNYA-PRIVATE-KEY": "live_private_KvbXuQU1IJ4z68hQOU9YeEtrUjW",
      "PAYDUNYA-TOKEN": "cjTGi71WL8xOTCrsJisR",
    },
    url: `https://app.paydunya.com/api/v1/checkout-invoice/confirm/`,
  },
};

export default paymentConfig;