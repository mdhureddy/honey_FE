import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const getKey = (product) => `${product.name}__${product.quantity}`;

    const addToCart = (product) => {
        setCartItems(prev => {
            const key = getKey(product);
            const found = prev.find(i => i.key === key);
            if (found) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, key, qty: 1 }];
        });
    };

    const removeFromCart = (key) => setCartItems(prev => prev.filter(i => i.key !== key));

    const updateQty = (key, delta) => {
        setCartItems(prev =>
            prev.map(i => {
                if (i.key !== key) return i;
                const next = i.qty + delta;
                return next <= 0 ? null : { ...i, qty: next };
            }).filter(Boolean)
        );
    };

    const clearCart = () => setCartItems([]);

    const totalCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
