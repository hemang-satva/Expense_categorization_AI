
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CategoryTrend {
  category: string;
  lastMonth: number;
  thisMonth: number;
  change: number;
}

interface MonthlyChangesCardProps {
  trends: CategoryTrend[];
}

export const MonthlyChangesCard = ({ trends }: MonthlyChangesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Month-over-Month Changes</CardTitle>
        <CardDescription>Category changes from last month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trends.map((trend) => (
            <div 
              key={trend.category} 
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div>
                <div className="font-medium">{trend.category}</div>
                <div className="text-sm text-muted-foreground">
                  ${trend.lastMonth.toFixed(2)} → ${trend.thisMonth.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`text-sm font-medium flex items-center ${
                  trend.change > 0 
                    ? "text-expense" 
                    : trend.change < 0
                      ? "text-income"
                      : "text-muted-foreground"
                }`}>
                  {trend.change > 0 ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : trend.change < 0 ? (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  ) : null}
                  {trend.change > 0 ? "+" : ""}{trend.change}%
                </div>
                <div className="w-24 bg-secondary rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${
                      trend.change > 0 
                        ? "bg-expense" 
                        : trend.change < 0
                          ? "bg-income"
                          : "bg-muted"
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(trend.change) * 2, 100)}%`,
                      marginLeft: trend.change < 0 ? "auto" : "0" 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
