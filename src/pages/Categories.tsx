
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Category } from "@/types/categories";
import { categoriesData } from "@/data/categoriesData";
import { NewCategoryDialog } from "@/components/categories/NewCategoryDialog";
import { CategoryFilters } from "@/components/categories/CategoryFilters";
import { CategoryTable } from "@/components/categories/CategoryTable";

const Categories = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(categoriesData);
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
      category.rules.some(rule => rule.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = activeType === null || category.type === activeType;
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Categories</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Manage your transaction categories and rules
            </p>
          </div>
          <NewCategoryDialog categories={categories} setCategories={setCategories} />
        </div>

        <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <CardTitle>Category Management</CardTitle>
                <CardDescription>
                  {filteredCategories.length} categories
                </CardDescription>
              </div>
              <CategoryFilters 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                activeType={activeType}
                setActiveType={setActiveType}
              />
            </div>
          </CardHeader>
          <CardContent>
            <CategoryTable 
              categories={categories} 
              setCategories={setCategories} 
              filteredCategories={filteredCategories}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Categories;
