
import React, { useState } from 'react';
import { Transaction } from '@/types/transactions';
import { categories } from '@/data/transactionsData';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  ChevronDown,
  PencilLine,
  Save,
  X,
  Check,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
} from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  sortBy: "date" | "amount";
  sortDirection: "asc" | "desc";
  handleSort: (column: "date" | "amount") => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  sortBy,
  sortDirection,
  handleSort
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedNotes, setEditedNotes] = useState("");

  const startEditing = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditedCategory(transaction.finalCategory);
    setEditedNotes(transaction.notes);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedCategory("");
    setEditedNotes("");
  };

  const saveEditing = (id: number) => {
    // Since we can't modify the actual transactions data in this refactor,
    // we'll just show the toast notification as the original code did
    
    toast.success("Transaction updated", {
      description: "Category and notes have been updated."
    });

    const transaction = transactions.find(t => t.id === id);
    if (transaction && editedCategory !== transaction.suggestedCategory) {
      toast("Apply to similar transactions?", {
        action: {
          label: "Apply",
          onClick: () => {
            toast.success("Category applied to similar transactions");
          }
        },
        cancel: {
          label: "No thanks",
          onClick: () => {}
        }
      });
    }
    
    setEditingId(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowUpRight className="h-4 w-4 text-income" />;
      case "expense":
        return <ArrowDownRight className="h-4 w-4 text-expense" />;
      case "transfer":
        return <ArrowLeftRight className="h-4 w-4 text-transfer" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead 
              className="cursor-pointer hover:text-foreground" 
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortBy === "date" && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead 
              className="cursor-pointer hover:text-foreground text-right"
              onClick={() => handleSort("amount")}
            >
              <div className="flex items-center justify-end">
                Amount
                {sortBy === "amount" && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead>AI Category</TableHead>
            <TableHead>Final Category</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No transactions found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="group">
                <TableCell>
                  <div className="w-6 flex justify-center">
                    {getTypeIcon(transaction.type)}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.amount > 0 
                    ? "text-income" 
                    : transaction.type === "transfer"
                      ? "text-transfer"
                      : "text-expense"
                }`}>
                  {transaction.amount > 0 ? "+" : ""}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span>{transaction.suggestedCategory}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-normal ${
                        transaction.confidence >= 0.9 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : transaction.confidence >= 0.7
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {Math.round(transaction.confidence * 100)}%
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {editingId === transaction.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full justify-between"
                        >
                          {editedCategory}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categories.map((category) => (
                          <DropdownMenuItem 
                            key={category}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setEditedCategory(category)}
                          >
                            <div className="w-4 flex justify-center">
                              {editedCategory === category && <Check className="h-4 w-4" />}
                            </div>
                            <span>{category}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span>{transaction.finalCategory}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === transaction.id ? (
                    <Input
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      placeholder="Add notes..."
                      className="h-8"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {transaction.notes || "—"}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === transaction.id ? (
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => saveEditing(transaction.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditing(transaction)}
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
