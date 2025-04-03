/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LinkCard from "@/components/LinkCard";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true)
                const response = await fetch("/api/search");
                const data = await response.json();

                if (data.success) {
                    // console.log("Links found:", data.links);
                    setLinks(data.links);
                    setLoading(false)
                } else {
                    console.error("Error:", data.message);
                    setLoading(false)
                }
            } catch (error) {
                console.error("Request failed:", error);
                setLoading(false)
            }
        };

        fetchLinks(); // Call fetch function only after mount
    }, []);

    return (
        <div>
            {links.length > 0 ? (
                <div className="grid">
                    {links.map((link: any, index: number) => (
                        <LinkCard
                            key={index}
                            originalUrl={link.originalUrl}
                            shortId={link.shortId}
                            createdAt={link.createdAt}
                            password={link.password}
                            ogTitle={link.ogTitle}
                            ogDescription={link.ogDescription}
                            ogImage={link.ogImage}
                        />
                    ))}
                </div>
            ) : loading ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
                :
                <div className="p-6 text-sm">
                No links found
                </div>
            }
        </div>
    );
};

export default Page;
