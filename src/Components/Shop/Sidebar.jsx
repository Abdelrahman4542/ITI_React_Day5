import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      let { data } = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(data);
    }
    getCategories();
  }, []);

  return (
    <aside className="flex flex-col gap-3  p-6 border-2 border-green-900  shadow-2xl rounded-2xl bg-white ">
      <NavLink
        to={"/shop"}
        end
        className={({ isActive }) =>
          `px-4 py-2 rounded-2xl font-medium  text-center shadow text-white
          ${isActive ? "bg-green-700" : "bg-green-900 hover:bg-green-700"}
        `
        }>
        All Products
      </NavLink>

      {categories.map((category) => (
        <NavLink
          key={uuidv4()}
          to={`${category.slug}`}
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl font-medium  text-center shadow text-white
            ${isActive ? "bg-green-700 " : "bg-green-900 hover:bg-green-700"}
            `
          }>
          {category.name}
        </NavLink>
      ))}
    </aside>
  );
}
