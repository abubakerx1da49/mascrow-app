/* eslint-disable @typescript-eslint/no-explicit-any */
import LinkPreview from "@/components/LinkPreview";
import { MongoClient, ServerApiVersion } from "mongodb";

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
    return links[0];
  } catch (error: any) {
    console.error("Error fetching links:", error);
    return { success: false, error: error.message };
  } finally {
    await client.close();
  }
}

const Page = async ({ params }: { params: any }) => {
  const { id } = params;
  const link: any = await fetchLinksById(id);

  // Handle error or missing link gracefully
  if (!link || link.success === false) {
    return <p className="text-center text-red-500 mt-10">Link not found or error occurred.</p>;
  }

  return (
    <div className="p-4">
      <LinkPreview
        originalUrl={link?.originalUrl}
        shortId={link?.shortId}
        createdAt={link?.createdAt}
        password={link?.password}
        ogTitle={link?.ogTitle}
        ogDescription={link?.ogDescription}
        ogImage={link?.ogImage}
        activateAt={link?.scheduleActivation}
        trackingId={link?.trackingId}
      />
    </div>
  );
};

export default Page;
