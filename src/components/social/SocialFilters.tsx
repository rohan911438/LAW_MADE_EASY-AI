import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SocialFilters as Filters, legalSocialAPI } from "@/services/legalSocialAPI";
import { Button } from "@/components/ui/button";

interface SocialFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export const SocialFilters = ({ filters, onChange }: SocialFiltersProps) => {
  const specs = legalSocialAPI.getSpecializations();
  return (
    <Card className="mb-4">
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Search</div>
          <Input
            placeholder="Search posts or tags..."
            value={filters.keywords || ''}
            onChange={(e) => onChange({ ...filters, keywords: e.target.value })}
          />
        </div>
        <Select
          value={(filters.specialization || 'all') as string}
          onValueChange={(v) => onChange({ ...filters, specialization: v as any })}
        >
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Specialization</div>
            <SelectTrigger>
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
          </div>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {specs.map(s => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={(filters.authorRole || 'all') as string}
          onValueChange={(v) => onChange({ ...filters, authorRole: v as any })}
        >
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Author Role</div>
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
          </div>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Lawyer">Lawyer</SelectItem>
            <SelectItem value="Advocate">Advocate</SelectItem>
            <SelectItem value="Judge">Judge</SelectItem>
            <SelectItem value="Legal Researcher">Legal Researcher</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex md:justify-end">
          <Button
            variant="outline"
            onClick={() => onChange({})}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialFilters;
