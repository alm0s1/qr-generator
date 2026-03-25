"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, X, ShieldCheck } from "lucide-react";

export function CameraPreview() {
  const [status, setStatus] = useState<"idle" | "requesting" | "active" | "denied" | "error">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStatus("active");
    } catch (err: unknown) {
      const name = err instanceof DOMException ? err.name : "";
      setStatus(name === "NotAllowedError" ? "denied" : "error");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStatus("idle");
  };

  useEffect(() => () => stopCamera(), []);

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera size={16} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Optional Camera Preview
          </h3>
        </div>
        {status === "active" && (
          <button
            onClick={stopCamera}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            <X size={12} />
            Stop
          </button>
        )}
      </div>

      {status === "idle" && (
        <div className="text-center py-6">
          <CameraOff size={28} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-xs text-gray-400 mb-4">
            Camera is <strong>not active</strong>. Nothing is recorded or stored.
          </p>
          <button
            onClick={startCamera}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs font-medium rounded-xl transition-colors"
          >
            <Camera size={13} />
            Enable Camera Preview
          </button>
        </div>
      )}

      {status === "requesting" && (
        <div className="text-center py-6">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400">Requesting camera permission…</p>
        </div>
      )}

      {status === "active" && (
        <div className="relative rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-56 object-cover"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE PREVIEW ONLY
          </div>
        </div>
      )}

      {status === "denied" && (
        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-xs text-yellow-700 dark:text-yellow-400">
          <CameraOff size={14} className="shrink-0 mt-0.5" />
          Camera permission was denied. You can enable it in your browser settings.
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400">
          <CameraOff size={14} className="shrink-0 mt-0.5" />
          Could not access camera. Make sure your device has a camera and this page uses HTTPS.
        </div>
      )}

      <div className="flex items-center gap-1.5 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
        <ShieldCheck size={12} className="text-green-500" />
        Live preview only. No frames are captured, recorded, or stored.
      </div>
    </div>
  );
}
