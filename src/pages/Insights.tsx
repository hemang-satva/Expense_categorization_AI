
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { OverviewTab } from "@/components/insights/OverviewTab";
import { CategoriesTab } from "@/components/insights/CategoriesTab";
import { TrendsTab } from "@/components/insights/TrendsTab";
import { AiInsightsTab } from "@/components/insights/AiInsightsTab";
import { 
  monthlyData, 
  categoryData, 
  categoryTrends, 
  aiInsights 
} from "@/data/insightsData";

const Insights = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Insights</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Analyze your financial data with AI-powered insights
            </p>
          </div>
          <Button variant="outline" className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Calendar className="mr-2 h-4 w-4" />
            Last 12 Months
          </Button>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger value="categories" onClick={() => setActiveTab("categories")}>Categories</TabsTrigger>
            <TabsTrigger value="trends" onClick={() => setActiveTab("trends")}>Trends</TabsTrigger>
            <TabsTrigger value="ai-insights" onClick={() => setActiveTab("ai-insights")}>AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab monthlyData={monthlyData} categoryData={categoryData} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab categoryData={categoryData} />
          </TabsContent>

          <TabsContent value="trends">
            <TrendsTab monthlyData={monthlyData} categoryTrends={categoryTrends} />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AiInsightsTab aiInsights={aiInsights} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Insights;
