import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { legalSocialAPI, SocialPost } from "@/services/legalSocialAPI";

interface PostDetailsModalProps {
  post: SocialPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailsModal = ({ post, isOpen, onClose }: PostDetailsModalProps) => {
  if (!post) return null;
  const author = legalSocialAPI.getProfessional(post.authorId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title || 'Post'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={author?.avatarUrl || '/placeholder.svg'}
              alt={author?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{author?.name}</div>
              <div className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString('en-IN')}</div>
            </div>
          </div>

          {post.coverImage && (
            <div className="w-full h-60 rounded-md overflow-hidden bg-gray-100">
              <img src={post.coverImage} alt="cover" className="w-full h-full object-cover" />
            </div>
          )}

          {post.specialization && (
            <Badge variant="secondary" className="capitalize">{post.specialization}</Badge>
          )}

          <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>

          <Separator />

          <div>
            <div className="font-medium mb-2">Comments ({post.comments.length})</div>
            <div className="space-y-3">
              {post.comments.map(c => {
                const ca = legalSocialAPI.getProfessional(c.authorId);
                return (
                  <div key={c.id} className="flex items-start gap-3">
                    <img src={ca?.avatarUrl || '/placeholder.svg'} alt={ca?.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-medium">{ca?.name}</div>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">{c.content}</div>
                      <div className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                );
              })}
              {post.comments.length === 0 && (
                <div className="text-sm text-muted-foreground">No comments yet.</div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsModal;
