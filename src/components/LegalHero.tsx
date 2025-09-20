import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Scale, 
  FileCheck, 
  Bot, 
  Users, 
  Play, 
  Star, 
  Quote,
  ArrowRight,
  CheckCircle,
  Timer,
  Shield,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-legal-ai.jpg";

export const LegalHero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const quickStats = [
    { icon: CheckCircle, value: "99.2%", label: "Accuracy", color: "success" },
    { icon: Timer, value: "<5min", label: "Analysis", color: "warning" },
    { icon: Shield, value: "100%", label: "Secure", color: "primary" },
    { icon: TrendingUp, value: "10K+", label: "Documents", color: "accent" }
  ];

  const testimonialPreview = {
    text: "LawMadeEasy saved us 40 hours on contract review. The AI caught issues we would have missed.",
    author: "Priya Sharma",
    role: "Senior Legal Counsel",
    company: "TechCorp India",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Legal AI Technology Platform" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Trust Indicators */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary-foreground/10 backdrop-blur-md rounded-full border border-primary-foreground/20">
            <Scale className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">Trusted by 500+ Legal Professionals</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-current" />
              ))}
              <span className="text-sm font-medium text-primary-foreground ml-2">4.9/5</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Making Law Simple,{" "}
          <span className="text-accent relative">
            Accessible
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full"></div>
          </span>, and{" "}
          <span className="text-accent relative">
            Transparent
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full"></div>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Our platform uses advanced AI to simplify, verify, and democratize legal documents — 
          giving businesses, individuals, and professionals the power to understand the law in plain language.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg border border-primary-foreground/20">
              <stat.icon className={`w-4 h-4 text-${stat.color}`} />
              <span className="text-sm font-bold text-primary-foreground">{stat.value}</span>
              <span className="text-sm text-primary-foreground/80">{stat.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/legal-simplifier">
            <Button variant="hero" size="lg" className="group relative overflow-hidden">
              <span className="relative z-10">Try AI Simplifier Free</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Button>
          </Link>
          <Button 
            variant="heroSecondary" 
            size="lg" 
            className="group"
            onClick={() => setIsVideoPlaying(true)}
          >
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Watch 2min Demo
          </Button>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors">
            <FileCheck className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-primary-foreground">Document Verification</span>
            <Badge className="ml-2 text-xs bg-success/20 text-success border-success/30">Live</Badge>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors">
            <Bot className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">AI Simplifier</span>
            <Badge className="ml-2 text-xs bg-accent/20 text-accent border-accent/30">New</Badge>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors">
            <Users className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-primary-foreground">Legal Community</span>
            <Badge className="ml-2 text-xs bg-warning/20 text-warning border-warning/30">Beta</Badge>
          </div>
        </div>

        {/* Testimonial Preview */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-primary-foreground/5 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Quote className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-primary-foreground/90 mb-4 italic">
                    "{testimonialPreview.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonialPreview.avatar} 
                      alt={testimonialPreview.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-foreground/20"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-primary-foreground">{testimonialPreview.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonialPreview.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-accent fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-primary-foreground/70">
                        {testimonialPreview.role} at {testimonialPreview.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="text-xl font-bold text-primary-foreground mb-2">
                Start your free trial today
              </h3>
              <p className="text-primary-foreground/80">
                No credit card required • 5 free document analyses • Cancel anytime
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-primary-foreground flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">+</span>
                </div>
              </div>
              <span className="text-sm text-primary-foreground/80">Join 500+ users</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};