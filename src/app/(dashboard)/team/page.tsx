"use client"

import * as React from "react"
import {
    Search,
    UserPlus,
    ShieldCheck,
    ShieldAlert,
    MoreVertical
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Unified file for Reports and Team for demonstration
// In production, these would be separate files.

const sourceData = [
    { name: "Facebook Ads", value: 65, color: "var(--color-primary)" },
    { name: "Website", value: 20, color: "oklch(0.65 0.25 285)" },
    { name: "WhatsApp QR", value: 10, color: "oklch(0.75 0.15 285)" },
    { name: "Direct Message", value: 5, color: "oklch(0.85 0.1 285)" },
]

const teamMembers = [
    { id: 1, name: "Imran Khan", email: "imran@nafter.com", role: "Admin", status: "Online", deals: 142, lastActive: "Just now" },
    { id: 2, name: "Salman F.", email: "salman@nafter.com", role: "Manager", status: "Online", deals: 89, lastActive: "2 min ago" },
    { id: 3, name: "Ayesha S.", email: "ayesha@nafter.com", role: "Agent", status: "Away", deals: 56, lastActive: "15 min ago" },
    { id: 4, name: "Zaid M.", email: "zaid@nafter.com", role: "Agent", status: "Offline", deals: 24, lastActive: "2 hours ago" },
]

export function ReportsView() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-background/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-black uppercase tracking-widest">Lead Channel Sources</CardTitle>
                        <CardDescription className="text-xs">Where your customers are discovering you.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-background/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-black uppercase tracking-widest">Conversion Funnel</CardTitle>
                        <CardDescription className="text-xs">Drop-off rates across sales stages.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: "New", count: 1200 },
                                { name: "Qualify", count: 800 },
                                { name: "Demo", count: 450 },
                                { name: "Closing", count: 200 },
                                { name: "Won", count: 142 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} dy={10} />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export function TeamView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search team members..." className="pl-9 h-10 rounded-xl bg-muted/30 border-none" />
                </div>
                <Button size="sm" className="h-10 bg-primary text-white font-black px-6 rounded-xl shadow-lg shadow-primary/20 gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Member
                </Button>
            </div>

            <div className="border border-border/50 rounded-2xl bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="hover:bg-transparent border-border/50">
                            <TableHead className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">Member</TableHead>
                            <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest">Role</TableHead>
                            <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest">Status</TableHead>
                            <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest text-center">Deals Closed</TableHead>
                            <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest">Last Active</TableHead>
                            <TableHead className="px-6 py-4 text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamMembers.map((member) => (
                            <TableRow key={member.id} className="border-border/30 hover:bg-muted/20 transition-all group">
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border-2 border-background group-hover:border-primary/20 transition-all">
                                            <AvatarImage src={`https://avatar.vercel.sh/${member.name}.png`} />
                                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">{member.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold tracking-tight">{member.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{member.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(
                                        "text-[9px] font-black uppercase px-2 h-5 border-none",
                                        member.role === "Admin" ? "bg-indigo-500/10 text-indigo-600" :
                                            member.role === "Manager" ? "bg-blue-500/10 text-blue-600" :
                                                "bg-muted text-muted-foreground"
                                    )}>
                                        {member.role === "Admin" ? <ShieldCheck className="w-3 h-3 mr-1" /> : <ShieldAlert className="w-3 h-3 mr-1" />}
                                        {member.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            member.status === "Online" ? "bg-emerald-500 animate-pulse" :
                                                member.status === "Away" ? "bg-orange-500" : "bg-muted-foreground/30"
                                        )} />
                                        <span className="text-xs font-medium">{member.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center text-sm font-black">{member.deals}</TableCell>
                                <TableCell className="text-xs font-medium text-muted-foreground">{member.lastActive}</TableCell>
                                <TableCell className="px-6 text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
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

// Parent Page
export default function TeamAndReportsPage() {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-3xl font-black tracking-tight tracking-tighter">Organization Hub</h1>
                <p className="text-muted-foreground text-sm">Review performance data and manage your sales organization.</p>
            </div>

            <Tabs defaultValue="reports" className="space-y-6">
                <TabsList className="bg-muted p-1 h-11 rounded-xl">
                    <TabsTrigger value="reports" className="px-8 rounded-lg font-bold text-xs uppercase tracking-widest">Reports</TabsTrigger>
                    <TabsTrigger value="team" className="px-8 rounded-lg font-bold text-xs uppercase tracking-widest">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="reports">
                    <ReportsView />
                </TabsContent>
                <TabsContent value="team">
                    <TeamView />
                </TabsContent>
            </Tabs>
        </div>
    )
}
