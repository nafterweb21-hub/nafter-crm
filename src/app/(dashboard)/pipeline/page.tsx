"use client"

import * as React from "react"
import {
    Plus,
    MoreVertical,
    IndianRupee,
    Clock,
    Calendar,
    Filter,
    Search,
    LayoutGrid,
    List,
    ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const initialData = [
    {
        title: "New Lead",
        deals: [
            { id: 1, title: "Shopify Pro Setup", contact: "John Doe", value: "₹25,000", agent: "Imran", time: "2h ago", priority: "Hot" },
            { id: 2, title: "Website Redesign", contact: "Sarah Smith", value: "₹45,000", agent: "Salman", time: "5h ago", priority: "Warm" },
            { id: 3, title: "E-commerce Launch", contact: "Alex Johnson", value: "₹1,20,000", agent: "Unassigned", time: "1d ago", priority: "Cold" },
        ]
    },
    {
        title: "Qualified",
        deals: [
            { id: 4, title: "Custom Shopify App", contact: "Maria Garcia", value: "₹65,000", agent: "Ayesha", time: "3h ago", priority: "Hot" },
        ]
    },
    {
        title: "Demo Scheduled",
        deals: [
            { id: 5, title: "Portfolio Website", contact: "David Miller", value: "₹15,000", agent: "Imran", time: "1h ago", priority: "Hot" },
        ]
    },
    {
        title: "Proposal Sent",
        deals: [
            { id: 6, title: "Enterprise Solution", contact: "Jessica Lee", value: "₹4,50,000", agent: "Zaid", time: "10m ago", priority: "Hot" },
        ]
    },
    {
        title: "Closed Won",
        deals: [
            { id: 7, title: "Basic Store", contact: "Mike Ross", value: "₹10,000", agent: "Imran", time: "2d ago", priority: "Cold" },
        ]
    },
]

export default function PipelinePage() {
    return (
        <div className="p-6 h-[calc(100vh-64px)] overflow-hidden flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
                    <p className="text-muted-foreground text-sm">Visual deal tracker for your sales team.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-muted p-1 rounded-lg mr-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-background shadow-sm rounded-md">
                            <LayoutGrid className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground rounded-md">
                            <List className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="h-9 gap-2 bg-primary shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        Add Deal
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar">
                <div className="flex h-full gap-4 min-w-max">
                    {initialData.map((column, idx) => (
                        <div key={column.title} className="w-80 flex flex-col h-full group">
                            {/* Column Header */}
                            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-foreground/80">{column.title}</h3>
                                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-muted/50 text-muted-foreground border-none">
                                        {column.deals.length}
                                    </Badge>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 no-scrollbar bg-muted/20 rounded-2xl p-2 border border-transparent group-hover:border-border/50 transition-colors">
                                {column.deals.map((deal) => (
                                    <Card key={deal.id} className="border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 cursor-grab active:cursor-grabbing transition-all duration-300 bg-background/50 backdrop-blur">
                                        <CardContent className="p-4 space-y-4">

                                            {/* Card Top */}
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-sm leading-tight tracking-tight group-hover:text-primary transition-colors">{deal.title}</h4>
                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{deal.contact}</p>
                                                </div>
                                                <MoreVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0 cursor-pointer" />
                                            </div>

                                            {/* Card Middle */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 text-primary">
                                                    <IndianRupee className="w-3.5 h-3.5 font-bold" />
                                                    <span className="text-sm font-black">{deal.value}</span>
                                                </div>
                                                <Badge className={cn(
                                                    "text-[9px] font-black h-4 px-1.5 border-none",
                                                    deal.priority === "Hot" ? "bg-rose-500/10 text-rose-600" :
                                                        deal.priority === "Warm" ? "bg-orange-500/10 text-orange-600" :
                                                            "bg-blue-500/10 text-blue-600"
                                                )}>
                                                    {deal.priority}
                                                </Badge>
                                            </div>

                                            {/* Card Bottom */}
                                            <div className="flex items-center justify-between pt-3 border-t border-border/40">
                                                <div className="flex items-center gap-1.5">
                                                    <Avatar className="h-5 w-5 border border-background ring-1 ring-border/20">
                                                        <AvatarImage src={`https://avatar.vercel.sh/${deal.agent}.png`} />
                                                        <AvatarFallback className="text-[8px] bg-primary/10 text-primary">{deal.agent[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[10px] font-semibold text-muted-foreground">{deal.agent}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-muted-foreground/60">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[9px] font-medium">{deal.time}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Empty State / Add Card Placeholder */}
                                <button className="py-3 items-center justify-center flex gap-2 text-muted-foreground/40 hover:text-primary/60 hover:bg-primary/5 rounded-xl border border-dashed border-muted-foreground/20 transition-all text-xs font-semibold">
                                    <Plus className="w-3.5 h-3.5" />
                                    Drop deal here
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add New Column Button */}
                    <div className="w-80 flex flex-col h-full bg-muted/10 rounded-2xl border border-dashed items-center justify-center group hover:bg-muted/20 transition-all cursor-pointer">
                        <div className="p-3 rounded-full bg-background/50 border shadow-sm group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-muted-foreground/60 group-hover:text-primary" />
                        </div>
                        <p className="text-xs font-bold text-muted-foreground/60 transition-colors mt-4">Add Stage</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
