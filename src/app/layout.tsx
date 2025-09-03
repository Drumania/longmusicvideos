
import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { VideoPlayerProvider } from "@/context/VideoPlayerContext";
import { GlobalVideoPlayer } from "@/components/GlobalVideoPlayer";

const atkinsonMono = Atkinson_Hyperlegible({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Lofi Video Directory",
  description: "Your place for curated lofi hip hop beats to study, relax, or focus.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${atkinsonMono.variable} antialiased`}
      >
        <AuthProvider>
          <VideoPlayerProvider>
            {children}
            <GlobalVideoPlayer />
          </VideoPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
