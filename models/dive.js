import mongoose, { Schema, models } from "mongoose";

const diveSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    location: { type: String, required: true },
    deepth: { type: String, required: true },
    temperature: { type: String, required: true },
    instructor: { type: String, required: true },
    suit: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Dive = models.Dive || mongoose.model("Dive", diveSchema);

export default Dive;
