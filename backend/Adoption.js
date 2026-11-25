import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    AdoptionID: { type: Number, required: true, unique: true },
    UniversityID: { type: Number, required: true },
    AdoptionDate: { type: Date, required: true }
}, { collection: "adoptions", versionKey: false });

export default mongoose.model("Adoption", adoptionSchema);
