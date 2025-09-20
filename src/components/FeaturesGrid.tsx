import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Bot, Newspaper, Users, ArrowRight, Sparkles } from "lucide-react";
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
      statusColor: "success",
      stats: { accuracy: "99.7%", speed: "2.3s" },
      id: "document-checker"
    },
    {
      icon: Bot,
      title: "AI Legal Simplifier",
      description: "Clause-by-clause breakdown with risk color coding. Extract parties, dates, amounts and export plain-English contracts.",
      features: ["Risk Assessment", "Plain Language", "Smart Extraction"],
      statusColor: "primary",
      stats: { complexity: "Reduced 85%", clarity: "Grade 8 reading" },
      id: "ai-simplifier"
    },
    {
      icon: Newspaper,
      title: "Indian Legal News Feed",
      description: "Daily legal headlines from Supreme Court, Parliament, and Bar Council updates. Stay informed in one place.",
      image: legalNewsFeed,
      statusColor: "warning",
      stats: { sources: "50+ outlets", updates: "Real-time" },
      id: "legal-news"
    },
    {
      icon: Users,
      title: "Legal Social Feed",
      description: "Exclusive micro-community for lawyers & judges. Share insights, opinions, and connect with top legal voices.",
      features: ["Expert Network", "Thought Leadership", "Professional Insights"],
      statusColor: "accent",
      stats: { experts: "5,000+", engagement: "Daily discussions" },
      id: "expert-network"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-muted/30 via-background to-muted/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-primary text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Ecosystem
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Four Powerful Tools,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the future of legal technology with our integrated suite of AI-powered tools 
            designed to make legal knowledge accessible, verified, and connected for everyone.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              id={feature.id}
              className="group relative overflow-hidden hover:shadow-elegant transition-all duration-500 bg-gradient-feature border-border/50 hover:border-primary/20 hover:-translate-y-2"
            >
              {/* Card gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.statusColor}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-${feature.statusColor}/10 group-hover:bg-${feature.statusColor}/20 transition-all duration-300 group-hover:scale-110`}>
                      <feature.icon className={`w-7 h-7 text-${feature.statusColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      {feature.stats && (
                        <div className="flex gap-4 mt-2">
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className={`font-semibold text-${feature.statusColor}`}>{value}</span>
                              <span className="text-muted-foreground ml-1">{key}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {feature.status && (
                    <div className={`px-3 py-1 rounded-full bg-${feature.statusColor}/10 border border-${feature.statusColor}/20`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${feature.statusColor} animate-pulse`}></div>
                        <span className={`text-xs font-medium text-${feature.statusColor}`}>
                          {feature.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                
                {feature.image && (
                  <div className="relative rounded-xl overflow-hidden group-hover:shadow-soft transition-shadow duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                    <img 
                      src={feature.image} 
                      alt={`${feature.title} interface showing advanced AI capabilities`}
                      className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className={`px-3 py-1 rounded-full bg-${feature.statusColor}/90 backdrop-blur-sm`}>
                        <span className="text-xs font-medium text-white">Live Preview</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {feature.features && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((feat, i) => (
                        <span 
                          key={i}
                          className={`px-4 py-2 text-sm font-medium rounded-xl bg-${feature.statusColor}/10 text-${feature.statusColor} border border-${feature.statusColor}/20 hover:bg-${feature.statusColor}/20 transition-colors cursor-default`}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t border-border/50">
                  <Button 
                    className={`w-full bg-${feature.statusColor}/10 hover:bg-${feature.statusColor}/20 text-${feature.statusColor} border border-${feature.statusColor}/20 hover:border-${feature.statusColor}/40 transition-all duration-300`}
                    variant="outline"
                  >
                    Try {feature.title}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-20">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow text-lg px-12 py-6 rounded-xl">
            <Sparkles className="mr-2 w-5 h-5" />
            Experience All Features
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};