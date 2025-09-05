import React from "react";
import { removeFromCart, updateQuantity } from "../../RTX/Slices/CartSlice";
import { useDispatch } from "react-redux";

export default function CartCard({ product }) {
  let dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(updateQuantity({ id: product.id, change: 1 }));
  };

  const decreaseQuantity = () => {
    if (product.quantity > 1) {
      dispatch(updateQuantity({ id: product.id, change: -1 }));
    }
  };

  return (
    <section className="flex flex-col gap-3 p-4 border-2 border-green-900 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.thumbnail}
        alt=""
        className="w-full h-48 rounded-lg bg-gray-50 object-cover"
      />
      <h2 className="text-lg font-bold text-green-900">{product.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-green-700">
          price: <span className="text-red-700">${product.price}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQuantity}
            disabled={product.quantity === 1}
            className={`px-2 py-1 rounded-md ${
              product.quantity === 1 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-700'
            } text-white transition-colors duration-300`}
          >
            -
          </button>
          <span className="text-lg font-semibold">{product.quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-2 py-1 rounded-md bg-green-500 hover:bg-green-700 text-white transition-colors duration-300"
          >
            +
          </button>
        </div>
      </section>
      <p className="text-lg font-semibold text-green-700">
        Total: <span className="text-red-700">${(product.price * product.quantity).toFixed(2)}</span>
      </p>
      <button
        className="px-4 py-2 rounded-2xl bg-red-900 text-white hover:bg-red-700 transition-colors duration-300"
        onClick={() => dispatch(removeFromCart(product))}
      >
        Remove From Cart
      </button>
    </section>
  );
}