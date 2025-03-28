
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { Button } from "@/components/ui/button";
import { LineChart, Download } from "lucide-react";

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface SavingsGrowthChartProps {
  data: MonthlyData[];
}

export const SavingsGrowthChart = ({ data }: SavingsGrowthChartProps) => {
  const totalSavings = data.reduce((sum, item) => sum + (item.income - item.expenses), 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <LineChart className="mr-2 h-5 w-5 text-primary" />
          Savings Growth
        </CardTitle>
        <CardDescription>Net income over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--transfer))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--transfer))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "savings") return [`$${value as number}`, "Savings"];
                  return [`$${value as number}`, name];
                }}
                contentStyle={{ 
                  borderRadius: 8, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid hsl(var(--border))'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey={(data) => data.income - data.expenses}
                name="savings"
                stroke="hsl(var(--transfer))" 
                fillOpacity={1} 
                fill="url(#colorSavings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total Savings: <span className="font-medium text-transfer">${totalSavings.toLocaleString()}</span>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
};
