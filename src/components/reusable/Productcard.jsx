import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const { title, description, price, rating, thumbnail, id } = product;

    let dispatch = useDispatch();

    let cart = useSelector((myStore) => myStore.cartStore.cart);
    let checkItemInCart = cart.find((item) => item.id == id);

    let addItem = () => {
        let cartObj = {
            title, price, image: thumbnail, id, qty: 1
        }

        dispatch(addToCart({ cartObj }));
        toast.success('Item Added!')
    }

    let removefromCart = () => {
        dispatch(removeFromCart(id ));
        toast.info('Item Removed');
    }

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 flex flex-col h-full group">

            <div className="relative h-56 bg-white/5 flex justify-center items-center p-4">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-2 truncate" title={title}>
                    {title}
                </h3>

                <p className="text-gray-400 text-sm mb-5 line-clamp-2 flex-grow" title={description}>
                    {description}
                </p>

                <div className="flex justify-between items-center mb-5">
                    <span className="text-2xl font-bold text-indigo-400">
                        ${price.toFixed(2)}
                    </span>

                    <div className="flex items-center bg-gray-900 px-2.5 py-1 rounded-md border border-gray-700">
                        <FaStar className="text-yellow-500 mr-1.5" />
                        <span className="text-sm font-medium text-gray-300">{rating}</span>
                    </div>
                </div>

                {checkItemInCart ?
                    <button onClick={removefromCart} className='w-full bg-red-500 text-white font-medium py-2.5 px-4 rounded-lg'> Remove </button> :

                    <button onClick={addItem} className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                }

            </div>

        </div>
    );
};

export default ProductCard;