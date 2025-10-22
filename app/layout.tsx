import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Health-Coach | Online Doctor Consultation & Telehealth in Bangladesh",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },

  description:
    "Health-Coach is Bangladesh’s leading telehealth platform for online doctor consultations. Connect with certified doctors anytime, anywhere, and get e-prescriptions, medicine delivery, and diagnostic test support.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased pt-[190px]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
