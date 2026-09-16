"use client"

import * as React from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MessageSquare,
  IndianRupee,
  Zap,
  MoreVertical,
  Filter,
  Sparkles,
  Activity,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  X,
  Target,
  PieChart,
  TrendingUp,
  Clock,
  ExternalLink,
  Check,
  Server
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts"
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const data = [
  { name: "Mon", leads: 400, revenue: 2400 },
  { name: "Tue", leads: 300, revenue: 1398 },
  { name: "Wed", leads: 200, revenue: 9800 },
  { name: "Thu", leads: 278, revenue: 3908 },
  { name: "Fri", leads: 189, revenue: 4800 },
  { name: "Sat", leads: 239, revenue: 3800 },
  { name: "Sun", leads: 349, revenue: 4300 },
]

const funnelData = [
  { name: "New Leads", value: 100, fill: "var(--color-primary)" },
  { name: "Qualified", value: 75, fill: "oklch(0.65 0.25 285)" },
  { name: "Demo", value: 45, fill: "oklch(0.75 0.15 285)" },
  { name: "Proposal", value: 25, fill: "oklch(0.85 0.1 285)" },
  { name: "Closed", value: 15, fill: "oklch(0.95 0.05 285)" },
]

const agents = [
  { name: "Imran Khan", deals: 42, conversion: "76%", status: "Active", revenue: "₹2,40,000" },
  { name: "Salman F.", deals: 31, conversion: "62%", status: "Active", revenue: "₹1,80,000" },
  { name: "Ayesha S.", deals: 28, conversion: "58%", status: "Away", revenue: "₹1,45,000" },
  { name: "Zaid M.", deals: 15, conversion: "45%", status: "Busy", revenue: "₹95,000" },
]
const recentActivities = [
  { id: 1, type: "message", user: "John Doe", text: "Replied to Shopify pricing query", time: "2m ago", icon: <MessageCircle className="w-3 h-3" /> },
  { id: 2, type: "lead", user: "Sarah Smith", text: "New lead from Instagram Ad", time: "15m ago", icon: <Users className="w-3 h-3" /> },
  { id: 3, type: "deal", user: "Alex Johnson", text: "Advanced to 'Meeting' stage", time: "45m ago", icon: <Zap className="w-3 h-3" /> },
  { id: 4, type: "alert", user: "System", text: "Backup agent assigned to high-value lead", time: "1h ago", icon: <Activity className="w-3 h-3" /> },
];

const insights = [
  { title: "Conversion Spike", text: "Your conversion rate is up 12% today. Most leads are asking about 'ASAP Delivery'.", icon: <Zap className="w-4 h-4" /> },
  { title: "AI Strategy", text: "Suggest setting up an automated 'Out of Office' reply for weekend leads.", icon: <Sparkles className="w-4 h-4" /> },
];

