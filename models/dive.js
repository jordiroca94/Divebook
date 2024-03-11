import mongoose, { Schema, models } from "mongoose";

const diveSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    deepth: { type: String, required: true },
    instructor: { type: String, required: true },
    suit: { type: String, required: true },
    animals: { type: Array, required: false },
  },
  { timestamps: true }
);

const Dive = models.Dive || mongoose.model("Dive", diveSchema);

export default Dive;
