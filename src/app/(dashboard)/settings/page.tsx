"use client"

import * as React from "react"
import {
    Settings,
    CreditCard,
    Shield,
    Bell,
    Smartphone,
    Globe,
    Key,
    CheckCircle2,
    ArrowRight,
    Download,
    Plus,
    Zap,
    ChevronRight
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function SettingsPage() {
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
                                <SettingRow label="Branding Color" sub="Primary accent for your CRM UI." value="Purple (#8B5CF6)" />
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
        </div>
    )
}

function UsageWidget({ label, used, total }: any) {
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

function SettingRow({ label, sub, value }: any) {
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

function InvoiceRow({ id, status, amount, date }: any) {
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
