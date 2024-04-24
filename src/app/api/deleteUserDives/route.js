import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { userEmail } = res;
    const dives = await Dive.find();
    const userDives = [];
    dives.map((item) => {
      if (userEmail === item.user.email) {
        userDives.push(item);
      }
    });
    if (userDives.length) {
      await Dive.deleteMany({ _id: { $in: userDives } });
    }
    return NextResponse.json({ message: "Dives deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting user" },
      { status: 500 }
    );
  }
}
