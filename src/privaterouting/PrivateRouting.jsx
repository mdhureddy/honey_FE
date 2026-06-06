import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Products from "../components/Products";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext";

const PrivateRouting = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
};

export default PrivateRouting;
