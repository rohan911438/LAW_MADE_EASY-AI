import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Crown, 
  ArrowRight,
  Users,
  FileCheck,
  Bot,
  Newspaper,
  MessageSquare,
  Clock,
  Phone,
  Mail,
  Headphones,
  Award,
  TrendingUp,
  Building,
  User
} from "lucide-react";

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      subtitle: "Perfect for individual lawyers",
      icon: User,
      color: "primary",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      description: "Get started with basic legal AI tools",
      features: {
        documentChecker: { included: true, limit: "5 documents/month" },
        aiSimplifier: { included: true, limit: "3 documents/month" },
        legalNews: { included: true, limit: "Basic feed" },
        community: { included: false },
        support: { included: true, type: "Email support" },
        accuracy: "95%",
        processingTime: "Standard",
        storage: "1 GB",
        exportFormats: "PDF only",
        apiAccess: false,
        customBranding: false,
        prioritySupport: false,
        advancedAnalytics: false
      },
      idealFor: ["Solo practitioners", "Law students", "Personal use"],
      buttonText: "Start Free",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      subtitle: "Most popular for law firms",
      icon: Building,
      color: "accent",
      monthlyPrice: 2499,
      annualPrice: 24990,
      popular: true,
      description: "Complete legal workflow solution",
      features: {
        documentChecker: { included: true, limit: "50 documents/month" },
        aiSimplifier: { included: true, limit: "30 documents/month" },
        legalNews: { included: true, limit: "Premium feed with filters" },
        community: { included: true, limit: "Full access" },
        support: { included: true, type: "Priority email + Chat" },
        accuracy: "99.2%",
        processingTime: "Fast",
        storage: "50 GB",
        exportFormats: "PDF, DOC, TXT",
        apiAccess: true,
        customBranding: true,
        prioritySupport: true,
        advancedAnalytics: true
      },
      idealFor: ["Small to medium law firms", "Corporate legal teams", "Legal consultants"],
      buttonText: "Start Free Trial",
      buttonVariant: "default"
    },
    {
      name: "Enterprise",
      subtitle: "For large organizations",
      icon: Crown,
      color: "success",
      monthlyPrice: 9999,
      annualPrice: 99990,
      popular: false,
      description: "Unlimited access with premium support",
      features: {
        documentChecker: { included: true, limit: "Unlimited" },
        aiSimplifier: { included: true, limit: "Unlimited" },
        legalNews: { included: true, limit: "Premium + Custom alerts" },
        community: { included: true, limit: "VIP access + Private groups" },
        support: { included: true, type: "24/7 Phone + Dedicated manager" },
        accuracy: "99.8%",
        processingTime: "Priority",
        storage: "Unlimited",
        exportFormats: "All formats + Custom",
        apiAccess: true,
        customBranding: true,
        prioritySupport: true,
        advancedAnalytics: true
      },
      idealFor: ["Large law firms", "Multinational corporations", "Government agencies"],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  const featureComparison = [
    { name: "Document Authenticity Checker", key: "documentChecker", icon: FileCheck },
    { name: "AI Legal Simplifier", key: "aiSimplifier", icon: Bot },
    { name: "Legal News Feed", key: "legalNews", icon: Newspaper },
    { name: "Legal Community", key: "community", icon: Users },
    { name: "Customer Support", key: "support", icon: Headphones },
    { name: "AI Accuracy", key: "accuracy", icon: TrendingUp },
    { name: "Processing Speed", key: "processingTime", icon: Clock },
    { name: "Storage", key: "storage", icon: Shield },
    { name: "Export Formats", key: "exportFormats", icon: ArrowRight },
    { name: "API Access", key: "apiAccess", icon: Zap },
    { name: "Custom Branding", key: "customBranding", icon: Award },
    { name: "Advanced Analytics", key: "advancedAnalytics", icon: TrendingUp }
  ];

  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyCost = monthlyPrice * 12;
    const savings = monthlyCost - annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free, upgrade as you grow. All plans include our core AI features with different usage limits and support levels.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge className="bg-success/10 text-success border-success/20 text-xs">
              Save up to 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const monthlyEquivalent = isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;
            const savings = isAnnual && plan.monthlyPrice > 0 ? calculateSavings(plan.monthlyPrice, plan.annualPrice) : null;
            
            return (
              <Card 
                key={index} 
                className={`relative ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-lg scale-105 z-10' 
                    : 'border border-border/50 hover:border-primary/30'
                } transition-all duration-300 bg-gradient-to-br from-card to-card/50`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 p-3 rounded-xl bg-${plan.color}/10`}>
                    <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    {plan.monthlyPrice === 0 ? (
                      <div className="text-4xl font-bold text-foreground mb-2">Free</div>
                    ) : (
                      <>
                        <div className="flex items-end justify-center gap-1 mb-2">
                          <span className="text-4xl font-bold text-foreground">₹{monthlyEquivalent.toLocaleString()}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {isAnnual && savings && (
                          <div className="text-sm text-success">
                            Save ₹{savings.savings.toLocaleString()} ({savings.percentage}% off)
                          </div>
                        )}
                      </>
                    )}
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Billed annually (₹{plan.annualPrice.toLocaleString()})
                      </div>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">
                        <strong>{plan.features.documentChecker.limit}</strong> - Document Verification
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">
                        <strong>{plan.features.aiSimplifier.limit}</strong> - AI Simplification
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Newspaper className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{plan.features.legalNews.limit}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {plan.features.community.included ? (
                        <Users className="w-4 h-4 text-success flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm">
                        {plan.features.community.included ? plan.features.community.limit : 'No community access'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Headphones className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{plan.features.support.type}</span>
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Perfect for:</h4>
                    <div className="space-y-1">
                      {plan.idealFor.map((use, i) => (
                        <div key={i} className="text-sm text-muted-foreground">• {use}</div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full" 
                    variant={plan.buttonVariant as any}
                    size="lg"
                  >
                    {plan.buttonText}
                    {plan.name !== 'Enterprise' && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>

                  {plan.monthlyPrice === 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                      No credit card required
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Feature Comparison
          </h3>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Features</th>
                    {plans.map((plan, index) => (
                      <th key={index} className="text-center p-4 font-semibold min-w-[180px]">
                        <div className="flex items-center justify-center gap-2">
                          <plan.icon className={`w-4 h-4 text-${plan.color}`} />
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((feature, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <feature.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{feature.name}</span>
                        </div>
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td key={planIndex} className="p-4 text-center">
                          {typeof plan.features[feature.key as keyof typeof plan.features] === 'object' ? (
                            <div>
                              {(plan.features[feature.key as keyof typeof plan.features] as any)?.included ? (
                                <div>
                                  <Check className="w-4 h-4 text-success mx-auto mb-1" />
                                  <div className="text-xs text-muted-foreground">
                                    {(plan.features[feature.key as keyof typeof plan.features] as any)?.limit ||
                                     (plan.features[feature.key as keyof typeof plan.features] as any)?.type}
                                  </div>
                                </div>
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground mx-auto" />
                              )}
                            </div>
                          ) : plan.features[feature.key as keyof typeof plan.features] === true ? (
                            <Check className="w-4 h-4 text-success mx-auto" />
                          ) : plan.features[feature.key as keyof typeof plan.features] === false ? (
                            <X className="w-4 h-4 text-muted-foreground mx-auto" />
                          ) : (
                            <span className="text-sm font-medium">
                              {plan.features[feature.key as keyof typeof plan.features] as string}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ Quick */}
        <div className="text-center mb-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Still have questions?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">Call us</div>
                    <div className="text-xs text-muted-foreground">+91 (800) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">Email us</div>
                    <div className="text-xs text-muted-foreground">sales@lawmadeeasy.ai</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">Live chat</div>
                    <div className="text-xs text-muted-foreground">Available 9 AM - 6 PM IST</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button>
                  Schedule a Demo
                </Button>
                <Button variant="outline">
                  View Full FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-success/10 via-success/5 to-success/10 border-success/20">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                30-Day Money Back Guarantee
              </h3>
              <p className="text-muted-foreground">
                Try LawMadeEasy risk-free. If you're not completely satisfied within 30 days, we'll refund every penny.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};