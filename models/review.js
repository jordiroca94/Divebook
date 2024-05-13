import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema(
  {
    postedBy: { type: String, required: true },
    userId: { type: String, required: true },
    diveId: { type: String, required: true },
    rate: { type: Number || null },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", reviewSchema);

export default Review;
