import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";
import User from "../../../../models/user";
import Review from "../../../../models/review";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    const dives = await Dive.find();
    const reviews = await Review.find();

    const count = {
      users: users.length,
      dives: dives.length,
      reviews: reviews.length,
    };

    return NextResponse.json({ count });
  } catch (error) {
    console.log(error);
  }
}
