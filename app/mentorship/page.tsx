"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Search,
    ArrowLeft,
    CheckCircle2,
    MessageCircle,
    FileText,
    Brain,
    Compass,
    GraduationCap,
    Briefcase,
    Globe,
    Users,
    Award,
    ChevronRight,
    Star,
    BadgeCheck,
    Lock,
    Unlock,
    Info,
    Calendar,
    Clock,
    Zap,
    Sparkles,
    Loader2,
    ArrowRight,
    Smile
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import { MOCK_MENTORS, Mentor } from "@/lib/mentors"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export default function MentorshipPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-white">
                <Loader2 className="w-12 h-12 animate-spin text-[#1FA774]" />
            </div>
        }>
            <MentorshipContent />
        </Suspense>
    )
}

const categories = ["All", "Technology", "Finance", "Business", "Non-Profit", "Agriculture", "Healthcare", "Mining", "Media", "Education"]

function MentorshipContent() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("All")
    const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(null)
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)

    // Booking Flow State
    const [bookingStep, setBookingStep] = React.useState(1)
    const [selectedTopic, setSelectedTopic] = React.useState("")

    const searchParams = useSearchParams()
    const mentorId = searchParams.get("mentor")

    React.useEffect(() => {
        if (mentorId) {
            const mentor = MOCK_MENTORS.find(m => m.id === mentorId)
            if (mentor) {
                setTimeout(() => {
                    setSelectedMentor(mentor)
                    setIsProfileOpen(true)
                }, 100)
            }
        }
    }, [mentorId])

    const targetCareer = searchParams.get("career")

    const filteredMentors = MOCK_MENTORS.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.field.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = selectedCategory === "All" || m.field === selectedCategory

        // If a specific career is targeted, find mentors who mention it in support_types or field
        const matchesTargetCareer = !targetCareer ||
            m.support_types.some(s => s.toLowerCase().includes(targetCareer?.toLowerCase())) ||
            m.field.toLowerCase().includes(targetCareer?.toLowerCase())

        return matchesSearch && matchesCategory && matchesTargetCareer
    })

    const handleMentorClick = (mentor: Mentor) => {
        setSelectedMentor(mentor)
        setBookingStep(1)
        setSelectedTopic("")
        setIsProfileOpen(true)
    }

    const handleConfirmBooking = () => {
        if (!selectedTopic) {
            toast.error("Please select a topic for your session.")
            return
        }
        setBookingStep(3)
        toast.success("Mentorship request sent successfully!")
    }

    const closeDialog = () => {
        setIsProfileOpen(false)
        setBookingStep(1)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
                <main className="flex-1 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10 md:mb-12">
                            <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-emerald-600 hover:text-emerald-700 transition-all group mb-6">
                                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                Back to Control Center
                            </Link>

                            <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Verified Experts Only</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black mb-4 text-gradient-salone tracking-tight uppercase px-4">Mentorship</h1>
                            <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium px-4">
                                Connect with verified professionals who have already navigated the path you're on. 1-on-1 guidance for your career growth.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto text-left">
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                            <Users className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-3xl md:text-4xl font-black text-[#0B1F3A]">{MOCK_MENTORS.length}</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">Verified Mentors</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                        </div>
                                        <span className="text-3xl md:text-4xl font-black text-[#0B1F3A]">24H</span>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Response Rate</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                                            <Award className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                                        </div>
                                        <span className="text-3xl md:text-4xl font-black text-[#0B1F3A]">100%</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 space-y-6">
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="search"
                                    placeholder="Search by name, role, or industry..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-14 h-16 rounded-[2rem] border-slate-200 shadow-lg text-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                />
                            </div>

                            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap gap-2 justify-start md:justify-center max-w-4xl mx-auto no-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "rounded-full px-5 md:px-6 py-2 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap",
                                            (selectedCategory === cat)
                                                ? "bg-[#0B1F3A] text-white shadow-lg scale-105"
                                                : "text-slate-500 bg-white border border-slate-100 hover:border-emerald-600 hover:text-emerald-600"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredMentors.map((mentor) => (
                                <motion.div
                                    key={mentor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => handleMentorClick(mentor)}
                                    className="group cursor-pointer"
                                >
                                    <Card className="relative overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="relative">
                                                <Avatar className="w-20 h-20 border-4 border-slate-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                    <AvatarImage src={mentor.image_url} className="object-cover" />
                                                    <AvatarFallback className="text-xl font-black bg-emerald-50 text-emerald-700">
                                                        {mentor.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm border border-slate-100">
                                                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-[#0B1F3A] leading-none mb-1">{mentor.experience}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight group-hover:text-emerald-700 transition-colors uppercase">{mentor.name}</h3>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">{mentor.role}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5">
                                                {mentor.support_types.slice(0, 3).map(type => (
                                                    <Badge key={type} variant="secondary" className="bg-slate-50 border-transparent text-slate-400 font-bold rounded-lg text-[9px] uppercase tracking-wider px-2.5">
                                                        {type}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white" />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+{mentor.menteesCount || 10} Mentees</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />

                <AnimatePresence>
                    {selectedMentor && (
                        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-t-[2rem] md:rounded-[2rem] bg-white max-h-[90dvh] md:max-h-[85vh] h-full md:h-auto overflow-y-auto scrollbar-hide">
                                <DialogTitle className="sr-only">Mentor Profile: {selectedMentor.name}</DialogTitle>
                                {bookingStep === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                        <div className="p-6 md:p-12 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100">
                                            <div className="relative mb-6">
                                                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-xl">
                                                    <AvatarImage src={selectedMentor.image_url} className="object-cover" />
                                                    <AvatarFallback className="text-xl md:text-2xl font-black bg-emerald-100 text-emerald-700">
                                                        {selectedMentor.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white p-1.5 md:p-2 rounded-xl shadow-lg border border-slate-50">
                                                    <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h2 className="text-2xl md:text-3xl font-black text-[#0B1F3A] tracking-tight">{selectedMentor.name}</h2>
                                                    <p className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1">{selectedMentor.role}</p>
                                                </div>
                                                <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                                                    {selectedMentor.bio}
                                                </p>
                                                <div className="pt-2 md:pt-4 space-y-3 md:space-y-4">
                                                    <div className={`flex items-center gap-3 ${selectedMentor.availability === "Free" ? "text-emerald-600" : "text-blue-600"} font-black text-xs md:text-sm uppercase tracking-widest`}>
                                                        {selectedMentor.availability === "Free" ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                                        {selectedMentor.availability === "Free" ? "Open Access" : "Premium Only"}
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 font-medium">Priority access for verified CareerPilot members. Response within 24-48 hours.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-12 flex flex-col justify-between bg-white">
                                            <div className="space-y-6 md:space-y-8">
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-black text-[#0B1F3A] tracking-tight mb-1 md:mb-2">Select Your Focus</h3>
                                                    <p className="text-xs md:text-base text-slate-500 font-medium">What would you like to discuss?</p>
                                                </div>

                                                <div className="space-y-2 md:space-y-3">
                                                    {selectedMentor.support_types.map(type => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setSelectedTopic(type)}
                                                            className={cn(
                                                                "w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all group relative overflow-hidden",
                                                                selectedTopic === type
                                                                    ? "border-emerald-500 bg-emerald-50/30"
                                                                    : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className={cn(
                                                                    "font-black text-[10px] md:text-xs uppercase tracking-widest",
                                                                    selectedTopic === type ? "text-emerald-700" : "text-slate-400"
                                                                )}>{type}</span>
                                                                <ArrowRight className={cn(
                                                                    "w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1",
                                                                    selectedTopic === type ? "text-emerald-500" : "text-slate-300"
                                                                )} />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-6 md:pt-8">
                                                <Button
                                                    onClick={handleConfirmBooking}
                                                    className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.5rem] bg-[#0B1F3A] hover:bg-[#1a2f4a] text-white font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all text-xs"
                                                >
                                                    Request Guidance
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 3 && (
                                    <div className="p-10 md:p-16 text-center space-y-6 md:space-y-8">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-600 shadow-lg border-4 border-white">
                                            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
                                        </div>
                                        <div className="space-y-2 md:space-y-3">
                                            <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] tracking-tight">Request Sent!</h2>
                                            <p className="text-slate-500 text-base md:text-lg font-medium max-w-sm mx-auto italic">
                                                Your session request for **{selectedTopic}** is now on {selectedMentor.name?.split(' ')[0]}'s radar.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={closeDialog}
                                            className="h-14 md:h-16 px-10 md:px-12 rounded-xl md:rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest shadow-xl transition-all text-xs">
                                            Back to Explorer
                                        </Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    )
}
