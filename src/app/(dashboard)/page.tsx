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
  Filter
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
import { cn } from "@/lib/utils"

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

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Main Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back, Imran. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-3 border-border/50 bg-background/50 hover:bg-muted transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="h-9 px-4 bg-primary shadow-lg shadow-primary/20">
            Download Report
          </Button>
        </div>
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
    </div>
  )
}

function KpiCard({ title, value, icon, trend, trendUp }: any) {
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


