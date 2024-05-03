import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { id } = res;
    const user = await User.findById({ _id: id });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
