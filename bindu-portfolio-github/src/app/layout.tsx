import type { Metadata } from "next";
import { Space_Grotesk, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, CustomCursor } from "@/components/UI";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Bindu | Creative Filmmaker & AI Visual Storyteller",
  description:
    "Explore the cinematic portfolio of Bindu, featuring AI-assisted filmmaking, storytelling, creative visuals, historical narratives, and imaginative video projects.",
  keywords: [
    "Bindu",
    "Kadha Cheppana Meeku",
    "Creative Filmmaker",
    "AI Visual Storyteller",
    "Cinematic Content Creator",
    "Historical Narratives",
    "AI Filmmaking",
    "Runway Gen-3",
    "Mythology Short Films",
  ],
  authors: [{ name: "Bindu", url: "https://www.youtube.com/@kadhacheppana-meeku" }],
  creator: "Bindu",
  publisher: "BINDU Creative Studio",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Bindu | Creative Filmmaker & AI Visual Storyteller",
    description:
      "Explore the cinematic portfolio of Bindu, featuring AI-assisted filmmaking, storytelling, creative visuals, historical narratives, and imaginative video projects.",
    type: "website",
    locale: "en_US",
    siteName: "BINDU Creative Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bindu | Creative Filmmaker & AI Visual Storyteller",
    description:
      "Transforming imagination and ancient Indian lore into cinematic digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable} dark scroll-smooth`}
    >
      <body className="bg-jet text-white font-sans antialiased selection:bg-royal/30 selection:text-white min-h-screen flex flex-col relative">
        {/* Subtle Film Grain Texture Overlay */}
        <div className="fixed inset-0 film-grain pointer-events-none z-30" />

        {/* Desktop Interactive Follower Cursor */}
        <CustomCursor />

        {/* Global Floating Glass Navigation Bar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Studio Footer */}
        <Footer />
      </body>
    </html>
  );
}
