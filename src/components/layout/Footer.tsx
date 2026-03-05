import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Products",
    links: [
      { label: "Security Cameras", href: "/collections/security-cameras" },
      { label: "Robot Vacuums", href: "/collections/robot-vacuums" },
      { label: "Video Doorbells", href: "/collections/video-doorbells" },
      { label: "Smart Locks", href: "/collections/smart-locks" },
      { label: "Smart Lights", href: "/collections/smart-lights" },
      { label: "Lawn Mowers", href: "/collections/lawn-mowers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Warranty", href: "/warranty" },
      { label: "Returns", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About eufy", href: "/about" },
      { label: "Privacy Commitment", href: "/privacy-commitment" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Partner Program", href: "/partners" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "eufyCredits", href: "/eufycredits" },
      { label: "Order Tracking", href: "/order-tracking" },
      { label: "Student Discount", href: "/student-discount" },
      { label: "Military Discount", href: "/military-discount" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/eufyofficial", icon: "fb" },
  { label: "Twitter", href: "https://twitter.com/eaboreufy", icon: "tw" },
  { label: "Instagram", href: "https://www.instagram.com/eufy_official/", icon: "ig" },
  { label: "YouTube", href: "https://www.youtube.com/@eufy", icon: "yt" },
  { label: "TikTok", href: "https://www.tiktok.com/@eufy_official", icon: "tk" },
];

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    fb: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    tw: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    ig: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6M17.25 5.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z",
    yt: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
    tk: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.89 2.89 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.14 15.67a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.77 1.53V7.28a4.85 4.85 0 01-1-.59z",
  };

  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d={icons[type] || ""} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-eufy-dark text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold">eufy</span>
              <span className="text-sm text-gray-400">Built with Care</span>
            </div>

            {/* Social */}
            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-gray-300">
                Accessibility
              </Link>
              <span>&copy; {new Date().getFullYear()} eufy. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
