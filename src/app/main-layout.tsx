"use client";
import { Github, Home, LayoutDashboard, LucideIcon } from "lucide-react";
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
    <div className="flex h-screen overflow-hidden w-full">
      <Sidebar>
        <SidebarHeader className="px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Home className="h-6 w-6" /> */}
            <Image
              aria-hidden
              src={"https://alaainvest.com/frontend/logo.svg"}
              alt="File icon"
              width={100}
              height={100}
              className="h-30 w-30"
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
        <SidebarFooter className="flex items-center flex-row gap-2">
          <span className="text-xs text-gray-500">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1 flex items-center justify-end gap-4">
              <ThemeToggle />{" "}
              <Link href="https://github.com/Inish-Bashyal">
                <Button size="icon" variant="outline">
                  <Github className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </SidebarInset>
    </div>
  );
}
