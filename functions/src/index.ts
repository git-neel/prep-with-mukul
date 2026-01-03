import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import { insertDemoBookingSchema } from "../shared/schema.js";
import { fromError } from "zod-validation-error";

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Enable CORS for all routes
const corsHandler = cors({ origin: true });

// Demo booking creation function
export const createBooking = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    try {
      const result = insertDemoBookingSchema.safeParse(req.body);

      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({
          message: validationError.toString(),
        });
      }

      // Create document in Firestore
      const docRef = db.collection("demoBookings").doc();
      const bookingData = {
        ...result.data,
        createdAt: admin.firestore.Timestamp.now(),
        id: docRef.id,
      };

      await docRef.set(bookingData);

      return res.status(201).json(bookingData);
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Failed to create booking" });
    }
  });
});

// Get all bookings function
export const getBookings = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    try {
      const snapshot = await db
        .collection("demoBookings")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get();

      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
});

// Combined API endpoint that routes based on method
export const api = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { method, path } = req;

    // Route /api/bookings
    if (path === "/bookings" || path === "/bookings/") {
      if (method === "POST") {
        return createBooking(req, res);
      } else if (method === "GET") {
        return getBookings(req, res);
      }
    }

    return res.status(404).json({ message: "Endpoint not found" });
  });
});
