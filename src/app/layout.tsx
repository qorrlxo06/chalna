import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { DemoCheckoutModal } from "@/components/DemoCheckoutModal";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_INFO.brandKo}(${SITE_INFO.brandHanja}) — ${SITE_INFO.tagline}`,
    template: `%s | ${SITE_INFO.brandKo}`,
  },
  description: SITE_INFO.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-ink font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <DemoCheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
