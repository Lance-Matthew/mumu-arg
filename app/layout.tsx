import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USF Freshman Orientation Portal",
  description: "A remote orientation project by the University of Santo Fiarce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}