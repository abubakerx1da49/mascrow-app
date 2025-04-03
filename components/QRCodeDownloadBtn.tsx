"use client"; // Ensure this runs on the client side

import { useEffect, useState } from "react";

const QRCodeDownloadBtn = ({ shortId }: { shortId: string }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const qrData = canvas.toDataURL(); // Convert canvas to base64
      setQrCodeData(qrData);
    }
  }, []);

  return (
    <div className="h-full pb-1.5">
      {qrCodeData ? (
        <a
          href={qrCodeData}
          download={`${shortId}.png`}
          className="no-underline bg-primary text-primary-foreground shadow hover:bg-primary/90 p-2 rounded-md px-4 text-xs"
        >
          Download QR Code
        </a>
      ) : (
        <p>Generating QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDownloadBtn;
