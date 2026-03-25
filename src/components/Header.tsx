"use client";

import { QrCode } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <QrCode size={18} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-lg">
            QR Generator
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/scan"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
          >
            Scan Page
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
