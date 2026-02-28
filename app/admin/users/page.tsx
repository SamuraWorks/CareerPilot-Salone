import { createClient } from "@/lib/supabase/server"
import { UserTable } from "@/components/admin/user-table"
import { UserProfile } from "@/lib/types"

export default async function AdminUsersPage() {
    const supabase = createClient()

    const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) {
        return (
            <div className="container max-w-7xl mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold text-red-600">Error loading users</h1>
                <p className="mt-2 text-muted-foreground">Please try again later or contact support.</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-slate-50">
            <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
                <UserTable initialUsers={(users as UserProfile[]) || []} />
            </div>
        </div>
    )
}
