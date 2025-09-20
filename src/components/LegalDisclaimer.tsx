import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Target } from "lucide-react";

export const LegalDisclaimer = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Disclaimer */}
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-warning mt-0.5" />
                <div>
                  <h3 className="font-semibold text-warning mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    This platform is for education and accessibility purposes. It does not provide 
                    legal advice. For binding legal guidance, consult a qualified lawyer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Mission */}
          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-success mt-0.5" />
                <div>
                  <h3 className="font-semibold text-success mb-2">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    Supporting SDG 16 (Peace, Justice & Strong Institutions) by making 
                    legal processes transparent and accessible to everyone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};