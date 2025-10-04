// tracking.js

// Initialise le dataLayer si ce n'est pas déjà fait
const initDataLayer = () => {
    if (!window.dataLayer) {
        window.dataLayer = [];
    }
};

// Pousse un événement générique dans le dataLayer
export const pushToDataLayer = (event, data = {}) => {
    initDataLayer();
    window.dataLayer.push({
        event,
        ...data,
    });
};

// Suivi des vues de page
export const trackPageView = (path) => {
    pushToDataLayer('page_view', { pagePath: path });
};

// Suivi d'événements personnalisés
export const trackEvent = (category, action, label = '', value = '') => {
    const r = pushToDataLayer('custom_event', {
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue: value,
    });
    console.log("resultat track event " + r)
};

// Suivi de l'ajout au panier
export const trackAddToCart = (product, quantity) => {
    const r = pushToDataLayer('add_to_cart', {
        productName: product.name,
        price: product.list_price,
        quantity,
    });
    console.log("resultat track add to cart " + r)
};

// Suivi de l'ajout au pré-panier
export const trackAddToPreCart = (product, quantity) => {
    const r = pushToDataLayer('add_to_pre_cart', {
        productName: product.name,
        price: product.preorder_price,
        quantity,
    });
    console.log("resultat track add to pre cart " + r)
};

// Suivi de l'ajout au panier crédit
export const trackAddToCreditCart = (product, quantity) => {
    const r = pushToDataLayer('add_to_credit_cart', {
        productName: product.name,
        price: product.creditorder_price,
        quantity,
    });
    console.log("resultat track add to credit cart " + r)
};

// Suivi de la suppression du panier
export const trackRemoveFromCart = (product) => {
    const r = pushToDataLayer('remove_from_cart', {
        productName: product.name,
    });
    console.log("resultat track remove from cart " + r)
};

// Suivi des achats
export const trackPurchase = (orderId, total, products) => {
    const r = pushToDataLayer('purchase', {
        orderId,
        total,
        products: products.map((product) => ({
            name: product.name,
            price: product.list_price,
            quantity: product.quantity,
        })),
    });
    console.log("resultat track purchase " + r)
};

export const trackImageClick = (name) => {
    const r = pushToDataLayer('click_image_product', {
        productName: name,
    })
    console.log("produit cliqué " + name + 'r = ' + r)
};