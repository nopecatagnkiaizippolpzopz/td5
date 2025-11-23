import request from"supertest";
import app from"../../main.js";
describe("Doctors API", () => {
    it("GET / api / doctors should return an array", async () => {
        const res = await request(app).get("/api/doctors");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("POST / api / doctors should add a new doctor", async () => {
        const res = await request(app)
            .post("/api/doctors")
            .send({
                name:"Riahi", specialty:"Neurology"
            })
        expect(res.status).toBe(201),
            expect(res.body).toHaveProperty("id");
    });
});
