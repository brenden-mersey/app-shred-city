import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CalculatorProvider } from "./contexts/CalculatorContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import DrawerMenu from "./components/layout/DrawerMenu";
import DrawerCalculator from "./components/layout/DrawerCalculator";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./styles/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shred City - Barbell Plate Calculator",
    template: "%s | Shred City",
  },
  description:
    "Fast, equipment-aware barbell and plate calculator for lifters. Enter your target weight and get instant per-side plate breakdown. No mental math between sets.",
  keywords: [
    "barbell calculator",
    "plate calculator",
    "weightlifting calculator",
    "gym calculator",
    "barbell plates",
    "weight plates",
    "lifting calculator",
    "strength training",
  ],
  authors: [{ name: "Shred City" }],
  creator: "Shred City",
  publisher: "Shred City",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shredcity.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Shred City",
    title: "Shred City - Barbell Plate Calculator",
    description:
      "Fast, equipment-aware barbell and plate calculator for lifters. Enter your target weight and get instant per-side plate breakdown.",
    // Uncomment and add your Open Graph image when ready:
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Shred City - Barbell Plate Calculator",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shred City - Barbell Plate Calculator",
    description:
      "Fast, equipment-aware barbell and plate calculator for lifters. No mental math between sets.",
    // Uncomment and add your Twitter image when ready:
    // images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add when you have verification codes:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CalculatorProvider>
          <DrawerProvider>
            <Header />
            {children}
            <Footer />
            <DrawerMenu />
            <DrawerCalculator />
          </DrawerProvider>
        </CalculatorProvider>
      </body>
    </html>
  );
}
