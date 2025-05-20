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
  children
}: Readonly<{
  children: React.ReactNode;
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
          className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-900 antialiased min-h-screen h-screen`}
        >
          <div className="">

            {/* Top App Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <AlignJustify className="w-4 h-4" />
                <Link href="/">
                  <span className="text-base font-semibold">Mascrow</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <SignedOut>
                  <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-100">
                    <SignUpButton />
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>

            {/* Navigation */}
            {user?.emailAddresses ? (
              <>
                <nav className="flex items-center border-b border-gray-200 bg-gray-50 text-sm text-gray-700">
                  <Link href="/" className="text-xs">
                    <div className="px-4 py-2 border-r border-gray-200 hover:bg-gray-100">Dashboard</div>
                  </Link>
                  <Link href="/shortend-links" className="text-xs">
                    <div className="px-4 py-2 border-r border-gray-200 hover:bg-gray-100">Links</div>
                  </Link>
                </nav>
                <main className="">{children}</main>
              </>
            ) : (
              <>
                <main className="">{children}</main>

                {/* Info Banner */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800">
                  Please register to access Mascrow and unlock all features.
                </div>

                {/* Marketing Content */}
                <section className="prose prose-sm max-w-none p-6">
                  <h2>URL MASKER – Secure & Customizable Link Sharing</h2>
                  <p><strong>Welcome to URL MASKER</strong>, the ultimate tool for secure and enhanced link customization.</p>
                  <h3>Why Choose URL MASKER?</h3>
                  <ul>
                    <li>🔒 <strong>Password Protection</strong> – Secure your links with user-defined passwords.</li>
                    <li>🖼 <strong>Custom OG Previews</strong> – Control how your links appear on social media.</li>
                    <li>📢 <strong>One-Click Social Sharing</strong> – Seamlessly share links across platforms.</li>
                    <li>📊 <strong>Google Analytics Integration</strong> – Gain insights into link performance.</li>
                    <li>🕰 <strong>Scheduled Link Activation</strong> – Set activation times for your links.</li>
                    <li>📂 <strong>Instant File Detection</strong> – Detect and share files instantly via links.</li>
                    <li>📌 <strong>QR Code Generation</strong> – Create and download QR codes for easy access.</li>
                  </ul>
                  <h3>Built with Cutting-Edge Technology</h3>
                  <ul>
                    <li><strong>Frontend:</strong> Next.js, React.js, Tailwind CSS, HTMX</li>
                    <li><strong>Backend:</strong> Node.js, MongoDB</li>
                    <li><strong>Hosting & Deployment:</strong> Vercel, MongoDB Atlas</li>
                  </ul>
                  <h3>A Seamless User Experience</h3>
                  <p>Designed with simplicity in mind, URL MASKER offers a <strong>clean, intuitive, and responsive UI</strong>.</p>
                  <h3>Get Started Today!</h3>
                  <p><strong>Register now</strong> to unlock the full potential of secure link sharing.</p>
                  <hr />
                  <p>🚀 <em>Enhancing link security and customization—one URL at a time.</em></p>
                </section>
              </>
            )}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
