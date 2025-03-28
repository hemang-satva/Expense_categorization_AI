
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  value: number;
  color: string;
  totalExpenses?: number;
}

export const CategoryCard = ({ name, value, color, totalExpenses = 343 }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <CardHeader className="pb-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {value}% of total expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${Math.round(value * totalExpenses / 10)}0
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          per month on average
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="ghost" size="sm" className="ml-auto">
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
