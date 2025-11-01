"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Lightbulb, Loader2, MoreHorizontal } from "lucide-react";
import { suggestActionForItemExpiration, type SuggestActionForItemExpirationOutput } from "@/ai/flows/suggest-action-for-item-expiration";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
  const router = useRouter();

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

  const handleEdit = () => {
    router.push(`/inventory/${item.id}/edit`);
  }

  const handleDelete = () => {
    console.log(`Deleting item ${item.id}`);
    // Here you would typically call an API to delete the item
  }

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
          <DropdownMenuItem onSelect={() => router.push(`/inventory/${item.id}`)}>View Details</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  item and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
