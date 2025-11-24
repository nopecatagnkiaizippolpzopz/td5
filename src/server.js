import app, { initializeApp } from "./app.js";

const PORT = 3000;

async function startServer() {
  try {
    await initializeApp();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
