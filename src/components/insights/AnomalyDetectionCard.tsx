
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

export const AnomalyDetectionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Anomalies</CardTitle>
        <CardDescription>Unusual transactions detected by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-8 flex flex-col items-center justify-center text-center h-[300px]">
          <div className="p-4 rounded-full bg-secondary mb-4">
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Anomaly Detection Active</h3>
          <p className="text-muted-foreground max-w-md">
            Our AI is monitoring your transactions for unusual spending patterns. Any anomalies will be displayed here.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          Adjust Sensitivity
        </Button>
      </CardFooter>
    </Card>
  );
};
