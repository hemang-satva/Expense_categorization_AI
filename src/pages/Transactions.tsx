
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Transaction } from "@/types/transactions";
import { transactionsData } from "@/data/transactionsData";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";

const Transactions = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setTimeout(() => {
      setTransactions(transactionsData);
      setIsLoaded(true);
    }, 300);
  }, []);

  const handleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.finalCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = activeFilters.length === 0 || 
        activeFilters.includes(transaction.type);
      
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortDirection === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Transactions</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              View and manage your categorized transactions
            </p>
          </div>
        </div>

        <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <CardTitle>Transaction List</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} transactions • 
                  ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)} net
                </CardDescription>
              </div>
              <TransactionFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
              />
            </div>
          </CardHeader>
          <CardContent>
            <TransactionTable 
              transactions={filteredTransactions}
              sortBy={sortBy}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Transactions;
