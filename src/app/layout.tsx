import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { DarkModeProvider } from "@/lib/dark-mode";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HR On/Offboarding",
  description: "Professional employee onboarding and offboarding management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <DarkModeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}