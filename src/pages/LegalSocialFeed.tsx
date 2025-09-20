import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { SocialFilters } from "@/components/social/SocialFilters";
import { PostComposer } from "@/components/social/PostComposer";
import { PostCard } from "@/components/social/PostCard";
import { ProfessionalCard } from "@/components/social/ProfessionalCard";
import { PostDetailsModal } from "@/components/social/PostDetailsModal";
import { LegalSocialAPI, SocialFilters as Filters, SocialPost, legalSocialAPI } from "@/services/legalSocialAPI";
import { CheckCircle, Lock, Star, Users } from "lucide-react";

const LegalSocialFeed = () => {
  const [filters, setFilters] = useState<Filters>({ specialization: 'all', authorRole: 'all' });
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const pros = legalSocialAPI.listProfessionals();

  const load = () => setPosts(legalSocialAPI.listPosts(filters));

  useEffect(() => {
    load();
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative bg-gradient-to-r from-purple-50 to-blue-100 py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">Legal Social Feed</h1>
            </div>
            <p className="text-lg text-gray-600 mb-6">Connect with verified legal professionals. Share insights, publish blogs, and grow your reputation.</p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 border shadow-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">Reviews</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 border shadow-sm">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="font-semibold">Secure</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 border shadow-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="font-semibold">Verified Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <SocialFilters filters={filters} onChange={setFilters} />
            <PostComposer onPostCreated={load} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map(p => (
                <PostCard key={p.id} post={p} onOpen={setSelectedPost} />
              ))}
              {posts.length === 0 && (
                <Card className="p-6 text-center text-muted-foreground">No posts match the current filters.</Card>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 self-start">
            <h2 className="text-lg font-semibold">Top Professionals</h2>
            <div className="grid grid-cols-1 gap-4">
              {pros.map(p => (
                <ProfessionalCard key={p.id} pro={p} />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <PostDetailsModal post={selectedPost} isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} />

      <Separator />
      <Footer />
    </div>
  );
};

export default LegalSocialFeed;
