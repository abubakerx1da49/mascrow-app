"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface LinkCardProps {
    originalUrl: string;
    shortId: string;
    createdAt: string;
    password: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ originalUrl, shortId, createdAt, password }) => {
    const [copied, setCopied] = useState(false);
    const shortUrl = `${window.location.origin}/i/${shortId}`;

    const copyToClipboard = (text: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => console.error("Clipboard copy failed:", err));
        } else {
            console.warn("Clipboard API not available.");
        }
    };


    return (
        <Card className="w-full text-sm p-2 rounded-none border-b border-neutral-700">
            <CardContent>

                <div className="mt-6">
                    <p className="text-neutral-100 font-medium">Original URL:</p>
                    <a href={originalUrl} target="_blank" className="text-blue-600 underline truncate block">
                        {originalUrl}
                    </a>
                </div>

                <p className="pt-3 text-sm text-neutral-200">Created: {new Date(createdAt).toLocaleString()}</p>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-neutral-100 font-medium">Shortened:</p>
                    <div className="flex items-center gap-2">
                        <a href={shortUrl} target="_blank" className="text-blue-600 font-semibold">
                            {shortUrl}
                        </a>
                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(shortUrl)}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="mt-0 flex items-center justify-between">
                    <p className="text-neutral-100 font-medium">Password:</p>
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-300 font-mono">{password}</span>
                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(password)}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>


                <div className="mt-2 flex justify-end">
                    <Button asChild>
                        <a href={shortUrl} target="_blank">
                            Open Link <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                </div>


                {copied && <p className="mt-2 text-green-600 text-sm">Copied to clipboard!</p>}
            </CardContent>
        </Card>
    );
};

export default LinkCard;
