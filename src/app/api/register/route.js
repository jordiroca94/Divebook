import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const res = await req.json();
    console.log(res.values, "response");
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering" },
      { status: 500 }
    );
  }
}
