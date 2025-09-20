import axios from 'axios';

// Types for legal news
export interface LegalNewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'supreme-court' | 'high-court' | 'legislation' | 'legal-updates' | 'case-law' | 'regulatory';
  date: string;
  source: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  importance: 'high' | 'medium' | 'low';
}

export interface NewsFilters {
  category?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  keywords?: string;
  importance?: string;
}

export interface NewsResponse {
  success: boolean;
  data: LegalNewsItem[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

class LegalNewsAPI {
  private readonly NEWS_API_ENDPOINT = 'https://newsapi.org/v2';
  private readonly API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  // Mock data for demonstration when API is not available
  private mockNews: LegalNewsItem[] = [
    {
      id: '1',
      title: 'Supreme Court Ruling on Data Privacy Rights',
      description: 'The Supreme Court delivers landmark judgment on digital privacy rights under Article 21.',
      content: 'In a significant development for digital rights in India, the Supreme Court has delivered a comprehensive judgment strengthening data privacy protections...',
      category: 'supreme-court',
      date: '2025-09-19',
      source: 'Supreme Court of India',
      tags: ['privacy', 'digital rights', 'fundamental rights'],
      importance: 'high',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'New Banking Regulations Come into Effect',
      description: 'Reserve Bank of India introduces new guidelines for digital lending platforms.',
      content: 'The Reserve Bank of India has announced comprehensive regulations for digital lending platforms to protect consumer interests...',
      category: 'regulatory',
      date: '2025-09-18',
      source: 'Reserve Bank of India',
      tags: ['banking', 'digital lending', 'consumer protection'],
      importance: 'high',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'High Court Clarifies Employment Law',
      description: 'Delhi High Court provides clarity on gig worker rights and benefits.',
      content: 'The Delhi High Court has issued important guidelines regarding the classification and rights of gig workers...',
      category: 'high-court',
      date: '2025-09-17',
      source: 'Delhi High Court',
      tags: ['employment', 'gig economy', 'workers rights'],
      importance: 'medium',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '4',
      title: 'Amendment to Consumer Protection Act',
      description: 'Parliament passes amendments to strengthen consumer rights in e-commerce.',
      content: 'The Parliament has approved significant amendments to the Consumer Protection Act, particularly focusing on e-commerce transactions...',
      category: 'legislation',
      date: '2025-09-16',
      source: 'Parliament of India',
      tags: ['consumer protection', 'e-commerce', 'legislation'],
      importance: 'high',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '5',
      title: 'Environmental Law Update',
      description: 'National Green Tribunal issues new guidelines for industrial waste management.',
      content: 'The National Green Tribunal has introduced stricter guidelines for industrial waste management and environmental compliance...',
      category: 'regulatory',
      date: '2025-09-15',
      source: 'National Green Tribunal',
      tags: ['environment', 'industrial law', 'compliance'],
      importance: 'medium',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '6',
      title: 'Intellectual Property Rights Case',
      description: 'Bombay High Court ruling sets precedent for software patent disputes.',
      content: 'In a landmark case, the Bombay High Court has provided crucial clarification on software patent eligibility...',
      category: 'high-court',
      date: '2025-09-14',
      source: 'Bombay High Court',
      tags: ['intellectual property', 'patents', 'technology'],
      importance: 'medium',
      imageUrl: '/placeholder.svg'
    }
  ];

  private getNewsApiUrl(query: string, category?: string, from?: string, to?: string, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
      q: `${query} AND India AND (legal OR court OR law OR legislation OR regulatory)`,
      language: 'en',
      sortBy: 'publishedAt',
      page: page.toString(),
      pageSize: pageSize.toString(),
      apiKey: this.API_KEY || ''
    });

    if (from) params.append('from', from);
    if (to) params.append('to', to);

    return `${this.NEWS_API_ENDPOINT}/everything?${params.toString()}`;
  }

  private async fetchFromNewsAPI(filters: NewsFilters = {}, page = 1, limit = 10): Promise<NewsResponse> {
    try {
      if (!this.API_KEY) {
        console.warn('News API key not found, using mock data');
        return this.getMockNews(filters, page, limit);
      }

      const query = filters.keywords || 'legal news';
      const from = filters.dateRange?.from;
      const to = filters.dateRange?.to;

      const response = await axios.get(
        this.getNewsApiUrl(query, filters.category, from, to, page, limit),
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'Law-Made-Easy-AI/1.0'
          }
        }
      );

