import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Dive.find();
    const dives = data.sort((a, b) => b.date - a.date);
    return NextResponse.json({ dives });
  } catch (error) {
    console.log(error);
  }
}
