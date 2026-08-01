//all clients needs of specifications will be added here

"use client";
import { useState, useEffect } from "react";
import {
  getOneProductById,
  getAllProducts,
  getAllCategories,
} from "../lib/productsApi";
import { addProductToOrder, deleteProductFromOrderApi } from "../lib/api";

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data.products || data || []);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (id) => {
    try {
      setLoading(true);
      const result = await getOneProductById(id);

      if (result) {
        setSelectedProduct(result);
      }
    } catch (error) {
      console.log("Error handling product click", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAddToCart = async (product) => {
    try {
      setLoading(true);

      const productId = product._id || product.id;
      const productPayload = {
        productId: productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0],
        category: product.category,
      };

      const response = await addProductToOrder(productPayload);
      alert("ok");

      setSelectedProduct(null);
    } catch (error) {
      console.log("Error adding product to order", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleDeleteProductFromOrrder = async (productId) => {
    try {
      const response = await deleteProductFromOrderApi(productId);
      if (response) {
        alert("product deleted from order");
      } else {
        alert("failed to delete product from order");
      }
    } catch (error) {
      console.log("Error deleting product from order", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          🛒 Supermarket Product Aisle
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Select any item below to view full details and manage your cart.
        </p>

        {/* Dynamic Product Grid with Vertical Scroll */}
        <div className="max-h-[650px] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => {
              const prodId = product._id || product.id;
              const prodImage = product.thumbnail || product.images?.[0];

              return (
                <div
                  key={prodId}
                  onClick={() => handleProductClick(prodId)}
                  className="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:border-indigo-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Grid Item Image Preview */}
                    {prodImage && (
                      <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center border border-gray-200">
                        <img 
                          src={prodImage} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      {product.category || "Aisle Item"}
                    </span>
                    <p className="font-bold text-gray-900 mt-1 truncate">
                      {product.title}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200/60">
                    <span className="text-sm font-bold text-indigo-600">
                      ${product.price}
                    </span>
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      View Details &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* POPUP CARD MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            
            {/* Modal Image Preview */}
            {(selectedProduct.thumbnail || selectedProduct.images?.[0]) && (
              <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                <img 
                  src={selectedProduct.thumbnail || selectedProduct.images[0]} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {selectedProduct.title}
                </h3>
              </div>
              <span className="text-xl font-bold text-indigo-600">
                ${selectedProduct.price}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              {/* Primary Action Buttons Row */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleConfirmAddToCart(selectedProduct)}
                  className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Go Back
                </button>
              </div>

              {/* Clean Full-Width Red Delete Button */}
           
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-pulse">
          Fetching items...
        </div>
      )}
    </div>
  );
}
