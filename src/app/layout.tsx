import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI WhatsApp Sales CRM | Nafter Web",
  description: "Automated WhatsApp CRM SaaS with AI Sales Bot integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-primary/20`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
