import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Court Click - Certified True Copy",
  description: "Manage CTC Orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AntdRegistry>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
