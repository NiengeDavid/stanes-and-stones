import { type NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;
    // const {
    //   email,
    //   pages,
    //   category,
    //   deliverable,
    //   deliverableLabel,
    //   timeline,
    //   timelineLabel,
    //   currency,
    //   total,
    //   priceBreakdown,
    //   notes,
    // } = body;

    const quoteData = {
      email: body.email,
      pages: body.pages,
      category: body.category,
      deliverable: body.deliverable,
      timeline: body.timeline,
      currency: body.currency,
      total: body.total,
    };

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    await appendToSheet(quoteData);

    return NextResponse.json(
      {
        success: true,
        message: "Entry successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Entry error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { message: "Invalid Quote data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to process Quote. Please try again." },
      { status: 500 }
    );
  }
}
