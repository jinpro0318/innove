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
  themeColor: "#6C5CE7",
};

export const metadata: Metadata = {
  title: "StartupMate - AI 창업 비서 | 3분 만에 맞춤 창업 로드맵",
  description:
    "사업자등록부터 세금, 정부 지원금, 해외 진출까지. AI가 맞춤 창업 로드맵을 만들어드립니다.",
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
        className={`${notoSansKR.variable} ${inter.variable} font-sans bg-[#0A0A0F] text-white antialiased`}
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
