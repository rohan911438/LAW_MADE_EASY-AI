import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FileCheck, Bot, Newspaper, Users, Menu, X, Scale } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: FileCheck,
      title: "Document Checker",
      description: "AI-powered contract verification and authenticity analysis",
      href: "#document-checker"
    },
    {
      icon: Bot,
      title: "AI Simplifier",
      description: "Transform complex legal documents into plain English",
      href: "#ai-simplifier"
    },
    {
      icon: Newspaper,
      title: "Legal News",
      description: "Stay updated with latest Indian legal developments",
      href: "#legal-news"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with top lawyers and legal professionals",
      href: "#expert-network"
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              LegalAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                      {features.map((feature) => (
                        <a
                          key={feature.title}
                          href={feature.href}
                          className="group block select-none rounded-lg p-4 bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-elegant"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <feature.icon className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="font-semibold text-sm">{feature.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              About
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              Sign In
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground/80 px-4">Features</h3>
                {features.map((feature) => (
                  <a
                    key={feature.title}
                    href={feature.href}
                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="border-t border-border/50 pt-4 space-y-2">
                <a href="#about" className="block p-4 text-foreground/80 hover:text-foreground transition-colors">
                  About
                </a>
                <a href="#pricing" className="block p-4 text-foreground/80 hover:text-foreground transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="block p-4 text-foreground/80 hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-2 px-4">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};