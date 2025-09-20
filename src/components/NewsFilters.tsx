import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, X, Search } from "lucide-react";
import { format } from "date-fns";
import { NewsFilters } from "@/services/legalNewsAPI";

interface NewsFiltersProps {
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
  onSearch: (searchTerm: string) => void;
  categories: { value: string; label: string }[];
  importanceLevels: { value: string; label: string }[];
  isLoading?: boolean;
}

export const NewsFiltersComponent = ({
  filters,
  onFiltersChange,
  onSearch,
  categories,
  importanceLevels,
  isLoading
}: NewsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.keywords || '');
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (key: keyof NewsFilters, value: any) => {
    const newFilters = { ...filters };
    
    if (key === 'category' && value === 'all') {
      delete newFilters.category;
    } else if (key === 'importance' && value === 'all') {
      delete newFilters.importance;
    } else if (key === 'dateRange') {
      newFilters.dateRange = value;
    } else {
      (newFilters as any)[key] = value;
    }
    
    onFiltersChange(newFilters);
  };

  const handleDateFromSelect = (date: Date | undefined) => {
    if (date) {
      const newDateRange = {
        from: format(date, 'yyyy-MM-dd'),
        to: filters.dateRange?.to || format(new Date(), 'yyyy-MM-dd')
      };
      handleFilterChange('dateRange', newDateRange);
    }
    setDateFromOpen(false);
  };

  const handleDateToSelect = (date: Date | undefined) => {
    if (date) {
      const newDateRange = {
        from: filters.dateRange?.from || format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        to: format(date, 'yyyy-MM-dd')
      };
      handleFilterChange('dateRange', newDateRange);
    }
    setDateToOpen(false);
  };

  const clearFilter = (filterKey: keyof NewsFilters) => {
    const newFilters = { ...filters };
    delete (newFilters as any)[filterKey];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.importance) count++;
    if (filters.dateRange) count++;
    if (filters.keywords) count++;
    return count;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {getActiveFiltersCount()} active filter{getActiveFiltersCount() !== 1 ? 's' : ''}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">Search legal news</Label>
            <Input
              id="search"
              placeholder="Search legal news, cases, laws..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>

        {/* Active Search Badge */}
        {filters.keywords && (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="flex items-center gap-1">
              Search: "{filters.keywords}"
              <button
                onClick={() => {
                  setSearchTerm('');
                  clearFilter('keywords');
                }}
                className="ml-1 h-3 w-3 rounded-full hover:bg-black/20 flex items-center justify-center"
              >
                <X className="h-2 w-2" />
              </button>
            </Badge>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select 
              value={filters.category || 'all'} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Importance Filter */}
          <div className="space-y-2">
            <Label>Importance</Label>
            <Select 
              value={filters.importance || 'all'} 
              onValueChange={(value) => handleFilterChange('importance', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select importance" />
              </SelectTrigger>
              <SelectContent>
                {importanceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date From Filter */}
          <div className="space-y-2">
            <Label>From Date</Label>
            <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.from ? format(new Date(filters.dateRange.from), 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateRange?.from ? new Date(filters.dateRange.from) : undefined}
                  onSelect={handleDateFromSelect}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Date To Filter */}
          <div className="space-y-2">
            <Label>To Date</Label>
            <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.to ? format(new Date(filters.dateRange.to), 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateRange?.to ? new Date(filters.dateRange.to) : undefined}
                  onSelect={handleDateToSelect}
                  disabled={(date) => date > new Date() || (filters.dateRange?.from && date < new Date(filters.dateRange.from))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.category || filters.importance || filters.dateRange) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.category && (
              <Badge variant="outline" className="flex items-center gap-1">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => clearFilter('category')}
                  className="ml-1 h-3 w-3 rounded-full hover:bg-black/20 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            )}
            
            {filters.importance && (
              <Badge variant="outline" className="flex items-center gap-1">
                Importance: {importanceLevels.find(l => l.value === filters.importance)?.label}
                <button
                  onClick={() => clearFilter('importance')}
                  className="ml-1 h-3 w-3 rounded-full hover:bg-black/20 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            )}

            {filters.dateRange && (
              <Badge variant="outline" className="flex items-center gap-1">
                Date Range: {format(new Date(filters.dateRange.from), 'MMM dd')} - {format(new Date(filters.dateRange.to), 'MMM dd')}
                <button
                  onClick={() => clearFilter('dateRange')}
                  className="ml-1 h-3 w-3 rounded-full hover:bg-black/20 flex items-center justify-center"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};