import mongoose, { Schema, models } from "mongoose";

const diveSchema = new Schema(
  {
    user: { type: Object, required: true },
    name: { type: String, required: true },
    country: { type: Object, required: true },
    location: { type: String, required: true },
    deepth: { type: String, required: true },
    temperature: { type: String, required: true },
    instructor: { type: String },
    suit: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Dive = models.Dive || mongoose.model("Dive", diveSchema);

export default Dive;
