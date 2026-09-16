"use client"

import * as React from "react"
import {
    Settings,
    CreditCard,
    Shield,
    Bell,
    Globe,
    Key,
    Download,
    ChevronRight,
    Brain,
    Bot,
    Zap,
    MessageSquare,
    Target,
    Phone,
    Server,
    ExternalLink,
    Check,
    MessageCircle,
    Plus,
    LayoutGrid,
    Wifi,
    Loader2,
    AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type IntegrationStatus = {
    provider: "WHATSAPI" | "META"
    status: string
    baseUrl?: string | null
    instanceId?: string | null
    phoneNumberId?: string | null
    lastCheckedAt?: string | null
    lastError?: string | null
}

export default function SettingsPage() {
    const [isWhatsAppSetupOpen, setIsWhatsAppSetupOpen] = React.useState(false)
    const [connectProvider, setConnectProvider] = React.useState<"WHATSAPI" | "META">("WHATSAPI")
    const [integrations, setIntegrations] = React.useState<IntegrationStatus[]>([])

    const loadIntegrations = React.useCallback(() => {
        fetch("/api/integrations")
            .then((res) => res.json())
            .then((data) => setIntegrations(data.integrations ?? []))
            .catch(() => toast.error("Failed to load integration status"))
    }, [])

    React.useEffect(() => {
        loadIntegrations()
    }, [loadIntegrations])

    const whatsapiIntegration = integrations.find((i) => i.provider === "WHATSAPI")
    const metaIntegration = integrations.find((i) => i.provider === "META")

    const openConnect = (provider: "WHATSAPI" | "META") => {
        setConnectProvider(provider)
        setIsWhatsAppSetupOpen(true)
    }

    return (
        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-left-2 duration-500">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tighter">System Console</h1>
                <p className="text-muted-foreground text-sm">Configure your workspace, billing preferences, and API integrations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-1">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-primary/10 text-primary font-bold text-sm transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                            <Settings className="w-4 h-4" />
                            <span>General</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-4 h-4 group-hover:text-primary" />
                            <span>Billing & Plan</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <Shield className="w-4 h-4 group-hover:text-primary" />
                            <span>Security</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <Bell className="w-4 h-4 group-hover:text-primary" />
                            <span>Notifications</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 group-hover:text-primary" />
                            <span>Integrations</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <Key className="w-4 h-4 group-hover:text-primary" />
                            <span>Meta Cloud API</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 text-muted-foreground font-medium text-sm transition-all group">
                        <div className="flex items-center gap-3">
                            <Key className="w-4 h-4 group-hover:text-primary" />
                            <span>API Keys</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </button>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Subscription Section */}
                    <Card className="border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Badge className="bg-primary text-white font-black text-[9px] uppercase tracking-widest border-none px-3 h-5">Active Plan</Badge>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl font-black tracking-tight">Growth Plan</CardTitle>
                            <CardDescription className="text-xs font-semibold text-primary/80">Scaling your WhatsApp sales engine.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <UsageWidget label="Active Agents" used={5} total={10} />
                                <UsageWidget label="Monthly Messages" used={8450} total={10000} />
                                <UsageWidget label="Automation Flows" used={8} total={25} />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase h-10 px-8 rounded-xl shadow-lg shadow-primary/20">Upgrade to Pro</Button>
                                <Button variant="outline" className="h-10 px-8 rounded-xl border-primary/20 bg-background text-primary font-bold text-xs uppercase transition-all">Manage Subscription</Button>
                            </div>
                        </CardContent>
                        <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    </Card>

                    {/* General Settings */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-2 mb-4">Workspace Details</h3>
                        <Card className="border-border/50 bg-background/50 shadow-sm overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <SettingRow label="Company Name" sub="The public name of your organization." value="Nafter Web Technologies" />
                                <SettingRow label="Support Email" sub="Used for customer communication." value="support@nafter.com" />
                                <SettingRow label="Timezone" sub="Affects automation and reports." value="UTC +5:30 (India Standard Time)" />
                                <SettingRow label="Workspace URL" sub="Your internal CRM access point." value="crm.nafter.in/agency" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* AI & Automation Settings */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-2 mb-4">
                            <Brain className="w-4 h-4 text-primary" />
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">AI & Automation</h3>
                        </div>
                        <Card className="border-border/50 bg-background/50 shadow-sm overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <ToggleRow
                                    icon={<Bot className="w-4 h-4" />}
                                    label="AI Assistant Triage"
                                    sub="Automatically categorize and score new leads."
                                    enabled={true}
                                />
                                <ToggleRow
                                    icon={<Zap className="w-4 h-4" />}
                                    label="Smart Auto-Replies"
                                    sub="Suggest responses based on lead intent."
                                    enabled={true}
                                />
                                <ToggleRow
                                    icon={<Target className="w-4 h-4" />}
                                    label="Priority Routing"
                                    sub="Route high-score leads to senior agents immediately."
                                    enabled={false}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Invoices */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Latest Invoices</h3>
                            <Button variant="ghost" size="sm" className="text-primary text-[10px] font-black uppercase tracking-widest">View All</Button>
                        </div>
                        <div className="border border-border/50 rounded-2xl overflow-hidden bg-card shadow-sm">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="px-6 h-10 text-[10px] font-bold uppercase tracking-widest">Invoice</TableHead>
                                        <TableHead className="h-10 text-[10px] font-bold uppercase tracking-widest text-center">Status</TableHead>
                                        <TableHead className="h-10 text-[10px] font-bold uppercase tracking-widest text-center">Amount</TableHead>
                                        <TableHead className="h-10 text-[10px] font-bold uppercase tracking-widest">Date</TableHead>
                                        <TableHead className="px-6 h-10 text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <InvoiceRow id="INV-2024-001" status="Paid" amount="₹4,999" date="Mar 01, 2024" />
                                    <InvoiceRow id="INV-2024-002" status="Paid" amount="₹4,999" date="Feb 01, 2024" />
                                    <InvoiceRow id="INV-2024-003" status="Paid" amount="₹4,999" date="Jan 01, 2024" />
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Integrations Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-2 mb-4">
                            <Globe className="w-4 h-4 text-primary" />
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Connected Channels</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-border/50 bg-background/50 shadow-sm overflow-hidden p-8 flex flex-col items-center text-center space-y-6 relative">
                                {metaIntegration?.status === "connected" && (
                                    <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase">Connected</Badge>
                                )}
                                <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-500/5">
                                    <MessageCircle className="w-8 h-8" />
                                </div>
                                <div className="space-y-2 max-w-sm">
                                    <h4 className="text-xl font-black tracking-tighter">Official Meta API</h4>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                        Connect your official **WhatsApp Business API** via Meta Business Suite.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => openConnect("META")}
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5c] text-white font-black text-xs uppercase h-12 px-8 rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    {metaIntegration?.status === "connected" ? "Reconnect Meta" : "Connect Meta Direct"}
                                </Button>
                            </Card>

                            <Card className="border-border/50 bg-background/50 shadow-sm overflow-hidden p-8 flex flex-col items-center text-center space-y-6 border-dashed border-2 relative">
                                {whatsapiIntegration?.status === "connected" && (
                                    <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase">Connected</Badge>
                                )}
                                <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/5">
                                    <Wifi className="w-8 h-8" />
                                </div>
                                <div className="space-y-2 max-w-sm">
                                    <h4 className="text-xl font-black tracking-tighter font-mono">WhatsAPI Gateway</h4>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                        Use high-speed unofficial gateways for ultra-low latency broadcasting.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => openConnect("WHATSAPI")}
                                    className="w-full border-primary text-primary hover:bg-primary/5 font-black text-xs uppercase h-12 px-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    {whatsapiIntegration?.status === "connected" ? "Reconnect WhatsAPI" : "Link WhatsAPI"}
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* Meta API Keys */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-2 mb-4">
                            <Key className="w-4 h-4 text-primary" />
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Meta API Credentials</h3>
                        </div>
                        <Card className="border-border/50 bg-background/50 shadow-sm overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <SettingRow label="Permanent Access Token" sub="Set via the connect flow above." value={metaIntegration?.status === "connected" ? "••••••••" : "Not connected"} />
                                <SettingRow label="Phone Number ID" sub="Used for sending messages." value={metaIntegration?.phoneNumberId || "Not connected"} />
                                <SettingRow label="Verify Token" sub="For webhook handshake." value="antigravity_token_123" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Save Changes Footer */}
                    <div className="flex justify-end pt-4">
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase px-12 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                            onClick={() => toast.success("Settings Saved", {
                                description: "Your workspace preferences have been updated."
                            })}
                        >
                            Save All Changes
                        </Button>
                    </div>
                </div>
            </div>
            <ConnectIntegrationModal
                open={isWhatsAppSetupOpen}
                onOpenChange={setIsWhatsAppSetupOpen}
                provider={connectProvider}
                onConnected={loadIntegrations}
            />
        </div>
    )
}

