
import React from 'react';
import { Search, Filter, Check, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilters,
  toggleFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-8 max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Transaction Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleFilter("income")}
          >
            <div className="w-4 flex justify-center">
              {activeFilters.includes("income") && <Check className="h-4 w-4" />}
            </div>
            <ArrowUpRight className="h-4 w-4 text-income" />
            <span>Income</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleFilter("expense")}
          >
            <div className="w-4 flex justify-center">
              {activeFilters.includes("expense") && <Check className="h-4 w-4" />}
            </div>
            <ArrowDownRight className="h-4 w-4 text-expense" />
            <span>Expenses</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleFilter("transfer")}
          >
            <div className="w-4 flex justify-center">
              {activeFilters.includes("transfer") && <Check className="h-4 w-4" />}
            </div>
            <ArrowLeftRight className="h-4 w-4 text-transfer" />
            <span>Transfers</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionFilters;
