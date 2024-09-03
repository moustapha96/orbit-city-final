// paymentConfig.js
export const paymentConfig = {
  test: {
    masterKey: "voFGVcul-uCsd-1sw5-wfGz-ukqScIQoOyDu",
    privateKey: "test_private_LJfJe2zAiwndwRq6ZF4qIDIoApZ",
    publicKey: "test_public_Cg2nELkXvHleRmby9NfaKWofWQS",
    token: "VaZUkYb6b1JOpZfxUe3R",
    mode: "test",
    apiUrl: "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/confirm/",
  },
  live: {
    masterKey: "3ApSagrZ-NkOP-M2GJ-tQr3-6F1TroNp8fL7",
    publicKey: "live_public_wgK4JebXd3SfGDWN64sEIffD5XR",
    privateKey: "live_private_KvbXuQU1IJ4z68hQOU9YeEtrUjW",
    token: "cjTGi71WL8xOTCrsJisR",
    mode: "live",
    apiUrl: "https://app.paydunya.com/api/v1/checkout-invoice/confirm/",
  },
};
