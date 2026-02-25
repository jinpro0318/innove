import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstallBanner from "@/components/common/InstallBanner";
import { LocaleProvider } from "@/hooks/useLocale";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
};

export const metadata: Metadata = {
  title: {
    default: "StartupMate - 창업 올인원 플랫폼 | 사업자등록, 상권분석, AI 로드맵",
    template: "%s | StartupMate",
  },
  description:
    "사업자등록, 상권분석, AI 로드맵까지. 창업의 모든 것을 여기서 끝내세요. Business registration, market analysis, and AI roadmaps — all in one place.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icon-192.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7H2N4JG0YL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7H2N4JG0YL');
          `}
        </Script>
      </head>
      <body
        className={`${notoSansKR.variable} ${inter.variable} font-sans bg-[#09090B] text-zinc-100 antialiased`}
      >
        <LocaleProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <InstallBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
