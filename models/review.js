import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    review: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", reviewSchema);

export default Review;
