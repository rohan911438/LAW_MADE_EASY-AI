import { Navigation } from "@/components/Navigation";
import { LegalHero } from "@/components/LegalHero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { LegalStats } from "@/components/LegalStats";
import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <LegalHero />
      <LegalStats />
      <FeaturesGrid />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <LegalDisclaimer />
      <Footer />
    </div>
  );
};

export default Index;