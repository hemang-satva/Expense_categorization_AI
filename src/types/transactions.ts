
export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  suggestedCategory: string;
  finalCategory: string;
  confidence: number;
  notes: string;
  type: "income" | "expense" | "transfer";
}
