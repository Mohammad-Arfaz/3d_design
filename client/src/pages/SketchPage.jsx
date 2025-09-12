// src/pages/SketchPage.jsx
import React, { useRef, useState, useEffect } from "react";
import state from "../store"; // ✅ to change pages

const SketchPage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState("pen"); // pen | line | rect | circle
  const [startPos, setStartPos] = useState(null);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 2000; // large width for scroll
    canvas.height = 2000; // large height for scroll

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    setStartPos({ x: offsetX, y: offsetY });

    if (tool === "pen") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pen") {
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool !== "pen" && startPos) {
      const ctx = ctxRef.current;
      ctx.beginPath();
      if (tool === "line") {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(offsetX, offsetY);
      } else if (tool === "rect") {
        ctx.rect(
          startPos.x,
          startPos.y,
          offsetX - startPos.x,
          offsetY - startPos.y
        );
      } else if (tool === "circle") {
        const radius = Math.sqrt(
          Math.pow(offsetX - startPos.x, 2) +
            Math.pow(offsetY - startPos.y, 2)
        );
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      }
      ctx.stroke();
    }

    // save to history for undo
    const canvas = canvasRef.current;
    setHistory((prev) => [...prev, canvas.toDataURL()]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    const imgData = newHistory[newHistory.length - 1];
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const goBack = () => {
    state.page = "customizer";
  };

  return (
    <div
      className={`w-full h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Toolbar */}
      <div
        className={`p-2 flex gap-2 items-center shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={goBack}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          ← Back
        </button>

        <label>🎨 Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label>🖌 Size:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />

        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="border p-1 rounded text-black"
        >
          <option value="pen">Pen</option>
          <option value="line">Line</option>
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
        </select>

        <button
          onClick={handleUndo}
          className="px-2 py-1 bg-yellow-400 rounded"
        >
          Undo
        </button>
        <button
          onClick={handleClear}
          className="px-2 py-1 bg-red-500 rounded text-white"
        >
          Clear
        </button>

        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 bg-gray-600 text-white rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Scrollable Drawing Area */}
      <div className="flex-1 overflow-auto">
        <canvas
          ref={canvasRef}
          className={`cursor-crosshair ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default SketchPage;
