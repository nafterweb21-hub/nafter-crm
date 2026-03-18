"use client"

import * as React from "react"
import Link from "next/link"
import {
    Bell,
    Search,
    Sparkles,
    Plus,
    ChevronDown,
    CreditCard,
    LayoutDashboard,
    PieChart,
    Users2,
    MessageCircle,
    Megaphone,
    FileText,
    Settings,
    Users
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function Navbar() {
    const [open, setOpen] = React.useState(false)
    const [workspace, setWorkspace] = React.useState({
        name: "Nafter Web",
        plan: "Pro Workspace",
        icon: "N"
    })
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 w-full">
            <div className="flex items-center h-full px-6 gap-4">

                {/* Workspace Selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <div className="flex items-center gap-2 mr-4 hover:bg-muted/50 p-1.5 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-border/50">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm group-hover:scale-105 transition-transform">
                                {workspace.icon}
                            </div>
                            <div className="hidden md:flex flex-col">
                                <span className="text-sm font-bold leading-tight tracking-tight">{workspace.name}</span>
                                <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-0.5">{workspace.plan}</span>
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                        </div>
                    } />
                    <DropdownMenuContent align="start" className="w-64 mt-2 rounded-2xl border-border/50 bg-white/95 backdrop-blur-xl p-2 shadow-2xl">
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-1">Your Workspaces</DropdownMenuLabel>
                        <DropdownMenuGroup className="space-y-1">
                            <DropdownMenuItem
                                className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group"
                                onClick={() => {
                                    setWorkspace({ name: "Nafter Web", plan: "Pro Workspace", icon: "N" })
                                    toast.success("Switched to Nafter Web")
                                }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-primary/20">N</div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Nafter Web</span>
                                    <span className="text-[9px] text-muted-foreground font-medium">Pro Workspace · 12 Agents</span>
                                </div>
                                {workspace.name === "Nafter Web" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group"
                                onClick={() => {
                                    setWorkspace({ name: "ShieldCopters", plan: "Enterprise", icon: "S" })
                                    toast.success("Switched to ShieldCopters")
                                }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold text-xs group-hover:ring-2 ring-indigo-500/20 transition-all">S</div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">ShieldCopters</span>
                                    <span className="text-[9px] text-muted-foreground font-medium">Enterprise · 45 Agents</span>
                                </div>
                                {workspace.name === "ShieldCopters" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-2 bg-border/40" />
                        <DropdownMenuGroup className="space-y-1">
                            <DropdownMenuItem className="cursor-pointer rounded-xl p-2 gap-3 text-muted-foreground hover:text-primary transition-colors">
                                <Plus className="w-4 h-4" />
                                <span className="text-xs font-bold">Create New Workspace</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-xl p-2 gap-3 text-muted-foreground hover:text-primary transition-colors">
                                <Settings className="w-4 h-4" />
                                <span className="text-xs font-bold">Workspace Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Search */}
                <div
                    className="flex-1 max-w-md relative hidden sm:block cursor-pointer group"
                    onClick={() => setOpen(true)}
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="pl-10 h-9 bg-muted/50 hover:bg-muted/80 border-none transition-all rounded-full flex items-center text-sm text-muted-foreground font-medium w-full">
                        Search leads, chats, or reports...
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Quick Actions">
                            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/pipeline"))}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Sales Pipeline</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/campaigns"))}>
                                <Megaphone className="mr-2 h-4 w-4" />
                                <span>Marketing Campaigns</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/team"))}>
                                <Users2 className="mr-2 h-4 w-4" />
                                <span>Team Hub</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Recent Leads">
                            <CommandItem onSelect={() => runCommand(() => toast.info("Searching John Doe..."))}>
                                <Avatar className="h-4 w-4 mr-2">
                                    <AvatarImage src="https://avatar.vercel.sh/john.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span>John Doe - Shopify Setup</span>
                                <CommandShortcut>HOT</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => toast.info("Searching Sarah Smith..."))}>
                                <Avatar className="h-4 w-4 mr-2">
                                    <AvatarImage src="https://avatar.vercel.sh/sarah.png" />
                                    <AvatarFallback>SS</AvatarFallback>
                                </Avatar>
                                <span>Sarah Smith - Website Lead</span>
                                <CommandShortcut>WARM</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Account Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing & Plans</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>

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
                        <DropdownMenuTrigger render={
                            <div className="relative h-9 rounded-full flex items-center gap-2 pl-1 pr-2 hover:bg-muted cursor-pointer transition-colors">
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
                        } />
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-border/50">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Imran Khan</p>
                                        <p className="text-xs leading-none text-muted-foreground">imran@nafter.com</p>
                                    </div>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <Link href="/settings">
                                <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                    <Settings className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span>Account Settings</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/team">
                                <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                    <Users className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span>Team Management</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/settings">
                                <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 group">
                                    <CreditCard className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span>Billing</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <Link href="/auth/login" className="w-full">
                                <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 text-destructive focus:bg-destructive/10 focus:text-destructive">
                                    Log out
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
