"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Brain,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Settings,
  Split,
  Users,
  Zap,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Pipeline", href: "/pipeline", icon: Split },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Automation", href: "/automation", icon: Zap },
  { name: "AI Brain", href: "/ai-brain", icon: Brain },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground w-64 transition-all duration-300 ease-in-out lg:translate-x-0 -translate-x-full fixed lg:relative z-40">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <span className="font-bold text-xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Nafter CRM
        </span>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-border/50"
                    : "text-sidebar-foreground/60"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  pathname === item.href ? "text-primary" : "text-sidebar-foreground/40 group-hover:text-primary"
                )} />
                {item.name}
                {pathname === item.href && (
                  <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                )}
              </span>
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="p-4 border-t mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/10 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Current Plan</p>
            <p className="text-sm font-bold mb-2">Starter Plan</p>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-xs">
              Upgrade Now
            </Button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
        </div>
      </div>
    </div>
  )
}
