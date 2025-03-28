
import { CategoryCard } from "./CategoryCard";
import { CategoryComparisonChart } from "./CategoryComparisonChart";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoriesTabProps {
  categoryData: CategoryData[];
}

export const CategoriesTab = ({ categoryData }: CategoriesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryData.slice(0, 3).map((category, index) => (
          <CategoryCard 
            key={category.name} 
            name={category.name} 
            value={category.value} 
            color={category.color} 
          />
        ))}
      </div>
      <CategoryComparisonChart data={categoryData} />
    </div>
  );
};
