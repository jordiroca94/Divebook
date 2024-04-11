import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    const countries = users.map((user) => {
      return user.country;
    });
    return NextResponse.json({ countries });
  } catch (error) {
    console.log(error);
  }
}
