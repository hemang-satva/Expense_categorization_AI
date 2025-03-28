
import { IncomeExpensesChart } from "./IncomeExpensesChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { SavingsGrowthChart } from "./SavingsGrowthChart";

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface OverviewTabProps {
  monthlyData: MonthlyData[];
  categoryData: CategoryData[];
}

export const OverviewTab = ({ monthlyData, categoryData }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeExpensesChart data={monthlyData} />
        <ExpenseBreakdownChart data={categoryData} />
      </div>
      <SavingsGrowthChart data={monthlyData} />
    </div>
  );
};
