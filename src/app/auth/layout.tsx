export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full bg-[#fcfaff] relative overflow-hidden flex items-center justify-center p-6">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

            <div className="z-10 w-full max-w-md">
                {children}
            </div>
        </div>
    )
}
