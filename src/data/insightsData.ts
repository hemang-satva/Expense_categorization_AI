
import { Transaction } from "@/types/transactions";

export const monthlyData = [
  { name: "Jan", income: 4200, expenses: 2800 },
  { name: "Feb", income: 3800, expenses: 2600 },
  { name: "Mar", income: 3900, expenses: 2900 },
  { name: "Apr", income: 4100, expenses: 3000 },
  { name: "May", income: 3700, expenses: 2500 },
  { name: "Jun", income: 3600, expenses: 2700 },
  { name: "Jul", income: 4200, expenses: 3100 },
  { name: "Aug", income: 4300, expenses: 3000 },
  { name: "Sep", income: 4000, expenses: 2800 },
  { name: "Oct", income: 4100, expenses: 2900 },
  { name: "Nov", income: 4200, expenses: 3100 },
  { name: "Dec", income: 4500, expenses: 3300 },
];

export const categoryData = [
  { name: "Housing", value: 35, color: "#0088FE" },
  { name: "Food", value: 20, color: "#00C49F" },
  { name: "Transportation", value: 15, color: "#FFBB28" },
  { name: "Entertainment", value: 10, color: "#FF8042" },
  { name: "Shopping", value: 8, color: "#8884D8" },
  { name: "Health", value: 7, color: "#82CA9D" },
  { name: "Other", value: 5, color: "#AAAAAA" },
];

export const trendData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
];

export const categoryTrends = [
  { category: "Housing", lastMonth: 1200, thisMonth: 1200, change: 0 },
  { category: "Food", lastMonth: 600, thisMonth: 550, change: -8.3 },
  { category: "Transportation", lastMonth: 350, thisMonth: 420, change: 20 },
  { category: "Entertainment", lastMonth: 250, thisMonth: 280, change: 12 },
  { category: "Shopping", lastMonth: 180, thisMonth: 240, change: 33.3 },
];

export const aiInsights = [
  {
    id: 1,
    title: "Increase in entertainment spending",
    description: "Your entertainment spending has increased by 12% compared to last month.",
    type: "info"
  },
  {
    id: 2,
    title: "Shopping anomaly detected",
    description: "Unusual transaction of $240 at 'Tech Gadgets Store' on July 18.",
    type: "warning"
  },
  {
    id: 3,
    title: "Savings opportunity",
    description: "You could save $45/month by consolidating your subscription services.",
    type: "success"
  },
];
