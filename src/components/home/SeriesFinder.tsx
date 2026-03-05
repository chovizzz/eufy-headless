"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "security", label: "Security Series" },
  { id: "appliance", label: "Appliance Series" },
];

const SERIES: Record<string, { name: string; tagline: string; href: string; color: string }[]> = {
  security: [
    { name: "S Series", tagline: "Ultimate Imaging, Full Control", href: "/collections/s-series", color: "from-blue-600 to-blue-800" },
    { name: "E Series", tagline: "Reliable Security, Always On", href: "/collections/e-series", color: "from-emerald-600 to-emerald-800" },
    { name: "C Series", tagline: "Auto Tracking, Indoors or Outdoors", href: "/collections/c-series", color: "from-purple-600 to-purple-800" },
  ],
  appliance: [
    { name: "Omni Series", tagline: "Complete Self-Cleaning Robot Vacuums", href: "/collections/omni-series", color: "from-orange-500 to-orange-700" },
    { name: "Mach Series", tagline: "Powerful Wet & Dry Floor Cleaners", href: "/collections/mach-series", color: "from-cyan-600 to-cyan-800" },
    { name: "HomeVac Series", tagline: "Lightweight Cordless Vacuums", href: "/collections/homevac-series", color: "from-pink-500 to-pink-700" },
  ],
};

export function SeriesFinder() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-8 text-center">
        Find the Right Series for You
      </h2>

      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-eufy-gray rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-eufy-dark text-white shadow-md"
                  : "text-eufy-text-light hover:text-eufy-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERIES[activeTab]?.map((series) => (
          <Link
            key={series.name}
            href={series.href}
            aria-label={`Learn more about ${series.name}`}
            className={`group relative overflow-hidden rounded-2xl p-8 bg-linear-to-br ${series.color} text-white min-h-[200px] flex flex-col justify-end hover:shadow-xl transition-shadow`}
          >
            <h3 className="text-2xl font-bold mb-2">{series.name}</h3>
            <p className="text-white/80 text-sm">{series.tagline}</p>
            <span className="inline-flex items-center mt-4 text-sm font-semibold group-hover:underline">
              Learn More
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
