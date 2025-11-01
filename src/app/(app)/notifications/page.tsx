"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, Send } from "lucide-react";
import { expiringItemNotifications, type ExpiringItemNotificationsOutput } from "@/ai/flows/expiring-item-notifications";
import { inventoryItems } from "@/lib/data";

export default function NotificationsPage() {
  const [threshold, setThreshold] = useState(30);
  const [includeProgramHeads, setIncludeProgramHeads] = useState(true);
  const [includeDirector, setIncludeDirector] = useState(false);
  const [notifications, setNotifications] = useState<ExpiringItemNotificationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateNotifications = async () => {
    setIsLoading(true);
    setNotifications(null);
    try {
      const expiringItems = inventoryItems
        .map(item => ({
            itemId: item.id,
            itemName: item.name,
            expirationDate: item.expirationDate,
            quantity: item.quantity,
        }));
      
      const result = await expiringItemNotifications({
        items: expiringItems,
        notificationThresholdDays: threshold,
        policy: {
          includeProgramHeads,
          includeDirector,
        },
      });
      setNotifications(result);
    } catch (error) {
      console.error("Failed to generate notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Expiring Items Notifications</CardTitle>
          <CardDescription>
            Configure and run the notification job to alert personnel about expiring items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="threshold">Notification Threshold (Days)</Label>
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              placeholder="e.g., 30"
            />
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Notification Policy</h4>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="program-heads">Include Program Heads</Label>
              <Switch
                id="program-heads"
                checked={includeProgramHeads}
                onCheckedChange={setIncludeProgramHeads}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="director">Include Director</Label>
              <Switch
                id="director"
                checked={includeDirector}
                onCheckedChange={setIncludeDirector}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateNotifications} disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Generate & Send Notifications
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Generated Notifications</CardTitle>
          <CardDescription>
            The following notifications will be sent based on your configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {notifications && notifications.notifications.length > 0 && (
            notifications.notifications.map((notif, index) => (
              <div key={index} className="p-4 border rounded-lg bg-secondary/50">
                <p className="font-semibold text-sm mb-1">Item: {notif.itemId}</p>
                <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                <div className="text-xs">
                  <span className="font-medium">Recipients:</span> {notif.recipients.join(', ')}
                </div>
              </div>
            ))
          )}
          {notifications && notifications.notifications.length === 0 && !isLoading && (
            <div className="text-center text-muted-foreground p-8">
              No notifications generated for the current criteria.
            </div>
          )}
          {!notifications && !isLoading && (
             <div className="text-center text-muted-foreground p-8">
              Run the generator to see notification previews.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
