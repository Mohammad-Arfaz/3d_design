// components/DrawingBoard.js
import React, { useRef, useState, useEffect } from "react";

export default function DrawingBoard({ onSave }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  const saveCanvas = () => onSave && onSave(canvasRef.current.toDataURL("image/png"));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={clearCanvas}>Clear</button>
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={saveCanvas}>Save & Use</button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[200px] bg-black rounded-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
