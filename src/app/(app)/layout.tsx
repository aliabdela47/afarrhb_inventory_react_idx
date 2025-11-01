"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Settings,
  Truck,
  UserCircle,
  Users,
  Warehouse,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: ClipboardList },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/warehouses", label: "Warehouses", icon: Warehouse },
  { href: "/requests", label: "Requests", icon: FileText },
  { href: "/issuances", label: "Issuances", icon: FileText },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/directorates", label: "Directorates", icon: Home },
  { href: "/receipts", label: "Model 19 Receipts", icon: FileText },
  { href: "/vehicles", label: "Vehicles", icon: Truck },
  { href: "/tracking", label: "Vehicle Tracking", icon: Truck },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: "3" },
  { href: "/audit-logs", label: "Audit Logs", icon: Archive },
];

function AppHeader() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const currentPage = navItems.find((item) => pathname.startsWith(item.href) && item.href !== "/") || navItems.find(item => item.href === "/");

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 backdrop-blur-sm">
      {isMobile && <SidebarTrigger />}
      <h1 className="text-lg font-semibold md:text-xl">
        {currentPage?.label || "AfarRHB Inventory Pro"}
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl}
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <svg
                  className="h-8 w-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span className="text-xl font-bold font-headline">AfarRHB Pro</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === "/" ? pathname === item.href : pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                 <Avatar className="h-8 w-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">jane.doe@afarrhb.org</p>
                </div>
                <ChevronDown className="ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
