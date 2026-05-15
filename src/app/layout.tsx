import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alex Ferroni | AI & Deployment Engineer",
  description: "Portfolio of Alex Ferroni, AI & Deployment Engineer specialized in Deep Learning and Computer Vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-slate-950 text-slate-300 min-h-screen flex flex-col antialiased selection:bg-purple-500/30`}>
        {children}
      </body>
    </html>
  );
}
