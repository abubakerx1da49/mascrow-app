/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { MongoClient, ServerApiVersion } from "mongodb";
// import LinkCard from "@/components/LinkCard";

const uri = process.env.MONGODB_URI!;

async function fetchLinksById(id: string) {
    if (!id) throw new Error("ID is required");

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        const db = client.db("shortend_uris");
        const links = await db.collection("links").find({ shortId: id }).toArray();
        return links[0]
    } catch (error: any) {
        console.error("Error fetching links:", error);
        return { success: false, error: error.message };
    } finally {
        await client.close();
    }
}



export async function generateMetadata(
    { params }: any,
): Promise<Metadata> {
    const { id } = await params;
    const link: any = await fetchLinksById(id);

    return {
        title: link?.ogTitle ? link.ogTitle : "Mascrow",
        description: link?.ogDescription ? link.ogDescription : "made for masking urls.",
        openGraph: {
            images: [link?.ogImage ? link.ogImage : ""],
        },
    }
}


export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="">

            {children}
        </div>
    );
}
