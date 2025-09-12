import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const snap = useSnapshot(state);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-20 h-20 rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-sm">Qty: {item.qty}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    state.page = `product-${item.id}`;
                    state.selectedProduct = item;
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  Order Now
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => (state.page = "store")}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Store
        </button>
        {cart.length > 0 && (
          <button
            onClick={() => (state.page = "checkout")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
