
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, GitBranchPlus, ScanSearch, Tag, Zap } from "lucide-react";

interface RulesExplanationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RulesExplanationModal = ({
  open,
  setOpen,
}: RulesExplanationModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Understanding Auto-categorization Rules
          </AlertDialogTitle>
          <AlertDialogDescription>
            Rules automatically categorize your transactions based on keywords
            found in transaction descriptions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <ScanSearch className="h-5 w-5 text-primary" />
              How Rules Work
            </h3>
            <p className="text-sm text-muted-foreground">
              When new transactions are imported, the system scans each
              transaction description for keywords that match your rules. If a
              match is found, the transaction is automatically assigned to the
              corresponding category.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Creating Effective Rules
            </h3>
            <p className="text-sm text-muted-foreground">
              Add common words or phrases that appear in transaction
              descriptions. For example:
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
              <li>
                For a "Food" category: <span className="font-medium">restaurant, cafe, doordash, uber eats</span>
              </li>
              <li>
                For "Transportation": <span className="font-medium">gas, uber, lyft, transit</span>
              </li>
              <li>
                For "Bills": <span className="font-medium">electricity, water, internet, insurance</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Benefits
            </h3>
            <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Save time on manual categorization</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Ensure consistent categorization</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Personalize to your spending patterns</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Reduce financial management effort</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <GitBranchPlus className="h-5 w-5 text-primary" />
              Pro Tips
            </h3>
            <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
              <li>
                Use specific merchant names for more accurate categorization
              </li>
              <li>
                Rules are not case sensitive - "netflix" will match "Netflix"
              </li>
              <li>
                Add multiple rules to catch variations in transaction descriptions
              </li>
              <li>
                Review and refine your rules periodically based on any miscategorized transactions
              </li>
            </ul>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
