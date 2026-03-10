import { NextResponse } from "next/server";
import { Resend } from "resend";
import QuoteEmail from "@/components/emails/quote-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      pages,
      category,
      deliverable,
      deliverableLabel,
      timeline,
      timelineLabel,
      currency,
      total,
      priceBreakdown,
      notes,
    } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "SyntaxLABS Quotes <quote@growwithsyntaxlabs.com>",
      to: [email],
      replyTo: "support@growwithsyntaxlabs.com",
      subject: "Web Development Quote",
      react: QuoteEmail({
        email,
        pages,
        category,
        deliverable,
        deliverableLabel,
        timeline,
        timelineLabel,
        currency,
        total,
        breakdown: priceBreakdown,
        notes,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return new NextResponse(JSON.stringify(error), { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending quote:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
