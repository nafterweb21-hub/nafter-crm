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
    Search,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Tag as TagIcon } from "lucide-react"
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"

interface NodeTemplate {
    id: number
    type: "trigger" | "action" | "condition"
    name: string
    icon: React.ElementType
    color: string
}

interface CanvasNode {
    id: string
    templateId: number
}

const blocks: NodeTemplate[] = [
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

const getTemplate = (templateId: number) => blocks.find((b) => b.id === templateId)

export default function AutomationPage() {
    const [flowId, setFlowId] = React.useState<string | null>(null)
    const [flowName, setFlowName] = React.useState("Shopify Auto-Pilot")
    const [flowStatus, setFlowStatus] = React.useState<"draft" | "active">("draft")
    const [canvasNodes, setCanvasNodes] = React.useState<CanvasNode[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isSaving, setIsSaving] = React.useState(false)
    const saveTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
        fetch("/api/flows")
            .then((res) => res.json())
            .then((data) => {
                setFlowId(data.flow.id)
                setFlowName(data.flow.name)
                setFlowStatus(data.flow.status)
                setCanvasNodes(data.flow.nodes ?? [])
            })
            .catch(() => toast.error("Failed to load flow"))
            .finally(() => setIsLoading(false))
    }, [])

    const persist = React.useCallback((nodes: CanvasNode[], status?: "draft" | "active") => {
        if (!flowId) return
        setIsSaving(true)
        fetch(`/api/flows/${flowId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nodes, ...(status ? { status } : {}) }),
        })
            .catch(() => toast.error("Failed to save flow"))
            .finally(() => setIsSaving(false))
    }, [flowId])

    const scheduleSave = React.useCallback((nodes: CanvasNode[]) => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current)
        saveTimeout.current = setTimeout(() => persist(nodes), 500)
    }, [persist])

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        if (source.droppableId === "palette" && destination.droppableId === "canvas") {
            const template = blocks[source.index]
            const newNode: CanvasNode = { id: `node-${Date.now()}`, templateId: template.id }
            const next = Array.from(canvasNodes)
            next.splice(destination.index, 0, newNode)
            setCanvasNodes(next)
            scheduleSave(next)
            toast.success(`${template.name} added to flow`)
            return
        }

        if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
            if (source.index === destination.index) return
            const next = Array.from(canvasNodes)
            const [moved] = next.splice(source.index, 1)
            next.splice(destination.index, 0, moved)
            setCanvasNodes(next)
            scheduleSave(next)
        }
    }

    const removeNode = (id: string) => {
        const next = canvasNodes.filter((n) => n.id !== id)
        setCanvasNodes(next)
        scheduleSave(next)
        toast.info("Node removed")
    }

    const handlePublish = () => {
        setFlowStatus("active")
        persist(canvasNodes, "active")
        toast.success("Workflow Published!", {
            description: `Your ${flowName} flow is now live.`
        })
    }

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
            <DragDropContext onDragEnd={onDragEnd}>

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
                        <Droppable droppableId="palette" isDropDisabled>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-6">
                                    {(["trigger", "action", "condition"] as const).map((sectionType) => (
                                        <section key={sectionType}>
                                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-2">
                                                {sectionType === "trigger" ? "Triggers" : sectionType === "action" ? "Actions" : "Conditions"}
                                            </h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                {blocks.map((block, i) => block.type === sectionType && (
                                                    <Draggable key={block.id} draggableId={`palette-${block.id}`} index={i}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <NodeItem {...block} dragging={snapshot.isDragging} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                    <div className="hidden">{provided.placeholder}</div>
                                </div>
                            )}
                        </Droppable>
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
                                <span className="text-xs font-black tracking-tight">{flowName}</span>
                                <Badge className={cn(
                                    "border-none text-[8px] h-4",
                                    flowStatus === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                                )}>
                                    {isSaving ? "Saving..." : flowStatus === "active" ? "Active" : "Draft"}
                                </Badge>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MousePointer2 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Settings2 className="w-4 h-4" /></Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10"
                                onClick={() => {
                                    setCanvasNodes([])
                                    scheduleSave([])
                                    toast.info("Canvas cleared")
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 px-4 rounded-xl bg-background shadow-lg shadow-black/5 font-bold text-xs uppercase tracking-wider border-border/50"
                                onClick={() => toast.info("Test Run started", { description: "Simulating flow with a sample lead." })}
                            >
                                Test Run
                            </Button>
                            <Button
                                size="sm"
                                className="h-9 px-6 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-wider"
                                onClick={handlePublish}
                            >
                                Publish Flow
                            </Button>
                        </div>
                    </div>

                    {/* Workflow visualization */}
                    <div className="absolute inset-0 pt-32 pb-20 overflow-auto no-scrollbar">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Droppable droppableId="canvas">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={cn(
                                            "flex flex-col items-center gap-0 min-h-[200px] mx-auto w-fit px-20 py-4 rounded-[2rem] transition-colors",
                                            snapshot.isDraggingOver && "bg-primary/5 border-2 border-dashed border-primary/30"
                                        )}
                                    >
                                        {canvasNodes.length === 0 && !snapshot.isDraggingOver && (
                                            <div className="w-[280px] py-16 flex flex-col items-center gap-3 text-muted-foreground/50 border-2 border-dashed border-muted-foreground/20 rounded-2xl">
                                                <Zap className="w-6 h-6" />
                                                <p className="text-xs font-bold uppercase tracking-widest">Drag a node here to start</p>
                                            </div>
                                        )}
                                        {canvasNodes.map((node, index) => {
                                            const template = getTemplate(node.templateId)
                                            if (!template) return null
                                            return (
                                                <React.Fragment key={node.id}>
                                                    {index > 0 && <Connector />}
                                                    <Draggable draggableId={node.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <WorkflowNode
                                                                    title={template.name}
                                                                    type={template.type}
                                                                    icon={<template.icon className="w-5 h-5" />}
                                                                    color={template.color.split(" ")[1].replace("/10", "").replace("text-", "bg-")}
                                                                    dragging={snapshot.isDragging}
                                                                    onRemove={() => removeNode(node.id)}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </React.Fragment>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}

function NodeItem({ name, icon: Icon, color, dragging }: {
    name: string; icon: React.ElementType; color: string; dragging?: boolean
}) {
    return (
        <div className={cn(
            "p-3 bg-background border border-border/50 rounded-xl flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group",
            dragging && "shadow-2xl border-primary/50 rotate-2"
        )}>
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

function WorkflowNode({ title, type, icon, color, dragging, onRemove }: {
    title: string;
    type: string;
    icon: React.ReactNode;
    color: string;
    dragging?: boolean;
    onRemove: () => void;
}) {
    return (
        <div className={cn(
            "relative rounded-2xl bg-background border-2 border-border/50 shadow-2xl p-4 flex items-center gap-4 transition-all hover:border-primary/40 group overflow-hidden w-[280px]",
            dragging && "shadow-2xl border-primary/50 rotate-2 z-50"
        )}>
            <div className={cn("absolute left-0 top-0 bottom-0 w-2", color)} />
            <div className={cn("p-3 rounded-xl text-white shadow-lg", color)}>
                {icon}
            </div>
            <div className="flex-1 text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 leading-none">{type}</p>
                <h4 className="font-bold text-xs tracking-tight line-clamp-1">{title}</h4>
            </div>
            <button
                onClick={onRemove}
                className="hidden group-hover:block transition-all text-muted-foreground hover:text-rose-500"
            >
                <MoreVertical className="w-4 h-4" />
            </button>
            {/* Connection Points */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-border shadow-sm z-10" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-sm z-10" />
        </div>
    )
}

function Connector() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-border" />
            <div className="w-2 h-2 rounded-full bg-primary -mt-1 shadow-lg shadow-primary/20" />
            <div className="w-px h-1 bg-border" />
        </div>
    )
}
