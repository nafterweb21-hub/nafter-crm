"use client"

import * as React from "react"
import {
    Zap,
    Settings2,
    Trash2,
    MessageSquare,
    Clock,
    UserPlus,
    Split,
    CheckCircle2,
    MoreVertical,
    MousePointer2,
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Tag as TagIcon } from "lucide-react"

const blocks = [
    { id: 1, type: "trigger", name: "New Lead", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    { id: 2, type: "trigger", name: "WhatsApp Message", icon: MessageSquare, color: "text-emerald-500 bg-emerald-500/10" },
    { id: 7, type: "trigger", name: "Out of Office", icon: Clock, color: "text-rose-500 bg-rose-500/10" },
    { id: 3, type: "action", name: "Send Template", icon: MessageSquare, color: "text-blue-500 bg-blue-500/10" },
    { id: 4, type: "action", name: "Assign Agent", icon: UserPlus, color: "text-indigo-500 bg-indigo-500/10" },
    { id: 8, type: "action", name: "Add Tag", icon: TagIcon, color: "text-primary bg-primary/10" },
    { id: 5, type: "condition", name: "Wait / Delay", icon: Clock, color: "text-orange-500 bg-orange-500/10" },
    { id: 6, type: "condition", name: "Condition Split", icon: Split, color: "text-purple-500 bg-purple-500/10" },
    { id: 9, type: "condition", name: "Business Hours", icon: Clock, color: "text-muted-foreground bg-muted" },
]

export default function AutomationPage() {
    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">

            {/* Left Sidebar: Components */}
            <div className="w-72 border-r flex flex-col bg-sidebar/30">
                <div className="p-6 border-b">
                    <h2 className="font-bold text-lg mb-1 tracking-tight">Workflow Nodes</h2>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Drag nodes to the canvas</p>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input placeholder="Search nodes..." className="pl-9 h-8 text-[11px] bg-muted/50 border-none rounded-lg" />
                    </div>
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-2">Triggers</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {blocks.filter(b => b.type === "trigger").map(block => <NodeItem key={block.id} {...block} />)}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-2">Actions</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {blocks.filter(b => b.type === "action").map(block => <NodeItem key={block.id} {...block} />)}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-2">Conditions</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {blocks.filter(b => b.type === "condition").map(block => <NodeItem key={block.id} {...block} />)}
                            </div>
                        </section>
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/10">
                    <Button variant="outline" className="w-full h-9 text-[11px] font-bold uppercase tracking-widest gap-2 bg-background">
                        <Settings2 className="w-3.5 h-3.5" />
                        Global Config
                    </Button>
                </div>
            </div>

            {/* Main Canvas */}
            <div className="flex-1 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px]">
                {/* Canvas Toolbar */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <div className="bg-background/80 backdrop-blur border border-border/50 p-1.5 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/5">
                        <div className="flex items-center gap-2 px-3 mr-2 border-r">
                            <span className="text-xs font-black tracking-tight">Shopify Auto-Pilot</span>
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] h-4">Active</Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MousePointer2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Settings2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl bg-background shadow-lg shadow-black/5 font-bold text-xs uppercase tracking-wider border-border/50">Test Run</Button>
                        <Button
                            size="sm"
                            className="h-9 px-6 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-wider"
                            onClick={() => toast.success("Workflow Published!", {
                                description: "Your Shopify Auto-Pilot flow is now live."
                            })}
                        >
                            Publish Flow
                        </Button>
                    </div>
                </div>

                {/* Workflow visualization */}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 pb-20 overflow-auto no-scrollbar">

                    <WorkflowNode
                        title="When New Lead Arrives"
                        type="trigger"
                        icon={<Zap className="w-5 h-5" />}
                        color="bg-amber-500"
                    />
                    <Connector />
                    <WorkflowNode
                        title="Send 'Welcome Quote' Template"
                        type="action"
                        icon={<MessageSquare className="w-5 h-5" />}
                        color="bg-indigo-500"
                    />
                    <Connector />
                    <WorkflowNode
                        title="Wait for 15 Minutes"
                        type="condition"
                        icon={<Clock className="w-5 h-5" />}
                        color="bg-orange-500"
                    />
                    <Connector />
                    <div className="flex gap-20">
                        <div className="flex flex-col items-center">
                            <Connector vertical={false} alignment="left" />
                            <WorkflowNode
                                title="User Replied: YES"
                                type="condition"
                                icon={<CheckCircle2 className="w-5 h-5" />}
                                color="bg-emerald-500"
                                size="small"
                            />
                            <Connector />
                            <WorkflowNode
                                title="Assign to Sales Agent"
                                type="action"
                                icon={<UserPlus className="w-5 h-5" />}
                                color="bg-blue-500"
                            />
                        </div>
                        <div className="flex flex-col items-center opacity-40 grayscale-[0.5]">
                            <Connector vertical={false} alignment="right" />
                            <WorkflowNode
                                title="No Reply Captured"
                                type="condition"
                                icon={<Clock className="w-5 h-5" />}
                                color="bg-rose-500"
                                size="small"
                            />
                            <Connector />
                            <WorkflowNode
                                title="Send Follow-up Reminder"
                                type="action"
                                icon={<MessageSquare className="w-5 h-5" />}
                                color="bg-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NodeItem({ name, icon: Icon, color }: { name: string; icon: React.ElementType; color: string }) {
    return (
        <div className="p-3 bg-background border border-border/50 rounded-xl flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group">
            <div className={cn("p-2 rounded-lg shrink-0", color)}>
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold leading-none tracking-tight">{name}</span>
            <div className="ml-auto w-4 h-6 border-l flex flex-col justify-center gap-1 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
        </div>
    )
}

function WorkflowNode({ title, type, icon, color, size = "normal" }: {
    title: string;
    type: string;
    icon: React.ReactNode;
    color: string;
    size?: "normal" | "small";
}) {
    return (
        <div className={cn(
            "relative rounded-2xl bg-background border-2 border-border/50 shadow-2xl p-4 flex items-center gap-4 transition-all hover:scale-105 hover:border-primary/40 group overflow-hidden",
            size === "normal" ? "w-[280px]" : "w-[220px]"
        )}>
            <div className={cn("absolute left-0 top-0 bottom-0 w-2", color)} />
            <div className={cn("p-3 rounded-xl text-white shadow-lg", color)}>
                {icon}
            </div>
            <div className="flex-1 text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 leading-none">{type}</p>
                <h4 className="font-bold text-xs tracking-tight line-clamp-1">{title}</h4>
            </div>
            <div className="hidden group-hover:block transition-all">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            {/* Connection Points */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-border shadow-sm z-10" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-sm z-10" />
        </div>
    )
}

function Connector({ vertical = true, alignment }: { vertical?: boolean; alignment?: "left" | "right" }) {
    if (!vertical) {
        return (
            <div className="h-10 relative">
                <div className={cn(
                    "absolute h-px bg-border/80 top-0",
                    alignment === "left" ? "w-[120px] -right-[120px] rounded-bl-3xl border-b border-l border-border/80 h-10" :
                        "w-[120px] -left-[120px] rounded-br-3xl border-b border-r border-border/80 h-10"
                )} />
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-border" />
            <div className="w-2 h-2 rounded-full bg-primary -mt-1 shadow-lg shadow-primary/20" />
            <div className="w-px h-1 bg-border" />
        </div>
    )
}