export default function Dashboard() {
  const [isInsightsOpen, setIsInsightsOpen] = React.useState(true);
  const [isWhatsAppSyncOpen, setIsWhatsAppSyncOpen] = React.useState(false);
  const [syncStep, setSyncStep] = React.useState(0);

  const nextSyncStep = () => {
    toast.loading(`Syncing WhatsApp Step ${syncStep + 1}...`)
    setTimeout(() => setSyncStep(prev => prev + 1), 1500)
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground">Command Center</h1>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-none text-[10px] h-5 uppercase font-black px-2 shadow-sm cursor-pointer hover:bg-primary/20 transition-all font-mono"
              onClick={() => setIsInsightsOpen(true)}
            >
              AI Active
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#25D366]/10 text-[#25D366] border-none text-[10px] h-5 uppercase font-black px-2 shadow-sm cursor-pointer hover:bg-[#25D366]/20 transition-all font-mono"
              onClick={() => setIsWhatsAppSyncOpen(true)}
            >
              Sync Pending
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Welcome back, Imran. Your AI assistant has 3 new insights for you.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsWhatsAppSyncOpen(true)}
            className="h-10 px-6 bg-[#25D366] hover:bg-[#20bd5c] text-white font-black text-[10px] uppercase rounded-xl shadow-xl shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Connect WhatsApp
          </Button>
          <Button variant="outline" size="sm" className="h-10 px-4 border-border/50 bg-background/50 backdrop-blur hover:bg-muted transition-all rounded-xl font-bold text-xs">
            <Filter className="w-4 h-4 mr-2" />
            Customize Data
          </Button>
          <Button
            size="sm"
            onClick={() => {
              toast.info("Synthesizing Data...", {
                description: "AI is gathering insights from your agents and leads for the latest intelligence report."
              })
              setTimeout(() => {
                toast.success("Intelligence Report Ready", {
                  description: "Your PDF report has been generated and is ready for download."
                })
              }, 2000)
            }}
            className="h-10 px-5 bg-primary shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl font-bold text-xs"
          >
            Generate Intelligence Report
          </Button>
        </div>
      </div>

      {/* AI Insights and Pulse Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights Banner */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 text-white shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] opacity-80">AI Strategy Insights</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all cursor-pointer group/item">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-white group-hover/item:scale-110 transition-transform">{insight.icon}</div>
                    <h3 className="font-bold text-sm tracking-tight">{insight.title}</h3>
                  </div>
                  <p className="text-xs text-indigo-50 leading-relaxed font-medium line-clamp-2">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={() => setIsInsightsOpen(true)}
              className="h-9 px-4 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 rounded-full group/btn"
            >
              View Full Intelligence Analysis
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Lead Pulse Feed */}
        <Card className="border-border/50 shadow-xl shadow-gray-100/50 bg-background/50 backdrop-blur rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <CardTitle className="text-sm font-black uppercase tracking-tight">Live Lead Pulse</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div className="space-y-1">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer group">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform",
                    activity.type === 'message' ? "bg-primary/10 text-primary" :
                      activity.type === 'lead' ? "bg-emerald-500/10 text-emerald-600" :
                        activity.type === 'deal' ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-600"
                  )}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold truncate">{activity.user}</span>
                      <span className="text-[9px] font-medium text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate font-medium mt-0.5">{activity.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-2 h-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl">
              View All Live Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Leads Today"
          value="145"
          icon={<Users className="w-5 h-5" />}
          trend="+12% from yesterday"
          trendUp={true}
        />
        <KpiCard
          title="Active Chats"
          value="52"
          icon={<MessageSquare className="w-5 h-5" />}
          trend="-4% from yesterday"
          trendUp={false}
        />
        <KpiCard
          title="Total Revenue"
          value="₹4,20,000"
          icon={<IndianRupee className="w-5 h-5" />}
          trend="+28% from last week"
          trendUp={true}
        />
        <KpiCard
          title="Conv. Rate"
          value="18.5%"
          icon={<Zap className="w-5 h-5" />}
          trend="+2.4% from last month"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales Funnel */}
        <Card className="lg:col-span-1 border-border/50 shadow-sm bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Sales Funnel</CardTitle>
              <CardDescription className="text-xs">Lead conversion stages</CardDescription>
            </div>
            <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelData} margin={{ left: 40, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid oklch(0.9 0.02 285)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="lg:col-span-2 border-border/50 shadow-sm bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
              <CardDescription className="text-xs">Weekly performance overview</CardDescription>
            </div>
            <Tabs defaultValue="week" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="week" className="text-[10px]">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-[10px]">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid oklch(0.9 0.02 285)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card className="border-border/50 shadow-sm bg-background/50 backdrop-blur overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-base font-semibold">Agent Performance</CardTitle>
            <CardDescription className="text-xs">Leaderboard for closed deals</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-primary text-xs font-semibold hover:bg-primary/5">
            View All Agents
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-[250px] text-[11px] uppercase tracking-wider font-bold h-10 px-6">Agent</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-10">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-10 text-center">Deals Closed</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-10 text-center">Conv. Rate</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold h-10 text-right px-6">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.name} className="hover:bg-muted/20 border-border/40 transition-colors group">
                  <TableCell className="font-medium py-3 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                        <AvatarImage src={`https://avatar.vercel.sh/${agent.name}.png`} />
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm">{agent.name}</span>
                        <span className="text-[10px] text-muted-foreground leading-tight">Sales Representative</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-semibold px-2 py-0 h-5 border-none",
                      agent.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        agent.status === "Away" ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" :
                          "bg-muted text-muted-foreground"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1.5",
                        agent.status === "Active" ? "bg-emerald-500" :
                          agent.status === "Away" ? "bg-orange-500" :
                            "bg-muted-foreground"
                      )} />
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center py-3 text-sm font-semibold">{agent.deals}</TableCell>
                  <TableCell className="text-center py-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-semibold">{agent.conversion}</span>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: agent.conversion }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-3 px-6 font-bold text-primary text-sm">
                    {agent.revenue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Morning Insights AI Modal */}
      <Dialog open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-[500px] rounded-[3rem] border-none bg-white p-0 overflow-hidden shadow-2xl">
          <div className="relative p-10 space-y-8">
            <button
              onClick={() => setIsInsightsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors group"
            >
              <X className="w-5 h-5 text-slate-500 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest h-6 px-3">
                  AI Intelligence
                </Badge>
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900">Morning Insights</h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[80%]">
                  We&apos;ve identified 3 high-impact actions to grow your revenue today.
                </p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <InsightStat label="Closed Value" value="₹1.4M" trend="+12%" trendUp />
              <InsightStat label="Efficiency" value="84%" trend="+5%" trendUp />
              <InsightStat label="Lead Speed" value="2.1h" trend="-12m" trendUp={false} isNegativeGood />
            </div>

            <Separator className="bg-slate-100" />

            {/* Smart Recommendations */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Smart Recommendations</p>

              <div className="space-y-3">
                <RecommendationItem
                  icon={<Target className="w-5 h-5" />}
                  color="rose"
                  title="High Propensity Lead: John Doe"
                  desc={<>John from <span className="font-bold text-slate-900">Shopify Pro</span> has a 92% chance of closing if messaged in the next 30 mins.</>}
                />
                <RecommendationItem
                  icon={<PieChart className="w-5 h-5" />}
                  color="indigo"
                  title="Marketing Opportunity"
                  desc={<>Leads from <span className="font-bold text-slate-900">Facebook Ads</span> are up by 40%. Consider increasing daily spend.</>}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                onClick={() => {
                  toast.success("Strategy Optimized", {
                    description: "AI has adjusted lead priority and marketing bids for maximum ROI."
                  })
                  setIsInsightsOpen(false)
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-[1.25rem] font-black text-sm uppercase tracking-wide shadow-xl shadow-indigo-200 transition-all active:scale-95"
              >
                Optimize Strategy
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsInsightsOpen(false)}
                className="h-14 px-8 rounded-[1.25rem] border-slate-100 bg-slate-50 text-slate-900 font-black text-sm uppercase tracking-wide hover:bg-slate-100 transition-all active:scale-95"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WhatsAppSetupModal
        open={isWhatsAppSyncOpen}
        onOpenChange={setIsWhatsAppSyncOpen}
        step={syncStep}
        onNext={nextSyncStep}
      />
    </div >
  )
}

function WhatsAppSetupModal({ open, onOpenChange, step, onNext }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: number;
  onNext: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-10 space-y-8 bg-white text-slate-900">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={cn(
              "w-20 h-20 rounded-[2.5rem] flex items-center justify-center transition-all duration-700",
              step === 0 ? "bg-emerald-500/10 text-emerald-600 rotate-0" :
                step === 1 ? "bg-blue-500/10 text-blue-600 rotate-[360deg]" :
                  "bg-primary/10 text-primary scale-110"
            )}>
              {step === 0 && <MessageCircle className="w-10 h-10" />}
              {step === 1 && <Server className="w-10 h-10" />}
              {step >= 2 && <Check className="w-10 h-10" />}
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter">
                {step === 0 && "Link your Business API"}
                {step === 1 && "Verifying WABA Node"}
                {step >= 2 && "Syncing Complete"}
              </h2>
              <p className="text-xs font-medium text-slate-500 max-w-[280px]">
                {step === 0 && "Link your official Number via Meta's secure embedded flow."}
                {step === 1 && "Connecting your Phone Number ID to our multi-tenant webhook."}
                {step >= 2 && "Your WhatsApp sales engine is now active and ready."}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <ConnectionStep active={step >= 0} done={step > 0} label="Meta API Authorization" />
            <ConnectionStep active={step >= 1} done={step > 1} label="WABA Credential Exchange" />
            <ConnectionStep active={step >= 2} done={step > 2} label="Webhook Handshake Verified" />
          </div>

          <div className="pt-4 flex gap-3">
            {step < 2 ? (
              <>
                <Button
                  onClick={onNext}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all"
                >
                  {step === 0 ? "Connect via Meta" : "Complete Verification"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="h-14 px-6 rounded-2xl border-slate-100 font-bold text-slate-400 uppercase text-xs hover:bg-slate-50"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => onOpenChange(false)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all"
              >
                Launch Dashboard
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 opacity-40">
            <span className="text-[9px] font-black uppercase tracking-widest">Powered by Meta Business API</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ConnectionStep({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-2xl border transition-all",
      done ? "bg-emerald-50/50 border-emerald-100" : active ? "bg-slate-50 border-slate-100" : "bg-transparent border-transparent opacity-30"
    )}>
      <div className={cn(
        "w-6 h-6 rounded-lg flex items-center justify-center transition-all",
        done ? "bg-emerald-500 text-white" : active ? "bg-slate-900 text-white animate-pulse" : "bg-slate-200 text-slate-400"
      )}>
        {done ? <Check className="w-3.5 h-3.5" /> : active ? <div className="w-1.5 h-1.5 rounded-full bg-white" /> : <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20" />}
      </div>
      <span className={cn(
        "text-[11px] font-black uppercase tracking-widest",
        done ? "text-emerald-700" : active ? "text-slate-900" : "text-slate-400"
      )}>
        {label}
      </span>
    </div>
  )
}

function InsightStat({ label, value, trend, trendUp, isNegativeGood }: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  isNegativeGood?: boolean
}) {
  const isPositive = isNegativeGood ? !trendUp : trendUp;
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h4>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black",
        isPositive ? "text-emerald-500" : "text-rose-500"
      )}>
        {trendUp ? <TrendingUp className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
        {trend}
      </div>
    </div>
  )
}

function RecommendationItem({ icon, color, title, desc }: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: React.ReactNode
}) {
  const colorMap: Record<string, string> = {
    rose: "bg-rose-50 text-rose-500",
    indigo: "bg-indigo-50 text-indigo-500",
  }
  return (
    <div className="p-5 rounded-3xl bg-slate-50 flex gap-4 hover:bg-slate-100/80 transition-all group cursor-pointer border border-transparent hover:border-slate-200">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
        colorMap[color]
      )}>
        {icon}
      </div>
      <div className="space-y-1 pt-0.5">
        <p className="text-sm font-black text-slate-900 tracking-tight leading-none">{title}</p>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon, trend, trendUp }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <Card className="border-border/50 shadow-sm bg-background/50 backdrop-blur group hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <Badge variant="ghost" className={cn(
            "text-[10px] font-bold px-1.5 py-0 rounded h-5",
            trendUp ? "text-emerald-600 bg-emerald-500/5" : "text-rose-600 bg-rose-500/5"
          )}>
            {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend.split(' ')[0]}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider leading-none">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-[10px] text-muted-foreground font-medium pt-1 border-t border-border/40 mt-2">
            {trend.split(' ').slice(1).join(' ')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
