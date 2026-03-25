"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Clock, Link2, Image, Film, Trash2, ExternalLink } from "lucide-react";
import { getQRHistory, clearQRHistory, QRHistoryItem } from "@/lib/utils";

const typeIcon = {
  link: Link2,
  image: Image,
  video: Film,
};

const typeColor = {
  link: "text-blue-500",
  image: "text-green-500",
  video: "text-purple-500",
};

interface QRHistoryProps {
  onSelect: (url: string) => void;
  refreshKey: number;
}

export function QRHistory({ onSelect, refreshKey }: QRHistoryProps) {
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getQRHistory());
  }, [refreshKey]);

  if (history.length === 0) return null;

  const handleClear = () => {
    clearQRHistory();
    setHistory([]);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Recent QR Codes
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
            {history.length}/5
          </span>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map((item) => {
          const Icon = typeIcon[item.type];
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.url)}
              className="card p-3 flex items-center gap-3 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all text-left group"
            >
              <div className="shrink-0">
                <QRCodeCanvas value={item.url} size={48} level="L" includeMargin bgColor="#ffffff" fgColor="#1e293b" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`flex items-center gap-1 mb-0.5 ${typeColor[item.type]}`}>
                  <Icon size={11} />
                  <span className="text-xs font-medium capitalize">{item.type}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <ExternalLink
                size={13}
                className="shrink-0 text-gray-300 group-hover:text-blue-400 transition-colors"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
