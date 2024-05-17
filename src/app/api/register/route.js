import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const res = await req.json();
    const {
      name,
      email,
      password,
      avatarUrl,
      description,
      country,
      certificate,
      birthDate,
      instructor,
      geolocation,
    } = res;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      name,
      email,
      password: hashedPassword,
      avatarUrl,
      description,
      country,
      certificate,
      birthDate,
      instructor,
      geolocation,
    });
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering" },
      { status: 500 }
    );
  }
}
