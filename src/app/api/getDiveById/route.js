import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST() {
  try {
    await connectMongoDB();
    console.log("heeere-->");
    const res = await req.json();
    const dive = await Dive.findById(id);
    return NextResponse.json("response");
  } catch (error) {
    console.log(error);
  }
}
