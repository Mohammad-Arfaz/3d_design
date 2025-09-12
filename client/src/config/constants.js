import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";
// src/config/constants.js (or wherever you keep EditorTabs)

//import { swatch, fileIcon, ai } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
  {
    name: "modelpicker",
    icon: fileIcon,
  },
  {
    name: "patternpicker",   // ✅ new
    icon: fileIcon,          // replace with a nice texture/pattern icon later
  },
];

// Existing...
export const FilterTabs = [
  { name: "logoShirt", icon: logoShirt },
  { name: "stylishShirt", icon: stylishShirt },
  { name: "logoLeftShirt", icon: logoShirt },
  { name: "logoRightShirt", icon: logoShirt },

  /* Existing patterns
  { name: "dotsPattern", icon: "/bigdots.webp" },
  { name: "stripesPattern", icon: "/stripe.jpg" },
  { name: "circlesPattern", icon: "/circles.png" },
  { name: "smallDotsPattern", icon: "/dot.jpg" },
   

  🆕 New patterns
  { name: "pattern1", icon: "/new1.png" },
  { name: "pattern2", icon: "/new2.png" },
  { name: "pattern3", icon: "/new3.png" },
  { name: "pattern4", icon: "/new4.png" },
  { name: "pattern5", icon: "/new5.jpeg" },
  { name: "pattern6", icon: "/new6.jpeg" },
  { name: "pattern7", icon: "/new7.jpeg" },
  { name: "pattern8", icon: "/new8.jpeg" },
  { name: "pattern9", icon: "/new9.jpeg" },
  { name: "pattern10", icon: "/new10.jpeg" },
   */
];  

export const DecalTypes = {
  logo: { stateProperty: "logoDecal", filterTab: "logoShirt" },
  full: { stateProperty: "fullDecal", filterTab: "stylishShirt" },
  logoLeft: { stateProperty: "logoLeftDecal", filterTab: "logoLeftShirt" },
  logoRight: { stateProperty: "logoRightDecal", filterTab: "logoRightShirt" },
  dots: { stateProperty: "dotsDecal", filterTab: "dotsPattern" },
  stripes: { stateProperty: "stripesDecal", filterTab: "stripesPattern" },
  circles: { stateProperty: "circlesDecal", filterTab: "circlesPattern" },
  smallDots: { stateProperty: "smallDotsDecal", filterTab: "smallDotsPattern" },

  // 🆕 New patterns
  pattern1: { stateProperty: "pattern1Decal", filterTab: "pattern1" },
  pattern2: { stateProperty: "pattern2Decal", filterTab: "pattern2" },
  pattern3: { stateProperty: "pattern3Decal", filterTab: "pattern3" },
  pattern4: { stateProperty: "pattern4Decal", filterTab: "pattern4" },
  pattern5: { stateProperty: "pattern5Decal", filterTab: "pattern5" },
  pattern6: { stateProperty: "pattern6Decal", filterTab: "pattern6" },
  pattern7: { stateProperty: "pattern7Decal", filterTab: "pattern7" },
  pattern8: { stateProperty: "pattern8Decal", filterTab: "pattern8" },
  pattern9: { stateProperty: "pattern9Decal", filterTab: "pattern9" },
  pattern10: { stateProperty: "pattern10Decal", filterTab: "pattern10" },
};


// Model Categories and Available Models
export const ModelCategories = [
  {
    id: "tshirts",
    name: "T-Shirts",
    shortTitle: "SHIRT",
    icon: logoShirt, // Will use shortTitle for now
  },
  {
    id: "jackets",
    name: "Jackets",
    shortTitle: "JACK",
    icon: fileIcon,
  },
  {
    id: "pants",
    name: "Pants",
    shortTitle: "PANT",
    icon: fileIcon,
  },
  {
    id: "shorts",
    name: "Shorts",
    shortTitle: "SHORT",
    icon: fileIcon,
  },
  {
    id: "women",
    name: "Women",
    shortTitle: "WOMEN",
    icon: fileIcon,
  },
  {
    id: "child",
    name: "Child",
    shortTitle: "CHILD",
    icon: fileIcon,
  },
];

