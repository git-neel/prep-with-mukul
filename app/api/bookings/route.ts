import { NextRequest, NextResponse } from "next/server";
import { insertDemoBookingSchema } from "@shared/schema";
import { storage } from "@/lib/storage";
import { fromError } from "zod-validation-error";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = insertDemoBookingSchema.safeParse(body);

    if (!result.success) {
      const errorMessage = fromError(result.error);
      return NextResponse.json(
        { error: errorMessage.toString() },
        { status: 400 }
      );
    }

    const booking = await storage.createDemoBooking(result.data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await storage.getDemoBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
