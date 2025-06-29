"use client"

import Link from "next/link";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "People", href: "/people" },
    { name: "Projects", href: "/projects" },
    { name: "Publications", href: "/publications" },
    { name: "News", href: "/news" },
    { name: "Position", href: "/position" },
    
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white text-black shadow-lg bottom-0">
      <div className="max-w-6xl mx-auto px-2 py-2 flex items-center justify-between">
            {/* Brand */}
            <div className="flex flex-wrap gap-4 items-center">
            <Link href="https://www.ntu.edu.sg" className="flex items-center">
              <Image
                  src="/images/NTU_Logo.webp"
                  alt="NTU Logo"
                  className="h-[40px] w-auto object-contain"
                  width={100}
                  height={60}
              />
              </Link>
              <Link href="/" className="flex items-center">
              <Image
                  src="/images/pvg_log.png"
                  alt="PVG Logo"
                  className="h-[50px] w-auto object-contain"
                  width={100}
                  height={60}
              />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
            {navigation.map((item) => (
                <Link
                key={item.name}
                href={item.href}
                className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary font-semibold" : "text-gray-600"
                )}
                >
                {item.name}
                </Link>
            ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                {mobileMenuOpen ? (
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    />
                )}
                </svg>
            </button>
            </div>
        {/* </div> */}
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 overflow-hidden px-4",
          mobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        )}
      >
        <ul className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary font-semibold" : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
