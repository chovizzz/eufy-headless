"use client";

import { useState } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQSchema } from "@/lib/seo/schema";

const FAQS = [
  {
    question: "Does eufy require a monthly subscription?",
    answer: "No. eufy security products offer local storage and processing with no monthly fees. Your security footage is stored on local devices, not in the cloud, giving you complete control over your data while saving you money.",
  },
  {
    question: "How does eufy protect my privacy?",
    answer: "eufy uses on-device AI processing and local storage to keep your data private. Military-grade AES-256 encryption protects all video transmissions. Your footage never leaves your home network unless you choose to share it.",
  },
  {
    question: "What is the HydroJet Deep Cleaning System?",
    answer: "HydroJet is eufy's proprietary cleaning technology that uses high-pressure water jets to self-clean the mop in real time during operation. This ensures consistently clean mopping performance throughout the entire cleaning cycle, available on Omni S1 Pro, E28, E25, and C28 models.",
  },
  {
    question: "Does eufy offer free shipping?",
    answer: "Yes, eufy offers fast and free shipping on all orders within the United States. Most orders arrive within 3-5 business days. Expedited shipping options are also available at checkout.",
  },
  {
    question: "What is the eufy return policy?",
    answer: "eufy offers a 30-day money-back guarantee on all products. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Products also come with a hassle-free warranty for added peace of mind.",
  },
  {
    question: "Can I integrate eufy products with other smart home systems?",
    answer: "Yes, many eufy products are compatible with Amazon Alexa, Google Assistant, and Apple HomeKit. This allows you to control your eufy devices using voice commands and integrate them into your existing smart home ecosystem.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <JsonLd data={buildFAQSchema(FAQS)} />

      <h2 className="text-3xl sm:text-4xl font-bold text-eufy-dark tracking-tight mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={faq.question}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-eufy-gray/50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-eufy-dark pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 shrink-0 text-eufy-text-light transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4">
                <p className="text-eufy-text-light leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
