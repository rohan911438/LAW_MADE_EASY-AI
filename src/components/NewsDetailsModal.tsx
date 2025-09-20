import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, ExternalLink, Tag, Building2, AlertCircle } from "lucide-react";
import { LegalNewsItem } from "@/services/legalNewsAPI";

interface NewsDetailsModalProps {
  news: LegalNewsItem | null;
  isOpen: boolean;
  onClose: () => void;
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
  'high': 'bg-red-100 text-red-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'low': 'bg-green-100 text-green-800'
};

const categoryLabels = {
  'supreme-court': 'Supreme Court',
  'high-court': 'High Court',
  'legislation': 'Legislation',
  'case-law': 'Case Law',
  'regulatory': 'Regulatory',
  'legal-updates': 'Legal Updates'
};

export const NewsDetailsModal = ({ news, isOpen, onClose }: NewsDetailsModalProps) => {
  if (!news) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="space-y-4">
              {/* Category and Importance Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={`${categoryColors[news.category]} font-medium`}>
                    {categoryLabels[news.category]}
                  </Badge>
                  <Badge className={`${importanceColors[news.importance]} font-medium`}>
                    {news.importance.charAt(0).toUpperCase() + news.importance.slice(1)} Priority
                  </Badge>
                </div>
                {news.importance === 'high' && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              {/* Title */}
              <DialogTitle className="text-2xl font-bold leading-tight">
                {news.title}
              </DialogTitle>

              {/* Description */}
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {news.description}
              </DialogDescription>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(news.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{news.source}</span>
                </div>
              </div>
            </DialogHeader>

            <Separator className="my-6" />

            {/* News Image */}
            {news.imageUrl && (
              <div className="mb-6">
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
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
              </div>
            )}

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Full Article</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </p>
              </div>
            </div>

            {/* Tags */}
            {news.tags.length > 0 && (
              <>
                <Separator className="my-6" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Related Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <Separator className="my-6" />
            <div className="flex gap-3">
              {news.url && (
                <Button asChild className="flex items-center gap-2">
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Original Source
                  </a>
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => {
                  const shareData = {
                    title: news.title,
                    text: news.description,
                    url: news.url || window.location.href
                  };
                  
                  if (navigator.share && navigator.canShare?.(shareData)) {
                    navigator.share(shareData);
                  } else {
                    // Fallback to copying to clipboard
                    const shareText = `${news.title}\n\n${news.description}\n\n${news.url || window.location.href}`;
                    navigator.clipboard?.writeText(shareText).then(() => {
                      // Could add toast notification here
                      console.log('Copied to clipboard');
                    });
                  }
                }}
              >
                Share Article
              </Button>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
                Always consult with qualified legal professionals for specific legal matters.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};