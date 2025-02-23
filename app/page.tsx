/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

export default function Home() {

  const { isSignedIn } = useUser();


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

    const runtime_formData = formData

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
      } else {
        console.error("Error:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  // Returns green if value exists, gray otherwise
  const getIconColor = (value: any) => (value ? 'green' : 'gray');

  if (isSignedIn) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)]">
        <Card className="w-full">
          <CardHeader className="p-4 text-sm border-b border-neutral-700">
            <CardTitle>Create a New Mascrow Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-4">

            {/* Original URL Field */}
            <div>
              <Label>Link:</Label>
              <div className="mt-2 flex items-center">
                <Input
                  type="url"
                  value={formData.originalUrl}
                  onChange={(e) => handleChange("originalUrl", e.target.value)}
                  required
                  className="flex-1"
                />
                <CheckCircle color={getIconColor(formData.originalUrl)} size={20} className="ml-2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Label>Password: <Badge variant={'secondary'}>optional</Badge></Label>
              <div className="mt-2 flex items-center">
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="flex-1"
                />
                <CheckCircle color={getIconColor(formData.password)} size={20} className="ml-2" />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={formData.originalUrl.length === 0}
            >
              Create Masked Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
