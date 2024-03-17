import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    const res = await req.json();
    const {
      userEmail,
      userName,
      name,
      country,
      location,
      deepth,
      temperature,
      instructor,
      suit,
      description,
    } = res.parsedValues;
    await connectMongoDB();
    console.log("we get here ");
    await Dive.create({
      userEmail,
      userName,
      name,
      country,
      location,
      deepth,
      temperature,
      instructor,
      suit,
      description,
    });
    console.log("we get here2 ");

    return NextResponse.json({ message: "Dive saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the dive" },
      { status: 500 }
    );
  }
}
