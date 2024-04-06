import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { email, parsedValues } = res;
    await User.findOne({ email }).updateMany({
      avatarUrl: parsedValues.avatarUrl,
      description: parsedValues.description,
      country: parsedValues.country,
      birthDate: parsedValues.birthDate,
      instructor: parsedValues.instructor,
    });
    return NextResponse.json({ message: "Image uploaded" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while uploading an image" },
      { status: 500 }
    );
  }
}
