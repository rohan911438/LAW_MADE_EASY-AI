import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Scale, 
  Menu, 
  FileCheck, 
  Bot, 
  Newspaper, 
  Users, 
  ChevronDown,
  Star,
  Shield,
  Zap,
  Phone,
  Mail
} from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: FileCheck,
      title: "Document Checker",
      description: "Verify authenticity instantly",
      href: "/document-authenticity"
    },
    {
      icon: Bot,
      title: "AI Simplifier",
      description: "Convert legalese to plain English",
      href: "/legal-simplifier"
    },
    {
      icon: Newspaper,
      title: "Legal News",
      description: "Stay updated with latest laws",
      href: "/legal-news-feed"
    },
    {
      icon: Users,
      title: "Legal Social Feed",
      description: "Connect with professionals",
      href: "/legal-social-feed"
    },
    {
      icon: Users,
      title: "Legal Community",
      description: "Connect with professionals",
      href: "#features"
    }
  ];

  const solutions = [
    { title: "For Individuals", description: "Personal legal documents", href: "#pricing" },
    { title: "For Businesses", description: "Enterprise contracts", href: "#pricing" },
    { title: "For Law Firms", description: "Professional tools", href: "#pricing" },
    { title: "For Students", description: "Educational resources", href: "#pricing" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LawMadeEasy</h1>
              <p className="text-xs text-muted-foreground">AI Legal Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Features Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Features
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <div className="grid gap-3">
                    {features.map((feature, index) => {
                      const isExternalLink = feature.href.startsWith('#') || feature.href.startsWith('http');
                      
                      if (isExternalLink) {
                        return (
                          <a
                            key={index}
                            href={feature.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <feature.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </a>
                        );
                      } else {
                        return (
                          <Link
                            key={index}
                            to={feature.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <feature.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </Link>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <div className="grid gap-2">
                    {solutions.map((solution, index) => (
                      <a
                        key={index}
                        href={solution.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-foreground">{solution.title}</h4>
                          <p className="text-sm text-muted-foreground">{solution.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-current" />
                <span className="font-medium">4.9</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <Badge variant="secondary" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="relative">
              <Zap className="w-4 h-4 mr-2" />
              Try Free
              <Badge className="absolute -top-2 -right-2 text-xs bg-accent text-accent-foreground">
                New
              </Badge>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                        <Scale className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold">LawMadeEasy</h1>
                        <p className="text-xs text-muted-foreground">AI Legal Platform</p>
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Features</h3>
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <a
                          key={index}
                          href={feature.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <feature.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Solutions</h3>
                    <div className="space-y-2">
                      {solutions.map((solution, index) => (
                        <a
                          key={index}
                          href={solution.href}
                          onClick={() => setIsOpen(false)}
                          className="block p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <h4 className="font-medium text-sm">{solution.title}</h4>
                          <p className="text-xs text-muted-foreground">{solution.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-2">
                    <a href="#pricing" onClick={() => setIsOpen(false)} className="block p-2 text-foreground hover:text-primary">
                      Pricing
                    </a>
                    <a href="#testimonials" onClick={() => setIsOpen(false)} className="block p-2 text-foreground hover:text-primary">
                      Reviews
                    </a>
                    <a href="#faq" onClick={() => setIsOpen(false)} className="block p-2 text-foreground hover:text-primary">
                      FAQ
                    </a>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-6 border-t border-border">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+91 (800) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>support@lawmadeeasy.ai</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-3 pt-6">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                    <Button className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Try Free
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};