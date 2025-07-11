"use client";
import { Github, LayoutDashboard, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar className="hidden md:flex ">
        {" "}
        {/* Hidden on small screens */}
        <SidebarHeader className="px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              aria-hidden
              src="https://alaainvest.com/frontend/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="h-20 w-auto object-contain"
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href} className="mt-2">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex items-center justify-center p-2">
          <span className="text-xs text-gray-500">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>

      {/* Main content area */}
      <SidebarInset className="flex flex-col w-full">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-background px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="block md:hidden" />{" "}
            {/* Only show on small screens */}
            <span className="text-lg font-semibold sm:text-xl">Dashboard</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="https://github.com/Inish-Bashyal">
              <Button size="icon" variant="outline">
                <Github className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}
