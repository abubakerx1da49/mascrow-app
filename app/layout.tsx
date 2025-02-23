/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mascrow",
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  const { userId } = await auth();
  if (userId) {
    // console.log(userId)
  }
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 antialiased min-h-screen h-screen p-0 md:p-6 invert-0`}
        >

          <div className="relative md:border border-neutral-700 max-w-6xl md:rounded-xl h-full m-auto bg-neutral-900 overflow-hidden overflow-y-auto">

            <div className="w-full bg-neutral-800 z-50 border-b border-neutral-700 sticky top-0 left-0 pl-4 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm lowercase">
                <AlignJustify className="w-4" />
                <Link href={"/"}>
                  <h1>Mascrow</h1>
                </Link>
              </div>
              <header className="flex items-center space-x-2">
                <SignedOut>
                  <Button variant={'outline'} size={'sm'} className="bg-transparent border-neutral-600">
                    <SignUpButton />
                  </Button>
                  <Button variant={'default'} size={'sm'}>
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
            </div>

            {user?.emailAddresses ? (
              <div>
                <div className="flex items-center border-b border-neutral-700 text-white text-sm">
                  <Link href={"/"} className="text-xs">
                    <div className="p-2 border-r border-neutral-700 hover:bg-neutral-800">dashboard</div>
                  </Link>
                  <Link href={"/shortend-links"} className="text-xs">
                    <div className="p-2 border-r border-neutral-700 hover:bg-neutral-800">Links</div>
                  </Link>
                </div>
                {children}
              </div>
            ) : (
              <div className="">
                
                {children}

                <div className="bg-yellow-400 p-2 text-black text-sm">
                  Please register to access mascrow and use all features on this platform.
                </div>

                <div className="prose prose-sm max-w-none p-6 prose-invert">
                  <h2 id="url-masker-secure-customizable-link-sharing">URL MASKER – Secure &amp; Customizable Link Sharing</h2>
                  <p><strong>Welcome to URL MASKER</strong>, the ultimate tool for secure and enhanced link customization. Whether you&#39;re sharing confidential links, tracking analytics, or customizing previews, URL MASKER gives you full control over your links.  </p>
                  <h3 id="why-choose-url-masker-">Why Choose URL MASKER?</h3>
                  <ul>
                    <li>🔒 <strong>Password Protection</strong> – Secure your links with user-defined passwords.  </li>
                    <li>🖼 <strong>Custom OG Previews</strong> – Control how your links appear on social media.  </li>
                    <li>📢 <strong>One-Click Social Sharing</strong> – Seamlessly share links across platforms.  </li>
                    <li>📊 <strong>Google Analytics Integration</strong> – Gain insights into link performance.  </li>
                    <li>🕰 <strong>Scheduled Link Activation</strong> – Set activation times for your links.  </li>
                    <li>📂 <strong>Instant File Detection</strong> – Detect and share files instantly via links.  </li>
                    <li>📌 <strong>QR Code Generation</strong> – Create and download QR codes for easy access.  </li>
                  </ul>
                  <h3 id="built-with-cutting-edge-technology">Built with Cutting-Edge Technology</h3>
                  <p>URL MASKER is powered by a robust tech stack:  </p>
                  <ul>
                    <li><strong>Frontend:</strong> Next.js, React.js, Tailwind CSS, HTMX  </li>
                    <li><strong>Backend:</strong> Node.js, MongoDB  </li>
                    <li><strong>Hosting &amp; Deployment:</strong> Vercel, MongoDB Atlas  </li>
                  </ul>
                  <h3 id="a-seamless-user-experience">A Seamless User Experience</h3>
                  <p>Designed with simplicity in mind, URL MASKER offers a <strong>clean, intuitive, and responsive UI</strong>, ensuring smooth navigation across devices.  </p>
                  <h3 id="get-started-today-">Get Started Today!</h3>
                  <p><strong>Register now</strong> to unlock the full potential of secure link sharing.  </p>
                  <hr />
                  <p>🚀 <em>Enhancing link security and customization—one URL at a time.</em>  </p>
                </div>
              </div>
            )}

          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
