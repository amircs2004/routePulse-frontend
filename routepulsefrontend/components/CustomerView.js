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
   <main className="relative min-h-screen w-full bg-slate-50/70 text-slate-800 flex flex-col overflow-hidden font-sans">
  {/* Decorative Ambient Background Glows */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
  <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

  <div className="flex-1 w-full max-w-7xl mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
    {/* Main Section Card */}
    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-8 shadow-xl shadow-slate-200/40">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100/60">
              Live Catalog
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            🛒 Supermarket Product Aisle
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
          Select any item below to view full details and manage your cart.
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Dynamic Product Grid with Vertical Scroll */}
      <div className="mt-6 max-h-[550px] sm:max-h-[650px] overflow-y-auto pr-1 sm:pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product) => {
            const prodId = product._id || product.id;
            const prodImage = product.thumbnail || product.images?.[0];

            return (
              <div
                key={prodId}
                onClick={() => handleProductClick(prodId)}
                className="group relative p-4 rounded-2xl bg-white border border-slate-200/70 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {prodImage && (
                    <div className="relative w-full h-32 sm:h-36 bg-slate-100/80 rounded-xl overflow-hidden mb-3.5 border border-slate-100 flex items-center justify-center">
                      <img
                        src={prodImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}

                  <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50/80 rounded-md border border-indigo-100/60 mb-1.5">
                    {product.category || "Aisle Item"}
                  </span>
                  <p className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition-colors truncate">
                    {product.title}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs sm:text-sm font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-3 sm:p-4">
        <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-100">
          
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
          >
            ✕
          </button>

          {selectedProduct.thumbnail || selectedProduct.images?.[0] ? (
            <div className="w-full h-40 sm:h-48 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
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
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-2">
                {selectedProduct.title}
              </h3>
            </div>
            <span className="text-base sm:text-xl font-bold text-indigo-600 shrink-0">
              ${selectedProduct.price}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {selectedProduct.description}
          </p>

          <div className="pt-3 sm:pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => handleConfirmAddToCart(selectedProduct)}
                className="w-full sm:flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.99]"
              >
                Add to Cart
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full sm:flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors active:scale-[0.99]"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {loading && (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-pulse z-50">
        Fetching items...
      </div>
    )}
  </div>
</main>
  );
}