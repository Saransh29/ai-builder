import "./globals.css";
import Navbar from "./navbar";
import Floating from "@/components/Floating";
import Script from "next/script";

export const metadata = {
  title: "Ai Builder",
  description:
    "Generate full websites with Ai, in less than 1 minute. Poweed by ChatGPT",
};

export default function RootLayout({ children }) {
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
        content="https://ai-builder-gules.vercel.app/og-svg.svg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="ai-builder-gules.vercel.app" />
      <meta
        property="twitter:url"
        content="https://ai-builder-gules.vercel.app/"
      />
      <meta name="twitter:title" content="Ai Builder" />
      <meta
        name="twitter:description"
        content="Generate full websites with Ai, in less than 1 minute. Poweed by ChatGPT"
      />
      <meta
        name="twitter:image"
        content="https://ai-builder-gules.vercel.app/og-svg.svg"
      />

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
        <Navbar />
        {children}
        <Floating />
      </body>
    </html>
  );
}
