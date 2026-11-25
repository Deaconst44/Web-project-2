import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import Adoption from "./Adoption.js";

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project3";
const fields = "-_id";

app.disable("x-powered-by");

app.param("id", (req, res, next, id) => {
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    next();
});

app.get("/api/adoptions", async (req, res) => {
    res.json(await Adoption.find({}, fields).sort({ AdoptionDate: 1, AdoptionID: 1 }).lean());
});

app.get("/api/adoptions/university/:id", async (req, res) => {
    const records = await Adoption.find({ UniversityID: Number(req.params.id) }, fields)
        .sort({ AdoptionDate: 1, AdoptionID: 1 }).lean();
    res.json(records);
});

app.get("/api/adoptions/:id", async (req, res) => {
    const record = await Adoption.findOne({ AdoptionID: Number(req.params.id) }, fields).lean();
    if (!record) return res.status(404).json({ error: "Adoption not found" });
    res.json(record);
});

app.use("/api", (req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

app.use(express.static(fileURLToPath(new URL("../frontend/dist/", import.meta.url))));

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

await mongoose.connect(uri);
app.listen(port, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
