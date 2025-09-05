import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import AllProducts from "./Components/Shop/AllProducts";
import Category from "./Components/Shop/Category";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from './RTX/Slices/CartSlice';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Load cart from localStorage on app start
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      dispatch(setCart(JSON.parse(cartData)));
    }
  }, [dispatch]);

  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "shop",
          element: <Shop />,
          children: [
            { index: true, element: <AllProducts /> },
            { path: ":category", element: <Category /> },
          ],
        },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "about", element: <About /> },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <NotFound /> },
      ],
      // errorElement: <h1>Error 404 NotFound</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;