function UsageWidget({ label, used, total }: { label: string; used: number; total: number }) {
    const percentage = (used / total) * 100
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground/80">{label}</span>
                <span className="text-primary">{used} / {total}</span>
            </div>
            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    )
}

function SettingRow({ label, sub, value }: { label: string; sub: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/20 transition-all gap-4">
            <div>
                <p className="text-sm font-bold tracking-tight">{label}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{sub}</p>
            </div>
            <div className="flex items-center gap-3">
                <Input value={value} readOnly className="h-9 w-full sm:w-64 bg-background text-xs font-semibold border-border/50 rounded-lg" />
                <Button variant="ghost" size="sm" className="h-9 text-[11px] font-bold uppercase tracking-widest text-primary">Edit</Button>
            </div>
        </div>
    )
}

function InvoiceRow({ id, status, amount, date }: { id: string; status: string; amount: string; date: string }) {
    return (
        <TableRow className="border-border/30 hover:bg-muted/10 transition-colors">
            <TableCell className="px-6 font-mono text-[11px] font-bold text-muted-foreground">{id}</TableCell>
            <TableCell className="text-center">
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-2 h-4 text-[9px] font-black uppercase">
                    {status}
                </Badge>
            </TableCell>
            <TableCell className="text-center text-xs font-black">{amount}</TableCell>
            <TableCell className="text-xs text-muted-foreground font-medium">{date}</TableCell>
            <TableCell className="px-6 text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Download className="w-4 h-4" />
                </Button>
            </TableCell>
        </TableRow>
    )
}
function ToggleRow({ icon, label, sub, enabled }: { icon: React.ReactNode; label: string; sub: string; enabled: boolean }) {
    const [isOn, setIsOn] = React.useState(enabled)
    return (
        <div className="flex items-center justify-between p-6 hover:bg-muted/10 transition-all gap-4">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-bold tracking-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{sub}</p>
                </div>
            </div>
            <button
                onClick={() => {
                    setIsOn(!isOn)
                    toast.success(`${label} ${!isOn ? 'Enabled' : 'Disabled'}`)
                }}
                className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    isOn ? "bg-primary shadow-[0_0_12px_rgba(139,92,246,0.3)]" : "bg-muted"
                )}
            >
                <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                    isOn ? "left-7" : "left-1"
                )} />
            </button>
        </div>
    )
}

