import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { id } = res;
    await Dive.deleteOne({ _id: id });
    return NextResponse.json({ message: "Dive deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting user" },
      { status: 500 }
    );
  }
}
