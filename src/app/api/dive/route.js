import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    const res = await req.json();
    const {
      name,
      country,
      location,
      description,
      deepth,
      instructor,
      suit,
      animals,
    } = res.values;
    await connectMongoDB();
    await Dive.create({
      name,
      country,
      location,
      description,
      deepth,
      instructor,
      suit,
      animals,
    });
    return NextResponse.json({ message: "Dive saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the dive" },
      { status: 500 }
    );
  }
}
