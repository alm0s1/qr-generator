import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScanPageClient } from "@/components/scan/ScanPageClient";

export const metadata: Metadata = {
  title: "Scan Info — QR Generator",
  description: "Device and session information page. No personal data is captured.",
};

export default function ScanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              You Scanned a QR Code
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Here is your device and session information — displayed privately, just for you.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-400 text-center leading-relaxed">
            🔒 We respect your privacy. No personal data such as photos or contacts is accessed.
          </div>

          {/* Client-side device info + camera */}
          <ScanPageClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
