import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../RTX/Slices/Products";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "../Cards/ProductCard";
export default function AllProducts() {
  let products = useSelector((state) => state.products);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard product={p} key={uuidv4()} />
      ))}
    </section>
  );
}
