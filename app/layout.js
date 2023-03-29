import "./globals.css";
import Navbar from "./navbar";
import Floating from "@/components/Floating";
import Script from "next/script";

export const metadata = {
  title: "Ai Builder",
  description:
    "Generate full websites with Ai, in less than 1 minute. Poweed by ChatGPT",
  opengraph: {
    title: "Ai Builder",
    description: "Generate full websites with Ai.",
    url: "https://ai-builder.vercel.app/",
    siteName: "Ai Builder",
    images: [
      {
        url: "https://ai-builder-gules.vercel.app/og-svg.svg",
        width: 800,
        height: 400,
        alt: "Ai Builder",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        property="og:image"
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
