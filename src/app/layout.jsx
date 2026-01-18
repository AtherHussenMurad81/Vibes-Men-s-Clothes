import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/provider/NextAuthProvider";

// Google Font
const pippins = Poppins({
  weight: ["100", "200", "400", "500", "600", "700"],
});

// Bangla Font
export const banglaFont = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://vibes-cloth.vercel.app"),
  title: {
    default: "Vibes Cloth | Online Mens Clothing Store",
    template: "%s | Vibes Cloth",
  },
  description:
    "Vibes Cloth is your ultimate online mens clothing store. Explore premium casual, formal, and stylish clothing for men.",
  keywords: [
    "mens cloths",
    "online mens store",
    "casual shirts",
    "formal wear",
    "hoodies",
  ],
  authors: [{ name: "Ather Hussen Murad" }],
  creator: "Ather Hussen Murad",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://vibes-cloth.vercel.app" },
  openGraph: {
    title: "Vibes Cloth | Online Mens Clothing Store",
    description:
      "Discover stylish and premium mens clothing at Vibes Cloth. Casual, formal, hoodies, and more.",
    url: "https://vibes-cloth.vercel.app",
    siteName: "Vibes Cloth",
    images: [
      {
        url: "https://i.ibb.co/Xx3s3tpK/image.png",
        width: 1200,
        height: 630,
        alt: "Vibes Cloth Homepage Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibes Cloth | Online Mens Clothing Store",
    description:
      "Shop premium mens clothing online at Vibes Cloth. Casual, formal, hoodies & more.",
    images: ["https://i.ibb.co/gb0bSrSV/image.png"],
  },
  icons: {
    icon: "https://i.ibb.co/TBTfyBd4/Screenshot-2026-01-18-145658.png",
    apple: "https://i.ibb.co/TBTfyBd4/Screenshot-2026-01-18-145658.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${pippins.className} antialiased`}>
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar />
          </header>

          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
            {children}
          </main>

          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </NextAuthProvider>
  );
}
