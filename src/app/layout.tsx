import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "./components/ui/LanguageSwitcher";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reihan Aulia Darojat - Portfolio",
  description: "Portfolio of Reihan Aulia Darojat - Junior Machine Learning Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <LanguageProvider>
          <Header />
          {children}
          <LanguageSwitcher />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
