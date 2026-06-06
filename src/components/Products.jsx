import { useState, useRef } from 'react';
import { items } from '../Data/ProductItems';
import { useCart } from '../context/CartContext';
import AddressModal from './AddressModal';

const ImageCarousel = ({ images, name }) => {
    const [current, setCurrent]   = useState(0);
    const [zoomed, setZoomed]     = useState(false);
    const [origin, setOrigin]     = useState({ x: 50, y: 50 });
    const containerRef            = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        setOrigin({
            x: ((e.clientX - left) / width) * 100,
            y: ((e.clientY - top) / height) * 100,
        });
    };

    const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); };
    const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); };

    if (images.length === 0) {
        return (
            <div className="h-72 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-yellow-100 text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-amber-400">Image Coming Soon</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative w-full h-72 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 overflow-hidden group cursor-zoom-in flex items-center justify-center"
        >
            <img
                key={current}
                src={images[current]}
                alt={`${name} ${current + 1}`}
                className="max-w-full max-h-full object-contain p-4 select-none transition-transform duration-200 ease-out"
                style={{
                    transform: zoomed ? 'scale(2.2)' : 'scale(1)',
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                }}
                draggable={false}
            />

            {/* Zoom hint */}
            {!zoomed && (
                <span className="absolute bottom-3 left-3 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full pointer-events-none">
                    🔍 Hover to zoom
                </span>
            )}

            {/* Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        onMouseEnter={() => setZoomed(false)}
                        onMouseLeave={() => setZoomed(true)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-amber-700 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        ‹
                    </button>
                    <button
                        onClick={next}
                        onMouseEnter={() => setZoomed(false)}
                        onMouseLeave={() => setZoomed(true)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-amber-700 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        ›
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                onMouseEnter={() => setZoomed(false)}
                                onMouseLeave={() => setZoomed(true)}
                                className={`rounded-full transition-all duration-200 ${i === current ? 'bg-amber-500 w-4 h-2' : 'bg-amber-300 w-2 h-2'}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Counter badge */}
            {images.length > 1 && (
                <span className="absolute top-3 right-3 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full z-10">
                    {current + 1}/{images.length}
                </span>
            )}
        </div>
    );
};

const Products = () => {
    const { addToCart, cartItems } = useCart();
    const [added, setAdded] = useState({});
    const [modal, setModal] = useState(null);

    const getKey = (product) => `${product.name}__${product.quantity}`;

    const handleAddToCart = (product) => {
        addToCart(product);
        const key = getKey(product);
        setAdded(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setAdded(prev => ({ ...prev, [key]: false })), 1500);
    };

    const handleBuyNow = (product) => {
        const key = getKey(product);
        const existingInCart = cartItems.find(i => i.key === key);
        const orderItem = existingInCart
            ? existingInCart
            : { ...product, key, qty: 1 };
        setModal({ items: [orderItem] });
    };

    return (
        <div className="p-6 bg-amber-50 min-h-screen">
            {modal && (
                <AddressModal
                    orderItems={modal.items}
                    onClose={() => setModal(null)}
                />
            )}

            {items.map((categoryObj, catIndex) => {
                const categoryName = Object.keys(categoryObj)[0];
                const products     = categoryObj[categoryName];

                return (
                    <div key={catIndex} className="mb-12">
                        {/* Section header */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">🍯</span>
                            <h2 className="text-2xl font-bold text-amber-900 capitalize">
                                {categoryName.replace(/_/g, ' ')}
                            </h2>
                            <div className="flex-1 h-px bg-amber-200 ml-2" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {products.map((product) => {
                                const key = getKey(product);
                                const isAdded = added[key];

                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-amber-100 w-full lg:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                                    >
                                        {/* Gold accent bar */}
                                        <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />

                                        <ImageCarousel images={product.images} name={product.name} />

                                        <div className="p-5 flex flex-col flex-1">
                                            {/* Name & badge */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                                    <p className="text-sm text-gray-400 mt-0.5">{product.quantity}</p>
                                                </div>
                                                <span className="flex-shrink-0 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                                                    100% Pure
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-3 flex items-baseline gap-2">
                                                <span className="text-3xl font-extrabold text-amber-600">₹{product.final_price}</span>
                                                <span className="text-xs text-gray-400 font-medium">incl. all taxes</span>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {product.tags.map((tag, i) => (
                                                    <span key={i} className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium">
                                                        ✦ {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="my-3 border-t border-dashed border-amber-100" />

                                            {/* Benefits */}
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Benefits</p>
                                            <ul className="text-sm text-gray-600 space-y-1.5 flex-1">
                                                {product.benefits.map((benefit, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-amber-400 mt-0.5 flex-shrink-0">✔</span>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Buttons */}
                                            <div className="mt-5 flex gap-3">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`flex-1 transition-all duration-200 text-white font-bold py-3 rounded-2xl shadow-md text-sm tracking-wide active:scale-95 ${
                                                        isAdded
                                                            ? 'bg-green-500 shadow-green-200'
                                                            : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 shadow-amber-200'
                                                    }`}
                                                >
                                                    {isAdded ? '✓ Added!' : '🛒 Add to Cart'}
                                                </button>
                                                <button
                                                    onClick={() => handleBuyNow(product)}
                                                    className="flex-1 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 active:scale-95 text-white font-bold py-3 rounded-2xl shadow-md shadow-amber-300 transition-all duration-200 text-sm tracking-wide"
                                                >
                                                    ⚡ Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Products;
