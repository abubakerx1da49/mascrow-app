/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Copy, Download, ExternalLink, Lock } from "lucide-react";
import { useQRCode } from "next-qrcode";
import QRCodeDownloadBtn from "./QRCodeDownloadBtn";
import AnalyticsCard from "./AnalyticsCard";

interface LinkCardProps {
  originalUrl: string;
  shortId: string;
  createdAt: string;
  password?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  activateAt?: string; // ISO date string
  trackingId?: string; // e.g., "google"
}

const LinkCard: React.FC<LinkCardProps> = ({
  originalUrl,
  shortId,
  createdAt,
  password,
  ogTitle,
  ogDescription,
  ogImage,
  activateAt,
  trackingId,
}) => {
  const { Canvas } = useQRCode();
  const [copied, setCopied] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(!password);
  const [passwordInput, setPasswordInput] = useState("");
  // const shortUrl = `${window.location.origin}/i/${shortId}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shortUrl = `${origin}/i/${shortId}`;


  // Handle password prompt in UI instead of blocking window.prompt
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      setHasAccess(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPasswordInput("");
    }
  };


  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      });
    }
  };

  const isFileUrl = (url: string) => {
    return /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|jpg|jpeg|png|gif|mp4|mp3|avi|mov|svg|webp)(\?.*)?$/i.test(url);
  };

  const now = new Date();
  const activateDate = activateAt ? new Date(activateAt) : null;

  console.log(now, activateDate)

  if (activateDate && now < activateDate) {
    return (
      <Card className="max-w-xl mx-auto p-6 my-10 shadow-lg rounded-lg bg-yellow-50 text-yellow-800">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">This link is not yet active.</h2>
          <p className="font-mono">Scheduled activation: {activateDate.toLocaleString()}</p>
        </CardContent>
      </Card>
    );
  }



  if (!hasAccess) {
    return (
      <Card className="max-w-xl mx-auto p-6 my-10 shadow-lg rounded-lg bg-neutral-900 text-neutral-100">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-purple-500" />
            Password Protected
          </h2>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
          />
          <Button
            className="mt-4 w-full"
            onClick={handlePasswordSubmit}
            disabled={!passwordInput.trim()}
          >
            Submit
          </Button>
        </CardContent>
        <CardFooter>
          {passwordError && (
            <p className="text-red-500 mt-2 text-sm">{passwordError}</p>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="px-4 py-8 space-y-8">

      <AnalyticsCard googleAnalyticsId={trackingId ? trackingId : ""} />


      {/* OG Preview Card */}
      {isFileUrl(originalUrl) ? (
        <Card className="flex flex-col md:flex-row bg-green-600 text-neutral-100 p-6 rounded-lg shadow-lg gap-6">
          {ogImage && (
            <img
              src={ogImage}
              alt="Preview Image"
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg shadow"
            />
          )}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl flex items-center gap-3">
              <span className="font-bold">Download File:</span> {ogTitle}
            </h1>
            <p className="mt-2 text-neutral-300 max-w-xl">{ogDescription || "No description provided."}</p>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col md:flex-row bg-neutral-900 text-neutral-100 p-6 rounded-lg shadow-lg gap-6">
          {ogImage && (
            <img
              src={ogImage}
              alt="Preview Image"
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg shadow"
            />
          )}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {ogTitle}
            </h1>
            <p className="mt-2 text-neutral-300 max-w-xl">{ogDescription || "No description provided."}</p>
          </div>
        </Card>
      )}

      {/* Open Link Button */}
      {/* <div className="flex justify-end">
        <Button
          asChild
          className="bg-primary hover:bg-primary-dark bg-black text-white py-3 px-6 rounded-md shadow-md transition"
        >
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 no-underline font-semibold">
            Open Link <ExternalLink className="w-5 h-5" />
          </a>
        </Button>
      </div> */}
      {/* Open Link or Download File Button */}
      <div className="flex justify-end">
        {isFileUrl(originalUrl) ? (
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md shadow-md transition"
          >
            <a href={originalUrl} download className="flex items-center gap-2 no-underline font-semibold">
              Download File <Download className="w-5 h-5" />
            </a>
          </Button>
        ) : (
          <Button
            asChild
            className="bg-primary hover:bg-primary-dark bg-black text-white py-3 px-6 rounded-md shadow-md transition"
          >
            <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 no-underline font-semibold">
              Open Link <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        )}
      </div>

      {/* URLs Card */}
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 shadow rounded-lg bg-white">
        {/* Original URL */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-blue-700">
            Original URL
          </h3>
          <div className="flex items-center justify-between gap-2 break-words">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium truncate max-w-full"
              title={originalUrl}
            >
              {originalUrl}
            </a>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Copy original URL"
              onClick={() => copyToClipboard(originalUrl, "original")}
              className="text-blue-600 hover:text-blue-800"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Shortened URL */}
        <section>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-green-700">
            Shortened Link
          </h3>
          <div className="flex items-center justify-between gap-2 break-words">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline font-medium truncate max-w-full"
              title={shortUrl}
            >
              {shortUrl}
            </a>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Copy shortened URL"
              onClick={() => copyToClipboard(shortUrl, "shortened")}
              className="text-green-600 hover:text-green-800"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </Card>

      {/* Meta info */}
      <Card className="flex items-center justify-between p-6 rounded-lg shadow bg-white">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <time
            dateTime={new Date(createdAt).toISOString()}
            className="text-gray-700 font-mono"
          >
            Created: {new Date(createdAt).toLocaleString()}
          </time>
        </div>
        {password && (
          <div className="flex items-center gap-2 bg-purple-100 text-purple-800 rounded-md px-3 py-1 font-mono">
            <Lock className="w-5 h-5" />
            <span>Password protected</span>
          </div>
        )}
      </Card>

      {/* QR Code + Download */}
      <Card className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg shadow bg-gray-50">
        <Canvas
          text={shortUrl}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 6,
            width: 180,
            color: {
              dark: "#000",
              light: "#FFF",
            },
          }}
        />
        <QRCodeDownloadBtn shortId={shortId} />
      </Card>


      {/* Social Share */}
      <Card className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Share this link
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            {
              name: "Facebook",
              url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Twitter",
              url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "LinkedIn",
              url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "WhatsApp",
              url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Email",
              url: `mailto:?body=${encodeURIComponent(shortUrl)}`,
            },
            {
              name: "Telegram",
              url: `https://telegram.me/share/url?url=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Reddit",
              url: `https://www.reddit.com/submit?url=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Tumblr",
              url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Pinterest",
              url: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                shortUrl
              )}`,
            },
            {
              name: "Blogger",
              url: `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(
                shortUrl
              )}`,
            },
          ].map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline hover:text-orange-600 transition"
            >
              {name}
            </a>
          ))}
        </div>
      </Card>

      {/* Copy Confirmation */}
      {copied && (
        <p className="text-center text-green-600 font-semibold text-sm mt-4">
          {`Copied ${copied} URL to clipboard!`}
        </p>
      )}
    </div>
  );
};

export default LinkCard;
