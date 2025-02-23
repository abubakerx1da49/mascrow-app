/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function Home() {

  const [formData, setFormData] = useState({
    originalUrl: "",
    maskedUrl: "",
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

  const handleSubmit = () => {
    console.log("Submitting:", formData);
    // Handle API request here
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Card className="w-full">
        <CardHeader className="border-b border-neutral-700">
          <CardTitle>Create a New Masked Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          <div>
            <Label>Original URL</Label>
            <Input type="url" value={formData.originalUrl} onChange={(e) => handleChange("originalUrl", e.target.value)} required />
          </div>
          <div>
            <Label>Custom Masked URL (optional)</Label>
            <Input type="text" value={formData.maskedUrl} onChange={(e) => handleChange("maskedUrl", e.target.value)} />
          </div>
          <div>
            <Label>Password (optional)</Label>
            <Input type="password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} />
          </div>
          <div>
            <Label>Custom OG Title</Label>
            <Input type="text" value={formData.ogTitle} onChange={(e) => handleChange("ogTitle", e.target.value)} />
          </div>
          <div>
            <Label>Custom OG Description</Label>
            <Textarea value={formData.ogDescription} onChange={(e) => handleChange("ogDescription", e.target.value)} />
          </div>
          <div>
            <Label>Custom OG Image URL</Label>
            <Input type="url" value={formData.ogImage} onChange={(e) => handleChange("ogImage", e.target.value)} />
          </div>
          <div>
            <Label>Schedule Activation</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  {formData.schedule ? format(formData.schedule, "PPP") : "Pick a date"}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar mode="single" selected={(formData.schedule as any)} onSelect={(date) => handleChange("schedule", date)} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enableQr" checked={formData.enableQr} onCheckedChange={(value) => handleChange("enableQr", value)} />
            <Label htmlFor="enableQr">Generate QR Code</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="analytics" checked={formData.analytics} onCheckedChange={(value) => handleChange("analytics", value)} />
            <Label htmlFor="analytics">Enable Google Analytics</Label>
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={formData.originalUrl.length == 0}>Create Masked Link</Button>
        </CardContent>
      </Card>
    </div>
  );
}
