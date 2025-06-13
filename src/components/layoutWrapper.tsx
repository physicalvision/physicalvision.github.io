'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.includes('/research/');

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-1 max-w-6xl ma-auto px-0 py-4">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}