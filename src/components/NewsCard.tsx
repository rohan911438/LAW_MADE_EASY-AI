import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Tag } from "lucide-react";
import { LegalNewsItem } from "@/services/legalNewsAPI";

interface NewsCardProps {
  news: LegalNewsItem;
  onReadMore?: (news: LegalNewsItem) => void;
}

const categoryColors = {
  'supreme-court': 'bg-red-100 text-red-800 border-red-200',
  'high-court': 'bg-blue-100 text-blue-800 border-blue-200',
  'legislation': 'bg-green-100 text-green-800 border-green-200',
  'case-law': 'bg-purple-100 text-purple-800 border-purple-200',
  'regulatory': 'bg-orange-100 text-orange-800 border-orange-200',
  'legal-updates': 'bg-gray-100 text-gray-800 border-gray-200'
};

const importanceColors = {
  'high': 'bg-red-50 border-red-200',
  'medium': 'bg-yellow-50 border-yellow-200',
  'low': 'bg-green-50 border-green-200'
};

const categoryLabels = {
  'supreme-court': 'Supreme Court',
  'high-court': 'High Court',
  'legislation': 'Legislation',
  'case-law': 'Case Law',
  'regulatory': 'Regulatory',
  'legal-updates': 'Legal Updates'
};

export const NewsCard = ({ news, onReadMore }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${importanceColors[news.importance]} hover:scale-[1.02]`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge 
            variant="outline" 
            className={`${categoryColors[news.category]} font-medium`}
          >
            {categoryLabels[news.category]}
          </Badge>
          {news.importance === 'high' && (
            <Badge variant="destructive" className="text-xs">
              High Priority
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
          {news.title}
        </CardTitle>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {news.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* News Image */}
          {news.imageUrl && (
            <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          )}

          {/* News Meta Information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(news.date)}</span>
            </div>
            <div className="text-xs font-medium bg-secondary px-2 py-1 rounded">
              {news.source}
            </div>
          </div>

          {/* Tags */}
          {news.tags.length > 0 && (
            <div className="flex items-start gap-1">
              <Tag className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {news.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {news.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{news.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onReadMore?.(news)}
            >
              Read More
            </Button>
            
            {news.url && (
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};