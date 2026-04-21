
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
    // Standardized the parameter name to 'state'
    const cart = useSelector((store) => store.cartStore.cart);

    const navStyles = ({ isActive }) =>
        `text-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
            isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-white'
        }`;

    return (
        <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                
                <Link to="/" className="text-2xl font-bold tracking-wider hover:text-indigo-400 transition-colors">
                    My<span className="text-indigo-500">Store</span>
                </Link>

                <nav className="flex space-x-8 items-center">
                    <NavLink to="/" className={navStyles}>
                        Home
                    </NavLink>

                    <NavLink to="/cart" className={navStyles}>
                        
                        <FiShoppingCart className="text-xl" />
                        
                        Cart ({cart?.length || 0})
                    </NavLink>
                </nav>
                
            </div>
        </header>
    );
};

export default Header;