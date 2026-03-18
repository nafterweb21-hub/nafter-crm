"use client"

import * as React from "react"
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Download,
    Upload,
    Mail,
    Phone,
    MessageSquare,
    ExternalLink,
    Calendar,
    User,
    Tag as TagIcon,
    Clock,
    Archive,
    Trash2,
    Share2,
    UserCircle2,
    MessageCircle
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation" // Added

type LeadStatus = 'New' | 'Hot' | 'Qualified' | 'Closed'; // Added

interface Lead {
    id: number;
    name: string;
    phone: string;
    email: string;
    source: string;
    status: string;
    agent: string;
    date: string;
}

const initialLeads: Lead[] = [
    { id: 1, name: "John Doe", phone: "+91 9876543210", email: "john@example.com", source: "Facebook Ads", status: "Hot", agent: "Imran Khan", date: "2024-03-12" },
    { id: 2, name: "Sarah Smith", phone: "+91 9123456789", email: "sarah@gmail.com", source: "Website", status: "Qualified", agent: "Salman F.", date: "2024-03-11" },
    { id: 3, name: "Alex Ross", phone: "+91 9988776655", email: "alex@naver.com", source: "Direct Message", status: "New", agent: "Unassigned", date: "2024-03-11" },
    { id: 4, name: "Maria Garcia", phone: "+1 650 555 1234", email: "maria@apple.com", source: "WhatsApp QR", status: "Closed", agent: "Ayesha S.", date: "2024-03-10" },
    { id: 5, name: "David Miller", phone: "+91 8877665544", email: "david@microsoft.com", source: "Facebook Ads", status: "Hot", agent: "Imran Khan", date: "2024-03-09" },
    { id: 6, name: "Jessica Lee", phone: "+91 7766554433", email: "jess@google.com", source: "Website", status: "Qualified", agent: "Zaid M.", date: "2024-03-08" },
]

