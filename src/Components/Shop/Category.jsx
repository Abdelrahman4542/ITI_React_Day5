import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../Cards/ProductCard";
import { v4 as uuidv4 } from "uuid";

export default function Category() {
  let { category } = useParams();

  let [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    async function getCategoryProducts() {
      let { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setCategoryProducts(data.products);
    }

    getCategoryProducts();
  }, [category]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoryProducts.map((p) => (
        <ProductCard product={p} key={uuidv4()} />
      ))}
    </section>
  );
}
