const config = {
  development: {
    backendUrl: "http://localhost:8089/api/v1/dalle/generate",
  },
  production: {
    backendUrl: "https://devswag.onrender.com/api/v1/dalle",
  },
};

export default config;
