"use client"

import * as React from "react"
import {
    Plus,
    MoreVertical,
    IndianRupee,
    Clock,
    Filter,
    LayoutGrid,
    List,
    User,
    Mail,
    Phone,
    Calendar,
    ArrowRight,
    Users2,
    ChevronDown,
    Check,
    Search
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

interface Deal {
    id: string;
    title: string;
    contact: string;
    value: string;
    agent: string;
    time: string;
    priority: string;
    notes?: string;
}

interface Column {
    id: string;
    title: string;
    deals: Deal[];
}

const agentsList = [
    { name: "Imran Khan", avatar: "https://github.com/nutlope.png", role: "Admin" },
    { name: "Salman Rushdie", avatar: "https://avatar.vercel.sh/salman.png", role: "Senior Agent" },
    { name: "Ayesha Ahmed", avatar: "https://avatar.vercel.sh/ayesha.png", role: "Junior Agent" },
    { name: "Zaid Malik", avatar: "https://avatar.vercel.sh/zaid.png", role: "Sales Lead" },
    { name: "Unassigned", avatar: "", role: "None" }
];

const initialData: Column[] = [
    {
        id: "col-1",
        title: "New Lead",
        deals: [
            {
                id: "deal-1",
                title: "Shopify Pro Setup",
                contact: "John Doe",
                value: "₹25,000",
                agent: "Imran",
                time: "2h ago",
                priority: "Hot",
                notes: "Interested in setting up a premium clothing store. Budget mentioned ₹30k. Need ASAP delivery."
            },
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
    const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
    const [isEditDealOpen, setIsEditDealOpen] = React.useState(false)
    const [editingDeal, setEditingDeal] = React.useState<Deal | null>(null)
    const [searchTerm, setSearchTerm] = React.useState("")

    const filteredDeals = data.reduce((acc: (Deal & { stage: string })[], col) => {
        const matchingDeals = col.deals
            .filter(deal =>
                deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                deal.agent.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(deal => ({ ...deal, stage: col.title }));
        return [...acc, ...matchingDeals];
    }, []);

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

    const openDealDetails = (deal: Deal) => {
        setSelectedDeal(deal)
        setIsDetailsOpen(true)
    }

    const handleWhatsAppMessage = (deal: Deal) => {
        const phoneNumber = "919876543210" // Placeholder number
        const text = `Hi ${deal.contact}, I'm following up on the ${deal.title} deal...`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
        toast.success("WhatsApp Link Opened", {
            description: `Starting a conversation with ${deal.contact}...`
        })
    }

    const handleUpdateDeal = () => {
        if (!editingDeal) return

        const newData = data.map(col => ({
            ...col,
            deals: col.deals.map(d => d.id === editingDeal.id ? editingDeal : d)
        }))

        setData(newData)
        setSelectedDeal(editingDeal)
        setIsEditDealOpen(false)
        toast.success("Deal Updated", {
            description: `${editingDeal.title} has been updated successfully.`
        })
    }

    return (
        <div className="p-6 h-[calc(100vh-64px)] overflow-hidden flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
                    <p className="text-muted-foreground text-sm">Visual deal tracker for your sales team.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search deals, contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64 h-9 pl-9 rounded-xl bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 transition-all"
                        />
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
                                            onValueChange={(v) => setNewDeal({ ...newDeal, priority: v ?? "Warm" })}
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
                                                                onClick={() => openDealDetails(deal)}
                                                                className={cn(
                                                                    "border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 bg-background/50 backdrop-blur cursor-pointer",
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
                                    <button type="button" className="w-80 flex flex-col h-[200px] mt-12 bg-muted/10 rounded-2xl border border-dashed items-center justify-center group hover:bg-muted/20 transition-all cursor-pointer outline-none">
                                        <div className="p-3 rounded-full bg-background/50 border shadow-sm group-hover:scale-110 transition-transform">
                                            <Plus className="w-6 h-6 text-muted-foreground/60 group-hover:text-primary" />
                                        </div>
                                        <p className="text-xs font-bold text-muted-foreground/60 transition-colors mt-4">Add Stage</p>
                                    </button>
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
                <div className="flex-1 bg-background rounded-[2rem] border border-border/50 overflow-hidden flex flex-col shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-border/40">
                                <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-widest h-12 px-6">Deal Details</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Current Stage</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Priority</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Value</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Assigned To</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 text-right px-6">Follow up</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDeals.length > 0 ? (
                                filteredDeals.map((deal) => (
                                    <TableRow
                                        key={deal.id}
                                        className="cursor-pointer hover:bg-muted/30 border-border/40 group transition-colors"
                                        onClick={() => openDealDetails(deal)}
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                                                    <AvatarImage src={`https://avatar.vercel.sh/${deal.contact}.png`} />
                                                    <AvatarFallback>{deal.contact[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{deal.title}</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{deal.contact}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary rounded-lg py-0.5 h-6">
                                                {deal.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "text-[9px] font-black uppercase tracking-widest border-none rounded-lg h-6",
                                                deal.priority === "Hot" ? "bg-rose-500/10 text-rose-600" :
                                                    deal.priority === "Warm" ? "bg-orange-500/10 text-orange-600" :
                                                        "bg-blue-500/10 text-blue-600"
                                            )}>
                                                {deal.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-black text-sm text-foreground/80">
                                            {deal.value}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6 border-background shadow-xs">
                                                    <AvatarImage src={agentsList.find(a => a.name.toLowerCase().includes(deal.agent.toLowerCase()))?.avatar} />
                                                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">{deal.agent[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-bold">{agentsList.find(a => a.name.toLowerCase().includes(deal.agent.toLowerCase()))?.name.split(' ')[0] || deal.agent}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-emerald-600 hover:bg-emerald-500/10 rounded-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleWhatsAppMessage(deal);
                                                    }}
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted rounded-full">
                                                    <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                        No deals found matching your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Deal Details Sheet */}
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent side="right" className="sm:max-w-md p-0 overflow-y-auto no-scrollbar">
                    {selectedDeal && (
                        <div className="flex flex-col h-full min-h-screen">
                            {/* Header Section */}
                            <div className="bg-primary/5 p-8 pb-10 border-b border-primary/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <Badge className={cn(
                                    "mb-4 text-[10px] font-black tracking-widest uppercase border-none px-2 h-5",
                                    selectedDeal.priority === "Hot" ? "bg-rose-500 text-white" :
                                        selectedDeal.priority === "Warm" ? "bg-orange-500 text-white" : "bg-blue-500 text-white"
                                )}>
                                    {selectedDeal.priority} Priority
                                </Badge>
                                <h2 className="text-2xl font-black tracking-tight mb-2">{selectedDeal.title}</h2>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                        <AvatarImage src={`https://avatar.vercel.sh/${selectedDeal.contact}.png`} />
                                        <AvatarFallback>{selectedDeal.contact[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{selectedDeal.contact}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Potential Customer</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                                {/* Deal Info Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-1">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Deal Value</p>
                                        <div className="flex items-center gap-1.5 text-primary text-lg font-black tracking-tight">
                                            <IndianRupee className="w-4 h-4" />
                                            {selectedDeal.value.replace('₹', '')}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-1">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Added Date</p>
                                        <div className="flex items-center gap-1.5 text-lg font-black tracking-tight">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            {selectedDeal.time}
                                        </div>
                                    </div>
                                </div>

                                {/* Assigned Agent Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/60">
                                            <Users2 className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Assigned Agent</h3>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger nativeButton={false} render={
                                            <div className="flex items-center gap-3 p-3.5 rounded-[1.5rem] bg-white border border-border/50 hover:border-primary/20 hover:bg-muted/30 transition-all cursor-pointer group group-active:scale-[0.98]">
                                                <Avatar className="h-9 w-9 border-2 border-background shadow-md">
                                                    <AvatarImage src={agentsList.find(a => a.name.includes(selectedDeal.agent))?.avatar} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{selectedDeal.agent[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col flex-1">
                                                    <span className="text-sm font-bold tracking-tight">{agentsList.find(a => a.name.includes(selectedDeal.agent))?.name || selectedDeal.agent}</span>
                                                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                                                        {agentsList.find(a => a.name.includes(selectedDeal.agent))?.role || "Agent"}
                                                    </span>
                                                </div>
                                                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                        } />
                                        <DropdownMenuContent align="start" className="w-[240px] mt-2 rounded-2xl border-border/50 bg-white/95 backdrop-blur-xl p-2 shadow-2xl">
                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 mb-1 pt-1">Select Agent</DropdownMenuLabel>
                                            <DropdownMenuGroup className="space-y-1">
                                                {agentsList.map((agent) => (
                                                    <DropdownMenuItem
                                                        key={agent.name}
                                                        className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group"
                                                        onClick={() => {
                                                            const simpleName = agent.name.split(' ')[0]
                                                            const updatedDeal = { ...selectedDeal, agent: simpleName }
                                                            setSelectedDeal(updatedDeal)
                                                            setData(prev => prev.map(col => ({
                                                                ...col,
                                                                deals: col.deals.map(d => d.id === selectedDeal.id ? updatedDeal : d)
                                                            })))
                                                            toast.success(`Deal assigned to ${agent.name}`)
                                                        }}
                                                    >
                                                        <Avatar className="h-7 w-7 border shadow-sm">
                                                            <AvatarImage src={agent.avatar} />
                                                            <AvatarFallback className="text-[9px] font-bold">{agent.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold">{agent.name}</span>
                                                            <span className="text-[9px] text-muted-foreground font-medium">{agent.role}</span>
                                                        </div>
                                                        {selectedDeal.agent === agent.name.split(' ')[0] && (
                                                            <Check className="w-3.5 h-3.5 ml-auto text-primary" />
                                                        )}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Contact Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">{selectedDeal.contact.toLowerCase().replace(' ', '.')}@example.com</span>
                                                <span className="text-[9px] text-muted-foreground uppercase font-black">Email</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">+91 98765 43210</span>
                                                <span className="text-[9px] text-muted-foreground uppercase font-black">WhatsApp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                <div className="space-y-4 pb-4">
                                    <div
                                        className="flex justify-between items-center group cursor-pointer"
                                        onClick={() => {
                                            const newNote = prompt("Add a new note for this project:", selectedDeal.notes || "")
                                            if (newNote !== null) {
                                                const updatedDeal = { ...selectedDeal, notes: newNote }
                                                setSelectedDeal(updatedDeal)
                                                setData(prev => prev.map(col => ({
                                                    ...col,
                                                    deals: col.deals.map(d => d.id === selectedDeal.id ? updatedDeal : d)
                                                })))
                                                toast.success("Note updated successfully")
                                            }
                                        }}
                                    >
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-primary transition-colors">Notes</h3>
                                        <Plus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-indigo-50/40 border border-dashed border-indigo-200/50 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                                        <p className="text-[13px] leading-relaxed text-indigo-900/80 font-medium italic">
                                            "{selectedDeal.notes || "No notes added yet. Click the plus icon to add project requirements or internal memos."}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Section */}
                            <div className="mt-auto p-8 pt-4 space-y-4 bg-background border-t border-border/40 shrink-0">
                                <Button
                                    onClick={() => {
                                        setData(prev => prev.map(col => ({
                                            ...col,
                                            deals: col.deals.filter(d => d.id !== selectedDeal.id)
                                        })))
                                        toast.success("Deal marked as Closed Won! 🏆", {
                                            description: `${selectedDeal.title} has been moved to your success ledger.`
                                        })
                                        setIsDetailsOpen(false)
                                        setSelectedDeal(null)
                                    }}
                                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 rounded-[1.5rem] font-bold text-[15px] transition-all active:scale-[0.98]"
                                >
                                    Mark as Closed
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        // Find meeting column index or object
                                        const meetingCol = data.find(c => c.title === "Meeting")
                                        if (meetingCol) {
                                            setData(prev => {
                                                // 1. Remove from all other columns
                                                // 2. Add to Meeting column at index 0
                                                return prev.map(col => {
                                                    if (col.id === meetingCol.id) {
                                                        // Ensure no duplicates
                                                        const cleanDeals = col.deals.filter(d => d.id !== selectedDeal.id)
                                                        return { ...col, deals: [selectedDeal, ...cleanDeals] }
                                                    }
                                                    return { ...col, deals: col.deals.filter(d => d.id !== selectedDeal.id) }
                                                })
                                            })
                                            toast.info("Consultation Scheduled!", {
                                                description: `Moved ${selectedDeal.title} to the Meeting stage.`
                                            })
                                        } else {
                                            toast.info("Call scheduled for tomorrow at 10:00 AM")
                                        }
                                        setIsDetailsOpen(false)
                                    }}
                                    className="w-full h-14 rounded-[1.5rem] font-bold text-[15px] border-border/60 hover:bg-muted/30 transition-all active:scale-[0.98]"
                                >
                                    Schedule Call
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Edit Deal Modal */}
            <Dialog open={isEditDealOpen} onOpenChange={setIsEditDealOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-white/95 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black tracking-tight">Edit Deal</DialogTitle>
                        <DialogDescription className="text-sm font-medium text-muted-foreground">
                            Update the information for this deal.
                        </DialogDescription>
                    </DialogHeader>
                    {editingDeal && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Deal Title</label>
                                <Input
                                    placeholder="e.g. Enterprise Setup"
                                    value={editingDeal.title}
                                    onChange={(e) => setEditingDeal({ ...editingDeal, title: e.target.value })}
                                    className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Contact Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        value={editingDeal.contact}
                                        onChange={(e) => setEditingDeal({ ...editingDeal, contact: e.target.value })}
                                        className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Deal Value</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                        <Input
                                            placeholder="50,000"
                                            value={editingDeal.value.replace('₹', '')}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, value: `₹${e.target.value}` })}
                                            className="h-11 pl-8 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Priority</label>
                                <Select
                                    value={editingDeal.priority}
                                    onValueChange={(v) => setEditingDeal({ ...editingDeal, priority: v ?? "Warm" })}
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
                    )}
                    <DialogFooter>
                        <Button
                            onClick={handleUpdateDeal}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
