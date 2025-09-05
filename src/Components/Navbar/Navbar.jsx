import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

// import "./navbar.css";

// import style from "./navbar.module.css";

export default function Navbar() {
  let cartProducts = useSelector((state) => state.cart);

  let myPages = [
    { name: "Home", path: "" },
    { name: "Shop", path: "shop" },
    { name: "About", path: "about" },
  ];

  return (
    <header className="flex justify-between px-20 py-4 bg-green-900 text-gray-300 mb-8">
      <section>
        <Link className="hover:text-white rounded-md px-3 py-2 font-medium">
          Logo
        </Link>
      </section>
      <nav>
        {myPages.map((page) => (
          <Link
            className="hover:text-white rounded-md px-3 py-2 font-medium"
            to={page.path}
            key={uuidv4()}>
            {page.name}
          </Link>
        ))}
      </nav>
      <section>
        <Link
          className="hover:text-white rounded-md px-3 py-2 font-medium"
          to={"cart"}>
          Cart - {cartProducts.length}
        </Link>
      </section>
    </header>

    // <nav className={style.nav}>
    //   <Link to={""}>Home</Link>
    //   <Link to={"shop"}>Shop</Link>
    //   <Link to={"about"}>About</Link>
    // </nav>
  );
}
