import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../RTX/Slices/CartSlice";

export default function ProductCard({ product }) {
  let dispatch = useDispatch();

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col gap-3 p-4 border-2 border-green-900 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow duration-300  ">
      <img
        src={product.thumbnail}
        alt=""
        className="w-full h-48 rounded-lg bg-gray-50"
      />
      <h2 className="text-lg font-bold text-green-900 ">{product.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <p className="text-lg font-semibold text-green-700">{product.price}</p>

      <button
        className="px-4 py-2 rounded-2xl bg-green-900 text-white hover:bg-green-700 transition-colors duration-300"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(addToCart(product));
        }}>
        Add to Cart
      </button>
    </Link>
  );
}
