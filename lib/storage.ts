import { type User, type InsertUser, type DemoBooking, type InsertDemoBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking>;
  getDemoBookings(): Promise<DemoBooking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private demoBookings: Map<string, DemoBooking> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoBooking(booking: InsertDemoBooking): Promise<DemoBooking> {
    const id = randomUUID();
    const demoBooking: DemoBooking = {
      ...booking,
      id,
      message: booking.message || null,
      createdAt: new Date(),
    };
    this.demoBookings.set(id, demoBooking);
    return demoBooking;
  }

  async getDemoBookings(): Promise<DemoBooking[]> {
    return Array.from(this.demoBookings.values());
  }
}

// Use in-memory storage (data resets on server restart)
export const storage: IStorage = new MemStorage();
