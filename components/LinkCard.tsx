/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
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

const LinkCard: React.FC<LinkCardProps> = ({
  originalUrl,
  shortId,
  createdAt,
  password,
  ogTitle,
  ogDescription,
  ogImage,
}) => {
  const { Canvas } = useQRCode();
  const [copied, setCopied] = useState(false);
  const shortUrl = `${window.location.origin}/i/${shortId}`;

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Clipboard copy failed:", err));
    } else {
      console.warn("Clipboard API not available.");
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/links?shortId=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert("Deleted successfully");
        window.location.reload();  // Reload the page automatically
        // Update UI state here e.g. remove from list
      } else {
        alert("Delete failed: " + data.message);
      }
    } catch (error) {
      alert("Error deleting link");
      console.error(error);
    }
  };
  
  

  return (
    <article className=" bg-white overflow-hidden border border-gray-200">
      {/* Header / Preview */}
      <header className="flex gap-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 items-center">
        {ogImage && (
          <img
            src={ogImage}
            alt="Preview image"
            className="w-28 h-28 rounded-lg shadow-lg object-cover flex-shrink-0"
          />
        )}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            {ogTitle}
            <ExternalLink className="w-6 h-6 opacity-80" />
          </h1>
          <p className="mt-2 max-w-lg opacity-90 font-medium">{ogDescription || "No description available."}</p>
        </div>
      </header>

      {/* Main info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
        {/* Original URL */}
        <section className="bg-white p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 010-5.656M9.172 9.172a4 4 0 015.656 0m3.536-3.536l-7 7m-4 4l7-7"
              />
            </svg>
            Original URL
          </h2>
          <div className="mt-2 flex items-center justify-between break-words">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline break-all"
            >
              {originalUrl}
            </a>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => copyToClipboard(originalUrl)}
              aria-label="Copy original URL"
              className="text-blue-600 hover:bg-blue-100"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Shortened URL */}
        <section className="bg-white p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700">
            <ExternalLink className="w-5 h-5" />
            Shortened URL
          </h2>
          <div className="mt-2 flex items-center justify-between break-all">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline break-all"
            >
              {shortUrl}
            </a>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => copyToClipboard(shortUrl)}
              aria-label="Copy shortened URL"
              className="text-green-600 hover:bg-green-100"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Created At */}
        <section className="bg-white p-4 rounded-md border border-gray-300 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-600">
            <Calendar className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Created</h2>
          </div>
          <time
            dateTime={new Date(createdAt).toISOString()}
            className="font-mono text-gray-700"
          >
            {new Date(createdAt).toLocaleString()}
          </time>
        </section>

        {/* Password (if exists) */}
        {password && (
          <section className="bg-white p-4 rounded-md border border-gray-300 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3 text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.105-.895-2-2-2m4 0c0 1.105-.895 2-2 2m0-4v4"
                />
              </svg>
              <h2 className="text-lg font-semibold">Password</h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-gray-800">
              <span>{password}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(password)}
                aria-label="Copy password"
                className="text-purple-600 hover:bg-purple-100"
              >
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* Actions + QR Code */}
      <footer className="bg-white p-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-md shadow-md transition"
          >
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 no-underline"
            >
              Open Link <ExternalLink className="w-5 h-5" />
            </a>
          </Button>

          <Button
            variant="outline"
            onClick={() => copyToClipboard(shortUrl)}
            className="text-indigo-600 hover:bg-indigo-100"
          >
            Copy Short URL
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleDelete(shortId)}
            className="bg-red-500 hover:bg-red-700 text-red-100"
            aria-label="Delete link"
          >
            Delete
          </Button>


        </div>

        <div className="flex items-center gap-4">
          <Canvas
            text={shortUrl}
            options={{
              errorCorrectionLevel: "M",
              margin: 2,
              scale: 6,
              width: 120,
              color: {
                dark: "#000",
                light: "#FFF",
              },
            }}
          // className="rounded-lg border border-gray-300"
          />
          <QRCodeDownloadBtn shortId={shortId} />
        </div>
      </footer>

      {/* Copy confirmation */}
      {copied && (
        <p className="p-2 text-center text-green-600 font-semibold animate-fadeIn">
          Copied to clipboard!
        </p>
      )}
    </article>
  );
};

export default LinkCard;
