import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { user, avatarUrl } = res;

    console.log(user, avatarUrl, "res-->");
    // const userEmail = await User.find({ email }).update({
    //   avatarUrl: avatarUrl,
    // });
    const test = "uploaded";
    return NextResponse.json({ test });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while uploading an image" },
      { status: 500 }
    );
  }
}
