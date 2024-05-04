import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { email } = res;
    console.log(res, "re2222s");
    // const dives = await Dive.find();
    // return NextResponse.json({ dives });
  } catch (error) {
    console.log(error);
  }
}
