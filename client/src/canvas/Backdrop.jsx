import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.5} // Slightly increased alphaTest to make shadows a bit darker
      scale={10} // Reduced scale for a more defined shadow area
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.05]} // Position remains for subtle shadows
    >
      <RandomizedLight 
        amount={2} // Kept amount low for fewer light sources
        radius={8} // Adjusted radius to control shadow softness
        intensity={0.5} // Medium intensity for balanced lighting
        ambient={0.4} // Increased ambient for overall brightness
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={2} // Kept amount low for fewer light sources
        radius={8} // Adjusted radius to control shadow softness
        intensity={0.5} // Medium intensity for balanced lighting
        ambient={0.4} // Increased ambient for overall brightness
        position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
