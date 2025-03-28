import { useState } from "react";
import { toast } from "sonner";
import { FolderPlus, HelpCircle, Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/categories";
import { RulesExplanationModal } from "./RulesExplanationModal";

interface NewCategoryDialogProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const NewCategoryDialog = ({ categories, setCategories }: NewCategoryDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id" | "transactionCount">>({
    name: "",
    type: "expense",
    subcategories: [],
    color: "#6E56CF",
    rules: [],
  });
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newRule, setNewRule] = useState("");
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() === "") return;
    
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, newSubcategory.trim()]
    });
    setNewSubcategory("");
  };
  
  const handleRemoveSubcategory = (index: number) => {
    setNewCategory({
      ...newCategory,
      subcategories: newCategory.subcategories.filter((_, i) => i !== index)
    });
  };
  
  const handleAddRule = () => {
    if (newRule.trim() === "") return;
    
    setNewCategory({
      ...newCategory,
      rules: [...newCategory.rules, newRule.trim()]
    });
    setNewRule("");
  };
  
  const handleRemoveRule = (index: number) => {
    setNewCategory({
      ...newCategory,
      rules: newCategory.rules.filter((_, i) => i !== index)
    });
  };

  const handleCreateCategory = () => {
    if (newCategory.name.trim() === "") {
      toast.error("Category name is required");
      return;
    }
    
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    
    setCategories([
      ...categories,
      {
        ...newCategory,
        id: newId,
        transactionCount: 0,
      } as Category
    ]);
    
    toast.success("Category created", {
      description: `${newCategory.name} has been successfully created.`
    });
    
    setNewCategory({
      name: "",
      type: "expense",
      subcategories: [],
      color: "#6E56CF",
      rules: [],
    });
    setShowDialog(false);
  };
  
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category for organizing your transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="e.g., Transportation"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Type</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newCategory.type === "expense" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewCategory({ ...newCategory, type: "expense" })}
                  className="flex-1"
                >
                  Expense
                </Button>
                <Button
                  type="button"
                  variant={newCategory.type === "income" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewCategory({ ...newCategory, type: "income" })}
                  className="flex-1"
                >
                  Income
                </Button>
                <Button
                  type="button"
                  variant={newCategory.type === "transfer" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewCategory({ ...newCategory, type: "transfer" })}
                  className="flex-1"
                >
                  Transfer
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <div className="flex gap-2">
                {["#6E56CF", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-6 h-6 rounded-full border ${
                      newCategory.color === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewCategory({ ...newCategory, color: color })}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Subcategories</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        Subcategories help you organize transactions within a category.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="e.g., Groceries"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleAddSubcategory()}
                />
                <Button type="button" size="sm" onClick={handleAddSubcategory}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newCategory.subcategories.map((subcat, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1">
                    {subcat}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => handleRemoveSubcategory(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {newCategory.subcategories.length === 0 && (
                  <span className="text-xs text-muted-foreground italic">
                    No subcategories added
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Auto-categorization Rules</label>
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Keywords that will automatically assign transactions to this category.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full" 
                    onClick={() => setRulesModalOpen(true)}
                  >
                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="e.g., Uber"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleAddRule()}
                />
                <Button type="button" size="sm" onClick={handleAddRule}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newCategory.rules.map((rule, index) => (
                  <Badge key={index} variant="outline" className="px-2 py-1">
                    {rule}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => handleRemoveRule(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {newCategory.rules.length === 0 && (
                  <span className="text-xs text-muted-foreground italic">
                    No rules added
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <RulesExplanationModal open={rulesModalOpen} setOpen={setRulesModalOpen} />
    </>
  );
};
