"use client";

import { useState, useEffect } from "react";
import { DeviceInfo } from "./DeviceInfo";
import { CameraPreview } from "./CameraPreview";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode } from "lucide-react";

export function ScanPageClient() {
  // Start with env var or localhost — overwritten client-side to avoid hydration mismatch
  const [scanUrl, setScanUrl] = useState(
    process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/scan`
      : "http://localhost:3000/scan"
  );

  useEffect(() => {
    // Now safe to read window — runs only on client after hydration
    setScanUrl(`${window.location.origin}/scan`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Device Info */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
          Session & Device Information
        </h2>
        <DeviceInfo />
      </div>

      {/* Camera */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
          Camera (Optional)
        </h2>
        <CameraPreview />
      </div>

      {/* Share this page via QR */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <QrCode size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
            Share This Page
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="p-2 bg-white rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <QRCodeCanvas
              value={scanUrl}
              size={120}
              level="H"
              includeMargin
              bgColor="#ffffff"
              fgColor="#1e293b"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Scan this code to open this page on another device. Each visit shows fresh
              device and session info — nothing is saved.
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono break-all">{scanUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
