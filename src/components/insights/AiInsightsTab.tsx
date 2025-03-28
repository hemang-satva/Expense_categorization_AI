
import { AiInsightCard } from "./AiInsightCard";
import { AnomalyDetectionCard } from "./AnomalyDetectionCard";
import { RecommendationsCard } from "./RecommendationsCard";

interface Insight {
  id: number;
  title: string;
  description: string;
  type: string;
}

interface AiInsightsTabProps {
  aiInsights: Insight[];
}

export const AiInsightsTab = ({ aiInsights }: AiInsightsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AiInsightCard insights={aiInsights} />
        <AnomalyDetectionCard />
      </div>
      <RecommendationsCard />
    </div>
  );
};
