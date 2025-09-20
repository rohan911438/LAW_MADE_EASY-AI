import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  Bot, 
  Newspaper, 
  Users, 
  ArrowRight, 
  Upload,
  Scan,
  CheckCircle,
  Download,
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  Play,
  Zap,
  Shield,
  Globe,
  BarChart3
} from "lucide-react";
import documentAnalysis from "@/assets/document-analysis.jpg";
import legalNewsFeed from "@/assets/legal-news-feed.jpg";

export const FeaturesGrid = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FileCheck,
      title: "Document Authenticity Checker",
      subtitle: "AI-Powered Verification in Seconds",
      description: "Upload contracts and get instant verification. AI highlights missing parties, dates, or suspicious terms with clear verdicts.",
      image: documentAnalysis,
      status: "Live",
      statusColor: "success",
      pricing: "₹99/document",
      accuracy: 99.2,
      avgTime: "< 30 seconds",
      features: ["Missing clause detection", "Fraud pattern recognition", "Legal compliance check", "Risk assessment scoring"],
      steps: [
        { icon: Upload, title: "Upload Document", description: "Drag & drop or select your legal document" },
        { icon: Scan, title: "AI Analysis", description: "Our AI scans for authenticity markers and potential issues" },
        { icon: CheckCircle, title: "Get Results", description: "Receive detailed report with risk assessment" },
        { icon: Download, title: "Download Report", description: "Export verified document with certification" }
      ],
      demoStats: {
        documentsProcessed: "15,847",
        fraudDetected: "892",
        timesSaved: "2,847 hours"
      }
    },
    {
      icon: Bot,
      title: "AI Legal Simplifier",
      subtitle: "Convert Legalese to Plain English",
      description: "Clause-by-clause breakdown with risk color coding. Extract parties, dates, amounts and export plain-English contracts.",
      features: ["Risk Assessment", "Plain Language", "Smart Extraction"],
      statusColor: "primary",
      pricing: "₹149/document",
      accuracy: 97.8,
      avgTime: "< 2 minutes",
      steps: [
        { icon: Upload, title: "Upload Contract", description: "Support for PDF, DOC, and image formats" },
        { icon: Bot, title: "AI Processing", description: "Advanced NLP breaks down complex legal language" },
        { icon: MessageSquare, title: "Plain English", description: "Get simplified version with key highlights" },
        { icon: Download, title: "Export Summary", description: "Download simplified contract in multiple formats" }
      ],
      demoStats: {
        pagesSimplified: "45,231",
        languageSupport: "12 languages",
        userSatisfaction: "4.8/5"
      }
    },
    {
      icon: Newspaper,
      title: "Indian Legal News Feed",
      subtitle: "Stay Updated with Latest Legal Changes",
      description: "Daily legal headlines from Supreme Court, Parliament, and Bar Council updates. Stay informed in one place.",
      image: legalNewsFeed,
      status: "Live",
      statusColor: "success",
      pricing: "₹499/month",
      accuracy: 100,
      avgTime: "Real-time",
      features: ["Supreme Court updates", "Parliament notifications", "Bar Council news", "Legal trend analysis"],
      steps: [
        { icon: Globe, title: "Real-time Monitoring", description: "AI monitors 50+ legal news sources" },
        { icon: TrendingUp, title: "Trend Analysis", description: "Identifies important legal developments" },
        { icon: MessageSquare, title: "Personalized Feed", description: "Customized based on your practice area" },
        { icon: BarChart3, title: "Impact Assessment", description: "See how changes affect your cases" }
      ],
      demoStats: {
        newsArticles: "12,847",
        sources: "50+ verified",
        updates: "Daily"
      }
    },
    {
      icon: Users,
      title: "Legal Social Feed",
      subtitle: "Connect with Legal Professionals",
      description: "Exclusive micro-community for lawyers & judges. Share insights, opinions, and connect with top legal voices.",
      features: ["Expert Network", "Thought Leadership", "Professional Insights"],
      statusColor: "accent",
      pricing: "₹999/month",
      accuracy: 95.5,
      avgTime: "24/7 access",
      steps: [
        { icon: Users, title: "Join Community", description: "Verified lawyers and legal professionals only" },
        { icon: MessageSquare, title: "Share Insights", description: "Post case studies and legal opinions" },
        { icon: TrendingUp, title: "Build Network", description: "Connect with peers in your specialization" },
        { icon: Star, title: "Get Recognition", description: "Build reputation through quality contributions" }
      ],
      demoStats: {
        members: "2,847",
        posts: "15,429",
        expertise: "25+ areas"
      }
    }
  ];

  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Complete Legal Ecosystem
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Four Powerful Tools, One Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamline your legal workflow with AI-powered tools designed for accuracy, 
            efficiency, and professional collaboration.
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                activeFeature === index 
                  ? 'border-primary shadow-lg' 
                  : 'border-border/50 hover:border-primary/50'
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-${feature.statusColor}/10`}>
                    <feature.icon className={`w-5 h-5 text-${feature.statusColor}`} />
                  </div>
                  {feature.status && (
                    <Badge className={`text-xs bg-${feature.statusColor}/10 text-${feature.statusColor} border-${feature.statusColor}/20`}>
                      {feature.status}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-semibold">{feature.accuracy}%</span>
                </div>
                <Progress value={feature.accuracy} className="mt-2 mb-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{feature.avgTime}</span>
                  <span className="font-semibold text-primary">{feature.pricing}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Feature View */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Feature Details */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl bg-${features[activeFeature].statusColor}/10`}>
                    {(() => {
                      const IconComponent = features[activeFeature].icon;
                      return <IconComponent className={`w-8 h-8 text-${features[activeFeature].statusColor}`} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-muted-foreground">{features[activeFeature].subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {features[activeFeature].description}
                </p>

                {/* How it Works */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    How it Works
                  </h4>
                  <div className="space-y-4">
                    {features[activeFeature].steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <step.icon className="w-4 h-4 text-primary" />
                            <h5 className="font-semibold text-foreground">{step.title}</h5>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features[activeFeature].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demo Stats */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Live Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(features[activeFeature].demoStats).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo
                  </Button>
                  {activeFeature === 0 ? (
                    <Link to="/document-authenticity" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Try Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : activeFeature === 1 ? (
                    <Link to="/legal-simplifier" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Try Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : activeFeature === 2 ? (
                    <Link to="/legal-news-feed" className="flex-1">
                      <Button variant="outline" className="w-full">
                        View News Feed
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/legal-social-feed" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Feature Image/Visual */}
              <div>
                {features[activeFeature].image ? (
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={features[activeFeature].image} 
                      alt={features[activeFeature].title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-80 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {(() => {
                      const IconComponent = features[activeFeature].icon;
                      return <IconComponent className={`w-24 h-24 text-${features[activeFeature].statusColor}/50`} />;
                    })()}
                  </div>
                )}

                {/* Pricing Card */}
                <Card className="mt-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold text-foreground mb-2">Starting at</h4>
                    <div className="text-3xl font-bold text-primary mb-2">{features[activeFeature].pricing}</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {features[activeFeature].avgTime} • {features[activeFeature].accuracy}% accuracy
                    </p>
                    <Button className="w-full" size="sm">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};