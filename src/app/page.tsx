import { Header } from "@/components/Header";
import { QRGenerator } from "@/components/QRGenerator";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { ScanPageBanner } from "@/components/ScanPageBanner";
import { QrCode, Zap, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-16 pb-10 px-4 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5 border border-blue-100 dark:border-blue-800">
              <Zap size={12} />
              Free & Instant QR Generation
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Generate QR Codes for
              <br />
              <span className="text-blue-600">Links, Images & Videos</span>
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Upload a file or paste a URL. We store your file securely and generate a QR code
              with a public link — never raw data.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Globe size={12} className="text-green-500" />
                Public file hosting
              </span>
              <span className="flex items-center gap-1.5">
                <QrCode size={12} className="text-blue-500" />
                Instant QR generation
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-500" />
                Download as PNG
              </span>
            </div>
          </div>

          {/* Generator Card */}
          <div className="max-w-lg mx-auto">
            <div className="card p-6 sm:p-8">
              <QRGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* Scan Page Banner — button + QR pointing to /scan */}
      <ScanPageBanner />

      {/* How it works */}
      <HowItWorks />

      <div className="flex-1" />
      <Footer />
    </div>
  );
}
