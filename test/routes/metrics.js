import request from "supertest";
import app from "../../src/app.js";

describe("Metrics API", () => {
    it("GET /api/metrics should return system metrics", async () => {
        const res = await request(app).get("/api/metrics");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("uptime");
        expect(res.body).toHaveProperty("hospital");
        expect(res.body).toHaveProperty("system");
        expect(res.body.hospital.name).toBe("La Charité");
        expect(res.body.hospital.status).toBe("operational");
    });
});
