"use client";

import { useEffect, useState } from "react";
import { getAllOrders, deleteProductFromOrderApi, handleUpdateQuantity } from "../lib/api";
import { getOneProductById } from "../lib/productsApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrdersWithProducts = async () => {
      console.log("DEBUG: Fetching orders initiated...");
      try {
        const result = await getAllOrders();
        console.log("DEBUG: getAllOrders result:", result);
        if (result && result.success) {
          // For each order, fetch product details for each item using its productId
          const enrichedOrders = await Promise.all(
            result.data.map(async (order) => {
              if (!order.items) return order;

              const enrichedItems = await Promise.all(
                order.items.map(async (item) => {
                  try {
                    // Use your function to fetch product data from DummyJSON
                    const productData = await getOneProductById(item.productId);
                    return {
                      ...item,
                      title: productData?.title || "Unknown Product",
                      price: productData?.price || 0,
                      thumbnail: productData?.thumbnail || productData?.images?.[0] || "",
                    };
                  } catch (err) {
                    return item; // Fallback if individual fetch fails
                  }
                })
              );

              return { ...order, items: enrichedItems };
            })
          );

          setOrders(enrichedOrders);
          console.log("DEBUG: Orders with enriched product details successfully loaded into state:", enrichedOrders);
        } else {
          setError(result?.message || "Failed to fetch orders");
          console.log("DEBUG: Failed to fetch orders, error message:", result?.message);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("DEBUG: Unexpected error while fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersWithProducts();
  }, []);

const handleDeleteProduct = async (productId) => {
    console.log("DELETE CLICKED FOR ID:", productId);
    try {
      setDeletingId(productId);
      const result = await deleteProductFromOrderApi(productId);
      console.log("DEBUG: deleteProductFromOrderApi response:", result);
      
      if (result && result.success && result.data) {
        const updatedOrder = result.data;
        
        // Re-enrich the items array with product details so they don't go blank
        if (updatedOrder.items) {
          const enrichedItems = await Promise.all(
            updatedOrder.items.map(async (item) => {
              const existingOrder = orders.find(o => o._id === updatedOrder._id);
              const existingItem = existingOrder?.items?.find(i => (i.productId || i._id || i.id) === (item.productId || item._id || item.id));
              
              if (existingItem && existingItem.title && existingItem.title !== "Unknown Product") {
                return { ...item, title: existingItem.title, price: existingItem.price, thumbnail: existingItem.thumbnail };
              }

              try {
                const productData = await getOneProductById(item.productId);
                return {
                  ...item,
                  title: productData?.title || "Unknown Product",
                  price: productData?.price || 0,
                  thumbnail: productData?.thumbnail || productData?.images?.[0] || "",
                };
              } catch (err) {
                return item;
              }
            })
          );
          updatedOrder.items = enrichedItems;
        }

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          ),
        );
        console.log("DEBUG: Orders state updated successfully after deletion with enriched data.");
      }
    } catch (err) {
      console.error("DEBUG: Failed to delete product", err);
    } finally {
      setDeletingId(null);
    }
  };

const handleQuantityUpdate = async (orderId, productId, change) => {
    console.log("DEBUG: Quantity update triggered | orderId:", orderId, "| productId:", productId, "| change:", change);
    try {
      setUpdatingId(productId);
      const result = await handleUpdateQuantity(productId, orderId, change);
      console.log("DEBUG: handleUpdateQuantity response:", result);

      if (result && result.order) {
        // Re-enrich the updated order's items with product details (title, price, thumbnail)
        const updatedOrder = result.order;
        if (updatedOrder.items) {
          const enrichedItems = await Promise.all(
            updatedOrder.items.map(async (item) => {
              // Try to find existing item details first to avoid unnecessary refetches
              const existingOrder = orders.find(o => o._id === updatedOrder._id);
              const existingItem = existingOrder?.items?.find(i => (i.productId || i._id || i.id) === (item.productId || item._id || item.id));
              
              if (existingItem && existingItem.title && existingItem.title !== "Unknown Product") {
                return { ...item, title: existingItem.title, price: existingItem.price, thumbnail: existingItem.thumbnail };
              }

              // Fallback fetch if not found
              try {
                const productData = await getOneProductById(item.productId);
                return {
                  ...item,
                  title: productData?.title || "Unknown Product",
                  price: productData?.price || 0,
                  thumbnail: productData?.thumbnail || productData?.images?.[0] || "",
                };
              } catch (err) {
                return item;
              }
            })
          );
          updatedOrder.items = enrichedItems;
        }

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        console.log("DEBUG: Orders state updated successfully with enriched data.");
      }
    } catch (err) {
      console.error("DEBUG: Error updating product quantity:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#FAFAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-rose-50/50 border border-rose-100 rounded-2xl text-rose-600">
        <p className="font-semibold text-sm">Unable to load orders</p>
        <p className="text-xs text-rose-500 mt-0.5">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-5 rounded-3xl border border-slate-200/70 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              My Orders
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              View and track your previous purchases
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-indigo-100/80">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </header>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-dashed border-slate-300/80 shadow-sm px-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100/60">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-base">No orders found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              When you place orders from the product aisle, they will appear right here for tracking.
            </p>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-5">
            {orders.map((order) => {
              const isActive = order.status?.toLowerCase() === "active";

              return (
                <div
                  key={order._id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 space-y-5"
                >
                  {/* Order Meta Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">
                        Order Identifier
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 font-mono mt-0.5">
                        {order._id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : "bg-slate-100 text-slate-600 border border-slate-200/50"
                        }`}
                      >
                        {order.status || "Processing"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Items List Strip */}
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Ordered Items
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.items.map((item, idx) => {
                          const currentProductId = item.productId || item._id || item.id;
                          const isUpdating = updatingId === currentProductId;

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60 hover:bg-slate-100/60 transition-colors relative group"
                            >
                              {/* Item Thumbnail */}
                              {item.thumbnail ? (
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-12 h-12 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-slate-200/70 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-medium shrink-0">
                                  No img
                                </div>
                              )}

                              {/* Item Info */}
                              <div className="overflow-hidden flex-1 pr-6">
                                <p className="text-xs font-bold text-slate-800 truncate" title={item.title}>
                                  {item.title}
                                </p>
                                <p className="text-xs text-indigo-600 font-extrabold mt-0.5">
                                  ${item.price?.toFixed(2)}
                                </p>

                                {/* Quantity Increment / Decrement Controls */}
                                {isActive && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      onClick={() => handleQuantityUpdate(order._id, currentProductId, -1)}
                                      disabled={isUpdating}
                                      className="w-6 h-6 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
                                      title="Decrease quantity"
                                    >
                                      -
                                    </button>
                                    <span className="text-xs font-bold text-slate-700 min-w-[16px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityUpdate(order._id, currentProductId, 1)}
                                      disabled={isUpdating}
                                      className="w-6 h-6 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
                                      title="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Remove Item Button */}
                              {isActive && (
                                <button
                                  onClick={() => handleDeleteProduct(currentProductId)}
                                  disabled={deletingId === currentProductId}
                                  className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50"
                                  title="Remove item"
                                >
                                  {deletingId === currentProductId ? (
                                    <span className="text-[10px] font-bold text-slate-400">...</span>
                                  ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  )}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Integrated Bottom Checkout Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ready to complete your purchase?</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">Proceed to finalize all pending order items</p>
          </div>
          <a
            href="https://routefrontend.vercel.app/checkout"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
          >
            <span>Proceed to Checkout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}