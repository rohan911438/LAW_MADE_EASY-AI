import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Scale, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  FileCheck,
  Bot,
  Newspaper,
  Users,
  Shield,
  Award,
  Heart,
  Globe,
  Download,
  BookOpen,
  Zap,
  Star,
  ChevronUp
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Document Checker", href: "#features", icon: FileCheck },
        { name: "AI Simplifier", href: "#features", icon: Bot },
        { name: "Legal News", href: "#features", icon: Newspaper },
        { name: "Community", href: "#features", icon: Users },
        { name: "Pricing", href: "#pricing", icon: ArrowRight },
        { name: "API Access", href: "#api", icon: Zap }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "For Law Firms", href: "#solutions", icon: Award },
        { name: "For Corporates", href: "#solutions", icon: Shield },
        { name: "For Students", href: "#solutions", icon: BookOpen },
        { name: "For Individuals", href: "#solutions", icon: Users },
        { name: "Case Studies", href: "#testimonials", icon: Star },
        { name: "Success Stories", href: "#testimonials", icon: Heart }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#faq", icon: BookOpen },
        { name: "API Documentation", href: "#api", icon: Download },
        { name: "Video Tutorials", href: "#tutorials", icon: Youtube },
        { name: "Legal Guides", href: "#guides", icon: FileCheck },
        { name: "Blog", href: "#blog", icon: Newspaper },
        { name: "Webinars", href: "#webinars", icon: Globe }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about", icon: Users },
        { name: "Careers", href: "#careers", icon: Award },
        { name: "Press Kit", href: "#press", icon: Download },
        { name: "Contact", href: "#contact", icon: Mail },
        { name: "Privacy Policy", href: "#privacy", icon: Shield },
        { name: "Terms of Service", href: "#terms", icon: FileCheck }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" }
  ];

  const awards = [
    { name: "Legal Tech Innovation 2024", icon: Award },
    { name: "AI Excellence Award", icon: Zap },
    { name: "Best Legal Platform", icon: Star },
    { name: "Security Certified", icon: Shield }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-primary-dark to-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          {/* Newsletter Section */}
          <Card className="mb-16 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Stay Updated with Legal Changes
                  </h3>
                  <p className="text-primary-foreground/80">
                    Get weekly insights, legal updates, and platform news directly in your inbox.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Enter your email address"
                      className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                    />
                    <Button variant="secondary">
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>No spam, unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>2,500+ subscribers</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-primary-foreground/10 rounded-lg">
                  <Scale className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary-foreground">LawMadeEasy</h1>
                  <p className="text-sm text-primary-foreground/70">AI Legal Platform</p>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Democratizing legal knowledge through AI-powered tools. Making law simple, 
                accessible, and transparent for everyone from students to Supreme Court advocates.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">
                    123 Legal District, New Delhi, India 110001
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">+91 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">support@lawmadeeasy.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">
                    Mon-Fri: 9 AM - 6 PM IST
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-primary-foreground mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors group"
                      >
                        <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Awards and Certifications */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/20">
            <div className="text-center mb-8">
              <h4 className="font-semibold text-primary-foreground mb-4">Trusted & Recognized</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-lg">
                    <award.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-primary-foreground/80">{award.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">50K+</div>
              <div className="text-sm text-primary-foreground/70">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">2,500+</div>
              <div className="text-sm text-primary-foreground/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">99.2%</div>
              <div className="text-sm text-primary-foreground/70">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-primary-foreground/70">AI Availability</div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                <span>© {currentYear} LawMadeEasy AI. All rights reserved.</span>
                <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
                <a href="#cookies" className="hover:text-accent transition-colors">Cookie Policy</a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Globe className="w-4 h-4" />
                  <span>Made in India</span>
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToTop}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Back to top
                </Button>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
            <p className="text-xs text-primary-foreground/60 leading-relaxed">
              <strong>Legal Disclaimer:</strong> LawMadeEasy AI provides technology tools to assist with legal document analysis and is not a substitute for professional legal advice. Always consult with qualified legal professionals for matters requiring legal expertise. Our AI tools are designed to augment, not replace, human legal judgment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};