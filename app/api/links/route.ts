/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/links/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { nanoid } from "nanoid";
import { currentUser } from "@clerk/nextjs/server";

// Your MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// Simple caching to avoid creating a new client on every request
let cachedClient: MongoClient | null = null;

async function getClient() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await cachedClient.connect();
  }
  return cachedClient;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user: any = await currentUser()
    const { originalUrl, password, ogTitle, ogDescription, ogImage, scheduleActivation, trackingId } = body;

    if (!originalUrl) {
      return NextResponse.json(
        { success: false, message: "Original URL is required" },
        { status: 400 }
      );
    }

    // Generate a short, unique id for the link
    const shortId = nanoid(7);

    // Connect to MongoDB inline
    const client = await getClient();
    const db = client.db("shortend_uris"); // Replace with your database name

    // Upsert the link document
    const result = await db.collection("links").updateOne(
      { originalUrl }, // Query criteria
      {
        $set: {
          originalUrl,
          password,
          ogTitle,
          ogDescription,
          ogImage,
          scheduleActivation,
          trackingId,
          username: user.username,
          user_id: user.id,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
          shortId,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result, shortId }, { status: 200 });
  } catch (error: any) {
    console.error("Error upserting link:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// --- DELETE handler for deleting a link by shortId ---
export async function DELETE(request: Request) {
  try {
    const user: any = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const shortId = url.searchParams.get("shortId");

    if (!shortId) {
      return NextResponse.json({ success: false, message: "shortId is required" }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db("shortend_uris");

    // Delete the link that belongs to the current user and matches the shortId
    const deleteResult = await db.collection("links").deleteOne({
      shortId,
      user_id: user.id,
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Link not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Link deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting link:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
