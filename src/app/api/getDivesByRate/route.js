import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Dive from "../../../../models/dive";
import Review from "../../../../models/review";

export async function GET() {
  try {
    await connectMongoDB();
    const dives = await Dive.find();
    const reviews = await Review.find();
    const divesWithRate = dives.map((dive) => {
      const diveReviews = [];
      reviews.map((review) => {
        if (dive._id.toHexString() === review.diveId) {
          diveReviews.push(review);
        }
      });

      const reviewsWithRate = diveReviews.filter(
        (review) => review.rate !== null
      );

      const rateSum = diveReviews.reduce(
        (accumulator, review) => accumulator + review.rate,
        0
      );

      const rateAverage =
        Math.ceil((rateSum / reviewsWithRate.length) * 10) / 10;

      return { dive: dive, rate: rateAverage };
    });
    return NextResponse.json({ divesWithRate });
  } catch (error) {
    console.log(error);
  }
}
