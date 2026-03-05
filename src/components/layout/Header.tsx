"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

interface HeaderProps {
  shopName?: string;
  navItems?: NavItem[];
}

const FALLBACK_NAV: NavItem[] = [
  {
    title: "Security",
    href: "/collections/security",
    children: [
      { title: "All Security", href: "/collections/security" },
      { title: "Outdoor Cameras", href: "/collections/outdoor-cameras" },
      { title: "Indoor Cameras", href: "/collections/indoor-cameras" },
      { title: "Video Doorbells", href: "/collections/video-doorbells" },
      { title: "Smart Locks", href: "/collections/smart-locks" },
      { title: "HomeBase", href: "/collections/homebase" },
    ],
  },
  {
    title: "Cleaning",
    href: "/collections/cleaning",
    children: [
      { title: "All Cleaning", href: "/collections/cleaning" },
      { title: "Robot Vacuums", href: "/collections/robot-vacuums" },
      { title: "Lawn Mowers", href: "/collections/lawn-mowers" },
    ],
  },
  {
    title: "Smart Living",
    href: "/collections/smart-living",
    children: [
      { title: "All Smart Living", href: "/collections/smart-living" },
      { title: "Smart Lights", href: "/collections/smart-lights" },
      { title: "Smart Scales", href: "/collections/smart-scales" },
      { title: "Baby Monitors", href: "/collections/baby-monitors" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "All Products", href: "/products" },
      { title: "New Arrivals", href: "/collections/new-arrivals" },
      { title: "Best Sellers", href: "/collections/best-sellers" },
      { title: "Deals", href: "/collections/deals" },
    ],
  },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export function Header({ shopName, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const items = navItems && navItems.length > 0 ? navItems : FALLBACK_NAV;
  const brandName = shopName || "eufy";

  return (
    <header className="sticky top-0 z-50">
      {/* Promo Bar */}
      <div className="bg-eufy-dark text-white text-center text-sm py-2 px-4">
        <Link href="/collections/deals" className="hover:underline">
          <span className="inline-block bg-eufy-accent text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
            New
          </span>
          Shop the Latest {brandName} Products &mdash; Free Shipping on All Orders!
        </Link>
      </div>

      {/* Main Nav */}
      <nav
        className="bg-white border-b border-gray-100 shadow-sm"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label={`${brandName} Home`}>
              <span className="text-2xl font-bold tracking-tight text-eufy-dark">
                {brandName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-eufy-text hover:text-eufy-blue transition-colors rounded-lg hover:bg-gray-50"
                  >
                    {item.title}
                  </Link>
                  {item.children && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-eufy-text hover:bg-eufy-gray hover:text-eufy-blue transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                aria-label="Search"
                className="p-2 text-eufy-text hover:text-eufy-blue transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                aria-label="Account"
                className="hidden sm:block p-2 text-eufy-text hover:text-eufy-blue transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                aria-label="Cart"
                className="relative p-2 text-eufy-text hover:text-eufy-blue transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-1.5 7h13M17 13v6m-4-3h2m-8 3a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-eufy-text"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1">
              {items.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 text-base font-medium text-eufy-text hover:bg-eufy-gray rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-eufy-text-light hover:text-eufy-blue"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
