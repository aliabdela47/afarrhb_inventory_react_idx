
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { inventorySummaryChartData, inventoryItems, vehicles, model19Receipts } from "@/lib/data";
import { Package, Truck, AlertTriangle, FileText } from "lucide-react";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AppLayout from "./(app)/layout";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl border bg-card/60 p-6 shadow-lg backdrop-blur-xl dark:bg-card/40 ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const expiringSoonCount = inventoryItems.filter(item => item.status === 'Expiring Soon').length;
  const vehiclesOnRouteCount = vehicles.filter(v => v.status === 'On Route').length;
  const pendingReceiptsCount = model19Receipts.filter(r => r.status === 'Pending').length;

  const chartConfig = {
    total: {
      label: "Total Items",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold">{inventoryItems.length}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold">{expiringSoonCount}</div>
              <p className="text-xs text-muted-foreground">
                Items within 30 days of expiration
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
              <CardTitle className="text-sm font-medium">Vehicles on Route</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold">{vehiclesOnRouteCount}</div>
              <p className="text-xs text-muted-foreground">
                Currently active deliveries
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold">{pendingReceiptsCount}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </CardContent>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-6">
           <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
              <CardDescription>
                Total items in inventory over the past 7 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventorySummaryChartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis
                      dataKey="month"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                     <Tooltip
                      cursor={{ fill: "hsl(var(--accent))", opacity: 0.5 }}
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
