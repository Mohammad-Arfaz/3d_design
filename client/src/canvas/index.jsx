import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";

const RotatableShirt = () => {
  const ref = useRef();
  const { camera } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [zoom, setZoom] = useState(2.5); // initial camera distance

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotationY;
    }
    camera.position.z = zoom;
  });

  // Mouse drag rotation
  const onPointerDown = (e) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      setRotationY((prev) => prev + deltaX * 0.01); // adjust speed
      setLastX(e.clientX);
    }
  };

  const onPointerUp = () => setIsDragging(false);

  // Mouse wheel zoom
  const onWheel = (e) => {
    setZoom((prev) => Math.min(Math.max(prev - e.deltaY * 0.01, 1.5), 5)); // clamp zoom
  };

  // Keyboard controls
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setRotationY((prev) => prev + 0.05);
        break;
      case "ArrowRight":
        setRotationY((prev) => prev - 0.05);
        break;
      case "ArrowUp":
        setZoom((prev) => Math.max(prev - 0.1, 1.5));
        break;
      case "ArrowDown":
        setZoom((prev) => Math.min(prev + 0.1, 5));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
    >
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        }
      >
        <Shirt />
      </Suspense>
    </group>
  );
};

const CanvasModel = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <CameraRig>
          <Center>
            <RotatableShirt />
          </Center>
        </CameraRig>
      </Canvas>
    </div>
  );
};

export default CanvasModel;