export default function LeadsPage() {
    const router = useRouter() // Added
    const [leadsList, setLeadsList] = React.useState(initialLeads) // Corrected from `leads` to `initialLeads` based on context
    const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
    const [isAddLeadOpen, setIsAddLeadOpen] = React.useState(false)
    const [isImportOpen, setIsImportOpen] = React.useState(false)
    const [editingLead, setEditingLead] = React.useState<Lead | null>(null)

    const [newLead, setNewLead] = React.useState({
        name: "",
        phone: "",
        email: "",
        source: "Direct",
        status: "New",
        agent: "Unassigned"
    })

    const handleAddLead = () => {
        if (!newLead.name || !newLead.phone) return

        const lead: Lead = {
            id: Date.now(),
            ...newLead,
            date: new Date().toISOString().split('T')[0]
        }

        setLeadsList([lead, ...leadsList])
        setIsAddLeadOpen(false)
        setNewLead({
            name: "",
            phone: "",
            email: "",
            source: "Direct",
            status: "New",
            agent: "Unassigned"
        })
        toast.success("Lead Added Successfully", {
            description: `${lead.name} has been added to your leads list.`
        })
    }

    const handleImportLead = (e: React.FormEvent) => {
        e.preventDefault()
        toast.info("Importing leads...", {
            description: "Wait a moment while we process the CSV file."
        })
        setTimeout(() => {
            setIsImportOpen(false)
            toast.success("Import Complete", {
                description: "50 new leads have been imported successfully."
            })
        }, 2000)
    }

    return (
        <div className="p-6 space-y-6">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Leads Management</h1>
                    <p className="text-muted-foreground text-sm">Manage and track your incoming sales opportunities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
                        <DialogTrigger render={
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Upload className="w-4 h-4" />
                                Import
                            </Button>
                        } />
                        <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-white/95 backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black tracking-tight uppercase">Import Leads</DialogTitle>
                                <DialogDescription className="text-sm font-medium text-muted-foreground">
                                    Upload a CSV or Excel file to import multiple leads at once.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-8 text-center space-y-4">
                                <div className="w-20 h-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto animate-pulse">
                                    <Upload className="w-10 h-10" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Click to upload or drag and drop</p>
                                    <p className="text-[11px] text-muted-foreground uppercase font-black tracking-widest leading-none">CSV, XLSX or VCF up to 10MB</p>
                                </div>
                                <Input type="file" className="hidden" id="file-upload" onChange={(e) => handleImportLead(e as any)} />
                                <Button
                                    variant="outline"
                                    className="h-11 rounded-xl border-dashed border-primary/30 w-full"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    Select File
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
                        <DialogTrigger render={
                            <Button size="sm" className="h-9 gap-2 bg-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                <Plus className="w-4 h-4" />
                                Add Lead
                            </Button>
                        } />
                        <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-white/95 backdrop-blur-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black tracking-tight uppercase">Create New Lead</DialogTitle>
                                <DialogDescription className="text-sm font-medium text-muted-foreground">
                                    Fill in the details to add a new lead manually.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Lead Name</label>
                                    <Input
                                        placeholder="Enter full name"
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                        className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 font-semibold"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Phone Number</label>
                                        <Input
                                            placeholder="+91 00000 00000"
                                            value={newLead.phone}
                                            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                            className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 font-semibold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Source</label>
                                        <Select
                                            value={newLead.source}
                                            onValueChange={(v) => setNewLead({ ...newLead, source: v ?? "Direct" })}
                                        >
                                            <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 font-semibold">
                                                <SelectValue placeholder="Social Media" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-border/50">
                                                <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                                                <SelectItem value="Website">Website</SelectItem>
                                                <SelectItem value="WhatsApp QR">WhatsApp QR</SelectItem>
                                                <SelectItem value="Direct Message">Direct Message</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['New', 'Hot', 'Qualified', 'Closed'].map((s) => (
                                            <Badge
                                                key={s}
                                                onClick={() => setNewLead({ ...newLead, status: s })}
                                                className={cn(
                                                    "cursor-pointer px-4 h-8 text-[10px] font-black tracking-widest uppercase border-none transition-all",
                                                    newLead.status === s ? "bg-primary text-white scale-105" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                )}
                                            >
                                                {s}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleAddLead}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                >
                                    Confirm & Save Lead
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search name, phone, or email..." className="pl-9 h-10 bg-muted/30 border-none rounded-xl" />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="h-10 rounded-xl px-4 border-muted flex-1 sm:flex-none">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" className="h-10 rounded-xl px-4 border-muted flex-1 sm:flex-none">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden shadow-sm">
                <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-[300px] h-12 px-6 text-[11px] font-bold uppercase tracking-wider">Contact</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Source</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Assigned Agent</TableHead>
                                <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Created Date</TableHead>
                                <TableHead className="h-12 w-[100px] text-right px-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leadsList.map((lead) => (
                                <TableRow
                                    key={lead.id}
                                    className="hover:bg-muted/50 cursor-pointer border-border/40 transition-colors group"
                                    onClick={() => setSelectedLead(lead)}
                                >
                                    <TableCell className="py-4 px-6 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border-2 border-background group-hover:border-primary/20 transition-all">
                                                <AvatarImage src={`https://avatar.vercel.sh/${lead.name}.png`} />
                                                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">{lead.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm tracking-tight">{lead.name}</span>
                                                <span className="text-[11px] text-muted-foreground flex items-center gap-2">
                                                    <Phone className="w-3 h-3" /> {lead.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold">{lead.source}</span>
                                            <span className="text-[10px] text-muted-foreground">Organic Campaign</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge className={cn(
                                            "text-[10px] uppercase font-black px-2 py-0.5 h-6 rounded-full border-none",
                                            lead.status === "Hot" ? "bg-rose-500/10 text-rose-600" :
                                                lead.status === "Qualified" ? "bg-emerald-500/10 text-emerald-600" :
                                                    lead.status === "Closed" ? "bg-indigo-500/10 text-indigo-600" :
                                                        "bg-blue-500/10 text-blue-600"
                                        )}>
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5 border">
                                                <AvatarFallback className="text-[8px] bg-muted">{lead.agent[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-[11px] font-medium">{lead.agent}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-xs font-medium text-muted-foreground">
                                        {lead.date}
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <div className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                                <DropdownMenuItem className="cursor-pointer gap-2">
                                                    <MessageSquare className="w-4 h-4" /> Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer gap-2">
                                                    <Mail className="w-4 h-4" /> Email
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-destructive gap-2">
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Lead Detail Side Drawer */}
                    <SheetContent className="sm:max-w-md p-0 border-l border-border/50">
                        <ScrollArea className="h-screen">
                            <div className="p-8">
                                <SheetHeader className="mb-8">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <Avatar className="h-24 w-24 border-4 border-background shadow-2xl">
                                            <AvatarImage src={`https://avatar.vercel.sh/${selectedLead?.name}.png`} />
                                            <AvatarFallback className="text-2xl">{selectedLead?.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <SheetTitle className="text-2xl font-black tracking-tighter">{selectedLead?.name}</SheetTitle>
                                            <SheetDescription className="text-xs font-mono mt-1">{selectedLead?.phone}</SheetDescription>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge className="bg-primary/10 text-primary uppercase font-black text-[9px] border-none px-3">
                                                {selectedLead?.status} LEAD
                                            </Badge>
                                            <Badge variant="outline" className="uppercase font-black text-[9px] text-muted-foreground border-muted px-3">
                                                Priority 1
                                            </Badge>
                                        </div>
                                    </div>
                                </SheetHeader>

                                <div className="space-y-8 mt-10">
                                    {/* Actions Grid */}
                                    <div className="grid grid-cols-4 gap-2">
                                        <ActionButton icon={<MessageSquare />} label="Chat" />
                                        <ActionButton icon={<Phone />} label="Call" />
                                        <ActionButton icon={<Mail />} label="Email" />
                                        <ActionButton icon={<ExternalLink />} label="Docs" />
                                    </div>

                                    {/* Info Sections */}
                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Contact Details</h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoRow icon={<User />} label="Full Name" value={selectedLead?.name} />
                                            <InfoRow icon={<Mail />} label="Email Address" value={selectedLead?.email} />
                                            <InfoRow icon={<TagIcon />} label="Source" value={selectedLead?.source} />
                                            <InfoRow icon={<Calendar />} label="Created On" value={selectedLead?.date} />
                                        </div>
                                    </section>

                                    <Separator className="opacity-50" />

                                    <section className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Activity History</h4>
                                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-2 h-5 text-[9px]">Live</Badge>
                                        </div>
                                        <div className="space-y-4 relative border-l-2 border-muted/50 ml-3 pl-6 py-2">
                                            <ActivityItem
                                                title="Lead Captured"
                                                desc="Inbound from Click-to-WhatsApp Ad"
                                                time="2 hours ago"
                                                active
                                            />
                                            <ActivityItem
                                                title="AI Greeting Sent"
                                                desc="Automated reply sent via WhatsApp Bot"
                                                time="1 hour ago"
                                            />
                                            <ActivityItem
                                                title="Assigned to Agent"
                                                desc={`Assigned by system to ${selectedLead?.agent}`}
                                                time="45 min ago"
                                            />
                                        </div>
                                    </section>

                                    <div className="pt-6 flex gap-3">
                                        <Button
                                            onClick={() => {
                                                toast.success(`Opening chat with ${selectedLead?.name}`)
                                                router.push(`/inbox?contact=${selectedLead?.phone}`)
                                            }}
                                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] group"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                            Open Chat
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={
                                                <Button variant="outline" className="h-12 w-12 rounded-xl border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all active:scale-[0.98]">
                                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                                </Button>
                                            } />
                                            <DropdownMenuContent align="end" className="w-[200px] rounded-2xl border-border/50 bg-white/95 backdrop-blur-xl p-2 shadow-2xl">
                                                <DropdownMenuItem
                                                    className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group"
                                                    onClick={() => {
                                                        setEditingLead(selectedLead!)
                                                        setIsAddLeadOpen(true) // Reusing modal for edit
                                                    }}
                                                >
                                                    <UserCircle2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    <span className="text-xs font-bold">Edit Customer</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group"
                                                    onClick={() => toast.success("Lead moved to Archive")}
                                                >
                                                    <Archive className="w-4 h-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                                                    <span className="text-xs font-bold">Archive Lead</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-primary/5 group">
                                                    <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                                                    <span className="text-xs font-bold">Transfer Agent</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="my-1 bg-border/40" />
                                                <DropdownMenuItem
                                                    className="cursor-pointer rounded-xl p-2 gap-3 focus:bg-rose-50 text-rose-500 hover:text-rose-600 group"
                                                    onClick={() => {
                                                        setLeadsList(leadsList.filter(l => l.id !== selectedLead?.id))
                                                        setSelectedLead(null)
                                                        toast.success("Lead deleted successfully")
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 text-rose-500/70 group-hover:text-rose-600 transition-colors" />
                                                    <span className="text-xs font-bold">Delete Forever</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    const handleClick = () => {
        toast.info(`${label} action triggered for this lead.`)
    }
    return (
        <button
            onClick={handleClick}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-muted/30 hover:bg-primary/10 hover:text-primary transition-all group border border-transparent hover:border-primary/20"
        >
            <span className="w-5 h-5 group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
        </button>
    )
}

function InfoRow({ icon, label, value }: { icon: React.ReactElement<{ size?: number }>; label: string; value?: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                {React.cloneElement(icon, { size: 16 })}
            </div>
            <div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
            </div>
        </div>
    )
}

function ActivityItem({ title, desc, time, active }: { title: string; desc: string; time: string; active?: boolean }) {
    return (
        <div className="relative group">
            <div className={cn(
                "absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-background ring-4 ring-background transition-colors",
                active ? "bg-primary scale-125" : "bg-muted-foreground/30 group-hover:bg-primary/40"
            )} />
            <div className="space-y-1">
                <p className="text-xs font-bold leading-none">{title}</p>
                <p className="text-[11px] text-muted-foreground/80 leading-relaxed">{desc}</p>
                <p className="text-[9px] text-muted-foreground font-mono flex items-center gap-1 mt-1">
                    <Clock className="w-2.5 h-2.5" /> {time}
                </p>
            </div>
        </div>
    )
}

