import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
