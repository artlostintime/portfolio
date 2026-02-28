import type { Metadata, Viewport } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "V. Singh — Portfolio",
  description: "At the Intersection of Psychology & Technology — Vishu Singh",
  icons: {
    icon: "/clover.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@300;400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@300;400;500&display=swap"
        />
      </head>
      <body
        className="bg-[var(--bg)] text-[var(--text-1)] overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
