import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useCart } from "../context/CartContext";

const colors = ["#000000", "#ffffff", "#ff0000", "#0000ff", "#008000"];
const sizes = ["S", "M", "L", "XL"];
const textures = ["Cotton", "Polyester", "Silk"];

const ProductDetailsPage = () => {
  const snap = useSnapshot(state);
  const { addToCart } = useCart();
  const product = snap.selectedProduct;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl">No product selected</h2>
        <button
          onClick={() => (state.page = "store")}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      texture: selectedTexture,
    });
    alert("Order Success");
    state.page = "cart";
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: product image */}
        <div>
          <img src={product.src} alt={product.name} className="w-full rounded-lg shadow" />
        </div>

        {/* Right: customization */}
        <div>
          <p className="text-xl font-semibold mb-4">₹{product.price}</p>

          {/* Color */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Choose Color:</h3>
            <div className="flex space-x-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === c ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Choose Size:</h3>
            <div className="flex space-x-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1 rounded border ${
                    selectedSize === s ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Texture */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Choose Type:</h3>
            <select
              value={selectedTexture}
              onChange={(e) => setSelectedTexture(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              {textures.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
