
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const RecommendationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Personalized suggestions for your finances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Subscription Optimization</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You're paying for multiple streaming services. Consider consolidating to save $45/month.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-secondary/50">Netflix $14.99</Badge>
              <Badge variant="outline" className="bg-secondary/50">Disney+ $7.99</Badge>
              <Badge variant="outline" className="bg-secondary/50">Hulu $12.99</Badge>
              <Badge variant="outline" className="bg-secondary/50">HBO Max $9.99</Badge>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Food & Dining Spending</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You spent $420 on restaurants this month, which is 20% higher than your monthly average.
            </p>
            <Button variant="outline" size="sm">View Transactions</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Savings Opportunity</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Based on your income and necessary expenses, you could potentially increase your monthly savings by $250.
            </p>
            <Button variant="outline" size="sm">Create Savings Plan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
