import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { TabTitle } from "@/components/TabTitle";
import { StoryScroll } from "@/components/StoryScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Siddhant Surwade — Computer Engineering Student & Builder",
  description:
    "Personal portfolio of Siddhant Mithunkumar Surwade, a Computer Engineering student learning by building web projects and exploring technology.",
  authors: [{ name: "Siddhant Mithunkumar Surwade" }],
  keywords: [
    "Siddhant Surwade",
    "Computer Engineering",
    "Web Developer",
    "MGM College of Engineering and Technology",
    "Portfolio",
    "Builder",
    "Nestify",
  ],
  openGraph: {
    title: "Siddhant Surwade — Computer Engineering Student & Builder",
    description:
      "Personal portfolio of Siddhant Mithunkumar Surwade, a Computer Engineering student learning by building web projects and exploring technology.",
    url: "/",
    siteName: "Siddhant Surwade",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Siddhant Surwade — Computer Engineering Student & Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhant Surwade — Computer Engineering Student & Builder",
    description:
      "Personal portfolio of Siddhant Mithunkumar Surwade, a Computer Engineering student learning by building web projects and exploring technology.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal');",
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
        <TabTitle />
        <StoryScroll />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
