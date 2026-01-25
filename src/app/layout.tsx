import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Bitcoin Art Society | Art Belongs on Bitcoin",
  description: "Bitcoin Art Society is a curator-led initiative dedicated to elevating Bitcoin-native art and culture. Discover, collect, and preserve meaningful art on Bitcoin.",
  keywords: ["Bitcoin Art", "Ordinals", "NFT", "Bitcoin", "Digital Art", "Blockchain Art"],
  openGraph: {
    title: "Bitcoin Art Society | Art Belongs on Bitcoin",
    description: "Discover, collect, and preserve meaningful art on Bitcoin.",
    images: ["https://ext.same-assets.com/4158576384/4252825699.png"],
  },
  icons: {
    icon: "https://ext.same-assets.com/4158576384/4212929537.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
