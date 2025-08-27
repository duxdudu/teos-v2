
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";
import { Toaster } from "@/components/ui/toast";
import { ThemeInit } from "@/components/ui/theme-init";
import AIChatbox from "@/components/AIChatbox";
import { I18nProvider } from "@/components/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teos.visual",
  description: "Professional photography services for weddings, portraits, events, and more",
  icons: {
    icon: '/logo1.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <ThemeInit />
          <ToastProvider>
            {children}
            <Toaster />
            <AIChatbox />
            {/* <AuthDebug /> */}
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
