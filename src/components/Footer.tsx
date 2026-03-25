import { QrCode, Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <QrCode size={14} className="text-white" />
            </div>
            <span className="font-semibold text-gray-800 dark:text-white">QR Generator</span>
          </div>

          <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/scan" className="hover:text-blue-600 transition-colors">Scan Page</Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Shield size={12} />
            <span>Privacy-first · No data stored without consent</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} QR Generator. QR codes contain only links — file data is never embedded.
          </p>
        </div>
      </div>
    </footer>
  );
}
