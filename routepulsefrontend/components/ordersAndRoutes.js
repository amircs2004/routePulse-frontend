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
    <div className="min-h-screen bg-[#FAFAFC] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md px-6 py-5 rounded-3xl border border-gray-100 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              My Orders
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              View and track your previous purchases
            </p>
          </div>
          <span className="bg-indigo-50/80 text-indigo-600 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-100/50">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-500 text-lg">
              🛒
            </div>
            <p className="text-gray-800 font-semibold text-sm">
              No orders found
            </p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              When you place orders from the product aisle, they will appear
              right here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isActive = order.status?.toLowerCase() === "active";

              return (
                <div
                  key={order._id}
                  className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 space-y-5"
                >
                  {/* Order Meta Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-50">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Order Identifier
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5 font-mono">
                        {order._id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-medium px-3 py-1 rounded-full capitalize ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status || "Processing"}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Items List Strip */}
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Ordered Items
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.items.map((item, idx) => {
                          const currentProductId = item.productId || item._id || item.id;
                          const isUpdating = updatingId === currentProductId;

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-[#FAFAFC] p-3 rounded-2xl border border-gray-100/80 hover:bg-gray-50/80 transition-colors relative"
                            >
                              {/* Item Thumbnail */}
                              {item.thumbnail ? (
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-12 h-12 object-cover rounded-xl border border-gray-200/60 bg-white shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[10px] text-gray-400 shrink-0">
                                  No img
                                </div>
                              )}

                              {/* Item Info */}
                              <div className="overflow-hidden flex-1">
                                <p className="text-xs font-bold text-gray-800 truncate">
                                  {item.title}
                                </p>
                                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                                  ${item.price?.toFixed(2)}
                                </p>

                                {/* Quantity Increment / Decrement Controls */}
                                {isActive && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      onClick={() => handleQuantityUpdate(order._id, currentProductId, -1)}
                                      disabled={isUpdating}
                                      className="w-6 h-6 bg-white border border-gray-200 hover:border-indigo-200 text-gray-600 hover:text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-xs transition-all disabled:opacity-50"
                                      title="Decrease quantity"
                                    >
                                      -
                                    </button>
                                    <span className="text-xs font-semibold text-gray-700 min-w-[20px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityUpdate(order._id, currentProductId, 1)}
                                      disabled={isUpdating}
                                      className="w-6 h-6 bg-white border border-gray-200 hover:border-indigo-200 text-gray-600 hover:text-indigo-600 rounded-lg flex items-center justify-center text-xs font-bold shadow-xs transition-all disabled:opacity-50"
                                      title="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Delete Button */}
                              {isActive && (
                                <button
                                  onClick={() => handleDeleteProduct(currentProductId)}
                                  disabled={deletingId === currentProductId}
                                  className="absolute top-2.5 right-2.5 bg-white border border-gray-200 hover:border-rose-200 text-gray-400 hover:text-rose-600 p-1.5 rounded-xl shadow-xs transition-all text-xs flex items-center justify-center"
                                  title="Remove item"
                                >
                                  {deletingId === currentProductId ? "..." : "🗑️"}
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
      </div>
    </div>
  );
}