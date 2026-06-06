import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AddressModal from './AddressModal';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
    const [modal, setModal] = useState(null);

    const total = cartItems.reduce((s, i) => s + i.final_price * i.qty, 0);

    const openCheckoutAll = () => setModal({ items: cartItems });
    const openCheckoutOne = (item) => setModal({ items: [item] });

    const handleSuccess = (items) => {
        if (items.length === cartItems.length) {
            clearCart();
        } else {
            items.forEach(i => removeFromCart(i.key));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-8xl">🛒</span>
                <h2 className="text-2xl font-bold text-amber-900">Your cart is empty</h2>
                <p className="text-gray-400 text-sm">Add some honey products to get started!</p>
                <Link
                    to="/products"
                    className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 active:scale-95 text-white font-bold px-8 py-3 rounded-2xl shadow-md shadow-amber-200 transition-all"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-50 p-4 sm:p-6">
            {modal && (
                <AddressModal
                    orderItems={modal.items}
                    onClose={() => setModal(null)}
                    onSuccess={() => handleSuccess(modal.items)}
                />
            )}

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🛒</span>
                    <h1 className="text-2xl font-bold text-amber-900">Your Cart</h1>
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {cartItems.reduce((s, i) => s + i.qty, 0)} items
                    </span>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div
                            key={item.key}
                            className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden"
                        >
                            <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
                            <div className="p-4 flex gap-4">
                                {/* Thumbnail */}
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-amber-50 to-yellow-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-amber-100">
                                    {item.images?.[0] ? (
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                                    ) : (
                                        <span className="text-3xl">🍯</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">{item.quantity}</p>
                                    <div className="flex items-baseline gap-1.5 mt-1.5">
                                        <span className="text-xl font-extrabold text-amber-600">₹{item.final_price * item.qty}</span>
                                        {item.qty > 1 && (
                                            <span className="text-xs text-gray-400">₹{item.final_price} × {item.qty}</span>
                                        )}
                                    </div>

                                    {/* Mobile: qty + actions row */}
                                    <div className="flex items-center gap-3 mt-3 sm:hidden flex-wrap">
                                        <QtyStepper item={item} updateQty={updateQty} />
                                        <button
                                            onClick={() => openCheckoutOne(item)}
                                            className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-xl transition-colors"
                                        >
                                            Checkout
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.key)}
                                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop: right column controls */}
                                <div className="hidden sm:flex flex-col items-end gap-2.5 flex-shrink-0">
                                    <QtyStepper item={item} updateQty={updateQty} />
                                    <button
                                        onClick={() => openCheckoutOne(item)}
                                        className="text-xs bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1.5 rounded-xl transition-colors whitespace-nowrap"
                                    >
                                        Checkout
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.key)}
                                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Summary */}
                <div className="mt-6 bg-white rounded-3xl shadow-md border border-amber-100 p-5">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500 font-medium text-sm">
                            {cartItems.length} product{cartItems.length > 1 ? 's' : ''} ·{' '}
                            {cartItems.reduce((s, i) => s + i.qty, 0)} units
                        </span>
                    </div>
                    <div className="flex items-baseline justify-between mb-5">
                        <span className="text-gray-700 font-semibold text-lg">Order Total</span>
                        <span className="text-3xl font-extrabold text-amber-600">₹{total}</span>
                    </div>
                    <button
                        onClick={openCheckoutAll}
                        className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-green-200 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <WhatsAppIcon />
                        Checkout All on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

const QtyStepper = ({ item, updateQty }) => (
    <div className="flex items-center border border-amber-200 rounded-xl overflow-hidden">
        <button
            onClick={() => updateQty(item.key, -1)}
            className="px-3 py-1.5 text-amber-700 hover:bg-amber-50 font-bold text-lg leading-none transition-colors"
        >
            −
        </button>
        <span className="px-3 py-1.5 font-bold text-gray-800 text-sm min-w-[2rem] text-center">
            {item.qty}
        </span>
        <button
            onClick={() => updateQty(item.key, 1)}
            className="px-3 py-1.5 text-amber-700 hover:bg-amber-50 font-bold text-lg leading-none transition-colors"
        >
            +
        </button>
    </div>
);

const WhatsAppIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

export default Cart;
