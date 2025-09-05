import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import CartCard from "../Components/Cards/CartCard";
import { ClearCart } from "../RTX/Slices/CartSlice";

export default function Cart() {
  let cartProducts = useSelector((state) => state.cart);

  let totalPrice = cartProducts.reduce((acc, p) => {
    return (acc += p.price * p.quantity);
  }, 0);

  console.log(totalPrice);

  let dispatch = useDispatch();

  {
    return cartProducts.length ? (
      <section>
        <h1 className="text-3xl font-bold text-green-700 my-8 ">
          Welcome To Cart
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartProducts.map((p) => (
            <CartCard product={p} key={uuidv4()} />
          ))}
        </section>

        <section className="flex justify-between items-center mt-5 p-8 border-2 border-green-900 rounded-2xl shadow-2xl bg-white">
          <p className="text-2xl text-green-700 font-semibold">
            Total Price: <span className="text-red-700">{totalPrice} $</span>
          </p>
          <button
            className="px-4 py-2 rounded-2xl bg-red-900 text-white hover:bg-red-700 transition-colors duration-300"
            onClick={() => {
              dispatch(ClearCart());
            }}>
            Clear Cart
          </button>
        </section>
      </section>
    ) : (
      <h1 className="text-3xl font-bold text-green-700 mt-15 ">
        No Products In Cart
      </h1>
    );
  }
}
