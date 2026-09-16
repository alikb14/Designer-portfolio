import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  description: "Yaad is a 2D motion designer from planet Earth.",
  title: {
    default: "Yaad — Motion Designer",
    template: "%s — Yaad",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
