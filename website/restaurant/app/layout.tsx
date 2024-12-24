import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "../features/component/Navbar";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

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
      <body className={`${poppins.className} antialiased bg-gradient-to-tr from-sky-300 to-sky-800`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
