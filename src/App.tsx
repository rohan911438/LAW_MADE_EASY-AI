import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LegalSimplifier from "./pages/LegalSimplifier";
import DocumentAuthenticity from "./pages/DocumentAuthenticity";
import LegalNewsFeed from "./pages/LegalNewsFeed";
import LegalSocialFeed from "./pages/LegalSocialFeed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/legal-simplifier" element={<LegalSimplifier />} />
          <Route path="/document-authenticity" element={<DocumentAuthenticity />} />
          <Route path="/legal-news-feed" element={<LegalNewsFeed />} />
          <Route path="/legal-social-feed" element={<LegalSocialFeed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