export const AvailableModels = {
  tshirts: [
    {
      id: "tshirt_basic",
      name: "Basic T-Shirt",
      modelPath: "/shirt_baked.glb",
      geometryNode: "T_Shirt_male",
      materialName: "lambert1",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    },
    {
      id: "tshirt_variant1",
      name: "T-Shirt Style 1",
      modelPath: "/shirt_baked-1.glb",
      geometryNode: "T_Shirt_male",
      materialName: "lambert1",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    },
    {
      id: "tshirt_variant2",
      name: "T-Shirt Style 2",
      modelPath: "/shirt_baked-2.glb",
      geometryNode: "T_Shirt_male",
      materialName: "lambert1",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    },
    {
      id: "tshirt_longsleeve",
      name: "Long Sleeve T-Shirt",
      modelPath: "/t-shirt_-_lengan_panjang.glb",
      geometryNode: "Sketchfab_model", // Use Sketchfab_model geometry
      materialNames: ["Back_FRONT_2239", "Collar_FRONT_2229", "Front_FRONT_2234", "Lower_Left_FRONT_2224", "Lower_Right_FRONT_2214", "Upper_Left_FRONT_2219", "Upper_Right_FRONT_2209"], // Use all materials
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    },
    {
      id: "tshirt_hoodie",
      name: "Hoodie T-Shirt",
      modelPath: "/t_shirt_hoodie_3d_model.glb",
      geometryNode: "Object_6", // From your logs: "Found geometry in node: Object_6"
      materialName: "Material.001",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    },
    // Denim shirt temporarily disabled due to GLTF compatibility issues
    // {
    //   id: "denim_shirt",
    //   name: "Denim Shirt", 
    //   modelPath: "/unisex_denim_shirt_design.glb",
    //   geometryNode: "auto",
    //   materialName: "auto",
    //   preview: "/threejs.png",
    //   decalPositions: {
    //     logo: [0, 0.04, 0.15],
    //     full: [0, 0, 0]
    //   }
    // }
    
  ],
  jackets: [
    {
      id: "adidas_jacket",
      name: "Adidas Jacket",
      modelPath: "/adidas_jacket.glb",
      geometryNode: "auto", // Will auto-detect
      materialName: "auto", // Will auto-detect
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.1, 0.2],
        full: [0, 0, 0]
      }
    },
    {
      id: "men_jacket",
      name: "Men's Jacket",
      modelPath: "/men_jacket_baked.glb",
      geometryNode: "auto", // Will auto-detect
      materialName: "auto", // Will auto-detect
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.1, 0.2],
        full: [0, 0, 0]
      }
    }
  ],
  pants: [
    {
      id: "jeans_denim",
      name: "Denim Jeans",
      modelPath: "/jeans_denim_pants.glb",
      geometryNode: "auto",
      materialName: "auto",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.3, 0.1],
        full: [0, 0, 0]
      }
    },
    {
      id: "pants_placeholder2",
      name: "Pants Style 2",
      modelPath: "/pants_baked.glb",
      geometryNode: "auto", // Will auto-detect the actual pants geometry
      materialName: "auto", // Will auto-detect the actual pants material
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.3, 0.1],
        full: [0, 0, 0]
      }
    }
  ],
  shorts: [
    {
      id: "man_shorts",
      name: "Men's Shorts",
      modelPath: "/man_shorts.glb",
      geometryNode: "auto", // Will auto-detect
      materialName: "auto", // Will auto-detect
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.2, 0.1],
        full: [0, 0, 0]
      }
    },
    {
      id: "shorts_style2",
      name: "Shorts Style 2",
      modelPath: "/orange_puff_shorts.glb",
      geometryNode: "auto", // Will auto-detect the actual shorts geometry
      materialName: "auto", // Will auto-detect the actual shorts material
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.2, 0.1],
        full: [0, 0, 0]
      }
    }
  ],
  women: [
    {
      id: "white_grace",
      name: "White Grace Dress",
      modelPath: "/white_grace.glb",
      geometryNode: [
        "Pattern_5947_0",
        "Pattern_49271_0",
        "Pattern_56511_0",
        "Pattern_78981_0",
        "Pattern_81858_0",
        "Pattern_118342_0",
        "Pattern_130160_0",
        "Pattern_352561_0",
        "Pattern_525393_0",
        "Pattern_531516_0",
        "Pattern_10922_0"
      ],
      materialName: "Unified_Material_575185",
      preview: "/threejs.png",
      decalPositions: {
        logo: [0, 0.04, 0.15],
        full: [0, 0, 0]
      }
    }
  ],
  child: [
    // Add child models here if available
  ],
};
