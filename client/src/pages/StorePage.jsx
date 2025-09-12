import React, { useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useCart } from "../context/CartContext";

// 🔹 Existing local models
const LOCAL_MODELS = [
  { id: "adidas_jacket", name: "Adidas Jacket", src: "/adidas_jacket.glb", gender: "men", type: "jacket", price: 59 },
  { id: "jeans_denim_pants", name: "Jeans Denim Pants", src: "/jeans_denim_pants.glb", gender: "men", type: "pants", price: 45 },
  { id: "man_shorts", name: "Men Shorts", src: "/man_shorts.glb", gender: "men", type: "shorts", price: 29 },
  { id: "men_jacket_baked", name: "Men Jacket (Baked)", src: "/men_jacket_baked.glb", gender: "men", type: "jacket", price: 65 },
  { id: "shirt_baked", name: "Shirt (Baked)", src: "/shirt_baked.glb", gender: "men", type: "shirt", price: 35 },
  { id: "orange_puff_shorts", name: "Orange Puff Shorts", src: "/orange_puff_shorts.glb", gender: "men", type: "shorts", price: 32 },
  { id: "pants_baked", name: "Pants (Baked)", src: "/pants_baked.glb", gender: "men", type: "pants", price: 42 },
  { id: "stylish_hoodi", name: "Stylish Hoodie", src: "/stylish_hoodi.glb", gender: "unisex", type: "hoodie", price: 48 },
  //{ id: "t_shirt_hoodie_3d_model", name: "T-Shirt Hoodie 3D", src: "/t_shirt_hoodie_3d_model.glb", gender: "unisex", type: "hoodie", price: 50 },
  { id: "t-shirt_-_llengan_panjang", name: "Long Sleeve T-Shirt", src: "/t-shirt_-_llengan_panjang.glb", gender: "men", type: "shirt", price: 38 },
  { id: "denim_shirt", name: "Denim Shirt", src: "/denim_shirt.glb", gender: "unisex", type: "shirt", price: 39 },
  //{ id: "white_grace", name: "White Grace Dress", src: "/white_grace.glb", gender: "women", type: "dress", price: 55 },
];

// Categories
const CATEGORIES = ["all", "men", "women", "jacket", "hoodie", "shorts", "pants", "shirt", "dress", "custom"];

export default function StorePage() {
  const snap = useSnapshot(state);
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null); // Full-screen modal

  const mvRefs = useRef({});

  // Merge local + custom models, custom models come first
  const allModels = useMemo(() => {
    const customs = (snap.savedCustoms || []).map((c, idx) => ({
      id: `custom-${idx}`,
      name: c.name || "Custom Design",
      src: c.preview || "/placeholder.png",
      gender: "unisex",
      type: "custom",
      price: c.price || 60,
      description: c.description || "My unique design",
      isCustom: true,
    }));
    return [...customs, ...LOCAL_MODELS]; // customs first
  }, [snap.savedCustoms]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return allModels.filter((m) => {
      const byCategory = category === "all" || m.gender === category || m.type === category;
      const bySearch = !s || m.name.toLowerCase().includes(s);
      return byCategory && bySearch;
    });
  }, [search, category, allModels]);

  const handleAddToCart = (model) => {
    addToCart({ id: model.id, name: model.name, price: model.price, src: model.src, qty: 1 });
    state.page = "cart";
  };

  const handleViewAR = async (model) => {
    if (model.isCustom) {
      alert("AR not available for custom designs (use PNG preview).");
      return;
    }
    const el = mvRefs.current[model.id];
    if (!el) return;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return alert("AR works on mobile. Open on phone.");
    if (isIOS) return alert("iOS requires USDZ file.");
    try { await el.activateAR(); } catch { alert("AR failed."); }
  };

  const handleDownloadPNG = (model) => {
    if (model.isCustom && model.src) {
      const a = document.createElement("a");
      a.href = model.src;
      a.download = `${model.name.replace(/\s+/g, "_")}.png`;
      a.click();
      return;
    }
    const el = mvRefs.current[model.id];
    if (!el) return;
    try {
      const canvas = el?.shadowRoot?.querySelector("canvas");
      if (!canvas) return alert("Renderer not ready.");
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${model.name.replace(/\s+/g, "_")}.png`;
      a.click();
    } catch { alert("Download failed."); }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => (state.page = "customizer")} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">← Back</button>
          <h1 className="text-xl font-bold">3D Model Store</h1>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search clothes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-64"
          />
          <div className="hidden md:flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg ${category === cat ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Category row */}
      <div className="md:hidden p-3 bg-white border-b overflow-x-auto">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-lg ${category === cat ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <p className="text-gray-600">No models found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-xl shadow border p-4 flex flex-col cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedProduct(m)}
              >
                {/* Fixed-height container */}
                <div className="w-full h-[260px] bg-gray-50 rounded-lg overflow-hidden">
                  {m.isCustom ? (
                    <img src={m.src} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <model-viewer
                      ref={(el) => (mvRefs.current[m.id] = el)}
                      src={m.src}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      camera-controls
                      auto-rotate
                      loading="lazy"
                      reveal="auto"
                      style={{ width: "100%", height: "100%" }}
                    ></model-viewer>
                  )}
                </div>

                <div className="mt-3 flex-1">
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{m.gender} • {m.type}</p>
                  <p className="mt-1 font-bold">₹{Math.round(m.price * 83)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Model Preview */}
              <div className="md:flex-1 w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden">
                {selectedProduct.isCustom ? (
                  <img src={selectedProduct.src} alt={selectedProduct.name} className="w-full h-full object-cover" />
                ) : (
                  <model-viewer
                    ref={(el) => (mvRefs.current[selectedProduct.id] = el)}
                    src={selectedProduct.src}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    loading="lazy"
                    reveal="auto"
                    style={{ width: "100%", height: "100%" }}
                  ></model-viewer>
                )}
              </div>

              {/* Product Details */}
              <div className="md:flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <p className="text-gray-700">{selectedProduct.description || "No description available."}</p>
                <p className="text-xl font-semibold">₹{Math.round(selectedProduct.price * 83)}</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => alert("Order placed! (simulate)")}>Order Now</button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 col-span-2" onClick={() => handleViewAR(selectedProduct)}>View in AR</button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 col-span-2" onClick={() => handleDownloadPNG(selectedProduct)}>Download PNG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
