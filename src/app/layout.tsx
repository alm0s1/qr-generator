import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "QR Generator — Generate QR Codes for Links, Images & Videos",
  description:
    "A professional QR code generator. Upload images or videos, get a public link, and generate a QR code instantly. Supports Arabic and dark mode.",
  keywords: ["QR code", "generator", "image", "video", "link", "QR"],
  openGraph: {
    title: "QR Generator",
    description: "Generate QR codes for links, images, and videos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
