import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    description: { type: String },
    country: { type: Object },
    birthDate: { type: Date || null },
    certificate: { type: String },
    instructor: { type: Boolean },
    geolocation: { type: Object },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
