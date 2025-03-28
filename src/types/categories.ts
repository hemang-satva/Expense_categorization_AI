
export interface Category {
  id: number;
  name: string;
  type: "income" | "expense" | "transfer";
  subcategories: string[];
  color: string;
  rules: string[];
  transactionCount: number;
}
