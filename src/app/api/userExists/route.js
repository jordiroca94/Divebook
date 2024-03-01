import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { email } = res.values;
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
