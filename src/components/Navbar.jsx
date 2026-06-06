import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NAV_ITEMS = [
  // { id: 1, name: "Dashboard", path: "/" },
  { id: 2, name: "Products", path: "/products" },
  // { id: 3, name: "About", path: "/about" },
];

const desktopNavClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors duration-200 px-3 py-1 rounded-full ${
    isActive
      ? "bg-amber-400 text-white"
      : "text-amber-800 hover:bg-amber-100 hover:text-amber-900"
  }`;

const mobileNavClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
    isActive ? "bg-amber-400 text-white" : "text-amber-800 hover:bg-amber-100"
  }`;

const CartIcon = ({ totalCount }) => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    {totalCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
        {totalCount > 9 ? "9+" : totalCount}
      </span>
    )}
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount } = useCart();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <nav className="bg-amber-50 border-b-2 border-amber-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/products" className="flex items-center gap-2 shrink-0">
            <span className="text-3xl">🍯</span>
            <span className="text-xl font-bold text-amber-800 tracking-wide">
              TMRIVO <span className="text-amber-500">Honey</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, name, path }) => (
              <NavLink key={id} to={path} className={desktopNavClass}>
                {name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-amber-700 hover:bg-amber-100 hover:text-amber-900 transition-colors duration-200"
              aria-label="Cart"
            >
              <CartIcon totalCount={totalCount} />
            </Link>
            {/* <Link
              to="/profile"
              className="flex items-center gap-2 p-1 rounded-full border-2 border-amber-300 hover:border-amber-500 transition-colors duration-200"
              aria-label="Profile"
            >
              <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            </Link> */}
          </div>

          {/* Mobile Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-amber-700 hover:bg-amber-100 transition-colors duration-200"
              aria-label="Cart"
            >
              <CartIcon totalCount={totalCount} />
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-amber-700 hover:bg-amber-100 hover:text-amber-900 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200 px-4 py-3 space-y-1">
          {NAV_ITEMS.map(({ id, name, path }) => (
            <NavLink key={id} to={path} onClick={closeMenu} className={mobileNavClass}>
              {name}
            </NavLink>
          ))}
          {/* <div className="pt-2 border-t border-amber-200">
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="text-sm font-semibold">My Profile</span>
            </Link>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
