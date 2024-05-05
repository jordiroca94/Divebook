import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";

export async function POST(req) {
  try {
    await connectMongoDB();
    const res = await req.json();
    const { email } = res;
    const divesRes = await Dive.find();
    const diverDives = [];
    divesRes.map((el) => {
      if (el.user.email === email) {
        return diverDives.push(el);
      }
    });

    return NextResponse.json({ diverDives });
  } catch (error) {
    console.log(error);
  }
}
