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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    LineChart,
    TrendingUp,
    Zap,
    Target,
    ArrowUpRight,
    Search as SearchIcon,
    Loader2
} from "lucide-react"

export function Navbar() {
    const [open, setOpen] = React.useState(false)
    const [isAIInsightsOpen, setIsAIInsightsOpen] = React.useState(false)
    const [isAILoading, setIsAILoading] = React.useState(false)
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

    const handleOpenAIInsights = () => {
        setIsAIInsightsOpen(true)
        setIsAILoading(true)
        setTimeout(() => setIsAILoading(false), 1500)
    }

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
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenAIInsights}
                        className="hidden lg:flex items-center gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 rounded-full h-9 transition-all active:scale-95 group"
                    >
                        <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-medium">AI Insights</span>
                    </Button>

                    <Dialog open={isAIInsightsOpen} onOpenChange={setIsAIInsightsOpen}>
                        <DialogContent className="sm:max-w-[550px] rounded-[2rem] border-border/50 bg-white/95 backdrop-blur-2xl p-0 overflow-hidden shadow-2xl">
                            {isAILoading ? (
                                <div className="p-20 flex flex-col items-center justify-center space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                        <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-black tracking-tight">Analyzing Pipeline...</h3>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Generating AI Insights</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <div className="bg-primary/5 p-8 pb-10 border-b border-primary/10 relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <Badge variant="outline" className="h-6 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-black tracking-widest uppercase">AI Intelligence</Badge>
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter mb-2">Morning Insights</h2>
                                        <p className="text-sm text-muted-foreground font-medium max-w-[300px]">We've identified 3 high-impact actions to grow your revenue today.</p>
                                    </div>

                                    <div className="p-8 space-y-8">
                                        {/* Key Metrics */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Closed Value</p>
                                                <p className="text-xl font-black tracking-tight">₹1.4M</p>
                                                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                                                    <TrendingUp className="w-3 h-3" /> +12%
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Efficiency</p>
                                                <p className="text-xl font-black tracking-tight">84%</p>
                                                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                                                    <ArrowUpRight className="w-3 h-3" /> +5%
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Lead Speed</p>
                                                <p className="text-xl font-black tracking-tight">2.1h</p>
                                                <div className="flex items-center gap-1 text-[10px] text-rose-500 font-bold">
                                                    <Zap className="w-3 h-3" /> -12m
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="opacity-50" />

                                        {/* Recommendations */}
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Smart Recommendations</h4>
                                            <div className="space-y-3">
                                                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer">
                                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                                                        <Target className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold tracking-tight">High Propensity Lead: John Doe</p>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">John from <span className="text-foreground font-semibold">Shopify Pro</span> has a 92% chance of closing if messaged in the next 30 mins.</p>
                                                    </div>
                                                </div>
                                                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                                                        <PieChart className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold tracking-tight">Marketing Opportunity</p>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">Leads from <span className="text-foreground font-semibold">Facebook Ads</span> are up by 40%. Consider increasing daily spend.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 pt-0 flex gap-3">
                                        <Button className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                                            Optimize Strategy
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsAIInsightsOpen(false)}
                                            className="px-6 h-12 rounded-2xl font-bold text-xs uppercase tracking-widest border-border/50"
                                        >
                                            Dismiss
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

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
