import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Quote, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
  Building,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  Award
} from "lucide-react";
import { useState } from "react";

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "LawMadeEasy transformed how we handle contract reviews. The AI caught critical issues that would have cost us millions. Our legal team now processes documents 10x faster.",
      author: "Priya Sharma",
      role: "Senior Legal Counsel",
      company: "TechCorp India",
      location: "Mumbai, India",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true,
      caseStudy: {
        title: "Contract Review Efficiency",
        metric: "40 hours saved per week",
        improvement: "1000% faster processing"
      },
      company_size: "500-1000 employees",
      industry: "Technology",
      date: "March 2024"
    },
    {
      id: 2,
      text: "The document authenticity checker saved our firm from a potential fraud case. The AI detected inconsistencies that human review missed. Absolutely invaluable tool.",
      author: "Advocate Rajesh Kumar",
      role: "Managing Partner",
      company: "Kumar & Associates",
      location: "Delhi, India",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true,
      caseStudy: {
        title: "Fraud Prevention",
        metric: "₹2.5 Crore claim avoided",
        improvement: "100% fraud detection"
      },
      company_size: "50-100 employees",
      industry: "Legal Services",
      date: "February 2024"
    },
    {
      id: 3,
      text: "As a solo practitioner, LawMadeEasy is like having a team of legal researchers. The news feed keeps me updated, and the AI simplifier helps me explain complex contracts to clients.",
      author: "Adv. Meera Patel",
      role: "Independent Legal Practitioner",
      company: "Patel Legal Services",
      location: "Ahmedabad, India",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true,
      caseStudy: {
        title: "Client Communication",
        metric: "95% client satisfaction",
        improvement: "300% more efficient explanations"
      },
      company_size: "1-10 employees",
      industry: "Legal Services",
      date: "January 2024"
    },
    {
      id: 4,
      text: "The legal community feature connected me with experts across India. I've learned more in 3 months than in years of practice. The insights are invaluable.",
      author: "Advocate Suresh Menon",
      role: "Senior Associate",
      company: "Global Law Partners",
      location: "Bangalore, India",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true,
      caseStudy: {
        title: "Professional Network",
        metric: "150+ expert connections",
        improvement: "500% knowledge growth"
      },
      company_size: "100-500 employees",
      industry: "Legal Services",
      date: "April 2024"
    }
  ];

  const stats = [
    { label: "Customer Satisfaction", value: "98.5%", icon: Star },
    { label: "Documents Processed", value: "50K+", icon: CheckCircle },
    { label: "Active Users", value: "2,500+", icon: TrendingUp },
    { label: "Success Stories", value: "500+", icon: Award }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Trusted by Legal Professionals
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how legal professionals across India are transforming their practice with our AI-powered platform
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Testimonial */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Quote className="w-12 h-12 text-accent flex-shrink-0 mt-2" />
                  <div className="flex-1">
                    <p className="text-xl leading-relaxed text-foreground mb-6 italic">
                      "{currentTestimonialData.text}"
                    </p>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={currentTestimonialData.avatar} 
                        alt={currentTestimonialData.author}
                        className="w-16 h-16 rounded-full object-cover border-3 border-primary/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-foreground">{currentTestimonialData.author}</h4>
                          {currentTestimonialData.verified && (
                            <CheckCircle className="w-4 h-4 text-success" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {currentTestimonialData.role} at {currentTestimonialData.company}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {currentTestimonialData.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {currentTestimonialData.company_size}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {currentTestimonialData.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(currentTestimonialData.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={prevTestimonial}>
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={nextTestimonial}>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Study Card */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                  <h3 className="font-bold text-foreground">Success Story</h3>
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {currentTestimonialData.caseStudy.title}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <span className="font-semibold text-success">
                      {currentTestimonialData.caseStudy.metric}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Improvement:</span>
                    <span className="font-semibold text-success">
                      {currentTestimonialData.caseStudy.improvement}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Industry:</span>
                    <span className="font-semibold text-foreground">
                      {currentTestimonialData.industry}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm" variant="outline">
                  Read Full Case Study
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Industry Badge */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground mb-2">Trusted by</h4>
                <p className="text-2xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Legal Professionals</p>
                <div className="mt-4 space-y-2">
                  <Badge variant="secondary" className="text-xs">Law Firms</Badge>
                  <Badge variant="secondary" className="text-xs">Corporate Legal</Badge>
                  <Badge variant="secondary" className="text-xs">Solo Practitioners</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials
            .filter((_, index) => index !== currentTestimonial)
            .slice(0, 3)
            .map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="cursor-pointer hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm"
                onClick={() => setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h5 className="font-semibold text-sm text-foreground">{testimonial.author}</h5>
                        {testimonial.verified && (
                          <CheckCircle className="w-3 h-3 text-success" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Join 2,500+ Legal Professionals
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your journey towards more efficient, accurate, and intelligent legal practice
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg">
                  Start Free Trial
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};