/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { MongoClient, ServerApiVersion } from "mongodb";
// import LinkCard from "@/components/LinkCard";

const uri = process.env.MONGODB_URI!;

export async function fetchLinksById(id: string) {
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

    const shortUrl = `/i/${id}`;

    return (
        <div>
            <Card className="w-full text-sm p-2 rounded-none border-b border-neutral-700">
                <CardContent>

                    <div className="mt-6">
                        <p className="text-neutral-100 text-xl pb-2 font-medium">Original URL:</p>
                        <a href={link.originalUrl} target="_blank" className="text-blue-600 underline truncate block">
                            {link.originalUrl}
                        </a>
                    </div>

                    <p className="pt-3 text-sm text-neutral-200">Created: {new Date(link.createdAt).toLocaleString()}</p>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-neutral-100 font-medium">Shortened:</p>
                        <div className="flex items-center gap-2">
                            <a href={shortUrl} target="_blank" className="text-blue-600 font-semibold">
                                {shortUrl}
                            </a>
                        </div>
                    </div>


                    <div className="mt-6 flex justify-end">
                        <Button asChild>
                            <a href={link.originalUrl} target="_blank">
                                Open Link <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
