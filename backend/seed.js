import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import Adoption from "./Adoption.js";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project3";
const records = JSON.parse(await readFile(new URL("./adoptions.json", import.meta.url), "utf8"));

await mongoose.connect(uri);
try {
    await Adoption.init();
    for (const record of records) {
        await Adoption.updateOne(
            { AdoptionID: record.AdoptionID },
            { $set: record },
            { upsert: true, runValidators: true }
        );
    }
    console.log(`${records.length} adoption records processed.`);
} finally {
    await mongoose.disconnect();
}
