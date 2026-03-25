"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet, Globe, Clock, Hash, Wifi, AlertCircle } from "lucide-react";

interface DeviceData {
  deviceType: string;
  browser: string;
  os: string;
  screenResolution: string;
  dateTime: string;
  sessionId: string;
  ip: string;
  language: string;
  timezone: string;
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile";
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  return "Computer";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg/i.test(ua)) return "Microsoft Edge";
  if (/OPR|Opera/i.test(ua)) return "Opera";
  if (/Chrome/i.test(ua)) return "Google Chrome";
  if (/Firefox/i.test(ua)) return "Mozilla Firefox";
  if (/Safari/i.test(ua)) return "Apple Safari";
  return "Unknown Browser";
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (/Windows NT 10/i.test(ua)) return "Windows 10/11";
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/iPhone OS/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown OS";
}

function getSessionId(): string {
  const stored = sessionStorage.getItem("qr_session_id");
  if (stored) return stored;
  const id = `SID-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  sessionStorage.setItem("qr_session_id", id);
  return id;
}

const DeviceIcon = ({ type }: { type: string }) => {
  if (type === "Mobile") return <Smartphone size={16} />;
  if (type === "Tablet") return <Tablet size={16} />;
  return <Monitor size={16} />;
};

export function DeviceInfo() {
  const [data, setData] = useState<DeviceData | null>(null);
  const [ipError, setIpError] = useState(false);

  useEffect(() => {
    const deviceType = getDeviceType();
    const browser = getBrowser();
    const os = getOS();
    const screenResolution = `${window.screen.width} × ${window.screen.height}`;
    const dateTime = new Date().toLocaleString();
    const sessionId = getSessionId();
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setData({ deviceType, browser, os, screenResolution, dateTime, sessionId, ip: "Loading...", language, timezone });

    // Fetch IP from our safe API endpoint
    fetch("/api/ip")
      .then((r) => r.json())
      .then((d) => setData((prev) => prev ? { ...prev, ip: d.ip || "Unknown" } : prev))
      .catch(() => {
        setIpError(true);
        setData((prev) => prev ? { ...prev, ip: "Unavailable" } : prev);
      });
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        ))}
      </div>
    );
  }

  const items = [
    { icon: <DeviceIcon type={data.deviceType} />, label: "Device Type", value: data.deviceType, color: "text-blue-500" },
    { icon: <Globe size={16} />, label: "Browser", value: data.browser, color: "text-green-500" },
    { icon: <Monitor size={16} />, label: "Operating System", value: data.os, color: "text-purple-500" },
    { icon: <Monitor size={16} />, label: "Screen Resolution", value: data.screenResolution, color: "text-orange-500" },
    { icon: <Clock size={16} />, label: "Date & Time", value: data.dateTime, color: "text-red-500" },
    { icon: <Hash size={16} />, label: "Session ID", value: data.sessionId, color: "text-yellow-500" },
    {
      icon: <Wifi size={16} />,
      label: "IP Address",
      value: data.ip,
      color: ipError ? "text-gray-400" : "text-cyan-500",
    },
    { icon: <Globe size={16} />, label: "Language / Timezone", value: `${data.language} · ${data.timezone}`, color: "text-indigo-500" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="card p-4 flex items-start gap-3 animate-fade-in">
            <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {ipError && (
        <p className="flex items-center gap-1.5 text-xs text-gray-400">
          <AlertCircle size={12} />
          IP address could not be retrieved (may require server headers).
        </p>
      )}
    </div>
  );
}
