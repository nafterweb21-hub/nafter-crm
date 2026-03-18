"use client"

import * as React from "react"
import {
    Bot,
    Sparkles,
    Upload,
    FileText,
    BrainCircuit,
    TrendingUp,
    Settings2,
    CheckCircle,
    XCircle,
    Zap,
    BookOpen,
    History,
    AlertCircle,
    BarChart2,
    Trash2
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts"
import { cn } from "@/lib/utils"

const aiData = [
    { time: "9 AM", accuracy: 88, response: 92 },
    { time: "11 AM", accuracy: 92, response: 85 },
    { time: "1 PM", accuracy: 95, response: 90 },
    { time: "3 PM", accuracy: 90, response: 94 },
    { time: "5 PM", accuracy: 94, response: 92 },
    { time: "7 PM", accuracy: 96, response: 95 },
]

const trainingConversations = [
    { id: 1, question: "Can I integrate my ERP with your Shopify service?", aiAnswer: "Currently, we specialize in Shopify setup and theme customization. For ERP integrations, I can connect you with a specialist.", score: "95%", status: "Approved" },
    { id: 2, question: "What are your weekend working hours?", aiAnswer: "Our team is available 24/7 for Shopify emergency support, but standard development happens Mon-Fri.", score: "88%", status: "Review" },
    { id: 3, question: "Do you offer SEO with the ₹25k package?", aiAnswer: "Yes, the ₹25,000 package includes basic on-page SEO optimization and Google Analytics setup.", score: "92%", status: "Approved" },
    { id: 4, question: "How many products can you upload for me?", aiAnswer: "We assist with uploading up to 50 products initially to get your store live quickly!", score: "72%", status: "Correction" },
]

export default function AiBotPage() {
    return (
        <div className="p-6 space-y-8 animate-in slide-in-from-bottom-2 duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/30">
                        <Bot className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            AI Sales Intelligence
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] h-4 tracking-[0.2em] font-black uppercase">v2.4 LTS</Badge>
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">Monitoring and training your AI Sales Agents at Nafter Web.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-10 rounded-xl px-4 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all font-bold text-xs uppercase tracking-widest gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Optimize RAG
                    </Button>
                    <Button className="h-10 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-wider gap-2">
                        <History className="w-3.5 h-3.5" />
                        Sync Knowledge
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Resolves" value="12,540" icon={<Zap />} trend="+14.2%" color="text-amber-500" />
                <StatCard title="AI Accuracy" value="94.8%" icon={<BrainCircuit />} trend="+2.1%" color="text-indigo-500" />
                <StatCard title="Response Rate" value="1.2s" icon={<TrendingUp />} trend="-0.4s" color="text-emerald-500" />
            </div>

            <Tabs defaultValue="training" className="space-y-6">
                <TabsList className="bg-muted/50 p-1.5 h-12 rounded-2xl border border-border/50">
                    <TabsTrigger value="analytics" className="px-6 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold text-xs uppercase tracking-widest gap-2">
                        <BarChart2 className="w-3.5 h-3.5" /> Analytics
                    </TabsTrigger>
                    <TabsTrigger value="training" className="px-6 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold text-xs uppercase tracking-widest gap-2">
                        <BrainCircuit className="w-3.5 h-3.5" /> Response Training
                    </TabsTrigger>
                    <TabsTrigger value="knowledge" className="px-6 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold text-xs uppercase tracking-widest gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> Knowledge Base
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="training" className="space-y-6">
                    <Card className="border-border/50 bg-background/50 backdrop-blur shadow-sm overflow-hidden">
                        <CardHeader className="border-b bg-muted/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-base font-black uppercase tracking-widest">Bot Feedback Loop</CardTitle>
                                    <CardDescription className="text-xs">Review and approve AI generated responses from recent chats.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Search queries..." className="h-8 w-48 text-[11px] bg-background border-border/50" />
                                    <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold px-3 uppercase tracking-tighter">Filter</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/10">
                                    <TableRow className="border-border/30 hover:bg-transparent">
                                        <TableHead className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]">Customer Inquiry</TableHead>
                                        <TableHead className="py-3 text-[10px] font-black uppercase tracking-[0.2em]">AI Generated Reply</TableHead>
                                        <TableHead className="py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center">Confidence</TableHead>
                                        <TableHead className="py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center">Status</TableHead>
                                        <TableHead className="px-6 py-3 text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {trainingConversations.map((row) => (
                                        <TableRow key={row.id} className="border-border/20 group hover:bg-muted/20 transition-all">
                                            <TableCell className="px-6 py-4 max-w-[200px]">
                                                <p className="text-xs font-bold leading-relaxed">{row.question}</p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="bg-primary/5 border border-primary/10 p-3 rounded-xl max-w-md relative group-hover:bg-primary/10 transition-colors">
                                                    <p className="text-xs text-muted-foreground leading-relaxed italic">&quot;{row.aiAnswer}&quot;</p>
                                                    <div className="absolute -right-2 -top-2 scale-0 group-hover:scale-100 transition-transform">
                                                        <Badge className="bg-primary text-white h-5 border-none shadow-lg">READY</Badge>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-center">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <span className="text-xs font-black text-primary">{row.score}</span>
                                                    <div className="w-12 h-1 bg-muted rounded-full">
                                                        <div className="h-full bg-primary rounded-full shadow-sm" style={{ width: row.score }} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-center">
                                                <Badge className={cn(
                                                    "text-[9px] font-black uppercase tracking-tighter px-2 h-5 border-none",
                                                    row.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
                                                        row.status === "Review" ? "bg-amber-500/10 text-amber-600" :
                                                            "bg-rose-500/10 text-rose-600"
                                                )}>
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-500/10"><CheckCircle className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-500/10"><XCircle className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Settings2 className="w-4 h-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="knowledge" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1 border-border/50 bg-background/50 shadow-sm flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-primary/50 transition-all border-dashed border-2">
                        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 mb-6 border border-primary/10">
                            <Upload className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-black tracking-tight mb-2">Upload Knowledge</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">Drop PDFs, Docx, or CSV files to train your bot on product catalogs and sales scripts.</p>
                        <div className="mt-8 flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] font-mono border-muted">MAX 100MB</Badge>
                            <Badge variant="outline" className="text-[10px] font-mono border-muted">RAG INDEXED</Badge>
                        </div>
                    </Card>

                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-border/50 bg-background/50 shadow-sm h-full">
                            <CardHeader className="flex flex-row items-center justify-between pb-6">
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest leading-none">Knowledge Sources</CardTitle>
                                    <CardDescription className="text-xs font-medium mt-1">Files currently powering the AI bot.</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5">Manage All</Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <KnowledgeFile name="Shopify_Service_Catalog_2024.pdf" size="2.4 MB" date="2 days ago" type="pdf" />
                                <KnowledgeFile name="Nafter_Web_Pricing_V3.docx" size="1.1 MB" date="5 days ago" type="doc" />
                                <KnowledgeFile name="Competitor_Comparison.csv" size="450 KB" date="1 week ago" type="csv" />
                                <KnowledgeFile name="FAQ_Customer_Objections.pdf" size="3.8 MB" date="1 month ago" type="pdf" />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-border/50 bg-background/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Inference Performance</CardTitle>
                            <CardDescription className="text-xs">Real-time accuracy vs response time metrics</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={aiData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: '1px solid oklch(0.9 0.02 285)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                                    />
                                    <Line type="monotone" dataKey="accuracy" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-primary)" }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="response" stroke="oklch(0.55 0.25 25)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-1 border-border/50 bg-background/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest pb-1">AI Health Check</CardTitle>
                            <CardDescription className="text-xs">System status and resource usage</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <HealthRow label="LLM Inference" value="Stable" color="bg-emerald-500" />
                            <HealthRow label="Vector DB Sync" value="98%" color="bg-emerald-500" />
                            <HealthRow label="Embedding Latency" value="245ms" color="bg-amber-500" />
                            <HealthRow label="API Queue" value="Normal" color="bg-emerald-500" />

                            <div className="pt-4 mt-6 border-t border-border/50">
                                <div className="rounded-xl bg-orange-500/5 border border-orange-500/20 p-4 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Training Alert</span>
                                    </div>
                                    <p className="text-[11px] text-orange-700/80 leading-relaxed font-medium">Accuracy dropped by 4% in &quot;Shopify Pricing&quot; category. Recommend uploading updated pricing sheet.</p>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase h-8 rounded-lg shadow-lg shadow-orange-500/20">Remediate Now</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function StatCard({ title, value, icon, trend, color }: {
    title: string;
    value: string;
    icon: React.ReactElement<{ size?: number }>;
    trend: string;
    color: string;
}) {
    return (
        <Card className="border-border/50 bg-background/50 backdrop-blur shadow-sm group hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{title}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black tracking-tight">{value}</h3>
                        <span className={cn("text-[10px] font-black px-1.5 py-0 rounded", trend.startsWith('+') ? "text-emerald-600 bg-emerald-500/10" : "text-rose-600 bg-rose-500/10")}>{trend}</span>
                    </div>
                </div>
                <div className={cn("p-4 rounded-2xl bg-muted/30 group-hover:scale-110 transition-all duration-500", color)}>
                    {React.cloneElement(icon, { size: 24 })}
                </div>
            </CardContent>
        </Card>
    )
}

function KnowledgeFile({ name, size, date, type }: {
    name: string;
    size: string;
    date: string;
    type: 'pdf' | 'doc' | 'csv' | string;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all group">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm",
                    type === 'pdf' ? 'bg-rose-500' : type === 'doc' ? 'bg-blue-500' : 'bg-emerald-500'
                )}>
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs font-bold truncate max-w-[180px]">{name}</p>
                    <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">{size} • {date}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3.5 h-3.5" />
            </Button>
        </div>
    )
}

function HealthRow({ label, value, color }: {
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-xs font-black">{value}</span>
                <div className={cn("w-2 h-2 rounded-full", color)} />
            </div>
        </div>
    )
}
