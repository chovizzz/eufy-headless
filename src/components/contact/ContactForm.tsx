"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const TOPICS = [
  "Product Question",
  "Order & Shipping",
  "Warranty & Returns",
  "Technical Support",
  "Account & App",
  "Other",
];

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    orderNumber: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    // Simulate async submission — wire to real API/email service as needed
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-eufy-green/30">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-eufy-dark mb-2">
          Message Sent!
        </h3>
        <p className="text-eufy-text-light mb-6">
          Thanks for reaching out. We'll get back to you within one business day.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({
              name: "",
              email: "",
              topic: "",
              orderNumber: "",
              message: "",
            });
          }}
          className="px-6 py-2.5 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl p-8 space-y-5 shadow-sm border border-gray-100"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-eufy-dark mb-1.5"
          >
            Full Name <span className="text-eufy-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-eufy-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-eufy-blue focus:border-transparent transition"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-eufy-dark mb-1.5"
          >
            Email Address <span className="text-eufy-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-eufy-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-eufy-blue focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-semibold text-eufy-dark mb-1.5"
        >
          Topic <span className="text-eufy-accent">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          required
          value={form.topic}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-eufy-text focus:outline-none focus:ring-2 focus:ring-eufy-blue focus:border-transparent transition bg-white"
        >
          <option value="" disabled>
            Select a topic…
          </option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="orderNumber"
          className="block text-sm font-semibold text-eufy-dark mb-1.5"
        >
          Order Number{" "}
          <span className="text-eufy-text-light font-normal">(optional)</span>
        </label>
        <input
          id="orderNumber"
          name="orderNumber"
          type="text"
          value={form.orderNumber}
          onChange={handleChange}
          placeholder="e.g. #1234567"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-eufy-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-eufy-blue focus:border-transparent transition"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-eufy-dark mb-1.5"
        >
          Message <span className="text-eufy-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your issue or question in detail…"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-eufy-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-eufy-blue focus:border-transparent transition resize-none"
        />
      </div>

      {state === "error" && (
        <p role="alert" className="text-sm text-eufy-accent font-medium">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-4 bg-eufy-blue text-white font-semibold rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-center text-eufy-text-light">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="text-eufy-blue hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
