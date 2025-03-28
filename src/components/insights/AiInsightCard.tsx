
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Insight {
  id: number;
  title: string;
  description: string;
  type: string;
}

interface AiInsightCardProps {
  insights: Insight[];
}

export const AiInsightCard = ({ insights }: AiInsightCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Generated Insights</CardTitle>
        <CardDescription>Smart analysis of your financial data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-1.5 rounded-full ${
                  insight.type === "warning" 
                    ? "bg-amber-100" 
                    : insight.type === "success"
                      ? "bg-green-100"
                      : "bg-blue-100"
                }`}>
                  <AlertCircle className={`h-4 w-4 ${
                    insight.type === "warning" 
                      ? "text-amber-600" 
                      : insight.type === "success"
                        ? "text-green-600"
                        : "text-blue-600"
                  }`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button className="w-full">
          Get More Insights
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
