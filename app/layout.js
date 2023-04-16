"use client";
import "./globals.css";
import Navbar from "./navbar";
import Floating from "@/ui/Floating";
import BottomBar from "@/ui/BottomBar";
import { AnalyticsWrapper } from "@/utils/Analytics";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LoadingProvider } from "@/hooks/useLoading";

export const metadata = {
  title: "Ai Builder",
  description:
    "Generate full websites with AI, in less than 1 minute. Powered by ChatGPT",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // const showHeader = pathname === "/c/642b7b21758b800e1679bafa" ? false : true;
  const showHeader = !(
    pathname.startsWith("/c/") || pathname.startsWith("/v2/")
  );

  return (
    <html lang="en">
      <meta property="og:url" content="https://ai-builder-gules.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ai Builder" />

      <meta
        property="og:description"
        content="Generate full websites with AI, in less than 1 minute. Powered by ChatGPT"
      />
      <meta
        property="og:image"
        content="https://ai-builder-gules.vercel.app/image.png"
      />
      <meta
        property="og:image:alt"
        content="Generate full websites with AI, in less than 1 minute. Powered by ChatGPT"
      />
      <meta property="og:image:width" content="1200"></meta>
      <meta property="og:image:height" content="630"></meta>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      ></Script>

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `}
      </Script>
      <body>
        <LoadingProvider>
          <SessionProvider>
            {showHeader && <Navbar />}
            {children}
            {showHeader && <Floating />}
            {!showHeader && <BottomBar />}

            <AnalyticsWrapper />
          </SessionProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
