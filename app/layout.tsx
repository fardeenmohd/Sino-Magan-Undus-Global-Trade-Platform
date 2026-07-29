import "./globals.css";
import React from "react";

export const metadata = {
  title: "Sino Magan Indus Global Trade - Cross-Border ExIm Engine",
  description: "Premier cross-border commodity trade platform connecting Indian exporters with global importers in Poland, Netherlands, Australia, Oman, China & USA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
