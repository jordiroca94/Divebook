import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await User.find();
    const users = data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
  }
}
