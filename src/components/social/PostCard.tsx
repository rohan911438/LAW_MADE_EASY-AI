import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ShieldCheck } from "lucide-react";
import { SocialPost, legalSocialAPI } from "@/services/legalSocialAPI";

interface PostCardProps {
  post: SocialPost;
  onOpen?: (post: SocialPost) => void;
  compact?: boolean;
}

export const PostCard = ({ post, onOpen, compact }: PostCardProps) => {
  const author = legalSocialAPI.getProfessional(post.authorId);

  const formatDate = (iso: string) => new Date(iso).toLocaleString('en-IN', {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
  });

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <img
            src={author?.avatarUrl || '/placeholder.svg'}
            alt={author?.name}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.src.includes('placeholder.svg')) t.src = '/placeholder.svg';
            }}
          />
          <div>
            <div className="font-semibold leading-tight flex items-center gap-1">
              {author?.name || 'Unknown'}
              {author?.verified && <ShieldCheck className="h-4 w-4 text-green-600" />}
            </div>
            <div className="text-xs text-muted-foreground">{author?.role} • {formatDate(post.createdAt)}</div>
          </div>
        </div>

        {post.title && (
          <CardTitle className="mt-3 text-lg leading-tight">{post.title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {post.coverImage && (
          <div className="w-full h-48 rounded-md overflow-hidden mb-3 bg-gray-100">
            <img
              src={post.coverImage}
              alt={post.title || 'cover'}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
              }}
            />
          </div>
        )}

        <p className={`text-sm text-muted-foreground ${compact ? 'line-clamp-2' : 'line-clamp-6'}`}>
          {post.content}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {post.specialization && (
              <Badge variant="secondary" className="capitalize">{post.specialization}</Badge>
            )}
            {(post.tags || []).slice(0, 3).map((t, i) => (
              <Badge key={i} variant="outline">{t}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => legalSocialAPI.likePost(post.id)} className="hover:bg-primary/10">
              <Heart className="h-4 w-4 mr-1" /> {post.likes}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onOpen?.(post)} className="hover:bg-primary/10">
              <MessageSquare className="h-4 w-4 mr-1" /> {post.comments.length}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
