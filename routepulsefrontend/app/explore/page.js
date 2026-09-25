"use client";

import React, { useState, useEffect } from "react";
import { addProductToOrder } from "../../lib/api";
import { getAllProducts } from "../../lib/productsApi";

export default function ExplorePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        
        // Safely extract the array whether the API returns a direct array, 
        // an Axios response (.data), or a wrapper object (.products / .data.data)
        const productArray = Array.isArray(response) 
          ? response 
          : Array.isArray(response?.data) 
            ? response.data 
            : Array.isArray(response?.products) 
              ? response.products 
              : Array.isArray(response?.data?.products)
                ? response.data.products
                : [];

        setProducts(productArray);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Stops card click/modal from opening
    try {
      const result = await addProductToOrder(productId);
      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Failed to add product to order:", error);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FAFBF9] text-slate-800 flex flex-col font-sans p-4 sm:p-6 lg:p-8">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-lime-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-white/95 backdrop-blur-xl p-6 shadow-xl shadow-[#162B22]/5 border border-[#162B22]/10">
          <div>
            <span className="px-3 py-1 text-xs font-bold text-[#162B22] bg-[#162B22]/5 rounded-full border border-[#162B22]/15">
              Explore Showcase
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              ✨ Discover Curated Products
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Browse products live from your database and test your grid layout visualization.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-sm font-bold text-stone-500 animate-pulse">Loading products from database...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="p-8 bg-white border border-stone-200 rounded-3xl text-center text-stone-500 text-sm">
            No products found in the database.
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const productId = product.id || product._id;
              return (
                <div
                  key={productId}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative p-4 rounded-3xl bg-white border border-stone-200/80 hover:border-[#162B22]/50 hover:shadow-2xl hover:shadow-[#162B22]/10 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Container with Floating Category Badge */}
                    <div className="relative w-full h-44 bg-stone-50 rounded-2xl overflow-hidden mb-4 border border-stone-100 flex items-center justify-center p-3">
                      {product.category && (
                        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#162B22] bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-emerald-100">
                          {product.category}
                        </span>
                      )}
                      <img
                        src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#162B22] transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-100 gap-2">
                    <span className="text-base font-extrabold text-[#162B22] shrink-0">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="text-xs font-bold text-[#162B22] bg-[#162B22]/5 px-2.5 py-1.5 rounded-xl hover:bg-[#162B22] hover:text-white transition-all duration-300"
                      >
                        Inspect &rarr;
                      </button>
                      
                      <button 
                        onClick={(e) => handleAddToCart(e, Number(productId))}
                        className="text-xs font-bold text-[#162B22] bg-[#162B22]/5 px-2.5 py-1.5 rounded-xl hover:bg-[#162B22] hover:text-white transition-all duration-300"
                      >
                        Add &rarr;
                      </button> 
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Inspection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full bg-stone-100 transition-colors"
            >
              ✕
            </button>

            <div className="w-full h-56 bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center">
              <img
                src={selectedProduct.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              {selectedProduct.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#162B22] bg-[#162B22]/5 px-2.5 py-1 rounded-md border border-[#162B22]/15">
                  {selectedProduct.category}
                </span>
              )}
              <h2 className="text-xl font-black text-slate-900 mt-2">
                {selectedProduct.title}
              </h2>
              <p className="text-sm font-extrabold text-[#162B22] mt-1">
                ${typeof selectedProduct.price === 'number' ? selectedProduct.price.toFixed(2) : selectedProduct.price}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={(e) => {
                  handleAddToCart(e, Number(selectedProduct.id || selectedProduct._id));
                  setSelectedProduct(null);
                }}
                className="flex-1 rounded-2xl bg-[#162B22] py-3 text-sm font-bold text-white hover:bg-[#11221b] transition-colors shadow-md"
              >
                Add to Order
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-2xl bg-stone-100 px-5 py-3 text-sm font-bold text-stone-600 hover:bg-stone-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}