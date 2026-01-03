import { type User, type InsertUser, type DemoBooking, type InsertDemoBooking } from "@shared/schema";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  getDemoBookings(): Promise<DemoBooking[]>;
}

// This storage class is for server-side operations
// Cloud Functions use their own initialization
export class FirestoreStorage implements IStorage {
  private db: FirebaseFirestore.Firestore;

  constructor(serviceAccountPath?: string) {
    // If service account path provided (for local testing)
    if (serviceAccountPath) {
      const serviceAccount = require(serviceAccountPath);
      const app = initializeApp({
        credential: cert(serviceAccount),
      });
      this.db = getFirestore(app);
    } else {
      // In production/Cloud Functions, use default app
      this.db = getFirestore();
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const doc = await this.db.collection("users").doc(id).get();
    if (!doc.exists) return undefined;
    return { id: doc.id, ...doc.data() } as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const snapshot = await this.db
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();
    
    if (snapshot.empty) return undefined;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const docRef = this.db.collection("users").doc();
    const user: User = { id: docRef.id, ...insertUser };
    await docRef.set(user);
    return user;
  }

  async createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking> {
    const docRef = this.db.collection("demoBookings").doc();
    const demoBooking: DemoBooking = {
      ...booking,
      id: docRef.id,
      createdAt: new Date(),
    };
    await docRef.set(demoBooking);
    return demoBooking;
  }

  async getDemoBookings(): Promise<DemoBooking[]> {
    const snapshot = await this.db
      .collection("demoBookings")
      .orderBy("createdAt", "desc")
      .get();
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
    })) as DemoBooking[];
  }
}

// Export singleton for server-side use
let storage: FirestoreStorage;

export function initializeStorage(serviceAccountPath?: string): FirestoreStorage {
  if (!storage) {
    storage = new FirestoreStorage(serviceAccountPath);
  }
  return storage;
}

export function getStorage(): FirestoreStorage {
  if (!storage) {
    storage = new FirestoreStorage();
  }
  return storage;
}
