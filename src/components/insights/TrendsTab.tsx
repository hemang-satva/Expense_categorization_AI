
import { SpendingTrendsChart } from "./SpendingTrendsChart";
import { MonthlyChangesCard } from "./MonthlyChangesCard";

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface CategoryTrend {
  category: string;
  lastMonth: number;
  thisMonth: number;
  change: number;
}

interface TrendsTabProps {
  monthlyData: MonthlyData[];
  categoryTrends: CategoryTrend[];
}

export const TrendsTab = ({ monthlyData, categoryTrends }: TrendsTabProps) => {
  return (
    <div className="space-y-6">
      <SpendingTrendsChart data={monthlyData} />
      <div className="grid grid-cols-1 gap-6">
        <MonthlyChangesCard trends={categoryTrends} />
      </div>
    </div>
  );
};