function ConnectIntegrationModal({ open, onOpenChange, provider, onConnected }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    provider: "WHATSAPI" | "META";
    onConnected: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [whatsapiForm, setWhatsapiForm] = React.useState({ baseUrl: "", instanceId: "", token: "" })
    const [metaForm, setMetaForm] = React.useState({ accessToken: "", phoneNumberId: "" })

    React.useEffect(() => {
        if (open) {
            setIsSubmitting(false)
        }
    }, [open, provider])

    const handleConnect = async () => {
        setIsSubmitting(true)
        try {
            const payload = provider === "WHATSAPI"
                ? { provider, baseUrl: whatsapiForm.baseUrl || undefined, instanceId: whatsapiForm.instanceId, token: whatsapiForm.token }
                : { provider, accessToken: metaForm.accessToken, phoneNumberId: metaForm.phoneNumberId }

            const res = await fetch("/api/integrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error || "Failed to save integration")
                return
            }

            if (data.verified) {
                toast.success(`${provider === "WHATSAPI" ? "WhatsAPI Gateway" : "Meta WhatsApp"} connected successfully`)
                onConnected()
                onOpenChange(false)
            } else {
                toast.error("Saved, but connection could not be verified", {
                    description: "Check your credentials and try again."
                })
                onConnected()
            }
        } catch {
            toast.error("Network error while connecting")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
                <div className="p-10 space-y-6 bg-white text-slate-900">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className={cn(
                            "w-20 h-20 rounded-[2.5rem] flex items-center justify-center",
                            provider === "WHATSAPI" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-600"
                        )}>
                            {provider === "WHATSAPI" ? <Wifi className="w-10 h-10" /> : <MessageCircle className="w-10 h-10" />}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tighter">
                                {provider === "WHATSAPI" ? "Link WhatsAPI Gateway" : "Connect Meta WhatsApp"}
                            </h2>
                            <p className="text-xs font-medium text-slate-500 max-w-[320px]">
                                {provider === "WHATSAPI"
                                    ? "Enter your gateway credentials. We'll verify the connection before saving."
                                    : "Enter your permanent access token and phone number ID from Meta Business Suite."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {provider === "WHATSAPI" ? (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Base URL (optional)</label>
                                    <Input
                                        placeholder="https://api.whatsapi.io/v1"
                                        value={whatsapiForm.baseUrl}
                                        onChange={(e) => setWhatsapiForm((f) => ({ ...f, baseUrl: e.target.value }))}
                                        className="h-12 rounded-xl bg-slate-50 border-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Instance ID</label>
                                    <Input
                                        placeholder="e.g. inst_98213"
                                        value={whatsapiForm.instanceId}
                                        onChange={(e) => setWhatsapiForm((f) => ({ ...f, instanceId: e.target.value }))}
                                        className="h-12 rounded-xl bg-slate-50 border-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Token</label>
                                    <Input
                                        type="password"
                                        placeholder="Gateway API token"
                                        value={whatsapiForm.token}
                                        onChange={(e) => setWhatsapiForm((f) => ({ ...f, token: e.target.value }))}
                                        className="h-12 rounded-xl bg-slate-50 border-none text-sm"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Permanent Access Token</label>
                                    <Input
                                        type="password"
                                        placeholder="EAAG..."
                                        value={metaForm.accessToken}
                                        onChange={(e) => setMetaForm((f) => ({ ...f, accessToken: e.target.value }))}
                                        className="h-12 rounded-xl bg-slate-50 border-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number ID</label>
                                    <Input
                                        placeholder="1284567890123"
                                        value={metaForm.phoneNumberId}
                                        onChange={(e) => setMetaForm((f) => ({ ...f, phoneNumberId: e.target.value }))}
                                        className="h-12 rounded-xl bg-slate-50 border-none text-sm"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                            We'll ping the provider to verify these credentials before marking the channel as connected.
                        </p>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Button
                            onClick={handleConnect}
                            disabled={isSubmitting}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all disabled:opacity-60"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {isSubmitting ? "Verifying..." : "Verify & Connect"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="h-14 px-6 rounded-2xl border-slate-100 font-bold text-slate-400 uppercase text-xs hover:bg-slate-50"
                        >
                            Cancel
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 opacity-40">
                        <span className="text-[9px] font-black uppercase tracking-widest">Powered by {provider === "WHATSAPI" ? "WhatsAPI Gateway" : "Meta Business API"}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
