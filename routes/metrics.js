import express from "express";
const router = express.Router();

// GET system metrics
router.get("/", (req, res) => {
    const metrics = {
        uptime: process.uptime(),
        timestamp: new Date(),
        hospital: {
            name: "La Charité",
            status: "operational"
        },
        system: {
            memory: process.memoryUsage(),
            platform: process.platform,
            nodeVersion: process.version
        }
    };
    
    res.json(metrics);
});

export default router;
