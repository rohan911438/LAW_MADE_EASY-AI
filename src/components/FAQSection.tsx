import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  HelpCircle, 
  Shield, 
  CreditCard, 
  Users, 
  Zap, 
  FileCheck,
  Bot,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Star,
  Clock,
  Globe
} from "lucide-react";

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle, count: 20 },
    { id: "getting-started", name: "Getting Started", icon: Zap, count: 5 },
    { id: "features", name: "Features", icon: FileCheck, count: 6 },
    { id: "pricing", name: "Pricing", icon: CreditCard, count: 4 },
    { id: "security", name: "Security", icon: Shield, count: 3 },
    { id: "support", name: "Support", icon: Users, count: 2 }
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I get started with LawMadeEasy?",
      answer: "Getting started is simple! Sign up for a free account, upload your first document, and our AI will analyze it within minutes. You can start with our free plan which includes 5 document verifications per month. No credit card required for the free tier.",
      helpful: 95,
      tags: ["signup", "free trial", "first steps"]
    },
    {
      category: "getting-started",
      question: "What file formats do you support?",
      answer: "We support all major document formats including PDF, DOC, DOCX, TXT, and even scanned documents (JPG, PNG). Our AI can extract and analyze text from images with high accuracy. We're constantly adding support for more formats based on user feedback.",
      helpful: 92,
      tags: ["file formats", "pdf", "documents"]
    },
    {
      category: "features",
      question: "How accurate is the AI document verification?",
      answer: "Our AI achieves 99.2% accuracy in document verification. We use advanced machine learning models trained on millions of legal documents. The system has been tested by over 500 legal professionals and continuously improves with each analysis.",
      helpful: 98,
      tags: ["accuracy", "ai", "verification"]
    },
    {
      category: "features",
      question: "Can the AI handle documents in regional Indian languages?",
      answer: "Currently, we support documents in English and Hindi. We're working on adding support for other Indian regional languages including Tamil, Telugu, Bengali, and Marathi. This feature will be available in Q2 2024.",
      helpful: 87,
      tags: ["languages", "hindi", "regional"]
    },
    {
      category: "features",
      question: "How does the Legal News Feed work?",
      answer: "Our AI monitors 50+ verified legal news sources including Supreme Court websites, Bar Council updates, and legal publications. The system categorizes news by practice area, importance, and relevance to your profile. You receive personalized updates daily.",
      helpful: 91,
      tags: ["news", "updates", "supreme court"]
    },
    {
      category: "features",
      question: "What is the Legal Community feature?",
      answer: "The Legal Community is an exclusive platform for verified legal professionals. Members can share insights, discuss case studies, ask questions, and network with peers. All members are verified lawyers, judges, or legal experts to ensure quality discussions.",
      helpful: 89,
      tags: ["community", "networking", "professionals"]
    },
    {
      category: "pricing",
      question: "Is there really a free plan?",
      answer: "Yes! Our free plan includes 5 document verifications and 3 AI simplifications per month, plus access to basic legal news. No credit card required. It's perfect for solo practitioners or those wanting to try our services before upgrading.",
      helpful: 94,
      tags: ["free plan", "pricing", "no credit card"]
    },
    {
      category: "pricing",
      question: "Can I change my plan anytime?",
      answer: "Absolutely! You can upgrade, downgrade, or cancel your plan anytime from your account settings. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades. No long-term contracts or cancellation fees.",
      helpful: 96,
      tags: ["plan changes", "billing", "flexibility"]
    },
    {
      category: "pricing",
      question: "Do you offer discounts for law firms?",
      answer: "Yes! We offer volume discounts for law firms with 5+ users. Educational institutions get 50% off all plans. We also have special pricing for bar associations and legal aid organizations. Contact our sales team for custom quotes.",
      helpful: 88,
      tags: ["discounts", "law firms", "bulk pricing"]
    },
    {
      category: "pricing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. For Enterprise plans, we also accept bank transfers and can provide invoicing. All payments are processed securely through encrypted channels.",
      helpful: 93,
      tags: ["payment", "upi", "credit card", "secure"]
    },
    {
      category: "security",
      question: "How secure is my data?",
      answer: "Security is our top priority. We use bank-grade encryption (AES-256), secure cloud storage, and comply with data protection laws. Your documents are never shared and are automatically deleted after processing unless you choose to save them.",
      helpful: 97,
      tags: ["security", "encryption", "privacy"]
    },
    {
      category: "security",
      question: "Do you store my documents?",
      answer: "Documents are temporarily stored during analysis and automatically deleted within 30 days unless you save them to your account. Saved documents are encrypted and stored securely. You have full control over your data and can delete documents anytime.",
      helpful: 94,
      tags: ["storage", "data retention", "privacy"]
    },
    {
      category: "security",
      question: "Is LawMadeEasy compliant with legal regulations?",
      answer: "Yes, we comply with Indian data protection laws, international security standards (ISO 27001), and legal industry regulations. We undergo regular security audits and maintain strict confidentiality protocols for all user data.",
      helpful: 92,
      tags: ["compliance", "regulations", "iso 27001"]
    },
    {
      category: "support",
      question: "What kind of support do you provide?",
      answer: "We offer multiple support channels: email support for all users, priority chat for Professional users, and 24/7 phone support for Enterprise customers. Our legal tech experts typically respond within 2 hours during business hours.",
      helpful: 96,
      tags: ["support", "response time", "contact"]
    },
    {
      category: "support",
      question: "Do you provide training for my team?",
      answer: "Yes! Professional and Enterprise plans include onboarding sessions and training materials. We offer live training sessions, documentation, video tutorials, and ongoing support to ensure your team gets the most out of our platform.",
      helpful: 90,
      tags: ["training", "onboarding", "team support"]
    },
    {
      category: "getting-started",
      question: "How long does document analysis take?",
      answer: "Most documents are analyzed within 30 seconds to 2 minutes, depending on size and complexity. Simple contracts take under 30 seconds, while complex multi-page agreements may take up to 2 minutes. Enterprise users get priority processing.",
      helpful: 91,
      tags: ["processing time", "speed", "analysis"]
    },
    {
      category: "features",
      question: "Can I integrate LawMadeEasy with my existing tools?",
      answer: "Yes! We offer API access for Professional and Enterprise plans. You can integrate our document verification and AI simplification features into your existing case management systems, document workflows, or custom applications.",
      helpful: 85,
      tags: ["api", "integration", "workflow"]
    },
    {
      category: "getting-started",
      question: "Is there a mobile app?",
      answer: "We currently offer a mobile-optimized web app that works perfectly on phones and tablets. A dedicated mobile app for iOS and Android is in development and will be available in Q3 2024. You'll be notified when it's ready!",
      helpful: 83,
      tags: ["mobile app", "ios", "android", "coming soon"]
    },
    {
      category: "features",
      question: "How does the AI learn and improve?",
      answer: "Our AI continuously learns from verified legal documents and expert feedback. We use machine learning techniques that improve accuracy over time. User feedback and corrections help train the model, making it more accurate for everyone.",
      helpful: 86,
      tags: ["machine learning", "ai improvement", "accuracy"]
    },
    {
      category: "pricing",
      question: "Can I try Enterprise features before purchasing?",
      answer: "Absolutely! Contact our sales team for a personalized demo and 14-day Enterprise trial. We'll set up a sandbox environment where you can test all features with your own documents before making a decision.",
      helpful: 89,
      tags: ["enterprise trial", "demo", "sales"]
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs
    .filter(faq => faq.helpful >= 94)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/20" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Help Center
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find quick answers to common questions about LawMadeEasy. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions, keywords, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {/* Popular FAQs */}
            {selectedCategory === "all" && searchTerm === "" && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Most Helpful Questions
                </h3>
                <div className="grid gap-4">
                  {popularFAQs.map((faq, index) => (
                    <Card key={index} className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                            <p className="text-muted-foreground text-sm line-clamp-2">{faq.answer}</p>
                          </div>
                          <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                            {faq.helpful}% helpful
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedCategory === "all" ? "All Questions" : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <span className="text-muted-foreground">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
                </span>
              </div>

              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border/50 rounded-lg overflow-hidden bg-card/30 hover:bg-card/50 transition-colors"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&>svg]:w-4 [&>svg]:h-4">
                        <div className="flex items-start gap-4 flex-1">
                          <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{faq.question}</h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === faq.category)?.name}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current text-accent" />
                                {faq.helpful}% helpful
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="ml-9">
                          <p className="text-muted-foreground leading-relaxed mb-4">{faq.answer}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground">Related tags:</span>
                            {faq.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No questions found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Still need help?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Our support team is ready to assist you with any questions.
                </p>
                <div className="space-y-3">
                  <Button className="w-full justify-start" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    Response Time
                  </div>
                  <p className="text-sm font-medium text-foreground">Usually within 2 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  Helpful Resources
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-2 rounded hover:bg-accent/10 transition-colors">
                    <span className="text-sm font-medium">Getting Started Guide</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded hover:bg-accent/10 transition-colors">
                    <span className="text-sm font-medium">Video Tutorials</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded hover:bg-accent/10 transition-colors">
                    <span className="text-sm font-medium">API Documentation</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded hover:bg-accent/10 transition-colors">
                    <span className="text-sm font-medium">Best Practices</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-success mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground mb-3">Customer Satisfaction</div>
                <div className="text-xs text-muted-foreground">
                  Based on 2,500+ user reviews
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};