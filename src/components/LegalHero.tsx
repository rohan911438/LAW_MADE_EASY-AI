import { Button } from "@/components/ui/button";
import { Scale, FileCheck, Bot, Users } from "lucide-react";
import heroImage from "@/assets/hero-legal-ai.jpg";

export const LegalHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
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
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-muted rounded-full border">
            <Scale className="w-5 h-5 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Powered by AI</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Making Law Simple,{" "}
          <span className="text-accent">Accessible</span>, and{" "}
          <span className="text-accent">Transparent</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Our platform uses advanced AI to simplify, verify, and democratize legal documents — 
          giving businesses, individuals, and professionals the power to understand the law in plain language.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg">
            Start Free Analysis
          </Button>
          <Button variant="heroSecondary" size="lg">
            Watch Demo
          </Button>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
            <FileCheck className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-primary-foreground">Document Verification</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
            <Bot className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">AI Simplifier</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
            <Users className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-primary-foreground">Legal Community</span>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};