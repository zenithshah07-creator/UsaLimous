import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import FloatingContact from '@/components/ui/FloatingContact';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: 'USA Limos Service | Premium Luxury Travel',
  description: 'Experience luxury travel with premium limousine service across the USA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-dm bg-primary-dark text-white antialiased selection:bg-gold selection:text-primary-dark">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen pt-[72px]">{children}</main>
          <Footer />
          <FloatingContact />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
