"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link2, Image, Film } from "lucide-react";
import { LinkTab } from "./tabs/LinkTab";
import { ImageTab } from "./tabs/ImageTab";
import { VideoTab } from "./tabs/VideoTab";
import { QRPreview } from "./QRPreview";
import { QRHistory } from "./QRHistory";
import { saveQRHistory } from "@/lib/utils";

type Tab = "link" | "image" | "video";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "link", label: "Link", icon: Link2 },
  { id: "image", label: "Image", icon: Image },
  { id: "video", label: "Video", icon: Film },
];

export function QRGenerator() {
  const [activeTab, setActiveTab] = useState<Tab>("link");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyKey, setHistoryKey] = useState(0);

  const handleLinkGenerate = (url: string) => {
    const id = uuidv4();
    saveQRHistory({ id, type: "link", url, label: url, createdAt: new Date().toISOString() });
    setGeneratedUrl(url);
    setHistoryKey((k) => k + 1);
  };

  const handleFileGenerate = async (file: File, type: "image" | "video") => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      const id = uuidv4();
      saveQRHistory({
        id,
        type,
        url: data.url,
        label: file.name,
        createdAt: new Date().toISOString(),
      });
      setGeneratedUrl(data.url);
      setHistoryKey((k) => k + 1);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedUrl("");
    setError("");
  };

  const handleHistorySelect = (url: string) => {
    setGeneratedUrl(url);
  };

  return (
    <div className="w-full">
      {/* Tab Bar */}
      <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); handleReset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Content */}
      {generatedUrl ? (
        <QRPreview url={generatedUrl} onReset={handleReset} />
      ) : (
        <div className="animate-fade-in">
          {activeTab === "link" && (
            <LinkTab onGenerate={handleLinkGenerate} loading={loading} />
          )}
          {activeTab === "image" && (
            <ImageTab onGenerate={(f) => handleFileGenerate(f, "image")} loading={loading} />
          )}
          {activeTab === "video" && (
            <VideoTab onGenerate={(f) => handleFileGenerate(f, "video")} loading={loading} />
          )}
        </div>
      )}

      {/* History */}
      <QRHistory onSelect={handleHistorySelect} refreshKey={historyKey} />
    </div>
  );
}
