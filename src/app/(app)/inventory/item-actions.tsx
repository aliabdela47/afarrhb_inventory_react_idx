"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Lightbulb, Loader2, MoreHorizontal } from "lucide-react";
import { suggestActionForItemExpiration, type SuggestActionForItemExpirationOutput } from "@/ai/flows/suggest-action-for-item-expiration";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ItemActionsProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    expirationDate: string;
  };
}

export function ItemActions({ item }: ItemActionsProps) {
  const [suggestion, setSuggestion] = useState<SuggestActionForItemExpirationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSuggestAction = async () => {
    setIsLoading(true);
    setPopoverOpen(true);
    try {
      const daysUntilExpiration = Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      const result = await suggestActionForItemExpiration({
        itemName: item.name,
        daysUntilExpiration: daysUntilExpiration > 0 ? daysUntilExpiration : 0,
        quantity: item.quantity,
        storageConditions: "Standard warehouse conditions",
        userConfigurableCriteria: "Prioritize donation for items with more than 7 days of shelf life remaining, otherwise dispose.",
      });
      setSuggestion(result);
    } catch (error) {
      console.error("Failed to get suggestion:", error);
      setSuggestion({ suggestedAction: "Error", reasoning: "Could not fetch suggestion." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSuggestAction}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
            <span className="sr-only">Suggest Action</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">AI Suggested Action</h4>
              <p className="text-sm text-muted-foreground">
                For item: {item.name}
              </p>
            </div>
            {isLoading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating suggestion...</span>
              </div>
            )}
            {suggestion && !isLoading && (
              <div className="grid gap-2">
                <div className="font-bold">{suggestion.suggestedAction}</div>
                <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View History</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
