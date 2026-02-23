import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
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
  title: "창업메이트 - 창업 올인원 플랫폼 | 사업자등록, 상권분석, AI 로드맵",
  description:
    "검색은 그만. 사업자등록 가이드, 상권분석 지도, AI 맞춤 로드맵까지. 창업의 A to Z를 여기서 끝내세요.",
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
