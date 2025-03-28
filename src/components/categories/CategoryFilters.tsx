
import { Search, Filter, Check } from "lucide-react";
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

interface CategoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeType: string | null;
  setActiveType: (type: string | null) => void;
}

export const CategoryFilters = ({
  searchTerm,
  setSearchTerm,
  activeType,
  setActiveType,
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          className="pl-8 max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Type</span>
            {activeType && (
              <Badge variant="secondary" className="ml-1">
                {activeType}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setActiveType(null)}
          >
            <Check className={`mr-2 h-4 w-4 ${activeType === null ? "opacity-100" : "opacity-0"}`} />
            All Types
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setActiveType("expense")}
          >
            <Check className={`mr-2 h-4 w-4 ${activeType === "expense" ? "opacity-100" : "opacity-0"}`} />
            Expense
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setActiveType("income")}
          >
            <Check className={`mr-2 h-4 w-4 ${activeType === "income" ? "opacity-100" : "opacity-0"}`} />
            Income
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setActiveType("transfer")}
          >
            <Check className={`mr-2 h-4 w-4 ${activeType === "transfer" ? "opacity-100" : "opacity-0"}`} />
            Transfer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
