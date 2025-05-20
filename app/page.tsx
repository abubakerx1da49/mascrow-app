/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false)


  const [formData, setFormData] = useState({
    originalUrl: "",
    password: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    schedule: null,
    enableQr: false,
    analytics: false,
  });

  const handleChange = (key: any, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {

    setLoading(true)

    const runtime_formData = formData

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(runtime_formData),
      });

      const data = await response.json();

      if (data.success) {
        // console.log("Link created successfully:", data.shortId);
        alert(`Shortened Link ID: ${data.shortId}`);
        setLoading(false)
      } else {
        console.error("Error:", data.message);
        alert(`Error: ${data.message}`);
        setLoading(false)
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false)
    } finally {
      setLoading(false)
      setFormData({
        originalUrl: "",
        password: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        schedule: null,
        enableQr: false,
        analytics: false,
      })
    }
  };


  // Returns green if value exists, gray otherwise
  const getIconColor = (value: any) => (value ? 'green' : 'gray');

  if (isSignedIn) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)] bg-white text-neutral-900 px-8 py-10 space-y-10">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Create a New Mascrow Link</h1>
          <p className="text-sm text-gray-600">
            Customize how your link looks and behaves when shared across platforms.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Original URL */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">Destination URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/your-page"
              value={formData.originalUrl}
              onChange={(e) => handleChange("originalUrl", e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-gray-500">Paste the original link you want to mask. (eg. https://google.com)</p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">
              Password Protection <span className="ml-2 text-xs text-gray-500">(optional)</span>
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-gray-500">Add a password to restrict access to this link.</p>
          </div>

          {/* OG Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">Preview Title</Label>
            <Input
              type="text"
              placeholder="Exciting Product Launch!"
              value={formData.ogTitle}
              onChange={(e) => handleChange("ogTitle", e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-gray-500">Shown as the title when shared on social media. (eg. Google)</p>
          </div>

          {/* OG Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">
              Preview Description <span className="ml-2 text-xs text-gray-500">(optional)</span>
            </Label>
            <Input
              type="text"
              placeholder="Check out our latest updates and features!"
              value={formData.ogDescription}
              onChange={(e) => handleChange("ogDescription", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-gray-500">Appears below the title on social platforms.</p>
          </div>

          {/* OG Image */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">
              Preview Image URL <span className="ml-2 text-xs text-gray-500">(optional)</span>
            </Label>
            <Input
              type="url"
              placeholder="https://example.com/preview.jpg"
              value={formData.ogImage}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <p className="text-xs text-gray-500">Used as the thumbnail when shared.</p>
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              className="bg-red-500 text-neutral-100 shadow-sm hover:bg-red-700"
              variant={"destructive"}
              disabled={formData.originalUrl.length === 0 || formData.ogTitle.length === 0 || loading}
            >
              Create Masked Link
            </Button>
            {loading && (
              <p className="text-sm mt-2 text-gray-500">Working in Progress...</p>
            )}
          </div>
        </form>
      </div>
    );
  }
}
