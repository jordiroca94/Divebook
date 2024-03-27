import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { id } = res;
    const dive = await Dive.findById(id);
    return NextResponse.json({ dive });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while uploading an image" },
      { status: 500 }
    );
  }
}
