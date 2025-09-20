export const LegalStats = () => {
  const stats = [
    { number: "10,000+", label: "Documents Analyzed", icon: "📄" },
    { number: "500+", label: "Legal Professionals", icon: "⚖️" },
    { number: "99.2%", label: "Accuracy Rate", icon: "🎯" },
    { number: "24/7", label: "AI Availability", icon: "🤖" }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};