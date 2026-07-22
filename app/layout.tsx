import "./globals.css";
import React from "react";

export const metadata = {
  title: "Project Antigravity - Lead & Product Catalog",
  description: "Enterprise B2B Product Catalog, Verified Suppliers, and AI Compute Agent Lead Discovery",
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
