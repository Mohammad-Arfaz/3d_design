import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  const handleColorChange = (color) => {
    // Update the color for the currently selected model
    if (state.modelCustomizations[state.selectedModel]) {
      state.modelCustomizations[state.selectedModel].color = color.hex;
    }
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={handleColorChange}
      />
    </div>
  )
}

export default ColorPicker