import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function DELETE(req) {
  try {
    await connectMongoDB();

    const res = await req.json();
    const { userId } = res;
    await User.deleteOne({ _id: userId });
    return NextResponse.json({ message: "User deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting user" },
      { status: 500 }
    );
  }
}
