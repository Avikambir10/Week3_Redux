import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeFromCart, changeQty } from '../../store/cartSlice';


const CartCard = ({ item }) => {
    const { id, title, price, image, qty } = item;
    let dispatch = useDispatch();

    let removefromCart = () => {
        dispatch(removeFromCart(id));
    }

    const handleQtyChange = (type) => {
        dispatch(changeQty({ id, type }));
    }

    return (
        <div className="bg-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 border border-gray-700 hover:border-gray-600 transition-colors">

            {/* Product Image */}
            <div className="h-24 w-24 bg-white/5 rounded-lg flex-shrink-0 p-2 flex justify-center items-center">
                <img
                    src={image}
                    alt={title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-indigo-400 font-bold">${price.toFixed(2) * qty}</p>
            </div>

            {/* Quantity Controls & Delete */}
            <div className="flex items-center gap-4">

                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                    <button
                        onClick={() => handleQtyChange("Decrement")}
                        disabled={qty <= 1}
                        className={`px-3 py-2 transition-colors ${qty <= 1
                            ? 'text-gray-600 opacity-50 cursor-not-allowed' // Disabled styles
                            : 'text-gray-400 hover:text-white hover:bg-gray-700' // Active styles
                            }`}
                    >
                        <FaMinus size={12} />
                    </button>

                    <span className="w-10 text-center text-white font-medium">
                        {qty}
                    </span>

                    <button
                        onClick={() => handleQtyChange("Increment")}
                        className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <FaPlus size={12} />
                    </button>
                </div>

                {/* Remove Button */}
                <button onClick={removefromCart} className="p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                    <FaTrash />
                </button>

            </div>
        </div>
    );
};

export default CartCard;