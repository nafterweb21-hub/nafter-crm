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
    Mic,
    Sparkles,
    Info,
    CheckCheck,
    UserPlus,
    Tag,
    Clock,
    ChevronDown,
    Plus,
    Users
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const chats = [
    { id: 1, name: "John Doe", lastMessage: "Great! What's the price?", time: "2 min", unread: 2, status: "Hot Lead", avatar: "JD" },
    { id: 2, name: "Sarah Smith", lastMessage: "Can you deliver by tomorrow?", time: "15 min", unread: 0, status: "Qualified", avatar: "SS" },
    { id: 3, name: "Alex Johnson", lastMessage: "I saw your ad on Facebook.", time: "1 hour", unread: 0, status: "New Lead", avatar: "AJ" },
    { id: 4, name: "Maria Garcia", lastMessage: "Thanks for the details.", time: "3 hours", unread: 0, status: "Closed", avatar: "MG" },
    { id: 5, name: "David Miller", lastMessage: "How do I pay?", time: "5 hours", unread: 1, status: "Hot Lead", avatar: "DM" },
]

const messages = [
    { id: 1, sender: "bot", content: "Hi Sarah! Welcome to Nafter Web Technologies. We help businesses launch Shopify stores in 24 hours 🚀", time: "10:00 AM", status: "read" },
    { id: 2, sender: "user", content: "Hi, I saw your ad about Shopify store.", time: "10:01 AM", status: "read" },
    { id: 3, sender: "bot", content: "Great! Our Shopify store package includes store setup, premium theme, and payment gateway. Would you like to see pricing?", time: "10:02 AM", status: "read" },
    { id: 4, sender: "user", content: "Yes, please. How much does it cost?", time: "10:05 AM", status: "read" },
    { id: 5, sender: "agent", content: "Hi Sarah, I'm Imran. Our Shopify package starts at ₹25,000. We can launch it by tomorrow!", time: "10:10 AM", status: "read" },
    { id: 6, sender: "user", content: "That sounds good. Can you deliver by tomorrow?", time: "10:15 AM", status: "sent" },
]

export default function InboxPage() {
    const [selectedChat, setSelectedChat] = React.useState(chats[1])
    const [message, setMessage] = React.useState("")

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">

            {/* Left Column: Conversation List */}
            <div className="w-80 border-r flex flex-col bg-sidebar/30">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg">Messages</h2>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
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
                                        <span className="font-semibold text-sm truncate">{chat.name}</span>
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
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                            <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                            <Video className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-border mx-1" />
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                            <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex justify-center mb-4">
                            <Badge variant="outline" className="text-[10px] text-muted-foreground font-medium bg-muted/20 border-none px-3">Yesterday</Badge>
                        </div>
                        {messages.map((msg) => (
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
                        <div className="flex items-center gap-2 text-muted-foreground/60 text-[10px] font-medium animate-pulse pb-4">
                            <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" />
                            Customer is typing...
                        </div>
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-background/50 backdrop-blur-md border-t">
                    <div className="max-w-3xl mx-auto space-y-3">

                        {/* AI Suggestion Bar */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary rounded-full shrink-0">
                                <Sparkles className="w-3 h-3" />
                                Ask for location
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary rounded-full shrink-0">
                                <Sparkles className="w-3 h-3" />
                                Check inventory
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary rounded-full shrink-0">
                                <Sparkles className="w-3 h-3" />
                                Suggest Shopify Plus
                            </Button>
                        </div>

                        <div className="flex items-end gap-2">
                            <div className="flex-1 bg-muted/50 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-background transition-all p-1.5 flex items-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary shrink-0 rounded-full">
                                    <Smile className="w-5 h-5" />
                                </Button>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
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
                                    <Button size="icon" className="h-10 w-10 rounded-full shadow-lg shadow-primary/20">
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
                                <p className="text-[11px] text-muted-foreground font-mono tracking-tight">+91 98765 43210</p>
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <Badge className="bg-primary/10 text-primary border-none text-[9px] hover:bg-primary/20 px-2">Shopify Lead</Badge>
                                    <Badge className="bg-orange-500/10 text-orange-600 border-none text-[9px] hover:bg-orange-500/20 px-2">Urgent</Badge>
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
                                        <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                            <Tag className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Source</p>
                                            <p className="text-xs font-semibold">Facebook Ads (Shopify LP)</p>
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
                                        <div>
                                            <p className="text-[10px] text-muted-foreground leading-none mb-1">Assigned Agent</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Avatar className="h-4 w-4">
                                                    <AvatarImage src="/avatars/user.png" />
                                                    <AvatarFallback>IK</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-semibold">Imran Khan</span>
                                                <ChevronDown className="w-3 h-3 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator className="opacity-50" />

                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Notes</h4>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Plus className="w-3 h-3 text-primary" />
                                    </Button>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl border border-dashed text-[11px] text-muted-foreground leading-relaxed italic">
                                    "Interested in setting up a premium clothing store. Budget mentioned ₹30k. Need ASAP delivery."
                                </div>
                            </section>

                            <section className="pt-4">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 shadow-lg shadow-primary/20">
                                    Mark as Closed
                                </Button>
                                <Button variant="outline" className="w-full mt-2 rounded-xl h-10 border-border/50 hover:bg-muted font-semibold text-xs">
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
