import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Review from "../../../../models/review";

export async function POST(req) {
  try {
    const res = await req.json();
    const { postedBy, rate, description, userId, diveId } = res.parsedValues;
    await connectMongoDB();
    await Review.create({ postedBy, rate, description, userId, diveId });

    return NextResponse.json({ message: "Review created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the dive" },
      { status: 500 }
    );
  }
}
