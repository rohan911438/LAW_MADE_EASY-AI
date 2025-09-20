import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, PlayCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-legal-ai.jpg";

export const LegalHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-16">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-success/5 rounded-full blur-2xl animate-pulse delay-500" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-gradient-primary text-white border-0 shadow-glow hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Advanced AI
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
                Making Law{" "}
                <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent animate-pulse">
                  Simple
                </span>
                ,<br />Accessible, and{" "}
                <span className="bg-gradient-to-r from-accent via-warning to-primary bg-clip-text text-transparent animate-pulse delay-300">
                  Transparent
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                At <span className="font-semibold text-primary">LegalAI</span>, we believe legal knowledge shouldn't be locked behind jargon or expensive consultations. 
                Our platform uses advanced AI to <span className="font-semibold text-accent">simplify, verify, and democratize</span> legal documents for everyone.
              </p>
            </div>

            {/* Enhanced feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle, text: "AI-Powered Verification", color: "success" },
                { icon: Star, text: "Plain English Translation", color: "warning" },
                { icon: Users, text: "Expert Network Access", color: "primary" },
                { icon: ArrowRight, text: "Real-time Legal Updates", color: "accent" }
              ].map((feature, index) => (
                <div key={index} className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-feature backdrop-blur-sm border border-border/50 hover:shadow-soft transition-all duration-300 hover:scale-105">
                  <div className={`p-2 rounded-lg bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors`}>
                    <feature.icon className={`w-5 h-5 text-${feature.color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow hover:shadow-elegant text-lg px-10 py-7 rounded-xl">
                <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group text-lg px-10 py-7 rounded-xl border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300">
                <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced trust indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-primary border-3 border-background shadow-soft animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">10,000+ legal professionals</div>
                  <div className="text-muted-foreground">trust our platform</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Enhanced Right Content - Hero Image */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 animate-pulse" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl z-10" />
              <img 
                src={heroImage} 
                alt="AI Legal Platform Interface showing document analysis and verification features" 
                className="w-full h-auto rounded-3xl shadow-elegant border-2 border-border/20 hover:shadow-glow transition-shadow duration-500"
              />
              
              {/* Enhanced floating cards */}
              <div className="absolute -top-8 -right-8 bg-card/95 backdrop-blur-sm p-5 rounded-2xl shadow-elegant border border-border/50 animate-bounce hover:shadow-glow transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-success rounded-full animate-pulse" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Document Verified</div>
                    <div className="text-xs text-success">100% Authentic</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-card/95 backdrop-blur-sm p-5 rounded-2xl shadow-elegant border border-border/50 animate-bounce delay-500 hover:shadow-glow transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-warning rounded-full animate-pulse" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">AI Analysis</div>
                    <div className="text-xs text-warning">Complete in 2.3s</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-6 bg-card/95 backdrop-blur-sm p-4 rounded-xl shadow-elegant border border-border/50 animate-bounce delay-1000">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-primary">Plain English Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};