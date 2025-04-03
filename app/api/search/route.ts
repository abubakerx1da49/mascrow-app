/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

// MongoDB Connection
const uri = process.env.MONGODB_URI!;

// Simple caching to avoid multiple connections
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

export async function GET(request: Request) { // FIX: Added `request`
    try {
        const user: any = await currentUser();

        if (!user || !user.username) {
            return NextResponse.json(
                { success: false, message: "Username is required" },
                { status: 400 }
            );
        }

        const username = user.username;
        // console.log("Fetching for username:", username);

        const client = await getClient();
        const db = client.db("shortend_uris");

        // Fetch links where username matches
        const links = await db.collection("links").find({ username }).toArray();

        // console.log("Links found:", links);

        return NextResponse.json({ success: true, links }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching links:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
