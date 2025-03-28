
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
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
import { PieChart as PieChartIcon } from "lucide-react";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseBreakdownChartProps {
  data: CategoryData[];
}

export const ExpenseBreakdownChart = ({ data }: ExpenseBreakdownChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
          Expense Breakdown
        </CardTitle>
        <CardDescription>Where your money is going</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value as number}%`, undefined]}
                contentStyle={{ 
                  borderRadius: 8, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid hsl(var(--border))'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          {data.slice(0, 3).map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="text-sm truncate">{category.name}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
