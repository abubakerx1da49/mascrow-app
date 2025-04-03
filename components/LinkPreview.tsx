"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const LinkPreview = (params: any) => {

  const id = params.id;
  const shortUrl = `/i/${id}`;
  const link = JSON.parse(params.link);

  let password_prompt: any
  let status = true;

  if (String(link.password).length !== 0) {
    status = false

    while (password_prompt !== link.password) {
      password_prompt = window.prompt("This page is password protected, please enter the password to continue");

      if (password_prompt === null) {
        alert("Access denied!");
        return null; // Stop execution if the user cancels
      }

      if (password_prompt !== link.password) {
        alert("Incorrect password, try again.");
      }

      if (password_prompt == link.password) {
        status = true
      }
    }
  }

  // console.log(link)

  return (
    <div>
      {status && (
        <Card className="w-full text-sm p-2 pt-8 rounded-none border-b border-neutral-700 prose prose-sm max-w-none prose-invert">
          <CardContent>

            {link.ogImage && (
              <img src={link.ogImage} alt="" className="max-w-32 lg:max-w-44 m-0 rounded-xl" />
            )}

            <h1 className="pt-6">{link.ogTitle}</h1>
            <p className="text-neutral-200">{link.ogDescription}</p>

            <div className="mt-6">
              <p className="text-neutral-100 text-xl pb-2 font-medium">Original URL:</p>
              <a href={link.originalUrl} target="_blank" className="text-blue-600 underline truncate block">
                {link.originalUrl}
              </a>
            </div>

            <p className="pt-3 text-sm text-neutral-200">Created: {new Date(link.createdAt).toLocaleString()}</p>

            {/* <div className="mt-6 flex items-center justify-between">
            <p className="text-neutral-100 font-medium">Shortened:</p>
            <div className="flex items-center gap-2">
                <a href={shortUrl} target="_blank" className="text-blue-600 font-semibold">
                    {shortUrl}
                </a>
            </div>
        </div> */}



            {/* Generate code that says share this link on different platform with the current page link in different social media platforms */}
            <div className="mt-6">
              <p className="text-neutral-100 text-xl pb-2 font-medium">Share this link:</p>
              <div className="flex space-x-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:?body=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Email
                </a>
                <a
                  href={`https://telegram.me/share/url?url=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Telegram
                </a>
                <a
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Reddit
                </a>
                <a
                  href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Tumblr
                </a>
                <a
                  href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Pinterest
                </a>
                <a
                  href={`https://www.blogger.com/blog-this.g?u=${encodeURIComponent(`https://mascrow-app.vercel.app/${shortUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline"
                >
                  Blogger
                </a>
              </div>
            </div>


            <div className="mt-6 flex justify-end">
              <Button asChild>
                <a href={link.originalUrl} target="_blank">
                  Open Link <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default LinkPreview