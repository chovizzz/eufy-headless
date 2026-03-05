import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eufy-headless.vercel.app";

export const metadata: Metadata = {
  title: "Contact Us | eufy",
  description:
    "Get in touch with eufy's customer support team. We're here to help with product questions, warranty claims, technical support, and more.",
  openGraph: {
    title: "Contact Us | eufy",
    description:
      "Get in touch with eufy's customer support team. We're here to help with product questions, warranty claims, and technical support.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/contact` },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "eufy Contact Us",
  url: `${SITE_URL}/contact`,
  description:
    "Contact eufy customer support for product help, warranty, and technical assistance.",
  mainEntity: {
    "@type": "Organization",
    name: "eufy",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English"],
        contactOption: "TollFree",
      },
    ],
  },
};

const SUPPORT_CHANNELS = [
  {
    icon: "💬",
    title: "Live Chat",
    description: "Chat with our support team in real time.",
    action: "Start Chat",
    href: "#chat",
    available: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: "📧",
    title: "Email Support",
    description: "Send us a message and we'll reply within 24 hours.",
    action: "Send Email",
    href: "mailto:support@eufy.com",
    available: "Response within 24 hours",
  },
  {
    icon: "📞",
    title: "Phone Support",
    description: "Speak directly with a product specialist.",
    action: "1-800-988-7973",
    href: "tel:18009887973",
    available: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: "📚",
    title: "Help Center",
    description: "Browse FAQs, guides, and troubleshooting articles.",
    action: "Visit Help Center",
    href: "https://support.eufy.com",
    available: "Available 24/7",
  },
];

const FAQS = [
  {
    q: "How do I register my eufy product?",
    a: "Download the eufy Security or eufy Clean app, create an account, and follow the in-app instructions to add your device.",
  },
  {
    q: "What is eufy's warranty policy?",
    a: "Most eufy products come with a 24-month warranty. Register your product within 30 days of purchase for full coverage.",
  },
  {
    q: "How do I reset my eufy device?",
    a: "Press and hold the reset button on your device for 10 seconds until you hear a beep or see the LED flash. Refer to your product manual for device-specific instructions.",
  },
  {
    q: "Can I use eufy products without a subscription?",
    a: "Yes! All eufy cameras offer free local storage. Optional cloud storage plans are available for extended features.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-eufy-dark text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-eufy-blue text-sm font-semibold uppercase tracking-widest mb-4">
              Support
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              How Can We Help?
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our dedicated support team is ready to assist you with any
              questions about your eufy products.
            </p>
          </div>
        </section>

        {/* Support Channels */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-eufy-dark text-center mb-10">
            Choose How to Reach Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORT_CHANNELS.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                aria-label={`${channel.title}: ${channel.description}`}
                className="group flex flex-col items-center text-center p-8 bg-eufy-gray rounded-2xl hover:shadow-lg hover:bg-white border border-transparent hover:border-eufy-blue transition-all"
              >
                <span className="text-4xl mb-4">{channel.icon}</span>
                <h3 className="text-lg font-bold text-eufy-dark mb-2 group-hover:text-eufy-blue transition-colors">
                  {channel.title}
                </h3>
                <p className="text-sm text-eufy-text-light mb-4 leading-relaxed">
                  {channel.description}
                </p>
                <span className="mt-auto px-4 py-2 bg-eufy-blue text-white text-sm font-semibold rounded-full group-hover:bg-blue-700 transition-colors">
                  {channel.action}
                </span>
                <p className="mt-3 text-xs text-eufy-text-light">{channel.available}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Form + FAQ */}
        <section className="bg-eufy-gray py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-eufy-dark mb-2">
                  Send Us a Message
                </h2>
                <p className="text-eufy-text-light mb-8">
                  Fill out the form below and we'll get back to you within one
                  business day.
                </p>
                <ContactForm />
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-eufy-dark mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-eufy-text-light mb-8">
                  Quick answers to common questions.
                </p>
                <div className="space-y-4">
                  {FAQS.map((faq) => (
                    <details
                      key={faq.q}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-eufy-dark hover:text-eufy-blue transition-colors list-none">
                        {faq.q}
                        <span className="ml-4 shrink-0 text-eufy-blue text-xl transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-eufy-text-light text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-2 text-eufy-blue font-semibold hover:underline text-sm"
                  >
                    View all FAQs →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-eufy-dark mb-10 text-center">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                region: "Americas",
                address: "2119 O'Nel Drive, San Jose, CA 95131, USA",
                flag: "🇺🇸",
              },
              {
                region: "Europe",
                address: "Pascalstraße 8, 10587 Berlin, Germany",
                flag: "🇩🇪",
              },
              {
                region: "Asia Pacific",
                address: "No. 2 Tengfei Road, Changsha, Hunan, China",
                flag: "🇨🇳",
              },
            ].map((office) => (
              <div
                key={office.region}
                className="flex flex-col items-center text-center p-8 bg-eufy-gray rounded-2xl"
              >
                <span className="text-4xl mb-3">{office.flag}</span>
                <h3 className="text-lg font-bold text-eufy-dark mb-2">
                  {office.region}
                </h3>
                <address className="not-italic text-sm text-eufy-text-light leading-relaxed">
                  {office.address}
                </address>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
