/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LinkCard from "@/components/LinkCard";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch("/api/search");
                const data = await response.json();

                if (data.success) {
                    console.log("Links found:", data.links);
                    setLinks(data.links);
                } else {
                    console.error("Error:", data.message);
                }
            } catch (error) {
                console.error("Request failed:", error);
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
                        />
                    ))}
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default Page;
