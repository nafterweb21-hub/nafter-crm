"use client"

import * as React from "react"
import Link from "next/link"
import { Zap, ArrowRight, Building2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function SignupPage() {
    const [step, setStep] = React.useState(1)

    return (
        <Card className="border-border/50 shadow-2xl bg-white/90 backdrop-blur-xl rounded-[2rem] overflow-hidden p-4">
            <CardHeader className="text-center space-y-3 pb-8">
                <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-1.5">
                        {[1, 2].map((s) => (
                            <div key={s} className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                step === s ? "w-8 bg-primary" : "w-1.5 bg-muted"
                            )} />
                        ))}
                    </div>
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter">
                    {step === 1 ? "Join Nafter CRM" : "Setup Workspace"}
                </CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">
                    {step === 1 ? "The world's fastest AI WhatsApp Sales Tool" : "Tell us about your organization"}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {step === 1 ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Full Name</label>
                            <Input placeholder="Imran Khan" className="h-12 rounded-xl bg-muted/30 border-none font-semibold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Email Address</label>
                            <Input type="email" placeholder="imran@nafter.com" className="h-12 rounded-xl bg-muted/30 border-none font-semibold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Choose Password</label>
                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30 border-none font-semibold" />
                        </div>
                        <Button
                            onClick={() => setStep(2)}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="e.g. Acme Inc" className="h-12 pl-12 rounded-xl bg-muted/30 border-none font-semibold" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Support Phone</label>
                            <Input placeholder="+91 98765 43210" className="h-12 rounded-xl bg-muted/30 border-none font-semibold" />
                        </div>

                        <div className="pt-2 italic text-[11px] text-muted-foreground flex items-center gap-2 bg-muted/20 p-3 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            Your 14-day free trial will start immediately.
                        </div>

                        <Button
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all mt-4"
                        >
                            Launch Workspace
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setStep(1)}
                            className="w-full h-8 text-[10px] font-black text-muted-foreground uppercase tracking-tighter"
                        >
                            Go Back
                        </Button>
                    </div>
                )}

                <p className="text-center text-[11px] font-medium text-muted-foreground pt-2">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary font-black uppercase tracking-tighter hover:underline">Log In</Link>
                </p>
            </CardContent>
        </Card>
    )
}
