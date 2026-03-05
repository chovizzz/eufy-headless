import Link from "next/link";
import Image from "next/image";

const TECH_ITEMS = [
  {
    title: "HydroJet\u2122 Deep Cleaning System",
    description: "Available on eufy Omni S1 Pro, E28, E25 and C28. Revolutionary water-based cleaning technology that self-cleans the mop in real time.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop",
    href: "/technology/hydrojet",
  },
  {
    title: "eufy\u2019s Privacy Commitment",
    description: "Your Privacy is Our Priority. All security data is stored locally with military-grade encryption. No cloud storage, no monthly fees.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
    href: "/privacy-commitment",
  },
  {
    title: "Local Security, No Monthly Fee",
    description: "eufy Security keeps your data in your home. With on-device AI processing, your footage never leaves your property.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=500&fit=crop",
    href: "/local-security",
  },
  {
    title: "SolarPlus\u2122 Technology",
    description: "Advanced solar technology for non-stop security. SolarPlus panels provide continuous power to your outdoor cameras, rain or shine.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
    href: "/technology/solarplus",
  },
];

export function TechShowcase() {
  return (
    <section className="py-16 bg-eufy-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-4 text-center">
          Powered by Industry-Leading Technology
        </h2>
        <p className="text-eufy-text-light text-center mb-12 max-w-2xl mx-auto">
          eufy develops proprietary technologies that set new standards in smart home innovation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              aria-label={`Learn more about ${item.title}`}
              className="group relative overflow-hidden rounded-2xl aspect-video bg-eufy-dark"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed max-w-md">
                  {item.description}
                </p>
                <span className="inline-flex items-center mt-3 text-sm font-semibold group-hover:underline">
                  Learn More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
