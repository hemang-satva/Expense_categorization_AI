
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { BarChart as BarChartIcon } from "lucide-react";

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface IncomeExpensesChartProps {
  data: MonthlyData[];
}

export const IncomeExpensesChart = ({ data }: IncomeExpensesChartProps) => {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
          Income vs. Expenses
        </CardTitle>
        <CardDescription>Monthly comparison for the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value) => [`$${value as number}`, undefined]}
                contentStyle={{ 
                  borderRadius: 8, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid hsl(var(--border))'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="hsl(var(--income))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="hsl(var(--expense))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Total Income: <span className="font-medium text-income">${totalIncome.toLocaleString()}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Expenses: <span className="font-medium text-expense">${totalExpenses.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
