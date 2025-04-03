/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const QRCodeDownloadBtn = async (params: any) => {

    const shortId = params.shortId

    return (
        <div>
            <a
                href={`data:image/png;base64,${await new Promise((resolve) => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                        resolve(canvas.toDataURL().split(',')[1]);
                    }
                })}`}
                download={`${shortId}.png`}
                className="mt-2 text-blue-600 underline"
            >
                Download QR Code
            </a>
        </div>
    )
}

export default QRCodeDownloadBtn