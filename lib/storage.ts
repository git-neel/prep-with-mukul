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
  private users: Map<string, User>;
  private demoBookings: Map<string, DemoBooking>;

  constructor() {
    this.users = new Map();
    this.demoBookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
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

export const storage = new MemStorage();
