import React from 'react';
import CartCard from '../reusable/CartCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    let cart = useSelector((myStore) => myStore.cartStore.cart);
    const navigate = useNavigate();

    // Calculate totals based on mock data
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;



    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-white mb-8">Shopping Cart</h2>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Left Side: Cart Items List */}
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
                            <p className="text-gray-400 text-lg">Your cart is empty.</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Order Summary & Payment UI */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                        {/* Price Breakdown */}
                        <div className="space-y-3 text-gray-300 border-b border-gray-700 pb-6 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white text-lg font-bold pt-3">
                                <span>Total</span>
                                <span className="text-indigo-400">${total.toFixed(2)}</span>
                            </div>
                        </div>



                        {/* Checkout Button */}
                        <button
                            onClick={() => navigate('/payment')}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            Pay ${total.toFixed(2)}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;