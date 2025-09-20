import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { NewsFiltersComponent } from "@/components/NewsFilters";
import { NewsDetailsModal } from "@/components/NewsDetailsModal";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  legalNewsAPI, 
  LegalNewsItem, 
  NewsFilters 
} from "@/services/legalNewsAPI";
import { 
  AlertCircle, 
  RefreshCw, 
  Newspaper, 
  TrendingUp, 
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LegalNewsFeed = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<NewsFilters>({});
  const [selectedNews, setSelectedNews] = useState<LegalNewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const newsPerPage = 12;

  // Fetch news data
  const { 
    data: newsResponse, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['legal-news', filters, currentPage, searchTerm],
    queryFn: () => {
      const finalFilters = searchTerm ? { ...filters, keywords: searchTerm } : filters;
      return legalNewsAPI.getNewsWithFilters(finalFilters, currentPage, newsPerPage);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Get filter options
  const categories = legalNewsAPI.getCategories();
  const importanceLevels = legalNewsAPI.getImportanceLevels();

  // Handlers
  const handleReadMore = (news: LegalNewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleFiltersChange = (newFilters: NewsFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (searchKeyword: string) => {
    setSearchTerm(searchKeyword);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing news feed",
      description: "Fetching the latest legal news...",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalPages = newsResponse ? Math.ceil(newsResponse.total / newsPerPage) : 0;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Get stats
  const getNewsStats = () => {
    if (!newsResponse?.data) return null;
    
    const highPriority = newsResponse.data.filter(news => news.importance === 'high').length;
    const todayNews = newsResponse.data.filter(news => {
      const newsDate = new Date(news.date).toDateString();
      const today = new Date().toDateString();
      return newsDate === today;
    }).length;
    
    return { highPriority, todayNews, total: newsResponse.total };
  };

  const stats = getNewsStats();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Newspaper className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">
                Indian Legal News Feed
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Stay Updated with Latest Legal Changes and Court Decisions
            </p>
            
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center gap-2 justify-center">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-lg">{stats.highPriority}</span>
                  </div>
                  <p className="text-sm text-gray-600">High Priority News</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center gap-2 justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold text-lg">{stats.todayNews}</span>
                  </div>
                  <p className="text-sm text-gray-600">Today's Updates</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-center gap-2 justify-center">
                    <Newspaper className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-lg">{stats.total}</span>
                  </div>
                  <p className="text-sm text-gray-600">Total Articles</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                100% Accuracy
              </Badge>
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Feed
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <NewsFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            categories={categories}
            importanceLevels={importanceLevels}
            isLoading={isLoading}
          />

          {/* Error State */}
          {isError && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Error loading news: {error?.message || 'Unknown error occurred'}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="ml-2"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* News Grid */}
          {!isLoading && newsResponse?.data && newsResponse.data.length > 0 && (
            <>
              {/* Results Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Showing {newsResponse.data.length} of {newsResponse.total} articles
                    {searchTerm && (
                      <span className="ml-2 font-medium">
                        for "{searchTerm}"
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {newsResponse.data.map((news) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1 mx-4">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      if (totalPages > 5) {
                        if (currentPage <= 3) {
                          return pageNum;
                        } else if (currentPage >= totalPages - 2) {
                          return totalPages - 4 + i;
                        } else {
                          return currentPage - 2 + i;
                        }
                      }
                      return pageNum;
                    }).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && newsResponse?.data && newsResponse.data.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No news found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || Object.keys(filters).length > 0
                  ? "Try adjusting your search criteria or filters."
                  : "No legal news available at the moment."}
              </p>
              {(searchTerm || Object.keys(filters).length > 0) && (
                <Button onClick={() => {
                  setFilters({});
                  setSearchTerm("");
                  setCurrentPage(1);
                }}>
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* News Details Modal */}
      <NewsDetailsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNews(null);
        }}
      />

      <Separator />
      <Footer />
    </div>
  );
};

export default LegalNewsFeed;