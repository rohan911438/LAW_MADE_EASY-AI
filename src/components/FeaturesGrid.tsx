import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Bot, Newspaper, Users, Shield, Zap } from "lucide-react";
import documentAnalysis from "@/assets/document-analysis.jpg";
import legalNewsFeed from "@/assets/legal-news-feed.jpg";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: FileCheck,
      title: "Document Authenticity Checker",
      description: "Upload contracts and get instant verification. AI highlights missing parties, dates, or suspicious terms with clear verdicts.",
      image: documentAnalysis,
      status: "Valid",
      statusColor: "success"
    },
    {
      icon: Bot,
      title: "AI Legal Simplifier",
      description: "Clause-by-clause breakdown with risk color coding. Extract parties, dates, amounts and export plain-English contracts.",
      features: ["Risk Assessment", "Plain Language", "Smart Extraction"],
      statusColor: "primary"
    },
    {
      icon: Newspaper,
      title: "Indian Legal News Feed",
      description: "Daily legal headlines from Supreme Court, Parliament, and Bar Council updates. Stay informed in one place.",
      image: legalNewsFeed,
      statusColor: "warning"
    },
    {
      icon: Users,
      title: "Legal Social Feed",
      description: "Exclusive micro-community for lawyers & judges. Share insights, opinions, and connect with top legal voices.",
      features: ["Expert Network", "Thought Leadership", "Professional Insights"],
      statusColor: "accent"
    }
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Complete Legal Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four powerful tools working together to make legal knowledge accessible, 
            verified, and connected.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-${feature.statusColor}/10`}>
                    <feature.icon className={`w-6 h-6 text-${feature.statusColor}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                
                {feature.image && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                
                {feature.features && (
                  <div className="flex flex-wrap gap-2">
                    {feature.features.map((feat, i) => (
                      <span 
                        key={i}
                        className={`px-3 py-1 text-xs font-medium rounded-full bg-${feature.statusColor}/10 text-${feature.statusColor}`}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
                
                {feature.status && (
                  <div className="flex items-center gap-2 mt-4">
                    <div className={`w-2 h-2 rounded-full bg-${feature.statusColor}`}></div>
                    <span className={`text-sm font-medium text-${feature.statusColor}`}>
                      {feature.status}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};