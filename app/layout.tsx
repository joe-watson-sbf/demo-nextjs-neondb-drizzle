import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js & Neon",
  description: "A Next.js starter with Neon CSS",
  authors: [
    {
      name: "Joe Watson SBF",
      "url": "https://joedev.vakaks.com",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={inter.className}>
        <Theme>
          <main className='container p-8 max-w-xl mx-auto'>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
