import { Navigation } from "@/components/Navigation";
import { LegalHero } from "@/components/LegalHero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { LegalStats } from "@/components/LegalStats";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <LegalHero />
      <LegalStats />
      <FeaturesGrid />
      <LegalDisclaimer />
    </div>
  );
};

export default Index;