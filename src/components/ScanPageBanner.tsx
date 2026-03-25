"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { Scan, ExternalLink, Monitor, Smartphone } from "lucide-react";

export function ScanPageBanner() {
  const [scanUrl, setScanUrl] = useState(
    process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/scan`
      : "http://localhost:3000/scan"
  );

  useEffect(() => {
    setScanUrl(`${window.location.origin}/scan`);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-100 dark:border-blue-900">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
                <Scan size={12} />
                Device Info Scanner
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Scan to See Your Device Info
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-md">
                Open the Scan Page to see your device type, browser, operating system,
                screen resolution, IP address, and session ID — all in real time.
                Optionally enable live camera preview (no recording, no storage).
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/scan"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                >
                  <ExternalLink size={14} />
                  Open Scan Page
                </Link>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Monitor size={13} />
                  <span>Works on desktop & mobile</span>
                  <Smartphone size={13} />
                </div>
              </div>
            </div>

            {/* QR side */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-blue-100 dark:border-blue-800">
                <QRCodeCanvas
                  value={scanUrl}
                  size={150}
                  level="H"
                  includeMargin
                  bgColor="#ffffff"
                  fgColor="#1e3a8a"
                />
              </div>
              <p className="text-xs text-gray-400 text-center max-w-[160px] leading-relaxed">
                Scan with your phone to open the scan page on mobile
              </p>
              <p className="text-xs font-mono text-blue-500 break-all text-center max-w-[200px]">
                {scanUrl}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
