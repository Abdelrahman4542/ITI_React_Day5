import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../RTX/Slices/CartSlice";

export default function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let [currentImageIndex, setCurrentImageIndex] = useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    async function getProduct() {
      let { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="flex flex-col gap-6 p-6 border-2 border-green-900 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Slider */}
        <div className="relative">
          <img 
            src={product.images?.[currentImageIndex] || product.thumbnail} 
            alt={product.title} 
            className="w-full h-96 object-cover rounded-lg"
          />
          {product.images && product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &gt;
              </button>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-green-900">{product.title}</h2>
          <p className="text-lg text-gray-600">{product.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg font-semibold">Price: <span className="text-red-700">${product.price}</span></p>
            <p className="text-lg font-semibold">Brand: <span className="text-green-700">{product.brand}</span></p>
            <p className="text-lg font-semibold">Category: <span className="text-green-700">{product.category}</span></p>
            <p className="text-lg font-semibold">Rating: <span className="text-yellow-600">{product.rating}/5</span></p>
            <p className="text-lg font-semibold">Stock: <span className="text-blue-700">{product.stock}</span></p>
          </div>
          <button
            className="px-6 py-3 rounded-2xl bg-green-900 text-white hover:bg-green-700 transition-colors duration-300 mt-4"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-green-900 mb-4">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="text-yellow-600">Rating: {review.rating}/5</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-400 mt-2">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}