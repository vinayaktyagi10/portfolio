import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VimScroll from "@/components/VimScroll";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.toolden.xyz"),
  title: "Vinayak Tyagi | DevOps & Systems",
  description: "DevOps Intern & CS Student crafting efficient, containerized systems.",
  openGraph: {
    title: "Vinayak Tyagi | DevOps & Systems",
    description: "DevOps Intern & CS Student crafting efficient, containerized systems.",
    url: "https://portfolio.toolden.xyz",
    siteName: "Vinayak Tyagi",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: "Vinayak Tyagi's Blog" }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-terminal-black text-terminal-green selection:bg-terminal-green selection:text-terminal-black`}
      >
        <VimScroll />
        <ThemeSwitcher />
        <div className="scanline" />
        <Navbar />
        <main className="pt-14 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
