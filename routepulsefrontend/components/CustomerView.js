//all clients needs of specifications will be added here 

'use client';
import { useState } from 'react';
import { getOneProductById, getAllProducts, getAllCategories } from '../lib/productsApi'; // Adjust path to where your API file is located

export default function CustomerDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Your handler that uses the imported dynamic fetch function
  const handleProductClick = async (id) => {
    try {
      setLoading(true);
      const result = await getOneProductById(id); // Calling your imported function!
      if (result) {
        setSelectedProduct(result);
      }
    } catch (error) {
      console.log('Error handling product click', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🛒 Supermarket Product Aisle</h2>
        <p className="text-sm text-gray-500 mb-6">Select any item below to view full details and manage your cart.</p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div 
              key={id}
              onClick={() => handleProductClick(id)}
              className="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:border-indigo-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Aisle Item</span>
                <p className="font-bold text-gray-900 mt-1">Supermarket Product #{id}</p>
              </div>
              <span className="text-xs font-medium text-gray-500 mt-4 flex items-center gap-1">
                View Details &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP CARD MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{selectedProduct.title}</h3>
              </div>
              <span className="text-xl font-bold text-indigo-600">${selectedProduct.price}</span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => {
                  alert(`Added ${selectedProduct.title} to your cart!`);
                  setSelectedProduct(null);
                }}
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
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-pulse">
          Fetching item info...
        </div>
      )}
    </div>
  );
}