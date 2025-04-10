/* eslint-disable @typescript-eslint/no-explicit-any */
import LinkPreview from "@/components/LinkPreview";
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

const Page = async (params: { params: any }) => {

    const { id } = await params.params;
    const link: any = await fetchLinksById(id);

    return (
        <div className="">
            <LinkPreview id={id} link={JSON.stringify(link)} />
        </div>
    );
};

export default Page;
