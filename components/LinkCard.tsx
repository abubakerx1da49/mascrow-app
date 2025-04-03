/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useQRCode } from 'next-qrcode';
import QRCodeDownloadBtn from "./QRCodeDownloadBtn";

interface LinkCardProps {
    originalUrl: string;
    shortId: string;
    createdAt: string;
    password: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ originalUrl, shortId, createdAt, password, ogTitle, ogDescription, ogImage }) => {
    const { Canvas } = useQRCode();

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
        <Card className="w-full text-sm lg:px-2 lg:pb-3 pt-6 rounded-none border-b border-neutral-700 prose prose-sm max-w-none prose-invert">
            <CardContent>

                <div className="flex items-start justify-start mb-4">
                    {ogImage && (
                        <img src={ogImage} alt="" className="max-w-20 mr-3 lg:max-w-32 m-0 rounded-xl" />
                    )}
                    <div>
                        <h2 className="pt-0 mt-0">{ogTitle}</h2>
                        <p>{ogDescription}</p>
                    </div>
                </div>


                <div className="my-0 py-0 flex items-center justify-between">
                    <p className="text-neutral-100 font-medium whitespace-nowrap pr-3">Original URL:</p>
                    <div className="flex items-center gap-2">
                        <a href={originalUrl} target="_blank" className="text-blue-600 font-semibold break-all">
                            {originalUrl}
                        </a>
                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(originalUrl)}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="my-0 py-0 flex items-center justify-between">
                    <p className="text-neutral-100 font-medium whitespace-nowrap pr-3">Created:</p>
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-300 font-mono break-all">{new Date(createdAt).toLocaleString()}</span>
                        <Button size="icon" variant="ghost">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                        </Button>
                    </div>
                </div>


                <div className="my-0 py-0 flex items-center justify-between">
                    <p className="text-neutral-100 font-medium whitespace-nowrap pr-3">Shortened:</p>
                    <div className="flex items-center gap-2">
                        <a href={shortUrl} target="_blank" className="text-blue-600 font-semibold break-all">
                            {shortUrl}
                        </a>
                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(shortUrl)}>
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>


                {password && (
                    <div className="my-0 py-0 flex items-center justify-between">
                        <p className="text-neutral-100 font-medium whitespace-nowrap pr-3">Password:</p>
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-300 font-mono break-all">{password}</span>
                            <Button size="icon" variant="ghost" onClick={() => copyToClipboard(password)}>
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}


                <div className="mt-2 flex justify-end">
                    <Button asChild>
                        <a href={shortUrl} target="_blank" className="no-underline">
                            Open Link <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                </div>

                <div className="mt-6 border-t pt-6 flex items-end justify-start space-x-4">
                    <Canvas
                        text={`${shortUrl}`}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 150,
                            color: {
                                dark: '#000',
                                light: '#FFF',
                            },
                        }}
                    />

                    <QRCodeDownloadBtn shortId={shortId} />
                </div>

                <div className="my-0 py-0 border-t mt-4 pt-2">
                    <p className="text-neutral-100 font-medium whitespace-nowrap pr-3">Share this link:</p>
                    <div className="flex space-x-4 flex-wrap">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Facebook
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            WhatsApp
                        </a>
                        <a
                            href={`mailto:?body=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Email
                        </a>
                        <a
                            href={`https://telegram.me/share/url?url=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Telegram
                        </a>
                        <a
                            href={`https://www.reddit.com/submit?url=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Reddit
                        </a>
                        <a
                            href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Tumblr
                        </a>
                        <a
                            href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Pinterest
                        </a>
                        <a
                            href={`https://www.blogger.com/blog-this.g?u=${encodeURIComponent(`${shortUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 underline"
                        >
                            Blogger
                        </a>
                    </div>
                </div>

                {copied && <p className="mt-2 text-green-600 text-sm">Copied to clipboard!</p>}
            </CardContent>
        </Card>
    );
};

export default LinkCard;
