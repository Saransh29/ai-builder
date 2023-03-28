import "./globals.css";
import Navbar from "./navbar";

export const metadata = {
  title: "Ai Builder",
  description: "Generate full websites with Ai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
