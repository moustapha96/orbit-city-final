import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useGoogleAnalytics = () => {

    useEffect(() => {
        ReactGA.initialize('G-RFPT6N0J05'); // Replace with your GA4 measurement ID
    }, []);



    const trackPageView = (path) => {
        ReactGA.send({ hitType: "pageview", page: path });
    };


    const trackEvent = (category, action, label, value) => {
        ReactGA.event({
            category,
            action,
            label,
            value,
        });
    };

    const trackAddToCart = (product, quantity) => {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Add to Cart',
            label: product.name,
            value: product.list_price * quantity,
        });
    };

    const trackImageClick = () => {
        ReactGA.event({ category: 'Image', action: 'Clicked on product image' });
    };

    const trackAddToPreCart = (product, quantity) => {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Add to PreCart',
            label: product.name,
            value: product.preorder_price * quantity,
        });
    };

    const trackAddToCreditCart = (product, quantity) => {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Add to CreditCart',
            label: product.name,
            value: product.creditorder_price * quantity,
        });
    };
    const trackRemoveFromCart = (product) => {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Remove from Cart',
            label: product.name,
        });
    };

    const trackPurchase = (orderId, total, products) => {
        ReactGA.event({
            category: 'Ecommerce',
            action: 'Purchase',
            label: orderId,
            value: total,
        });

        // Send detailed purchase data
        ReactGA.send({
            hitType: "event",
            eventCategory: "Ecommerce",
            eventAction: "Purchase",
            eventLabel: orderId,
            eventValue: total,
            ecommerce: {
                purchase: {
                    actionField: {
                        id: orderId,
                        revenue: total,
                    },
                    products: products.map(product => ({
                        name: product.name,
                        price: product.list_price,
                        quantity: product.quantity,
                    })),
                },
            },
        });
    };

    return { trackImageClick, trackPageView, trackEvent, trackAddToCart, trackAddToPreCart, trackAddToCreditCart, trackRemoveFromCart, trackPurchase };
};

export default useGoogleAnalytics;

