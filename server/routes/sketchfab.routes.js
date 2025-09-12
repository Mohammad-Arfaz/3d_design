import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/models", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.sketchfab.com/v3/models?downloadable=true&per_page=24",
      {
        headers: {
          Authorization: `Token ${process.env.SKETCHFAB_API_TOKEN}`,
        },
      }
    );

    // Parse models
    const models = response.data.results.map((m) => ({
      id: m.uid,
      name: m.name,
      glbUrl: m.versions?.[0]?.gltf?.url || null,
      sketchfabUid: m.uid,
      category: "men", // you can assign categories here
    }));

    res.json(models);
  } catch (error) {
    console.error("Error fetching Sketchfab models:", error.message);
    res.status(500).json({ error: "Failed to fetch Sketchfab models" });
  }
});

export default router;
