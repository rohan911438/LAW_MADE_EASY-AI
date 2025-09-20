import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Professional } from "@/services/legalSocialAPI";

interface ProfessionalCardProps {
  pro: Professional;
}

export const ProfessionalCard = ({ pro }: ProfessionalCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <img
            src={pro.avatarUrl || '/placeholder.svg'}
            alt={pro.name}
            className="w-12 h-12 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.src.includes('placeholder.svg')) t.src = '/placeholder.svg';
            }}
          />
          <div>
            <CardTitle className="text-base flex items-center gap-1">
              {pro.name}
              {pro.verified && <ShieldCheck className="h-4 w-4 text-green-600" aria-label="Verified" />}
            </CardTitle>
            <div className="text-xs text-muted-foreground">{pro.role}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {pro.specialization.map(s => (
            <Badge key={s} variant="secondary" className="capitalize">{s}</Badge>
          ))}
        </div>
        {pro.bio && <p className="text-sm text-muted-foreground line-clamp-3">{pro.bio}</p>}

        <div className="space-y-2 text-sm">
          {pro.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {pro.location}
            </div>
          )}
          {pro.verified && pro.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> <a href={`mailto:${pro.email}`} className="underline underline-offset-2">{pro.email}</a>
            </div>
          )}
          {pro.verified && pro.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> <a href={`tel:${pro.phone}`} className="underline underline-offset-2">{pro.phone}</a>
            </div>
          )}
          {pro.verified && pro.address && (
            <div className="text-muted-foreground">
              <span className="font-medium">Firm:</span> {pro.address}
            </div>
          )}
        </div>

        {pro.verified && (
          <div className="pt-2">
            <Button variant="outline" className="w-full">Contact</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfessionalCard;
