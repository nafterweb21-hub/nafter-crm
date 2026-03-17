"use client"

import * as React from "react"
import {
    Megaphone,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Send,
    Eye,
    CheckCircle2,
    Clock,
    Users,
    Target,
    MessageSquare,
    BarChart2,
    Calendar as CalendarIcon
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const campaigns = [
    { id: 1, name: "Shopify 24h Offer", status: "Sent", audience: "1,240", sent: "1,240", openRate: "86%", date: "2024-03-12" },
    { id: 2, name: "Festive Discount", status: "Scheduled", audience: "3,500", sent: "0", openRate: "0%", date: "2024-03-15" },
    { id: 3, name: "Re-engagement Push", status: "Draft", audience: "450", sent: "0", openRate: "0%", date: "2024-03-20" },
    { id: 4, name: "Product Launch", status: "Sent", audience: "5,000", sent: "4,982", openRate: "92%", date: "2024-03-10" },
    { id: 5, name: "Weekend Special", status: "Failed", audience: "800", sent: "120", openRate: "12%", date: "2024-03-05" },
]

export default function CampaignsPage() {
    return (
        <div className="p-6 space-y-6">

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Broadcasts" value="142" icon={<Send className="w-5 h-5 text-indigo-500" />} change="+12% this month" />
                <StatCard title="Avg. Open Rate" value="84.2%" icon={<Eye className="w-5 h-5 text-emerald-500" />} change="+2.4% from last" />
                <StatCard title="Engagement" value="12.5k" icon={<MessageSquare className="w-5 h-5 text-amber-500" />} change="+1.2k today" />
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Campaign Broadcasts</h1>
                    <p className="text-muted-foreground text-sm">Send bulk WhatsApp messages to your leads and customers.</p>
                </div>
                <Dialog>
                    <DialogTrigger
                        render={
                            <Button size="sm" className="h-9 gap-2 bg-primary shadow-lg shadow-primary/20">
                                <Plus className="w-4 h-4" />
                                Create Campaign
                            </Button>
                        }
                    />
                    <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-border/50 rounded-2xl">
                        <div className="bg-primary/5 p-6 border-b border-primary/10">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black tracking-tight">New Campaign</DialogTitle>
                                <DialogDescription className="text-xs text-muted-foreground/80 font-medium">Create a new WhatsApp broadcast campaign.</DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Campaign Name</label>
                                    <Input placeholder="e.g. Summer Sale 2024" className="h-10 rounded-xl" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Audience</label>
                                        <Select>
                                            <SelectTrigger className="h-10 rounded-xl">
                                                <SelectValue placeholder="All Leads" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Leads</SelectItem>
                                                <SelectItem value="hot">Hot Leads</SelectItem>
                                                <SelectItem value="shopify">Shopify Leads</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message Template</label>
                                        <Select>
                                            <SelectTrigger className="h-10 rounded-xl">
                                                <SelectValue placeholder="Welcome Offer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="welcome">Welcome Offer</SelectItem>
                                                <SelectItem value="discount">10% Discount</SelectItem>
                                                <SelectItem value="followup">Follow-up</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message Body</label>
                                        <Badge variant="outline" className="text-[9px] font-mono border-muted">WABA Approved</Badge>
                                    </div>
                                    <Textarea
                                        placeholder="Hi {{name}}, we have a special offer for you..."
                                        className="min-h-[120px] rounded-xl resize-none"
                                        readOnly
                                        defaultValue={`Hi {{name}} 👋\n\nWe noticed you were interested in setting up a Shopify store. Get 20% OFF if you book today! 🚀\n\nReply with 'YES' to claim.`}
                                    />
                                    <p className="text-[10px] text-muted-foreground">Variables like <code className="text-primary font-bold">{"{{ name }}"}</code> will be automatically replaced.</p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="p-6 bg-muted/30 border-t flex sm:justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Schedule for later</span>
                            </div>
                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold h-10 px-6 rounded-xl shadow-lg shadow-primary/20">
                                Send Campaign
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Campaigns Table */}
            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/50">
                            <TableHead className="w-[300px] h-12 px-6 text-[11px] font-bold uppercase tracking-wider">Campaign Details</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider text-center">Audience</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider text-center">Open Rate</TableHead>
                            <TableHead className="h-12 text-[11px] font-bold uppercase tracking-wider">Created Date</TableHead>
                            <TableHead className="h-12 w-[100px] text-right px-6"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((camp) => (
                            <TableRow key={camp.id} className="hover:bg-muted/50 border-border/40 transition-colors group">
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                            <Megaphone className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm tracking-tight">{camp.name}</span>
                                            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Marketing Blast</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-xs font-semibold">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-black px-2 py-0 border-none",
                                        camp.status === "Sent" ? "bg-emerald-500/10 text-emerald-600" :
                                            camp.status === "Scheduled" ? "bg-amber-500/10 text-amber-600" :
                                                camp.status === "Failed" ? "bg-rose-500/10 text-rose-600" :
                                                    "bg-muted text-muted-foreground"
                                    )}>
                                        {camp.status === "Sent" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                                        {camp.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-black">{camp.audience}</span>
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Contacts</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-center">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <span className="text-sm font-black text-primary">{camp.openRate}</span>
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden border border-border/50">
                                            <div className="h-full bg-primary" style={{ width: camp.openRate }} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 text-xs font-medium text-muted-foreground">
                                    {camp.date}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, change }: any) {
    return (
        <Card className="border-border/50 bg-background/50 backdrop-blur shadow-sm group hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-muted/30 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {icon}
                </div>
                <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black tracking-tight">{value}</h3>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1 inline-block rounded">{change.split(' ')[0]}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
