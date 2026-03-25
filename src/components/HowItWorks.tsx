import { Link2, Upload, Cloud, QrCode } from "lucide-react";

const steps = [
  {
    icon: Link2,
    color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    title: "Enter a Link",
    description: "Paste any URL and we'll generate a QR code that opens it directly.",
  },
  {
    icon: Upload,
    color: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    title: "Upload a File",
    description: "Upload an image or video (JPG, PNG, WebP, MP4, MOV, WebM).",
  },
  {
    icon: Cloud,
    color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
    title: "Secure Storage",
    description: "Your file is stored securely and a permanent public URL is created.",
  },
  {
    icon: QrCode,
    color: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    title: "QR Code Ready",
    description: "Download your QR code as PNG or copy the link to share anywhere.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            QR codes contain only a link — never raw file data. For uploaded files, we store
            the file first, generate a public URL, then build the QR code around that URL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color}`}>
                  <step.icon size={22} />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{step.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
