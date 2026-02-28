import { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { LayoutDashboard } from "lucide-react"
import { MobileAdminNav } from "@/components/admin/mobile-admin-nav"

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Header - Only visible on small screens */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-30 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold">Admin Panel</span>
                </div>
                <MobileAdminNav />
            </header>

            {/* Sidebar - Desktop Only */}
            <aside className="w-64 bg-white border-r hidden md:block fixed left-0 top-0 bottom-0 overflow-y-auto z-20">
                <AdminNav />
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen md:ml-64 pt-16 md:pt-0 overflow-x-hidden">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
