// src/canvas/Shirt.jsx
import React, { useMemo } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import state from "../store";
import { AvailableModels } from "../config/constants";

// ---------- Text Decal ----------
function TextDecal({ textElement }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textElement.color || "#000000";
    ctx.font = `${textElement.fontSize || 24}px ${
      textElement.fontFamily || "Arial"
    }`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(textElement.text || "", canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
  }, [
    textElement.text,
    textElement.fontSize,
    textElement.fontFamily,
    textElement.color,
  ]);

  return (
    <Decal
      position={[
        textElement.position?.x ?? 0,
        textElement.position?.y ?? 0.15,
        textElement.position?.z ?? 0.25,
      ]}
      rotation={[0, 0, 0]}
      scale={0.3}
      map={texture}
      depthTest={false}
      depthWrite={true}
    />
  );
}

// ---------- Shirt ----------
const Shirt = () => {
  const snap = useSnapshot(state);

  // Get current model
  const getCurrentModel = () => {
    const categoryModels = AvailableModels[snap.selectedCategory] || [];
    const foundModel = categoryModels.find(
      (model) => model.id === snap.selectedModel
    );
    return foundModel || categoryModels[0];
  };

  const currentModel = getCurrentModel();
  const modelPath = currentModel?.modelPath || "/shirt_baked.glb";
  const renderKey = `${snap.selectedModel}-${snap.selectedCategory}-${modelPath}`;

  // ---------- Logo Textures ----------
  const logoTexture = useTexture(snap.logoDecal || "/new1.png");
  const fullTexture = useTexture(snap.fullDecal || "/new1.png");
  const logoLeftTexture = useTexture(snap.logoLeftDecal || "/new1.png");
  const logoRightTexture = useTexture(snap.logoRightDecal || "/new1.png");

  // ---------- Pattern Textures ----------
  const patternCenter =
    snap.modelCustomizations?.[snap.selectedModel]?.patternCenter || null;
  const patternFull =
    snap.modelCustomizations?.[snap.selectedModel]?.patternFull || null;
  const patternLeft =
    snap.modelCustomizations?.[snap.selectedModel]?.patternLeft || null;
  const patternRight =
    snap.modelCustomizations?.[snap.selectedModel]?.patternRight || null;

  const patternCenterTex = useTexture(patternCenter || "/new1.png");
  const patternFullTex = useTexture(patternFull || "/new1.png");
  const patternLeftTex = useTexture(patternLeft || "/new1.png");
  const patternRightTex = useTexture(patternRight || "/new1.png");

  // Load model
  let gltfData;
  try {
    gltfData = useGLTF(modelPath);
  } catch (error) {
    console.error("Error loading model:", modelPath, error);
    gltfData = useGLTF("/shirt_baked.glb");
  }

  const { nodes, materials } = gltfData;

  // Helpers
  const findModelGeometry = () => {
    const nodeKeys = Object.keys(nodes || {});
    if (currentModel?.geometryNode && currentModel.geometryNode !== "auto") {
      const configuredNodes = Array.isArray(currentModel.geometryNode)
        ? currentModel.geometryNode
        : [currentModel.geometryNode];
      for (const nodeKey of configuredNodes) {
        if (nodes[nodeKey]?.geometry) {
          return { key: nodeKey, geometry: nodes[nodeKey].geometry };
        }
      }
    }
    if (modelPath.includes("shirt_baked") && nodes.T_Shirt_male?.geometry) {
      return { key: "T_Shirt_male", geometry: nodes.T_Shirt_male.geometry };
    }
    for (const key of nodeKeys) {
      if (nodes[key]?.geometry) return { key, geometry: nodes[key].geometry };
    }
    return null;
  };

  const findModelMaterial = () => {
    if (modelPath.includes("shirt_baked") && materials.lambert1) {
      return materials.lambert1;
    }
    const keys = Object.keys(materials || {});
    return keys.length > 0 ? materials[keys[0]] : null;
  };

  const geometryInfo = findModelGeometry();
  const material = findModelMaterial();

  useFrame((_, delta) => {
    if (material && material.color) {
      easing.dampC(material.color, snap.color, 0.25, delta);
    }
  });

  if (!geometryInfo || !material) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={snap.color} />
        </mesh>
      </group>
    );
  }

  const logoPosition = currentModel?.decalPositions?.logo || [0, 0.04, 0.15];
  const fullPosition = currentModel?.decalPositions?.full || [0, 0, 0];

  const getModelScale = () => {
    if (modelPath.includes("white_grace")) return [2, 2, 2];
    if (modelPath.includes("hoodie")) return [0.01, 0.01, 0.01];
    return [1, 1, 1];
  };

  const getModelPosition = () => {
    if (modelPath.includes("white_grace")) return [0, 0.6, 0];
    return [0, 0, 0];
  };

  const getModelRotation = () => {
    if (modelPath.includes("hoodie")) return [Math.PI / 2, 0, 0];
    return [0, 0, 0];
  };

  return (
    <group key={renderKey}>
      <mesh
        castShadow
        geometry={geometryInfo.geometry}
        material={material}
        material-roughness={1}
        dispose={null}
        scale={getModelScale()}
        position={getModelPosition()}
        rotation={getModelRotation()}
      >
       {/* ---------- Full Texture ---------- */}
{snap.isFullTexture && snap.fullDecal && (
  <Decal
    position={fullPosition}
    rotation={[0, 0, 0]}
    scale={1}
    map={fullTexture}
  />
)}
{snap.isFullTexture && patternFull && (
  <Decal
    position={fullPosition}
    rotation={[0, 0, 0]}
    scale={1}
    map={patternFullTex}
    material-transparent={true}
    material-toneMapped={false}
    material-color={snap.color}   // 👈 tint applied here
    depthTest={false}
    depthWrite={true}
  />
)}


        {/* ---------- Center Logo / Pattern ---------- */}
        {snap.isLogoTexture && snap.logoDecal && (
          <Decal
            position={snap.logoCenterPosition || logoPosition}
            rotation={[0, 0, 0]}
            scale={snap.logoCenterScale || 0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoTexture && patternCenter && (
          <Decal
            position={snap.logoCenterPosition || logoPosition}
            rotation={[0, 0, 0]}
            scale={snap.logoCenterScale || 0.15}
            map={patternCenterTex}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* ---------- Left Logo / Pattern ---------- */}
        {snap.isLogoLeftTexture && snap.logoLeftDecal && (
          <Decal
            position={snap.logoLeftPosition || [-0.13, 0.1, 0.1]}
            rotation={[0, 0, 0]}
            scale={snap.logoLeftScale || 0.1}
            map={logoLeftTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoLeftTexture && patternLeft && (
          <Decal
            position={snap.logoLeftPosition || [-0.13, 0.1, 0.1]}
            rotation={[0, 0, 0]}
            scale={snap.logoLeftScale || 0.1}
            map={patternLeftTex}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* ---------- Right Logo / Pattern ---------- */}
        {snap.isLogoRightTexture && snap.logoRightDecal && (
          <Decal
            position={snap.logoRightPosition || [0.13, 0.1, 0.1]}
            rotation={[0, 0, 0]}
            scale={snap.logoRightScale || 0.1}
            map={logoRightTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoRightTexture && patternRight && (
          <Decal
            position={snap.logoRightPosition || [0.13, 0.1, 0.1]}
            rotation={[0, 0, 0]}
            scale={snap.logoRightScale || 0.1}
            map={patternRightTex}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* ---------- Text decals ---------- */}
        {Array.isArray(snap.textElements) &&
          snap.textElements.map((t) => <TextDecal key={t.id} textElement={t} />)}
      </mesh>
    </group>
  );
};

export default Shirt;
