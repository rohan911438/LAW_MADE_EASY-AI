export type Specialization =
  | 'criminal law'
  | 'corporate law'
  | 'family law'
  | 'constitutional law'
  | 'taxation'
  | 'intellectual property'
  | 'environment'
  | 'cyber law';

export interface Professional {
  id: string;
  name: string;
  role: 'Lawyer' | 'Judge' | 'Advocate' | 'Legal Researcher';
  verified: boolean;
  specialization: Specialization[];
  location?: string;
  firm?: string;
  email?: string; // shown only if verified
  phone?: string; // shown only if verified
  address?: string; // shown only if verified
  avatarUrl?: string;
  bio?: string;
}

export interface SocialPost {
  id: string;
  authorId: string;
  title?: string;
  content: string;
  coverImage?: string;
  createdAt: string; // ISO
  tags?: string[];
  specialization?: Specialization;
  likes: number;
  comments: Array<{
    id: string;
    authorId: string;
    content: string;
    createdAt: string;
  }>;
}

export interface SocialFilters {
  specialization?: Specialization | 'all';
  keywords?: string;
  authorRole?: Professional['role'] | 'all';
}

const STORAGE_KEYS = {
  posts: 'lme_social_posts_v1',
  pros: 'lme_social_pros_v1',
};

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function seedIfEmpty() {
  const pros = readLocal<Professional[]>(STORAGE_KEYS.pros, []);
  if (pros.length === 0) {
    const seededPros: Professional[] = [
      {
        id: 'pro_1',
        name: 'Priya Sharma',
        role: 'Lawyer',
        verified: true,
        specialization: ['corporate law', 'taxation'],
        firm: 'Lex & Co.',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        address: 'B-12, Connaught Place, New Delhi',
        avatarUrl: 'https://i.pravatar.cc/100?img=1',
        bio: 'Corporate lawyer with 10+ years advising startups and enterprises.'
      },
      {
        id: 'pro_2',
        name: 'Arjun Mehta',
        role: 'Advocate',
        verified: true,
        specialization: ['criminal law'],
        location: 'Mumbai',
        email: 'arjun.mehta@example.com',
        phone: '+91 99888 77665',
        avatarUrl: 'https://i.pravatar.cc/100?img=2',
        bio: 'Defense advocate focusing on complex criminal litigation.'
      },
      {
        id: 'pro_3',
        name: 'Neha Kapoor',
        role: 'Legal Researcher',
        verified: false,
        specialization: ['constitutional law', 'environment'],
        location: 'Bengaluru',
        avatarUrl: 'https://i.pravatar.cc/100?img=3',
        bio: 'Researcher on constitutional rights and environmental policy.'
      },
    ];
    writeLocal(STORAGE_KEYS.pros, seededPros);
  }

  const posts = readLocal<SocialPost[]>(STORAGE_KEYS.posts, []);
  if (posts.length === 0) {
    const seededPosts: SocialPost[] = [
      {
        id: 'post_1',
        authorId: 'pro_1',
        title: '5 Key Clauses Every Startup Should Negotiate',
        content:
          'From indemnity to IP assignment, here are five clauses early-stage startups overlook but shouldn\'t. Practical tips and checklists included.',
        coverImage: '/legal-news-feed.jpg',
        createdAt: new Date().toISOString(),
        tags: ['startups', 'contracts', 'ip'],
        specialization: 'corporate law',
        likes: 24,
        comments: [
          { id: 'c1', authorId: 'pro_2', content: 'Great checklist! Adding to my resources.', createdAt: new Date().toISOString() },
        ],
      },
      {
        id: 'post_2',
        authorId: 'pro_2',
        title: 'Landmark SC Ruling: Bail Jurisprudence Simplified',
        content:
          'Quick breakdown of a recent Supreme Court ruling clarifying bail conditions and safeguarding personal liberty.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['criminal law', 'supreme court'],
        specialization: 'criminal law',
        likes: 41,
        comments: [],
      },
    ];
    writeLocal(STORAGE_KEYS.posts, seededPosts);
  }
}

seedIfEmpty();

export class LegalSocialAPI {
  getSpecializations(): Specialization[] {
    return [
      'criminal law',
      'corporate law',
      'family law',
      'constitutional law',
      'taxation',
      'intellectual property',
      'environment',
      'cyber law',
    ];
  }

  listProfessionals(): Professional[] {
    return readLocal<Professional[]>(STORAGE_KEYS.pros, []);
  }

  getProfessional(id: string): Professional | undefined {
    return this.listProfessionals().find(p => p.id === id);
  }

  listPosts(filters?: SocialFilters): SocialPost[] {
    let posts = readLocal<SocialPost[]>(STORAGE_KEYS.posts, []);
    // newest first
    posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    if (!filters) return posts;

    return posts.filter(p => {
      if (filters.specialization && filters.specialization !== 'all' && p.specialization !== filters.specialization) {
        return false;
      }
      if (filters.keywords) {
        const k = filters.keywords.toLowerCase();
        const text = `${p.title || ''} ${p.content} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (!text.includes(k)) return false;
      }
      if (filters.authorRole && filters.authorRole !== 'all') {
        const pro = this.getProfessional(p.authorId);
        if (!pro || pro.role !== filters.authorRole) return false;
      }
      return true;
    });
  }

  createPost(input: Omit<SocialPost, 'id' | 'createdAt' | 'likes' | 'comments'>): SocialPost {
    const posts = readLocal<SocialPost[]>(STORAGE_KEYS.posts, []);
    const newPost: SocialPost = {
      ...input,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    posts.unshift(newPost);
    writeLocal(STORAGE_KEYS.posts, posts);
    return newPost;
  }

  likePost(id: string): void {
    const posts = readLocal<SocialPost[]>(STORAGE_KEYS.posts, []);
    const idx = posts.findIndex(p => p.id === id);
    if (idx >= 0) {
      posts[idx].likes += 1;
      writeLocal(STORAGE_KEYS.posts, posts);
    }
  }
}

export const legalSocialAPI = new LegalSocialAPI();
