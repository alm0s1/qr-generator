"use client";

import { useRef, useCallback, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy, Check, RotateCcw } from "lucide-react";

interface QRPreviewProps {
  url: string;
  onReset: () => void;
}

export function QRPreview({ url, onReset }: QRPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <div className="animate-slide-up flex flex-col items-center gap-5">
      <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div ref={canvasRef}>
          <QRCodeCanvas
            value={url}
            size={220}
            level="H"
            includeMargin
            bgColor="#ffffff"
            fgColor="#1e293b"
          />
        </div>
      </div>

      <div className="w-full max-w-xs">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 truncate px-2">
          {url}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Download size={15} />
            Download PNG
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl transition-colors"
          >
            {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <button
          onClick={onReset}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </div>
  );
}
