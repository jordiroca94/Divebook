import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Review from "../../../../models/review";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Review.find();
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
}