      if (response.data.status === 'ok' && response.data.articles) {
        const articles: LegalNewsItem[] = response.data.articles.map((article: any, index: number) => ({
          id: `news_${Date.now()}_${index}`,
          title: article.title || 'Untitled',
          description: article.description || article.content?.substring(0, 200) + '...' || 'No description available',
          content: article.content || article.description || 'Content not available',
          category: this.categorizeNews(article.title + ' ' + article.description),
          date: article.publishedAt ? article.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
          source: article.source?.name || 'Unknown Source',
          url: article.url,
          imageUrl: article.urlToImage || '/placeholder.svg',
          tags: this.extractTags(article.title + ' ' + article.description),
          importance: this.determineImportance(article.title + ' ' + article.description)
        }));

        return {
          success: true,
          data: this.filterNews(articles, filters),
          total: response.data.totalResults || articles.length,
          page,
          limit,
          message: 'News fetched successfully'
        };
      } else {
        throw new Error('Invalid response from News API');
      }
    } catch (error) {
      console.error('News API error:', error);
      return this.getMockNews(filters, page, limit);
    }
  }

  private getMockNews(filters: NewsFilters = {}, page = 1, limit = 10): NewsResponse {
    let filteredNews = [...this.mockNews];

    // Apply filters
    filteredNews = this.filterNews(filteredNews, filters);

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedNews,
      total: filteredNews.length,
      page,
      limit,
      message: 'Using cached legal news data'
    };
  }

  private filterNews(news: LegalNewsItem[], filters: NewsFilters): LegalNewsItem[] {
    return news.filter(item => {
      // Category filter
      if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const itemDate = new Date(item.date);
        const fromDate = new Date(filters.dateRange.from);
        const toDate = new Date(filters.dateRange.to);
        if (itemDate < fromDate || itemDate > toDate) {
          return false;
        }
      }

      // Keywords filter
      if (filters.keywords) {
        const keywords = filters.keywords.toLowerCase();
        const searchText = (item.title + ' ' + item.description + ' ' + item.tags.join(' ')).toLowerCase();
        if (!searchText.includes(keywords)) {
          return false;
        }
      }

      // Importance filter
      if (filters.importance && filters.importance !== 'all' && item.importance !== filters.importance) {
        return false;
      }

      return true;
    });
  }

  private categorizeNews(text: string): LegalNewsItem['category'] {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('supreme court')) return 'supreme-court';
    if (lowerText.includes('high court')) return 'high-court';
    if (lowerText.includes('parliament') || lowerText.includes('legislation') || lowerText.includes('bill')) return 'legislation';
    if (lowerText.includes('case') || lowerText.includes('judgment')) return 'case-law';
    if (lowerText.includes('rbi') || lowerText.includes('regulatory') || lowerText.includes('guidelines')) return 'regulatory';
    
    return 'legal-updates';
  }

  private extractTags(text: string): string[] {
    const commonLegalTerms = [
      'supreme court', 'high court', 'case law', 'legislation', 'regulatory',
      'consumer protection', 'data privacy', 'employment law', 'intellectual property',
      'banking', 'environment', 'constitutional law', 'criminal law', 'civil law'
    ];

    const lowerText = text.toLowerCase();
    return commonLegalTerms.filter(term => lowerText.includes(term));
  }

  private determineImportance(text: string): LegalNewsItem['importance'] {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('supreme court') || lowerText.includes('landmark') || lowerText.includes('constitutional')) {
      return 'high';
    }
    
    if (lowerText.includes('high court') || lowerText.includes('amendment') || lowerText.includes('new law')) {
      return 'medium';
    }
    
    return 'low';
  }

  // Public methods
  async getLatestNews(page = 1, limit = 10): Promise<NewsResponse> {
    return this.fetchFromNewsAPI({}, page, limit);
  }

  async getNewsByCategory(category: string, page = 1, limit = 10): Promise<NewsResponse> {
    return this.fetchFromNewsAPI({ category }, page, limit);
  }

  async searchNews(keywords: string, page = 1, limit = 10): Promise<NewsResponse> {
    return this.fetchFromNewsAPI({ keywords }, page, limit);
  }

  async getNewsWithFilters(filters: NewsFilters, page = 1, limit = 10): Promise<NewsResponse> {
    return this.fetchFromNewsAPI(filters, page, limit);
  }

  // Get news categories for filter dropdown
  getCategories() {
    return [
      { value: 'all', label: 'All Categories' },
      { value: 'supreme-court', label: 'Supreme Court' },
      { value: 'high-court', label: 'High Court' },
      { value: 'legislation', label: 'Legislation' },
      { value: 'case-law', label: 'Case Law' },
      { value: 'regulatory', label: 'Regulatory' },
      { value: 'legal-updates', label: 'Legal Updates' }
    ];
  }

  // Get importance levels for filter dropdown
  getImportanceLevels() {
    return [
      { value: 'all', label: 'All Importance Levels' },
      { value: 'high', label: 'High Importance' },
      { value: 'medium', label: 'Medium Importance' },
      { value: 'low', label: 'Low Importance' }
    ];
  }
}

export const legalNewsAPI = new LegalNewsAPI();