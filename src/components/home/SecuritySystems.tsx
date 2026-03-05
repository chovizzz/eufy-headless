import Link from "next/link";
import Image from "next/image";

const SYSTEMS = [
  {
    name: "LocalSecure\u2122 System",
    tagline: "DIY Security System with No Monthly Fee",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop",
    href: "/collections/localsecure",
  },
  {
    name: "ProSecure\u2122 System",
    tagline: "Professional 24/7 Security System Powered by a Local AI Agent",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
    href: "/collections/prosecure",
  },
  {
    name: "ExpertSecure\u2122 System",
    tagline: "The Best 24/7 Local Video Alarm System with Expert Monitoring, Even During Outages",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=400&fit=crop",
    href: "/collections/expertsecure",
  },
];

export function SecuritySystems() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-4 text-center">
        Choose the Security System that Best Fits Your Home
      </h2>
      <p className="text-eufy-text-light text-center mb-12 max-w-2xl mx-auto">
        eufy offers local security solutions with no monthly fees, keeping your data private and your home protected.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SYSTEMS.map((system) => (
          <Link
            key={system.name}
            href={system.href}
            className="group relative overflow-hidden rounded-2xl aspect-4/3"
          >
            <Image
              src={system.image}
              alt={system.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{system.name}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{system.tagline}</p>
              <span className="inline-flex items-center mt-4 text-sm font-semibold group-hover:underline">
                Shop Now
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
