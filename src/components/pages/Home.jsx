import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../reusable/Productcard';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-white mb-8">All Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

                <ToastContainer/>
        </div>
    );
}

export default Home;