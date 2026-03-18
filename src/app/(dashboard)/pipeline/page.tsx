"use client"

import * as React from "react"
import {
    Plus,
    MoreVertical,
    IndianRupee,
    Clock,
    Filter,
    LayoutGrid,
    List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"

interface Deal {
    id: string;
    title: string;
    contact: string;
    value: string;
    agent: string;
    time: string;
    priority: string;
}

interface Column {
    id: string;
    title: string;
    deals: Deal[];
}

const initialData: Column[] = [
    {
        id: "col-1",
        title: "New Lead",
        deals: [
            { id: "deal-1", title: "Shopify Pro Setup", contact: "John Doe", value: "₹25,000", agent: "Imran", time: "2h ago", priority: "Hot" },
            { id: "deal-2", title: "Website Redesign", contact: "Sarah Smith", value: "₹45,000", agent: "Salman", time: "5h ago", priority: "Warm" },
            { id: "deal-3", title: "E-commerce Launch", contact: "Alex Johnson", value: "₹1,20,000", agent: "Unassigned", time: "1d ago", priority: "Cold" },
        ]
    },
    {
        id: "col-2",
        title: "Qualified",
        deals: [
            { id: "deal-4", title: "Custom Shopify App", contact: "Maria Garcia", value: "₹65,000", agent: "Ayesha", time: "3h ago", priority: "Hot" },
        ]
    },
    {
        id: "col-3",
        title: "Demo Scheduled",
        deals: [
            { id: "deal-5", title: "Portfolio Website", contact: "David Miller", value: "₹15,000", agent: "Imran", time: "1h ago", priority: "Hot" },
        ]
    },
    {
        id: "col-4",
        title: "Proposal Sent",
        deals: [
            { id: "deal-6", title: "Enterprise Solution", contact: "Jessica Lee", value: "₹4,50,000", agent: "Zaid", time: "10m ago", priority: "Hot" },
        ]
    },
    {
        id: "col-5",
        title: "Closed Won",
        deals: [
            { id: "deal-7", title: "Basic Store", contact: "Mike Ross", value: "₹10,000", agent: "Imran", time: "2d ago", priority: "Cold" },
        ]
    },
]

export default function PipelinePage() {
    const [data, setData] = React.useState(initialData)
    const [isAddStageOpen, setIsAddStageOpen] = React.useState(false)
    const [isAddDealOpen, setIsAddDealOpen] = React.useState(false)
    const [newStageTitle, setNewStageTitle] = React.useState("")
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
    const [newDeal, setNewDeal] = React.useState({
        title: "",
        contact: "",
        value: "",
        agent: "Imran",
        priority: "Warm"
    })

    const handleAddDeal = () => {
        if (!newDeal.title || !newDeal.contact || !newDeal.value) return

        const deal: Deal = {
            id: `deal-${Date.now()}`,
            ...newDeal,
            time: "Just now"
        }

        const newData = [...data]
        newData[0].deals = [deal, ...newData[0].deals]
        setData(newData)
        setIsAddDealOpen(false)
        setNewDeal({
            title: "",
            contact: "",
            value: "",
            agent: "Imran",
            priority: "Warm"
        })
        toast.success("Deal Added", {
            description: `${deal.title} has been added to New Leads.`
        })
    }

    const handleAddStage = () => {
        if (!newStageTitle.trim()) return

        const newColumn: Column = {
            id: `col-${data.length + 1}`,
            title: newStageTitle,
            deals: []
        }

        setData([...data, newColumn])
        setNewStageTitle("")
        setIsAddStageOpen(false)
        toast.success("New Stage Added", {
            description: `${newStageTitle} has been added to your pipeline.`
        })
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result

        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return

        const sourceColIdx = data.findIndex(col => col.id === source.droppableId)
        const destColIdx = data.findIndex(col => col.id === destination.droppableId)

        const sourceCol = data[sourceColIdx]
        const destCol = data[destColIdx]

        const sourceDeals = Array.from(sourceCol.deals)
        const [movedDeal] = sourceDeals.splice(source.index, 1)

        if (sourceColIdx === destColIdx) {
            sourceDeals.splice(destination.index, 0, movedDeal)
            const newData = [...data]
            newData[sourceColIdx] = { ...sourceCol, deals: sourceDeals }
            setData(newData)
        } else {
            const destDeals = Array.from(destCol.deals)
            destDeals.splice(destination.index, 0, movedDeal)
            const newData = [...data]
            newData[sourceColIdx] = { ...sourceCol, deals: sourceDeals }
            newData[destColIdx] = { ...destCol, deals: destDeals }
            setData(newData)
        }
    }

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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewMode('grid')}
                            className={cn("h-7 w-7 rounded-md", viewMode === 'grid' ? "bg-background shadow-sm" : "text-muted-foreground")}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewMode('list')}
                            className={cn("h-7 w-7 rounded-md", viewMode === 'list' ? "bg-background shadow-sm" : "text-muted-foreground")}
                        >
                            <List className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>

                    <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
                        <DialogTrigger render={
                            <Button size="sm" className="h-9 gap-2 bg-primary shadow-lg shadow-primary/20">
                                <Plus className="w-4 h-4" />
                                Add Deal
                            </Button>
                        } />
                        <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-white/95 backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black tracking-tight">Add New Deal</DialogTitle>
                                <DialogDescription className="text-sm font-medium text-muted-foreground">
                                    Enter deal details to track it in your pipeline.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Deal Title</label>
                                    <Input
                                        placeholder="e.g. Enterprise Setup"
                                        value={newDeal.title}
                                        onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                                        className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Contact Name</label>
                                        <Input
                                            placeholder="John Doe"
                                            value={newDeal.contact}
                                            onChange={(e) => setNewDeal({ ...newDeal, contact: e.target.value })}
                                            className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Deal Value</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                            <Input
                                                placeholder="50,000"
                                                value={newDeal.value}
                                                onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                                                className="h-11 pl-8 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Priority</label>
                                    <Select
                                        value={newDeal.priority}
                                        onValueChange={(v) => setNewDeal({ ...newDeal, priority: v })}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/50">
                                            <SelectItem value="Hot">🔥 Hot</SelectItem>
                                            <SelectItem value="Warm">☀️ Warm</SelectItem>
                                            <SelectItem value="Cold">❄️ Cold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleAddDeal}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                >
                                    Add to Pipeline
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Kanban Board / List View */}
            {viewMode === 'grid' ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar">
                        <div className="flex h-full gap-4 min-w-max">
                            {data.map((column) => (
                                <div key={column.id} className="w-80 flex flex-col h-full group">
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
                                    <Droppable droppableId={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={cn(
                                                    "flex-1 flex flex-col gap-3 overflow-y-auto pr-2 no-scrollbar bg-muted/20 rounded-2xl p-2 border border-transparent group-hover:border-border/50 transition-all",
                                                    snapshot.isDraggingOver && "bg-primary/5 border-primary/20"
                                                )}
                                            >
                                                {column.deals.map((deal, index) => (
                                                    <Draggable key={deal.id} draggableId={deal.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={cn(
                                                                    "border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 bg-background/50 backdrop-blur",
                                                                    snapshot.isDragging && "shadow-2xl border-primary/50 rotate-2 z-50 bg-background"
                                                                )}
                                                            >
                                                                <CardContent className="p-4 space-y-4">
                                                                    {/* Card Top */}
                                                                    <div className="flex justify-between items-start gap-2">
                                                                        <div className="space-y-1">
                                                                            <h4 className="font-bold text-sm leading-tight tracking-tight group-hover:text-primary transition-colors">{deal.title}</h4>
                                                                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{deal.contact}</p>
                                                                        </div>
                                                                        <MoreVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
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
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}

                                                {/* Empty State / Add Card Placeholder */}
                                                {column.deals.length === 0 && (
                                                    <button className="py-8 items-center justify-center flex flex-col gap-2 text-muted-foreground/40 hover:text-primary/60 hover:bg-primary/5 rounded-xl border border-dashed border-muted-foreground/20 transition-all text-xs font-semibold">
                                                        <Plus className="w-5 h-5" />
                                                        Drop deal here
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}

                            {/* Add New Column Button */}
                            <Dialog open={isAddStageOpen} onOpenChange={setIsAddStageOpen}>
                                <DialogTrigger render={
                                    <div className="w-80 flex flex-col h-[200px] mt-12 bg-muted/10 rounded-2xl border border-dashed items-center justify-center group hover:bg-muted/20 transition-all cursor-pointer">
                                        <div className="p-3 rounded-full bg-background/50 border shadow-sm group-hover:scale-110 transition-transform">
                                            <Plus className="w-6 h-6 text-muted-foreground/60 group-hover:text-primary" />
                                        </div>
                                        <p className="text-xs font-bold text-muted-foreground/60 transition-colors mt-4">Add Stage</p>
                                    </div>
                                } />
                                <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-white/95 backdrop-blur-xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-black tracking-tight">Add New Stage</DialogTitle>
                                        <DialogDescription className="text-sm font-medium text-muted-foreground">
                                            Give your sales stage a name. This will appear as a new column in your pipeline.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Stage Name</label>
                                            <Input
                                                placeholder="e.g. Negotiation"
                                                value={newStageTitle}
                                                onChange={(e) => setNewStageTitle(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddStage()}
                                                className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 font-semibold"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            onClick={handleAddStage}
                                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                        >
                                            Create Stage
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </DragDropContext>
            ) : (
                <div className="flex-1 bg-muted/20 rounded-[2rem] border border-dashed flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                            <List className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold">List View Coming Soon</h3>
                        <p className="text-sm text-muted-foreground max-w-[250px]">We are building a powerful table view for your deals. Stay tuned!</p>
                        <Button variant="outline" onClick={() => setViewMode('grid')} className="rounded-xl">Switch to Kanban</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
