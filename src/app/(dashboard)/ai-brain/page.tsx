"use client"

import * as React from "react"
import {
    Brain,
    FileUp,
    Globe,
    FileText,
    Zap,
    Plus,
    Trash2,
    Search,
    RefreshCw,
    PlayCircle,
    CheckCircle,
    Info,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Terminal
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const initialKnowledgeSources = [
    { id: 1, type: "pdf", name: "Shopify_Pricing_2024.pdf", size: "12.4 MB", status: "Synced", chunks: 142, lastSync: "2h ago" },
    { id: 2, type: "url", name: "https://nafter.in/pricing", size: "8 Pages", status: "Synced", chunks: 85, lastSync: "5h ago" },
    { id: 3, type: "text", name: "Refund Policy Snippet", size: "1.2 KB", status: "Synced", chunks: 12, lastSync: "Just now" },
]

export default function AIBrainPage() {
    const [sources, setSources] = React.useState(initialKnowledgeSources)
    const [isIngesting, setIsIngesting] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [searchQuery, setSearchQuery] = React.useState("")

    // Modals State
    const [isSnippetModalOpen, setIsSnippetModalOpen] = React.useState(false)
    const [isUrlModalOpen, setIsUrlModalOpen] = React.useState(false)
    const [newSnippet, setNewSnippet] = React.useState({ name: "", content: "" })
    const [newUrl, setNewUrl] = React.useState("")

    // Playground State
    const [chatHistory, setChatHistory] = React.useState([
        { sender: "bot", text: "Hello Imran! I'm your AI Brain playground. I can answer questions based strictly on the knowledge you've provided. What would you like to verify today?", timestamp: "10:00 AM" }
    ])
    const [userInput, setUserInput] = React.useState("")
    const [isTyping, setIsTyping] = React.useState(false)

    const handleUpload = () => {
        setIsIngesting(true)
        setProgress(0)
        toast.promise(
            new Promise(async (resolve) => {
                let currentProgress = 0
                const interval = setInterval(() => {
                    currentProgress += 10
                    setProgress(currentProgress)
                    if (currentProgress >= 100) {
                        clearInterval(interval)
                        const newSource = {
                            id: Date.now(),
                            type: "pdf",
                            name: "New_Document_Uploaded.pdf",
                            size: "4.5 MB",
                            status: "Synced",
                            chunks: 42,
                            lastSync: "Just now"
                        }
                        setSources(prev => [newSource, ...prev])
                        resolve(true)
                    }
                }, 200)
            }),
            {
                loading: "Segmenting & Vectorizing Document...",
                success: () => {
                    setIsIngesting(false)
                    return "Knowledge Successfully Synced to AI Brain"
                },
                error: "Ingestion Failed"
            }
        )
    }

    const handleAddSnippet = () => {
        if (!newSnippet.name || !newSnippet.content) {
            toast.error("Please fill in both name and content")
            return
        }
        setIsSnippetModalOpen(false)
        setIsIngesting(true)
        setProgress(0)

        toast.promise(
            new Promise(async (resolve) => {
                let p = 0
                const interval = setInterval(() => {
                    p += 20
                    setProgress(p)
                    if (p >= 100) {
                        clearInterval(interval)
                        const ns = {
                            id: Date.now(),
                            type: "text",
                            name: newSnippet.name,
                            size: `${(newSnippet.content.length / 1024).toFixed(1)} KB`,
                            status: "Synced",
                            chunks: Math.ceil(newSnippet.content.length / 100),
                            lastSync: "Just now"
                        }
                        setSources(prev => [ns, ...prev])
                        setNewSnippet({ name: "", content: "" })
                        resolve(true)
                    }
                }, 150)
            }),
            {
                loading: "Analyzing Snippet Context...",
                success: () => {
                    setIsIngesting(false)
                    return "Snippet added to AI Brain"
                }
            }
        )
    }

    const handleSyncUrl = () => {
        if (!newUrl) {
            toast.error("Please enter a valid URL")
            return
        }
        setIsUrlModalOpen(false)
        setIsIngesting(true)
        setProgress(0)

        toast.promise(
            new Promise(async (resolve) => {
                let p = 0
                const interval = setInterval(() => {
                    p += 10
                    setProgress(p)
                    if (p >= 100) {
                        clearInterval(interval)
                        const ns = {
                            id: Date.now(),
                            type: "url",
                            name: newUrl.replace('https://', '').replace('http://', ''),
                            size: "Calculating...",
                            status: "Synced",
                            chunks: 120,
                            lastSync: "Just now"
                        }
                        setSources(prev => [ns, ...prev])
                        setNewUrl("")
                        resolve(true)
                    }
                }, 300)
            }),
            {
                loading: "Crawling Website Data...",
                success: () => {
                    setIsIngesting(false)
                    return "URL Synced to AI Brain"
                }
            }
        )
    }

    const handleDeleteSource = (id: number) => {
        setSources(prev => prev.filter(s => s.id !== id))
        toast.success("Knowledge removed from brain")
    }

    const filteredSources = sources.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSendMessage = () => {
        if (!userInput.trim()) return

        const newMessage = { sender: "user", text: userInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        setChatHistory(prev => [...prev, newMessage])
        setUserInput("")
        setIsTyping(true)

        // Simulate AI Response
        setTimeout(() => {
            const botResponse = {
                sender: "bot",
                text: `Based on your uploaded knowledge (${sources[0]?.name || "general context"}), I can confirm that ${userInput.toLowerCase().includes('price') ? "the requested pricing details are accurate as per the 2024 catalog." : "I have processed your request using the verified context atoms."}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setChatHistory(prev => [...prev, botResponse])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">

            {/* Header: Brain Health & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/5 border border-primary/20">
                            <Brain className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-foreground">AI Neural Center</h1>
                            <p className="text-muted-foreground font-medium text-sm">Teach your bot about products, policies, and pricing.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-[2rem] border border-border/50 backdrop-blur-sm">
                    <BrainStat label="Neural Health" value="84%" color="text-emerald-500" />
                    <Separator orientation="vertical" className="h-8 bg-border/50" />
                    <BrainStat label="Total Chunks" value="239" color="text-primary" />
                    <Separator orientation="vertical" className="h-8 bg-border/50" />
                    <Button
                        size="sm"
                        className="rounded-full h-8 px-4 bg-primary text-white font-black text-[10px] uppercase shadow-lg shadow-primary/20"
                        onClick={() => toast.success("AI Knowledge Recalibrated")}
                    >
                        Optimize Model
                    </Button>
                </div>
            </div>

            {/* Ingestion Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Input Sources */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Expand Knowledge</h3>

                        <SourceActionCard
                            icon={<FileUp className="w-5 h-5" />}
                            title="Upload PDFs"
                            desc="Product catalogs, guides, policies"
                            onClick={handleUpload}
                        />
                        <SourceActionCard
                            icon={<Globe className="w-5 h-5" />}
                            title="Sync Website"
                            desc="Automatically crawl URLs"
                            onClick={() => setIsUrlModalOpen(true)}
                        />
                        <SourceActionCard
                            icon={<Plus className="w-5 h-5" />}
                            title="Add Snippet"
                            desc="Paste custom text chunks"
                            onClick={() => setIsSnippetModalOpen(true)}
                        />
                    </div>

                    <Card className="border-border/50 shadow-sm bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[2rem] p-6 border-dashed">
                        <div className="flex flex-col items-center text-center space-y-4 py-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black tracking-tight">Auto-Update Brain</h4>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    Sync daily to ensure your sales bot always has the latest pricing data.
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full text-[10px] font-black uppercase h-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                                Enable Auto-Sync
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right: Knowledge Management */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Active Ingestion Status */}
                    {isIngesting && (
                        <Card className="border-primary/20 bg-primary/5 shadow-none rounded-[2rem] p-6 animate-in slide-in-from-top-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                                    <span className="text-xs font-black uppercase tracking-widest">Neural Ingestion in Progress...</span>
                                </div>
                                <span className="text-xs font-black text-primary">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2 bg-primary/10" />
                        </Card>
                    )}

                    <Card className="border-border/50 shadow-xl shadow-gray-100/30 rounded-[2.5rem] bg-background">
                        <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b border-border/40">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black tracking-tight">Knowledge Dashboard</CardTitle>
                                <CardDescription className="text-xs">Manage and audit the bot's learned resources.</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                <Input
                                    placeholder="Search knowledge..."
                                    className="pl-9 h-9 bg-muted/50 border-none rounded-full text-xs"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px]">
                                <div className="divide-y divide-border/40">
                                    {filteredSources.length === 0 ? (
                                        <div className="p-20 text-center space-y-2 opacity-40">
                                            <Search className="w-8 h-8 mx-auto" />
                                            <p className="text-xs font-bold uppercase tracking-widest">No matching knowledge found</p>
                                        </div>
                                    ) : filteredSources.map((source) => (
                                        <div key={source.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                                    source.type === 'pdf' ? "bg-rose-500/10 text-rose-600" :
                                                        source.type === 'url' ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"
                                                )}>
                                                    {source.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                                                        source.type === 'url' ? <Globe className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h4 className="text-sm font-bold tracking-tight">{source.name}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                                        <span>{source.size}</span>
                                                        <Separator orientation="vertical" className="h-2" />
                                                        <span>{source.chunks} Context Atoms</span>
                                                        <Separator orientation="vertical" className="h-2" />
                                                        <span>Synced {source.lastSync}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className={cn(
                                                    "text-[9px] font-black px-2 h-5 border-none",
                                                    source.status === 'Synced' ? "bg-emerald-500/10 text-emerald-600 uppercase tracking-widest" : "bg-primary/10 text-primary animate-pulse"
                                                )}>
                                                    {source.status === 'Synced' ? <CheckCircle className="w-2.5 h-2.5 mr-1" /> : <RefreshCw className="w-2.5 h-2.5 mr-1 animate-spin" />}
                                                    {source.status}
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-50 rounded-full"
                                                    onClick={() => handleDeleteSource(source.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Neural Playground: Chat Box */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 overflow-hidden relative group shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -mr-64 -mt-64 opacity-50 transition-opacity duration-1000 group-hover:opacity-80" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/10">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Neural Playground</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
                            Intercept & Audit <br /> your Bot's Logic.
                        </h2>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                            Use the playground to ask your Bot questions based ONLY on the knowledge you've uploaded. Ensure 100% accuracy before deployment.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Button className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase shadow-xl shadow-primary/20 transition-all active:scale-95">
                                Start Testing
                                <PlayCircle className="w-4 h-4 ml-2" />
                            </Button>
                            <div className="flex items-center gap-2 px-4 h-12 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Verified Context Only
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[280px] flex flex-col shadow-2xl overflow-hidden">
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4 pt-2">
                                {chatHistory.map((msg, i) => (
                                    <TestMessage key={i} sender={msg.sender as any} text={msg.text} />
                                ))}
                                {isTyping && (
                                    <div className="flex gap-2 pl-8 animate-pulse text-[10px] text-primary font-bold uppercase tracking-widest">
                                        AI is thinking...
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="mt-4 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 gap-3">
                            <Terminal className="w-4 h-4 text-primary" />
                            <input
                                className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-500"
                                placeholder="Ask a question..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="w-6 h-6 rounded-lg bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-all active:scale-90"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Dialog open={isSnippetModalOpen} onOpenChange={setIsSnippetModalOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
                    <div className="p-8 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tight">Add Knowledge Snippet</DialogTitle>
                            <DialogDescription className="text-xs font-medium">Paste text here for the AI to learn. Perfect for refund policies or specific FAQs.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Document Title</label>
                                <Input
                                    placeholder="e.g. Refund Policy 2024"
                                    className="rounded-xl h-12 bg-muted/50 border-none text-sm"
                                    value={newSnippet.name}
                                    onChange={(e) => setNewSnippet(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Content Snippet</label>
                                <Textarea
                                    placeholder="Paste your text here..."
                                    className="rounded-xl min-h-[150px] bg-muted/50 border-none text-xs resize-none"
                                    value={newSnippet.content}
                                    onChange={(e) => setNewSnippet(prev => ({ ...prev, content: e.target.value }))}
                                />
                            </div>
                        </div>
                        <DialogFooter className="gap-3">
                            <Button variant="ghost" onClick={() => setIsSnippetModalOpen(false)} className="rounded-xl font-bold uppercase text-[10px] tracking-widest">Cancel</Button>
                            <Button onClick={handleAddSnippet} className="rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest px-8 shadow-lg shadow-primary/20">Sync to Brain</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isUrlModalOpen} onOpenChange={setIsUrlModalOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
                    <div className="p-8 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tight">Sync Website Knowledge</DialogTitle>
                            <DialogDescription className="text-xs font-medium">The brain will crawl this URL and vectorize its content.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Target URL</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                <Input
                                    placeholder="https://example.com/pricing"
                                    className="pl-11 rounded-xl h-14 bg-muted/50 border-none text-sm"
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSyncUrl} className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">Start Intelligent Crawl</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function BrainStat({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="px-6 space-y-0.5">
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">{label}</p>
            <h4 className={cn("text-2xl font-black tracking-tighter leading-none", color)}>{value}</h4>
        </div>
    )
}

function SourceActionCard({ icon, title, desc, onClick }: { icon: any; title: string, desc: string, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="p-5 rounded-[1.75rem] bg-background border border-border/50 shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group flex items-start gap-4"
        >
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="space-y-0.5">
                <h4 className="text-sm font-black tracking-tight leading-none pt-1">{title}</h4>
                <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">{desc}</p>
            </div>
            <div className="ml-auto pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-primary" />
            </div>
        </div>
    )
}

function TestMessage({ sender, text }: { sender: "user" | "bot"; text: string }) {
    return (
        <div className={cn(
            "flex gap-3 animate-in slide-in-from-bottom-2",
            sender === "bot" ? "pl-8" : "pr-8"
        )}>
            <div className={cn(
                "p-3 rounded-2xl text-[11px] font-medium leading-relaxed",
                sender === "bot" ? "bg-primary text-white ml-auto rounded-tr-none" : "bg-white/10 text-slate-300 rounded-tl-none border border-white/5"
            )}>
                {text}
            </div>
        </div>
    )
}
