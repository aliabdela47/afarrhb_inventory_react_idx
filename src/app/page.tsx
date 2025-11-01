

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
  Legend,
  Cell,
} from "recharts";
import { inventorySummaryChartData, inventoryItems, vehicles, model19Receipts } from "@/lib/data";
import { Package, Truck, AlertTriangle, FileText, Bell, CheckCircle } from "lucide-react";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const GlassCard = ({ children, className, ...props }: React.ComponentProps<typeof Card>) => (
  <Card
    className={`
      border-border/20 bg-card/60 shadow-lg backdrop-blur-xl transition-all
      hover:-translate-y-1 hover:shadow-2xl dark:bg-card/40
      ${className}
    `}
    {...props}
  >
    {children}
  </Card>
);

export default function DashboardPage() {
  const expiringSoonCount = inventoryItems.filter(item => item.status === 'Expiring Soon').length;
  const vehiclesOnRouteCount = vehicles.filter(v => v.status === 'On Route').length;
  const pendingReceiptsCount = model19Receipts.filter(r => r.status === 'Pending').length;
  const lowStockCount = inventoryItems.filter(item => item.quantity < 100).length;
  const availableVehicles = vehicles.filter(v => v.status === 'Idle').length;

  const chartConfig = {
    total: {
      label: "Total Items",
    },
    colors: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
  };

  return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{inventoryItems.length}</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </GlassCard>
           <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{lowStockCount}</div>
               <p className="text-xs text-muted-foreground">
                Items with low quantity
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{pendingReceiptsCount}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </CardContent>
          </GlassCard>
           <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Recent Issuances</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">42</div>
               <p className="text-xs text-muted-foreground">
                In the last 7 days
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{availableVehicles}</div>
              <p className="text-xs text-muted-foreground">
                Ready for assignment
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Vehicles on Field</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{vehiclesOnRouteCount}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{expiringSoonCount}</div>
              <p className="text-xs text-muted-foreground">
                Within next 30 days
              </p>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                3 unread
              </p>
            </CardContent>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 gap-6">
           <GlassCard>
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
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                     <Tooltip
                      cursor={{ fill: "hsl(var(--primary) / 0.1)", radius: "4px" }}
                      content={<ChartTooltipContent 
                        className="bg-background/80 backdrop-blur-md border-border/20" 
                        indicator="dot"
                        />}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                       {inventorySummaryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartConfig.colors[index % chartConfig.colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </GlassCard>
        </div>
      </div>
  );
}
