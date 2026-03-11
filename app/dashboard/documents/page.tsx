"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { FileText, Clock, Download, ExternalLink, Trash2, Loader2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default function DocumentsPage() {
    const { user } = useAuth()
    const supabase = createClient()
    const [documents, setDocuments] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    const fetchDocuments = async () => {
        if (!user?.id) return
        setIsLoading(true)
        const { data, error } = await supabase
            .from('user_documents')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })

        if (data) {
            setDocuments(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDocuments()
    }, [user?.id])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this document? This cannot be undone.")) return

        const { error } = await supabase
            .from('user_documents')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error("Failed to delete document")
        } else {
            setDocuments(prev => prev.filter(doc => doc.id !== id))
            toast.success("Document deleted")
        }
    }

    const filteredDocuments = documents.filter(doc =>
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tight uppercase">Document Vault</h1>
                        <p className="text-slate-500 font-medium">Access and manage all your generated career assets.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search documents..."
                            className="pl-10 h-12 rounded-xl border-slate-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Vault...</p>
                    </div>
                ) : filteredDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map((doc) => (
                            <Card key={doc.id} className="border-none shadow-xl shadow-blue-500/5 rounded-[2rem] overflow-hidden group hover:shadow-blue-500/10 transition-all border-b-4 border-slate-100 hover:border-blue-500/20">
                                <CardHeader className="pb-2 bg-slate-50/50">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <Badge className={`uppercase text-[9px] font-black tracking-widest ${doc.type === 'cv' ? 'bg-blue-100 text-blue-600' :
                                                doc.type === 'cover_letter' ? 'bg-emerald-100 text-emerald-600' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {doc.type.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg font-black text-[#0B1F3A] mt-4 line-clamp-1">
                                        {doc.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        Updated {formatDistanceToNow(new Date(doc.updated_at), { addSuffix: true })}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 flex items-center justify-between gap-3">
                                    <Link
                                        href={doc.type === 'cv' ? `/cv-builder?edit=${doc.id}` : `/cover-letter?edit=${doc.id}`}
                                        className="flex-1"
                                    >
                                        <Button className="w-full bg-[#0B1F3A] hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] py-1 h-10 rounded-xl transition-all">
                                            Edit Asset
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(doc.id)}
                                        className="h-10 w-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-dash border-2 border-slate-200 bg-slate-50/30 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center space-y-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-300">
                            <FileText className="w-10 h-10" />
                        </div>
                        <div className="max-w-xs space-y-2">
                            <h3 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight">Vault is Empty</h3>
                            <p className="text-sm text-slate-400 font-medium">Start building your CV or Cover Letter to see them archived here securely.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/cv-builder">
                                <Button className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-6 h-11 rounded-xl shadow-lg shadow-primary/20">Build CV</Button>
                            </Link>
                            <Link href="/cover-letter">
                                <Button className="bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-[10px] px-6 h-11 rounded-xl">Write Letter</Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}
