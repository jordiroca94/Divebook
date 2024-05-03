import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { id, parsedValues } = res;
    await Dive.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          date: parsedValues.date,
          name: parsedValues.name,
          country: parsedValues.country,
          location: parsedValues.location,
          deepth: parsedValues.deepth,
          temperature: parsedValues.temperature,
          weights: parsedValues.weights,
          instructor: parsedValues.instructor,
          suit: parsedValues.suit,
          description: parsedValues.description,
          imageUrl: parsedValues.imageUrl,
        },
      }
    );

    return NextResponse.json({ message: "Dive updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while uploading an image" },
      { status: 500 }
    );
  }
}
