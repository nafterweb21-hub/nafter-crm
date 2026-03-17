"use client"

import * as React from "react"
import Link from "next/link"
import { Zap, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    return (
        <Card className="border-border/50 shadow-2xl bg-white/90 backdrop-blur-xl rounded-[2rem] overflow-hidden p-4">
            <CardHeader className="text-center space-y-3 pb-8">
                <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 animate-bounce">
                        <Zap className="w-8 h-8 fill-current" />
                    </div>
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter">Welcome Back</CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Sign in to your CRM dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Email Address</label>
                        <Input type="email" placeholder="imran@nafter.com" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40 font-semibold" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                            <Link href="#" className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline">Forgot?</Link>
                        </div>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/40" />
                    </div>
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                        Sign In
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]"><span className="bg-white px-4 text-muted-foreground">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl border-border/50 bg-muted/10 hover:bg-muted font-bold text-xs gap-2">
                        <Globe className="w-4 h-4" />
                        Google
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-border/50 bg-muted/10 hover:bg-muted font-bold text-xs gap-2">
                        <Github className="w-4 h-4" />
                        Github
                    </Button>
                </div>

                <p className="text-center text-[11px] font-medium text-muted-foreground pt-4 leading-relaxed">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-primary font-black uppercase tracking-tighter hover:underline">Create One</Link>
                </p>
            </CardContent>
        </Card>
    )
}
