import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function GET() {
  try {
    await connectMongoDB();
    const dives = await Dive.find();
    return NextResponse.json({ dives });
  } catch (error) {
    console.log(error);
  }
}
