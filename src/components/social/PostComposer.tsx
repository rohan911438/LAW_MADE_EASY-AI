import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { legalSocialAPI, Specialization } from "@/services/legalSocialAPI";
import { ShieldCheck } from "lucide-react";

interface PostComposerProps {
  currentAuthorId?: string; // future: pull from auth; default to pro_1 for demo
  onPostCreated?: () => void;
}

export const PostComposer = ({ currentAuthorId = 'pro_1', onPostCreated }: PostComposerProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [specialization, setSpecialization] = useState<Specialization | undefined>(undefined);
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const specs = legalSocialAPI.getSpecializations();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      legalSocialAPI.createPost({
        authorId: currentAuthorId,
        title: title.trim() || undefined,
        content: content.trim(),
        coverImage: coverImage.trim() || undefined,
        specialization,
        tags: tags
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
      });
      setTitle('');
      setContent('');
      setCoverImage('');
      setSpecialization(undefined);
      setTags('');
      onPostCreated?.();
    } finally {
      setSubmitting(false);
    }
  };

  const author = legalSocialAPI.getProfessional(currentAuthorId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Share Insights & Blogs</CardTitle>
          {author && (
            <div className="flex items-center gap-2 text-sm">
              <img src={author.avatarUrl || '/placeholder.svg'} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
              <span className="font-medium">{author.name}</span>
              {author.verified && <ShieldCheck className="h-4 w-4 text-green-600" />}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Write your legal insight, case study, or blog..." value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
        <div className="text-xs text-muted-foreground">Aim for clear, actionable insights. Avoid sharing confidential client information.</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input placeholder="Cover image URL (optional)" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
          <Select value={specialization} onValueChange={(v) => setSpecialization(v as Specialization)}>
            <SelectTrigger>
              <SelectValue placeholder="Specialization (optional)" />
            </SelectTrigger>
            <SelectContent>
              {specs.map(s => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={submitting || !content.trim()}>Post</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostComposer;
