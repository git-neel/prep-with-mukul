import { z } from "zod";

// User schema (for future authentication)
export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & {
  id: string;
};

// Demo booking schema for the landing page form
export const insertDemoBookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  grade: z.string().min(1, "Please select a grade"),
  message: z.string().min(5, "Please share a brief learning goal"),
});

export type InsertDemoBooking = z.infer<typeof insertDemoBookingSchema>;
export type DemoBooking = InsertDemoBooking & {
  id: string;
  createdAt: Date;
};
