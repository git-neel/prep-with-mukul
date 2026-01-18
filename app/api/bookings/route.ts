import { NextRequest, NextResponse } from "next/server";
import { insertDemoBookingSchema } from "@shared/schema";
import { storage } from "@/lib/storage";
import { fromError } from "zod-validation-error";
// import nodemailer from "nodemailer";
// Email notifications are temporarily disabled in favor of WhatsApp booking.
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

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
    
    // Email notification disabled: bookings are now handled via WhatsApp CTA.
    // try {
    //   await transporter.sendMail({
    //     from: process.env.GMAIL_USER,
    //     to: 'prepwithmukul@gmail.com',
    //     subject: `🎓 Booking | ${booking.name} | ${booking.grade} | ${booking.phone}`,
    //     html: `
    //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //         <h2 style="color: #f97316;">New Orientation Call Request</h2>
    //         <p>You have received a new booking request with the following details:</p>
    //         
    //         <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    //           <p><strong>Name:</strong> ${booking.name}</p>
    //           <p><strong>Email:</strong> ${booking.email}</p>
    //           <p><strong>Phone:</strong> ${booking.phone}</p>
    //           <p><strong>Grade:</strong> ${booking.grade}</p>
    //           ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ''}
    //           <p><strong>Submitted:</strong> ${new Date(booking.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    //         </div>
    //         
    //         <p style="color: #666;">Please reach out to them within 24 hours.</p>
    //       </div>
    //     `,
    //   });
    // } catch (emailError) {
    //   console.error("Error sending email:", emailError);
    //   // Don't fail the request if email fails
    // }
    
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
