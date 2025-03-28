
import { Transaction } from "@/types/transactions";

export const transactionsData: Transaction[] = [
  {
    id: 1,
    date: "2023-07-20",
    description: "Amazon.com",
    amount: -84.99,
    suggestedCategory: "Shopping",
    finalCategory: "Shopping",
    confidence: 0.92,
    notes: "",
    type: "expense"
  },
  {
    id: 2,
    date: "2023-07-19",
    description: "Starbucks Coffee",
    amount: -5.60,
    suggestedCategory: "Food & Drink",
    finalCategory: "Food & Drink",
    confidence: 0.89,
    notes: "",
    type: "expense"
  },
  {
    id: 3,
    date: "2023-07-15",
    description: "Payroll Deposit",
    amount: 2400.00,
    suggestedCategory: "Income",
    finalCategory: "Income",
    confidence: 0.97,
    notes: "Monthly salary",
    type: "income"
  },
  {
    id: 4,
    date: "2023-07-14",
    description: "Uber Ride",
    amount: -12.50,
    suggestedCategory: "Transportation",
    finalCategory: "Transportation",
    confidence: 0.88,
    notes: "",
    type: "expense"
  },
  {
    id: 5,
    date: "2023-07-12",
    description: "Netflix Subscription",
    amount: -14.99,
    suggestedCategory: "Entertainment",
    finalCategory: "Entertainment",
    confidence: 0.95,
    notes: "Monthly subscription",
    type: "expense"
  },
  {
    id: 6,
    date: "2023-07-10",
    description: "Transfer to Savings",
    amount: -500.00,
    suggestedCategory: "Transfer",
    finalCategory: "Transfer",
    confidence: 0.91,
    notes: "",
    type: "transfer"
  },
  {
    id: 7,
    date: "2023-07-08",
    description: "Whole Foods Market",
    amount: -78.32,
    suggestedCategory: "Groceries",
    finalCategory: "Food & Drink",
    confidence: 0.76,
    notes: "Weekly grocery shopping",
    type: "expense"
  },
  {
    id: 8,
    date: "2023-07-05",
    description: "Gym Membership",
    amount: -49.99,
    suggestedCategory: "Health & Fitness",
    finalCategory: "Health & Fitness",
    confidence: 0.94,
    notes: "Monthly membership",
    type: "expense"
  },
  {
    id: 9,
    date: "2023-07-03",
    description: "Electric Bill",
    amount: -87.45,
    suggestedCategory: "Utilities",
    finalCategory: "Utilities",
    confidence: 0.97,
    notes: "",
    type: "expense"
  },
  {
    id: 10,
    date: "2023-07-01",
    description: "Freelance Payment",
    amount: 350.00,
    suggestedCategory: "Income",
    finalCategory: "Income",
    confidence: 0.93,
    notes: "Design project",
    type: "income"
  }
];

export const categories = [
  "Shopping", "Food & Drink", "Income", "Transportation", "Entertainment", 
  "Transfer", "Groceries", "Health & Fitness", "Utilities", "Housing", 
  "Travel", "Education", "Business", "Personal Care", "Gifts & Donations", "Other"
];
