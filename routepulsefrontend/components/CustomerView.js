"use client";
import { useState, useEffect } from "react";
import {
  getOneProductById,
  getAllProducts,
  getAllCategories,
} from "../lib/productsApi";
import { addProductToOrder, deleteProductFromOrderApi } from "../lib/api";
import CategoryFilter from "../components/categoryFilter";

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const categoriesData = await getAllCategories();
        setProducts(data.products || data || []);
        setCategories(categoriesData || []);
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

      await addProductToOrder(productPayload);
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

  // Filter products dynamically based on the selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="w-full min-h-screen bg-gray-50/50 flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 p-3 sm:p-6 lg:p-8">
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-200/80">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-4">
            🛒 Supermarket Product Aisle
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Select any item below to view full details and manage your cart.
          </p>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {/* Dynamic Product Grid with Vertical Scroll */}
          <div className="max-h-[550px] sm:max-h-[650px] overflow-y-auto pr-1 sm:pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => {
                const prodId = product._id || product.id;
                const prodImage = product.thumbnail || product.images?.[0];

                return (
                  <div
                    key={prodId}
                    onClick={() => handleProductClick(prodId)}
                    className="p-4 sm:p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:border-indigo-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      {prodImage && (
                        <div className="w-full h-32 sm:h-36 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center border border-gray-200">
                          <img
                            src={prodImage}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <span className="text-[10px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                        {product.category || "Aisle Item"}
                      </span>
                      <p className="font-bold text-gray-900 text-sm sm:text-base mt-1 truncate">
                        {product.title}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 border-t border-gray-200/60">
                      <span className="text-xs sm:text-sm font-bold text-indigo-600">
                        ${product.price}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-500 flex items-center gap-1">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl bg-white p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4 max-h-[90vh] overflow-y-auto">
              {selectedProduct.thumbnail || selectedProduct.images?.[0] ? (
                <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                  <img
                    src={selectedProduct.thumbnail || selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mt-2">
                    {selectedProduct.title}
                  </h3>
                </div>
                <span className="text-base sm:text-xl font-bold text-indigo-600 shrink-0">
                  ${selectedProduct.price}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => handleConfirmAddToCart(selectedProduct)}
                    className="w-full sm:flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full sm:flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-pulse z-50">
            Fetching items...
          </div>
        )}
      </div>
    </main>
  );
}