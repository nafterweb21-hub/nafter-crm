"use client"

import * as React from "react"
import {
    Search,
    Filter,
    MoreVertical,
    Phone,
    Video,
    Paperclip,
    Smile,
    Send,
    Bot,
    Globe,
    Facebook,
    Trash2,
    History,
    FileText,
    Tag,
    Sparkles,
    Plus,
    UserPlus,
    CheckCheck,
    CheckCircle2,
    Brain,
    BrainCircuit,
    Terminal,
    Mic,
    Info,
    Zap,
    Clock,
    Users,
    ChevronDown,
    MessageCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Chat {
    id: number
    name: string
    phone: string
    lastMessage: string
    time: string
    unread: number
    status: string
    avatar: string
    source: "facebook_ads" | "website" | "whatsapp"
    campaign?: string
}

const chats: Chat[] = [
    { id: 1, name: "John Doe", phone: "919876543211", lastMessage: "Great! What's the price?", time: "2 min", unread: 2, status: "Hot Lead", avatar: "JD", source: "facebook_ads", campaign: "Shopify Launch Pack" },
    { id: 2, name: "Sarah Smith", phone: "919123456789", lastMessage: "Can you deliver by tomorrow?", time: "15 min", unread: 0, status: "Qualified", avatar: "SS", source: "website", campaign: "Pricing Page" },
    { id: 3, name: "Alex Johnson", phone: "919988776655", lastMessage: "I saw your ad on Facebook.", time: "1 hour", unread: 0, status: "New Lead", avatar: "AJ", source: "facebook_ads", campaign: "Ecom FastTrack" },
    { id: 4, name: "Maria Garcia", phone: "16505551234", lastMessage: "Thanks for the details.", time: "3 hours", unread: 0, status: "Closed", avatar: "MG", source: "whatsapp", campaign: "Direct Inbound" },
]

const messages = [
    { id: 1, sender: "bot", content: "Hi Sarah! Welcome to Nafter Web Technologies. We help businesses launch Shopify stores in 24 hours 🚀", time: "10:00 AM", status: "read" },
    { id: 2, sender: "user", content: "Hi, I saw your ad about Shopify store.", time: "10:01 AM", status: "read" },
    { id: 3, sender: "bot", content: "Great! Our Shopify store package includes store setup, premium theme, and payment gateway. Would you like to see pricing?", time: "10:02 AM", status: "read" },
    { id: 4, sender: "user", content: "Yes, please. How much does it cost?", time: "10:05 AM", status: "read" },
    { id: 5, sender: "agent", content: "Hi Sarah, I'm Imran. Our Shopify package starts at ₹25,000. We can launch it by tomorrow!", time: "10:10 AM", status: "read" },
    { id: 6, sender: "user", content: "That sounds good. Can you deliver by tomorrow?", time: "10:15 AM", status: "sent" },
]
const suggestedReplies = [
    { text: "Check Shopify Pro Refund", icon: <BrainCircuit className="w-3 h-3" />, isBrain: true, source: "refund_policy.pdf" },
    { text: "Compare Basic vs Pro", icon: <BrainCircuit className="w-3 h-3" />, isBrain: true, source: "pricing_2024.url" },
    { text: "Ask for location", icon: <Tag className="w-3 h-3" />, isBrain: false },
    { text: "Send Pricing PDF", icon: <Paperclip className="w-3 h-3" />, isBrain: false },
];

const agentsList = [
    { name: "Imran Khan", avatar: "https://github.com/nutlope.png", role: "Admin" },
    { name: "Salman Rushdie", avatar: "https://avatar.vercel.sh/salman.png", role: "Senior Agent" },
    { name: "Ayesha Ahmed", avatar: "https://avatar.vercel.sh/ayesha.png", role: "Junior Agent" },
    { name: "Zaid Malik", avatar: "https://avatar.vercel.sh/zaid.png", role: "Sales Lead" },
];

export default function InboxPage() {
    const [selectedChat, setSelectedChat] = React.useState(chats[1])
    const [message, setMessage] = React.useState("")
    const [messagesList, setMessagesList] = React.useState(messages)
    const [isTyping, setIsTyping] = React.useState(false)
    const [assignedAgent, setAssignedAgent] = React.useState(agentsList[0])
    const [leadNote, setLeadNote] = React.useState("Interested in setting up a premium clothing store. Budget mentioned ₹30k. Need ASAP delivery.")
    const [tempNote, setTempNote] = React.useState(leadNote)
    const [isLeadClosed, setIsLeadClosed] = React.useState(false)
    const [isNoteModalOpen, setIsNoteModalOpen] = React.useState(false)

    const handleSendMessage = (e?: React.FormEvent, customMsg?: string) => {
        if (e) e.preventDefault()
        const textToSend = customMsg || message
        if (!textToSend.trim()) return

        const userMsg = {
            id: Date.now(),
            sender: "user",
            content: textToSend,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        }

        setMessagesList(prev => [...prev, userMsg])
        setMessage("")

        fetch("/api/messages/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: selectedChat.phone, name: selectedChat.name, text: textToSend }),
        })
            .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
                if (!ok || !data.delivered) {
                    toast.warning("Message saved, but not delivered", {
                        description: data.error || "No connected WhatsApp integration. Connect one in Settings."
                    })
                }
            })
            .catch(() => {
                toast.error("Failed to reach the messaging API")
            })

        // Simulate AI Brain Retrieval
        setIsTyping(true)
        const isBrainContext = textToSend.toLowerCase().includes("price") || textToSend.toLowerCase().includes("refund")

        setTimeout(() => {
            setIsTyping(false)
            const botMsg = {
                id: Date.now() + 1,
                sender: "bot",
                content: isBrainContext
                    ? `Retrieved from your Neural Brain: ${textToSend.includes("refund") ? "Our policy allows for a full refund within 14 days of Shopify activation." : "Our Shopify Pro plan starts at ₹25,000 for the full suite."}`
                    : `I've analyzed your request for "${textToSend}". I can certainly help with that. Would you like me to schedule a call with ${agentsList[0].name}?`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "read",
                isBrain: isBrainContext
            }
            setMessagesList(prev => [...prev, botMsg])
            toast.success(isBrainContext ? "Neural Insight Generated" : "AI Assistant suggested a reply")
        }, 1500)
    }

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
            {/* Left Column: Conversation List */}
            <div className="w-80 border-r flex flex-col bg-sidebar/30">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg leading-none">Inbox Hub</h2>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all shadow-sm"
                                onClick={() => {
                                    toast.promise(
                                        new Promise(resolve => setTimeout(resolve, 1500)),
                                        {
                                            loading: 'Listening for Meta Webhook...',
                                            success: 'New Facebook Ad Lead Captured! (ID: fb_lead_982)',
                                            error: 'Simulation Failed',
                                        }
                                    )
                                }}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-9 h-9 bg-muted/50 border-none rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary hover:bg-primary/90 rounded-full px-3 cursor-pointer">All</Badge>
                        <Badge variant="outline" className="rounded-full px-3 cursor-pointer hover:bg-muted font-medium">Unread</Badge>
                        <Badge variant="outline" className="rounded-full px-3 cursor-pointer hover:bg-muted font-medium">Assigned</Badge>
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="divide-y divide-border/40">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={cn(
                                    "p-4 flex gap-3 cursor-pointer transition-colors relative group",
                                    selectedChat?.id === chat.id ? "bg-primary/5" : "hover:bg-muted/50"
                                )}
                            >
                                {selectedChat?.id === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                                <Avatar className="h-10 w-10 border shadow-sm">
                                    <AvatarImage src={`https://avatar.vercel.sh/${chat.name}.png`} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{chat.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <span className="font-semibold text-sm truncate">{chat.name}</span>
                                            {chat.source === "facebook_ads" ?
                                                <Facebook className="w-3 h-3 text-blue-600 fill-blue-600" /> :
                                                chat.source === "website" ?
                                                    <Globe className="w-3 h-3 text-emerald-600" /> :
                                                    <MessageCircle className="w-3 h-3 text-primary" />
                                            }
                                        </div>
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate leading-relaxed">
                                        {chat.lastMessage}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-bold px-1.5 py-0 h-4 border-none uppercase tracking-tighter",
                                            chat.status === "Hot Lead" ? "bg-rose-500/10 text-rose-600" :
                                                chat.status === "Qualified" ? "bg-emerald-500/10 text-emerald-600" :
                                                    chat.status === "New Lead" ? "bg-blue-500/10 text-blue-600" :
                                                        "bg-muted text-muted-foreground"
                                        )}>
                                            {chat.status}
                                        </Badge>
                                        {chat.unread > 0 && (
                                            <span className="bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Middle Column: Chat Window */}
            <div className="flex-1 flex flex-col relative bg-card/30">

                {/* Chat Header */}
                <div className="h-16 px-6 border-b flex items-center justify-between bg-background/50 backdrop-blur sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                            <AvatarImage src={`https://avatar.vercel.sh/${selectedChat.name}.png`} />
                            <AvatarFallback>{selectedChat.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm tracking-tight">{selectedChat.name}</span>
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] h-4 uppercase font-black px-1.5">Online</Badge>
                            </div>
                            <span className="text-[10px] text-muted-foreground">Last seen just now</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:scale-95"
                            onClick={() => {
                                toast.loading(`Initiating WhatsApp Call to ${selectedChat.name}...`)
                                setTimeout(() => toast.success(`Call started with ${selectedChat.name}`), 1000)
                            }}
                        >
                            <Phone className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:scale-95"
                            onClick={() => {
                                toast.loading(`Starting Video Session with ${selectedChat.name}...`)
                                setTimeout(() => toast.success(`Video call connected`), 1500)
                            }}
                        >
                            <Video className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-border mx-1" />
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                            <UserPlus className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 text-muted-foreground hover:text-primary transition-all active:scale-90")}>
                                <MoreVertical className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 shadow-2xl p-2 bg-background/95 backdrop-blur-md">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-3 py-2 text-muted-foreground">Lead Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => toast.success("Notifications muted for John")} className="rounded-xl h-10 px-3 font-bold text-xs gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                        <Clock className="w-4 h-4" /> Mute Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.info("Lead history cleared locally")} className="rounded-xl h-10 px-3 font-bold text-xs gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                        <History className="w-4 h-4" /> Clear Local History
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="my-1 bg-border/50" />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => toast.info("Lead exported to CSV")} className="rounded-xl h-10 px-3 font-bold text-xs gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                        <FileText className="w-4 h-4" /> Export Conversation
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="my-1 bg-border/50" />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => toast.error("Contact marked as Spam")} className="rounded-xl h-10 px-3 font-bold text-xs gap-3 focus:bg-rose-500/10 focus:text-rose-600 cursor-pointer">
                                        <Trash2 className="w-4 h-4" /> Block & Report Lead
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex justify-center mb-4">
                            <Badge variant="outline" className="text-[10px] text-muted-foreground font-medium bg-muted/20 border-none px-3">Yesterday</Badge>
                        </div>
                        {messagesList.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex flex-col gap-1.5",
                                    msg.sender === "user" ? "items-start" : "items-end"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm relative group",
                                    msg.sender === "user"
                                        ? "bg-muted/80 text-foreground rounded-tl-none"
                                        : msg.sender === "bot"
                                            ? "bg-primary text-white rounded-tr-none shadow-primary/20 bg-gradient-to-br from-primary to-primary/80"
                                            : "bg-secondary text-secondary-foreground rounded-tr-none border border-border/50"
                                )}>
                                    {msg.sender === "bot" && (
                                        <div className="absolute -top-6 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Badge className="bg-white/20 text-white border-none text-[8px] h-4 backdrop-blur">AI ASSISTANT</Badge>
                                        </div>
                                    )}
                                    {msg.content}
                                </div>
                                <div className="flex items-center gap-1.5 px-1">
                                    <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">{msg.time}</span>
                                    {msg.sender !== "user" && (
                                        <CheckCheck className={cn(
                                            "w-3 h-3",
                                            msg.status === "read" ? "text-primary" : "text-muted-foreground/50"
                                        )} />
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center gap-2 text-primary/60 text-[10px] font-black animate-pulse pb-4 uppercase tracking-widest pl-1">
                                <Bot className="w-3.5 h-3.5" />
                                AI is analyzing...
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-background/50 backdrop-blur-md border-t">
                    <div className="max-w-3xl mx-auto space-y-3">

                        {/* AI Suggestion Bar */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[8px] font-black uppercase tracking-widest mr-1 shrink-0">
                                <Brain className="w-2.5 h-2.5" />
                                AI Suggestions
                            </div>
                            {suggestedReplies.map((reply, i) => (
                                <Button
                                    key={i}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSendMessage(undefined, reply.text)}
                                    className={cn(
                                        "h-7 text-[10px] gap-1.5 rounded-full shrink-0 transition-all font-bold",
                                        reply.isBrain
                                            ? "bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20 shadow-sm"
                                            : "border-border/50 bg-background/50 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                                    )}
                                >
                                    {reply.icon}
                                    {reply.text}
                                    {reply.isBrain && <Badge className="h-3 text-[7px] p-0 px-1 bg-emerald-500 text-white border-none uppercase font-black">BRAIN</Badge>}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-end gap-2">
                            <div className="flex-1 bg-muted/50 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-background transition-all p-1.5 flex items-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0 rounded-full">
                                    <Smile className="w-5 h-5" />
                                </Button>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSendMessage()
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none max-h-32 min-h-[40px] outline-none"
                                    rows={1}
                                />
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0 rounded-full">
                                    <Paperclip className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="flex shrink-0">
                                {message ? (
                                    <Button onClick={() => handleSendMessage()} size="icon" className="h-10 w-10 rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                                        <Send className="w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary">
                                        <Mic className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contact Profile */}
            <div className="w-72 border-l flex flex-col bg-background overflow-hidden relative group">
                <ScrollArea className="flex-1">
                    <div className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4 mb-8">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                                <AvatarImage src={`https://avatar.vercel.sh/${selectedChat.name}.png`} />
                                <AvatarFallback className="text-2xl">{selectedChat.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg leading-none">{selectedChat.name}</h3>
                                <p className="text-[11px] text-muted-foreground font-mono tracking-tight">+{selectedChat.phone}</p>
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <Badge className="bg-primary/10 text-primary border-none text-[9px] hover:bg-primary/20 px-2 transition-all cursor-pointer">Shopify Lead</Badge>
                                    {selectedChat.source === "facebook_ads" && <Badge className="bg-blue-500/10 text-blue-600 border-none text-[9px] px-2">META ADS</Badge>}
                                    {selectedChat.source === "website" && <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] px-2">WEBSITE</Badge>}
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6 opacity-50" />

                        <div className="space-y-6">
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">About Lead</h4>
                                    <Info className="w-3.5 h-3.5 text-muted-foreground/40" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                                            <Tag className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Source</p>
                                            <p className="text-xs font-semibold">{selectedChat.source === "facebook_ads" ? "Facebook Click-to-WhatsApp" : selectedChat.source === "website" ? "Website Inbound" : "Direct WhatsApp"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                                            <Zap className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Campaign Info</p>
                                            <p className="text-xs font-semibold">{selectedChat.campaign || "Inbound Flow"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                            <Clock className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Last Interaction</p>
                                            <p className="text-xs font-semibold">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                            <Users className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Assigned Agent</p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="w-full flex items-center justify-between mt-1 cursor-pointer group/agent p-1 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <Avatar className="h-5 w-5 border shadow-sm transition-transform group-hover/agent:scale-110">
                                                            <AvatarImage src={assignedAgent.avatar} />
                                                            <AvatarFallback>{assignedAgent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[11px] font-bold transition-colors group-hover/agent:text-primary">{assignedAgent.name}</span>
                                                    </div>
                                                    <ChevronDown className="w-3 h-3 text-muted-foreground group-hover/agent:text-primary transition-colors" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-48 rounded-2xl border-border/50 shadow-2xl p-2 bg-background/95 backdrop-blur-md">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest px-3 py-2 text-muted-foreground">Select Team Member</DropdownMenuLabel>
                                                        {agentsList.map((agent) => (
                                                            <DropdownMenuItem
                                                                key={agent.name}
                                                                onClick={() => {
                                                                    setAssignedAgent(agent)
                                                                    toast.success(`Broadcasting assignment: ${selectedChat.name} assigned to ${agent.name}`)
                                                                }}
                                                                className={cn(
                                                                    "rounded-xl h-10 px-3 font-bold text-[11px] gap-2 focus:bg-primary/5 focus:text-primary cursor-pointer",
                                                                    assignedAgent.name === agent.name && "bg-primary/10 text-primary"
                                                                )}
                                                            >
                                                                <Avatar className="h-4 w-4 border">
                                                                    <AvatarImage src={agent.avatar} />
                                                                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                                                                </Avatar>
                                                                {agent.name}
                                                                <span className="ml-auto text-[8px] opacity-70 border px-1 rounded-md font-black bg-muted/20">{agent.role}</span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator className="opacity-50" />

                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lead Intelligence</h4>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] h-3.5 px-1 font-black">AI VERIFIED</Badge>
                                </div>
                                <div className="space-y-3 p-4 rounded-2xl bg-muted/20 border border-border/40 relative overflow-hidden group/intel">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -mr-8 -mt-8 blur-xl group-hover/intel:bg-emerald-500/10 transition-colors" />
                                    <div className="space-y-1 relative z-10">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-muted-foreground">Lead Health</span>
                                            <span className="text-emerald-600">85%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                                        Highly likely to convert within 48h. Interested in Shopify Pro & SEO.
                                    </p>
                                </div>
                            </section>

                            <Separator className="opacity-50" />

                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Notes</h4>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-primary hover:bg-primary/10 transition-all shadow-sm"
                                        onClick={() => {
                                            setTempNote(leadNote)
                                            setIsNoteModalOpen(true)
                                        }}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </Button>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl border border-dashed text-[11px] text-muted-foreground leading-relaxed italic group/note relative overflow-hidden transition-all hover:bg-muted/50 cursor-pointer"
                                    onClick={() => {
                                        setTempNote(leadNote)
                                        setIsNoteModalOpen(true)
                                    }}
                                >
                                    &quot;{leadNote}&quot;
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/note:opacity-100 transition-opacity pointer-events-none" />
                                </div>

                                <Dialog open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
                                    <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-background/95 backdrop-blur-xl p-8 shadow-2xl">
                                        <DialogHeader>
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-xl shadow-primary/5">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <DialogTitle className="text-xl font-black tracking-tighter">Edit Lead Intelligence</DialogTitle>
                                            <p className="text-xs text-muted-foreground font-medium">Update specialized notes and insights captured for this lead.</p>
                                        </DialogHeader>
                                        <div className="py-6">
                                            <Textarea
                                                value={tempNote}
                                                onChange={(e) => setTempNote(e.target.value)}
                                                className="min-h-[150px] rounded-2xl border-border/50 bg-muted/30 focus:bg-background transition-all p-4 text-xs font-medium leading-relaxed resize-none border-dashed"
                                                placeholder="Enter observations, requirements or budget details..."
                                            />
                                        </div>
                                        <DialogFooter className="gap-3 mt-4 -mx-8 -mb-8 p-8 items-center border-t bg-muted/20 sm:justify-end">
                                            <Button
                                                variant="ghost"
                                                className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest px-6 hover:bg-muted/50 transition-all active:scale-95"
                                                onClick={() => setIsNoteModalOpen(false)}
                                            >
                                                Discard
                                            </Button>
                                            <Button
                                                className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest px-10 shadow-xl shadow-primary/20 transition-all active:scale-95"
                                                onClick={() => {
                                                    setLeadNote(tempNote)
                                                    setIsNoteModalOpen(false)
                                                    toast.success("Intelligence successfully updated")
                                                }}
                                            >
                                                Save Changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </section>

                            <section className="pt-4">
                                <Button
                                    className={cn(
                                        "w-full rounded-xl h-10 shadow-lg transition-all active:scale-95 font-bold uppercase tracking-tighter text-[10px] h-11",
                                        isLeadClosed
                                            ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200"
                                            : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                                    )}
                                    onClick={() => {
                                        setIsLeadClosed(!isLeadClosed)
                                        toast.success(isLeadClosed ? "Lead re-opened" : "Lead marked as CLOSED & WON")
                                    }}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    {isLeadClosed ? "Re-open Lead" : "Mark as Closed"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full mt-3 rounded-xl h-11 border-border/50 hover:bg-muted font-bold text-[10px] uppercase tracking-tighter transition-all active:scale-95"
                                    onClick={() => {
                                        toast.loading("Fetching agent availability...")
                                        setTimeout(() => toast.success("Google Calendar sync successful! Meeting link sent."), 1500)
                                    }}
                                >
                                    <Clock className="w-4 h-4 mr-2" />
                                    Schedule Call
                                </Button>
                            </section>
                        </div>
                    </div>
                </ScrollArea>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-12 bg-muted/20 border-l border-y rounded-l-md flex items-center justify-center cursor-pointer group-hover:bg-muted/40 transition-colors">
                    <ChevronDown className="w-4 h-4 text-muted-foreground rotate-90" />
                </div>
            </div>
        </div>
    )
}
