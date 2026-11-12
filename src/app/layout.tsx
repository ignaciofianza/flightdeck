import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlightDeck",
    template: "%s | FlightDeck",
  },
  description:
    "Discover real-world flights, explore routes, and find your next adventure in flight simulation.",
  applicationName: "FlightDeck",
  authors: [{ name: "Ignacio Fianza" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${spaceGrotesk.variable}
        ${manrope.variable}
        ${jetbrainsMono.variable}
        h-full antialiased
      `}
    >
      <body className="flex min-h-screen flex-col bg-[#090B0F] text-white">
        {children}
      </body>
    </html>
  );
}
