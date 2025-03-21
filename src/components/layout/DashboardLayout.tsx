"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  BarChartIcon,
  Bell,
  Home,
  ListTodo,
  Package2,
  Settings,
  Tag,
  WrenchIcon,
  Users,
  Search,
  Menu
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full transition-all bg-white border-r shadow-sm dark:bg-zinc-900 dark:border-zinc-800 ${
          isSidebarCollapsed ? "w-[70px]" : "w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b dark:border-zinc-800">
          <Link href="/" className="flex items-center">
            {isSidebarCollapsed ? (
              <div className="w-8 h-8">
                <img
                  src="https://ext.same-assets.com/1819920583/1700888278.svg+xml"
                  alt="AssetTiger Logo"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="h-8">
                <img
                  src="https://ext.same-assets.com/1819920583/1700888278.svg+xml"
                  alt="AssetTiger Logo"
                  className="h-full"
                />
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Company info */}
        <div className={`flex items-center p-4 border-b dark:border-zinc-800 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt="Company" />
            <AvatarFallback className="bg-green-100 text-green-800">VL</AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Veritas Labs</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">My Organization</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          <NavItem icon={<Home className="h-5 w-5" />} label="Dashboard" href="/dashboard" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<Bell className="h-5 w-5" />} label="Alerts" href="/alerts" isCollapsed={isSidebarCollapsed} isActive badgeCount={2} />
          <NavItem icon={<Package2 className="h-5 w-5" />} label="Assets" href="/assets" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<BarChartIcon className="h-5 w-5" />} label="Reports" href="/reports" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<WrenchIcon className="h-5 w-5" />} label="Tools" href="/tools" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Advanced" href="/advanced" isCollapsed={isSidebarCollapsed} />

          {/* Expanded/Collapsed divider */}
          <div className={`h-[1px] bg-zinc-200 dark:bg-zinc-800 my-2 ${isSidebarCollapsed ? 'mx-2' : 'mx-1'}`} />

          <NavItem icon={<Users className="h-5 w-5" />} label="Groups" href="/groups" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Setup" href="/setup" isCollapsed={isSidebarCollapsed} />
          <NavItem icon={<Tag className="h-5 w-5" />} label="Order Asset Tags" href="/order-tags" isCollapsed={isSidebarCollapsed} />
        </nav>

        {/* Mobile app promotion */}
        {!isSidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex gap-2 justify-center">
              <Link href="#">
                <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Get it on Google Play" className="h-8" />
              </Link>
              <Link href="#">
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="Download on the App Store" className="h-8" />
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className={`flex flex-col flex-1 transition-all ${isSidebarCollapsed ? "ml-[70px]" : "ml-[240px]"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-white dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex-1 flex">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <Input
                type="search"
                placeholder="Search Assets..."
                className="pl-8 bg-zinc-100 dark:bg-zinc-800 border-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">List of Assets</Button>
            <Button variant="outline" size="sm">Add an Asset</Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="bg-purple-200 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-4 py-1.5 rounded-md text-sm">
              User Reviews
            </div>
            <div className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-sm">
              Buy Asset Tags
            </div>
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-purple-100 text-purple-800">DM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isCollapsed: boolean;
  isActive?: boolean;
  badgeCount?: number;
}

function NavItem({ icon, label, href, isCollapsed, isActive, badgeCount }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-md text-sm group ${
        isActive
          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      <div className={`${isCollapsed ? 'mx-auto' : ''}`}>
        {icon}
      </div>
      {!isCollapsed && <span className="ml-3">{label}</span>}
      {!isCollapsed && badgeCount && (
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {badgeCount}
        </div>
      )}
      {isCollapsed && badgeCount && (
        <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
      )}
    </Link>
  );
}
