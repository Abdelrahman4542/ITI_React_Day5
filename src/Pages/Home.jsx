import React from "react";
import ProductCard from "./../Components/Cards/ProductCard";
import AllProducts from "../Components/Shop/AllProducts";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 my-5">Home Page</h1>
      <AllProducts />
    </div>
  );
}
