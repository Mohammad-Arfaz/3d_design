import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import state from "../store";
import { useSnapshot } from "valtio";

const TextCustomizer = ({ addTextToModel, activeText, updateText }) => {
  const snap = useSnapshot(state);

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontStyle, setFontStyle] = useState("normal");
  const [underline, setUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [position, setPosition] = useState({ x: 0, y: 0.1, z: 0.2 });

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Verdana",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Impact",
    "Trebuchet MS",
    "Palatino Linotype",
    "Garamond",
    "Lucida Console",
    "Tahoma",
    "Franklin Gothic Medium",
    "Brush Script MT",
  ];

  const fontStyles = ["normal", "bold", "italic", "bold italic"];

  // Load active text when selected
  useEffect(() => {
    if (activeText) {
      setText(activeText.text || "");
      setFontSize(activeText.fontSize || 24);
      setFontFamily(activeText.fontFamily || "Arial");
      setFontStyle(activeText.fontStyle || "normal");
      setUnderline(activeText.underline || false);
      setTextColor(activeText.color || "#000000");
      setPosition(activeText.position || { x: 0, y: 0.1, z: 0.2 });
    } else {
      setText("");
      setFontSize(24);
      setFontFamily("Arial");
      setFontStyle("normal");
      setUnderline(false);
      setTextColor("#000000");
      setPosition({ x: 0, y: 0.1, z: 0.2 });
    }
  }, [activeText]);

  // ✅ Add NEW Text
  const handleAdd = () => {
    if (text.trim()) {
      const textElement = {
        id: Date.now().toString(),
        text: text.trim(),
        fontSize,
        fontFamily,
        fontStyle,
        underline,
        color: textColor,
        position,
      };
      state.textElements = [...state.textElements, textElement];
      state.activeTextId = textElement.id;
      addTextToModel(textElement);

      // reset input
      setText("");
      setFontSize(24);
      setFontFamily("Arial");
      setFontStyle("normal");
      setUnderline(false);
      setTextColor("#000000");
      setPosition({ x: 0, y: 0.1, z: 0.2 });
    }
  };

  // ✅ Update EXISTING text
  const handleUpdate = () => {
    if (activeText) {
      updateText(activeText.id, {
        text: text.trim(),
        fontSize,
        fontFamily,
        fontStyle,
        underline,
        color: textColor,
        position,
      });
    }
  };

  // ✅ Delete Text
  const handleDelete = () => {
    if (activeText) {
      state.textElements = state.textElements.filter(
        (t) => t.id !== activeText.id
      );
      state.activeTextId = null;
    }
  };

  return (
    <div className="text-editor-panel glassmorphism p-2 w-[280px] h-[500px] overflow-y-auto rounded-lg bg-gray-800/90 backdrop-blur-sm scrollbar-hide">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-black mb-2">Text Editor</h3>

        {/* Text Input */}
        <textarea
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="2"
        />

        {/* Font Size */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-black">Font Size: {fontSize}px</label>
          <input
            type="range"
            min="12"
            max="120"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Font Family */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-black">Font Family:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font Style */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-black">Font Style:</label>
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          >
            {fontStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        {/* Underline Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={underline}
            onChange={(e) => setUnderline(e.target.checked)}
          />
          <label className="text-xs text-black">Underline</label>
        </div>

        {/* Text Color */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-black">Text Color:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-8 bg-gray-700 rounded-md"
          />
        </div>

        {/* Position Controls */}
        <div className="grid grid-cols-3 gap-2">
          {["x", "y", "z"].map((axis) => (
            <div key={axis}>
              <label className="block text-xs text-black mb-1">
                {axis.toUpperCase()}
              </label>
              <input
                type="number"
                step="0.01"
                value={position[axis]}
                onChange={(e) =>
                  setPosition({
                    ...position,
                    [axis]: parseFloat(e.target.value),
                  })
                }
                className="border rounded w-full p-1 text-black text-xs"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <CustomButton
            type="filled"
            title="Add Text"
            handleClick={handleAdd}
            customStyles="flex-1 px-2 py-1 font-bold text-xs bg-green-500 hover:bg-green-600 text-white rounded-md"
          />
          {activeText && (
            <CustomButton
              type="filled"
              title="Update"
              handleClick={handleUpdate}
              customStyles="flex-1 px-2 py-1 font-bold text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            />
          )}
        </div>

        {activeText && (
          <CustomButton
            type="filled"
            title="Delete Text"
            handleClick={handleDelete}
            customStyles="w-full px-2 py-1 font-bold text-xs bg-red-500 hover:bg-red-600 text-white rounded-md"
          />
        )}
      </div>

      {/* ✅ Text List */}
      {snap.textElements.length > 0 && (
        <div className="mt-4 bg-gray-900/80 p-2 rounded-lg">
          <h4 className="text-white text-sm mb-1">Texts on Shirt</h4>
          <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto scrollbar-hide">
            {snap.textElements.map((txt) => (
              <div
                key={txt.id}
                className={`p-2 rounded-md cursor-pointer ${
                  snap.activeTextId === txt.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
                onClick={() => (state.activeTextId = txt.id)}
              >
                {txt.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextCustomizer;
