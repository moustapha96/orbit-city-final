// import React from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import "react-range-slider-input/dist/style.css";
// import "reactjs-popup/dist/index.css";
// import { registerSW } from "virtual:pwa-register";
// import { Provider } from "react-redux";
// import store from "./store";

// if (import.meta.env.MODE === "production") {
//   registerSW({
//     onNeedRefresh() {
//       const userResponse = confirm('Une nouvelle version est disponible. Recharger maintenant ?');
//       if (userResponse) {
//         caches.keys().then(cacheNames => {
//           cacheNames.forEach(cacheName => {
//             caches.delete(cacheName); // Supprime tous les caches existants
//           });
//         }).finally(() => {
//           window.location.reload(true); // Rechargement forcé
//         });
//       }
//     },
//     onOfflineReady() {
//       console.log("L’application est prête pour une utilisation hors ligne.");
//     },
//   });
// }


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// AOS.init();

// -----------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

if (import.meta.env.MODE === "production") {
  registerSW({
    onNeedRefresh() {
      console.log("Nouvelle version détectée !");
      const userResponse = confirm('Une nouvelle version est disponible. Recharger maintenant ?');
      if (userResponse) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            console.log(`Suppression du cache : ${cacheName}`);
            caches.delete(cacheName);
          });
        }).finally(() => {
          window.location.reload(true);
        });
      }
    },
    onOfflineReady() {
      console.log("L’application est prête pour une utilisation hors ligne.");
    },
  });
}
