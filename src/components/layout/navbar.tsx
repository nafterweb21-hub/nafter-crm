"use client"

import * as React from "react"
import Link from "next/link"
import {
    Bell,
    Search,
    Sparkles,
    Plus,
    ChevronDown,
    Moon,
    Sun,
    Settings,
    Users,
    CreditCard
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
    return (
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full">
            <div className="flex items-center h-full px-6 gap-4">

                {/* Workspace Selector */}
                <div className="flex items-center gap-2 mr-4">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
                        N
                    </div>
                    <div className="hidden md:flex flex-col">
                        <span className="text-sm font-semibold leading-tight">Nafter Web</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Pro Workspace</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search leads, chats, or reports..."
                        className="pl-10 h-9 bg-muted/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all rounded-full"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    {/* AI Assistant Button */}
                    <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 rounded-full h-9">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">AI Insights</span>
                    </Button>

                    {/* New Chat Button */}
                    <Link href="/campaigns">
                        <Button size="sm" className="h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">New Broadcast</span>
                        </Button>
                    </Link>

                    <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                    {/* Notifications */}
                    <div className="relative">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px] border-background animate-pulse">
                                4
                            </Badge>
                        </Button>
                    </div>

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="relative h-9 rounded-full flex items-center gap-2 pl-1 pr-2 hover:bg-muted cursor-pointer">
                                <Avatar className="h-7 w-7 border">
                                    <AvatarImage src="/avatars/user.png" alt="Imran" />
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">IK</AvatarFallback>
                                </Avatar>
                                <div className="hidden md:flex flex-col items-start mr-1">
                                    <span className="text-xs font-semibold leading-none">Imran Khan</span>
                                    <span className="text-[9px] text-muted-foreground leading-none mt-1">Admin</span>
                                </div>
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-border/50">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Imran Khan</p>
                                    <p className="text-xs leading-none text-muted-foreground">imran@nafter.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                <Settings className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span>Account Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span>Team Management</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span>Billing</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 text-destructive focus:bg-destructive/10 focus:text-destructive">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
