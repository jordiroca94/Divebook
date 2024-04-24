import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Dive from "../../../../models/dive";

export async function DELETE(req) {
  console.log("we get here --->");
  try {
    await connectMongoDB();

    const res = await req.json();
    const { userEmail } = res;
    console.log(userEmail, "useremail--->");
    await User.deleteOne({ _id: userId });
    // await Dive.find({  }).select("_id");

    // return NextResponse.json({ message: "User deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting user" },
      { status: 500 }
    );
  }
}
