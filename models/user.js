import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    description: { type: String },
    country: { type: Object },
    certificates: { type: Array },
    instructor: { type: Boolean },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
