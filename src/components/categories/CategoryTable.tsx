
import { useState } from "react";
import { toast } from "sonner";
import { 
  Edit, Trash2, MoreHorizontal, Check, X, 
  PencilLine, Save, ChevronDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/categories";

interface CategoryTableProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  filteredCategories: Category[];
}

export const CategoryTable = ({ 
  categories, 
  setCategories, 
  filteredCategories 
}: CategoryTableProps) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const startEditing = (category: Category) => {
    setEditingCategory({ ...category });
  };
  
  const cancelEditing = () => {
    setEditingCategory(null);
  };
  
  const saveEditing = () => {
    if (!editingCategory) return;
    
    setCategories(categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    ));
    
    toast.success("Category updated", {
      description: `${editingCategory.name} has been successfully updated.`
    });
    
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category && category.transactionCount > 0) {
      toast.error("Cannot delete category with transactions", {
        description: `This category has ${category.transactionCount} transactions. Reassign them first.`
      });
      return;
    }
    
    setCategories(categories.filter(category => category.id !== id));
    toast.success("Category deleted", {
      description: "The category has been successfully deleted."
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subcategories</TableHead>
            <TableHead>Rules</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No categories found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          ) : (
            filteredCategories.map((category) => (
              <TableRow key={category.id} className="group">
                <TableCell>
                  {editingCategory?.id === category.id ? (
                    <Input 
                      value={editingCategory.name} 
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                      className="h-8"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingCategory?.id === category.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          {editingCategory.type}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditingCategory({...editingCategory, type: "expense"})}>
                          Expense
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingCategory({...editingCategory, type: "income"})}>
                          Income
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingCategory({...editingCategory, type: "transfer"})}>
                          Transfer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Badge variant="outline" className={
                      category.type === "expense" 
                        ? "bg-red-50 text-red-700 border-red-200" 
                        : category.type === "income"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                    }>
                      {category.type}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {category.subcategories.length > 0 ? (
                      <>
                        <Badge variant="secondary" className="text-xs">{category.subcategories[0]}</Badge>
                        {category.subcategories.length > 1 && (
                          <Badge variant="outline" className="text-xs">+{category.subcategories.length - 1}</Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {category.rules.length > 0 ? (
                      <>
                        <Badge variant="outline" className="text-xs">{category.rules[0]}</Badge>
                        {category.rules.length > 1 && (
                          <Badge variant="outline" className="text-xs">+{category.rules.length - 1}</Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {category.transactionCount}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {editingCategory?.id === category.id ? (
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={saveEditing}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => startEditing(category)}>
                          <PencilLine className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-destructive focus:text-destructive"
                          disabled={category.transactionCount > 0}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
