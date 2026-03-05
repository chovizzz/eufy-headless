import Link from "next/link";

export function RewardsProgram() {
  return (
    <section className="py-16 bg-linear-to-r from-eufy-dark to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              eufyCredits Rewards Program
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Join our membership program to earn eufyCredits with every purchase
              and receive exclusive rewards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/eufycredits"
                aria-label="Learn more about eufyCredits Rewards Program"
                className="inline-flex items-center px-8 py-3.5 bg-white text-eufy-dark font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
              >
                Learn More
              </Link>
              <button className="inline-flex items-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm">
                Join Now
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {[
              { value: "5%", label: "Back on Every Purchase" },
              { value: "10x", label: "Points on First Order" },
              { value: "VIP", label: "Exclusive Deals" },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-3xl font-bold text-eufy-blue mb-2">{stat.value}</div>
                <div className="text-xs text-gray-400 max-w-[100px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
