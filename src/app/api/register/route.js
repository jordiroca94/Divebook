import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    const res = await req.json();
    const { name, email, password } = res.values;
    await connectMongoDB();
    await User.create({ name, email, password });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering" },
      { status: 500 }
    );
  }
}
