// src/services/paydunyaInitializer.js

import paydunya from "paydunya";
import paymentConfig from "./paymentConfig";


const initializePaydunya = (isLive) => {
    const config = isLive ? paymentConfig.live : paymentConfig.test;

    const setup = new paydunya.Setup({
        masterKey: config.headers["PAYDUNYA-MASTER-KEY"],
        privateKey: config.headers["PAYDUNYA-PRIVATE-KEY"],
        publicKey: isLive ? "live_public_wgK4JebXd3SfGDWN64sEIffD5XR" : "test_public_Cg2nELkXvHleRmby9NfaKWofWQS",
        token: config.headers["PAYDUNYA-TOKEN"],
        mode: isLive ? "live" : "test",
    });

    const store = new paydunya.Store({
        name: "CCBM SHOP",
        email: "shop@ccbm.sn",
        tagline: "Votre boutique pour vos matériels électroménéger",
        phoneNumber: "+221 70 922 17 75",
        postalAddress: "Avenue Lamine Gueye, x Rue Marchand, Dakar-Senegal",
        logoURL: "https://ccbme.sn/logo_192.png",
        websiteURL: "https://ccbme.sn/",
    });

    return { setup, store };
};

export default initializePaydunya;