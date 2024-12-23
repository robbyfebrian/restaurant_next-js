import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "../features/component/Navbar";

const quickSand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Restaurant app using next.js and axios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${quickSand.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
