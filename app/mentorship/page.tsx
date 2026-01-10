"use client"

import * as React from "react"
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
    ChevronRight,
    Star,
    BadgeCheck,
    Lock,
    Unlock,
    Info,
    Calendar,
    Clock,
    Smile,
    Zap,
    Sparkles
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

export default function MentorshipPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("All")
    const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(null)
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)

    // Booking Flow State
    const [bookingStep, setBookingStep] = React.useState(1)
    const [selectedTopic, setSelectedTopic] = React.useState("")

    const categories = ["All", "Technology", "Healthcare", "Agriculture", "Mining", "Finance", "Law", "Media", "Public Service", "Entrepreneurship"]

    const filteredMentors = MOCK_MENTORS.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || m.field === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleMentorClick = (mentor: Mentor) => {
        setSelectedMentor(mentor)
        setBookingStep(1)
        setSelectedTopic("")
        setIsProfileOpen(true)
    }

    const handleStartBooking = () => {
        setBookingStep(2)
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
        <div className="flex flex-col min-h-screen bg-white selection:bg-primary/20 overflow-x-hidden pt-0 md:pt-0">

            <main className="flex-1 pb-24">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative min-h-[450px] flex items-center overflow-hidden border-b-8 border-b-[#1FA774]">
                    <div className="absolute inset-0 z-0">
                        <Image src="/school-counselor-student.jpg" alt="Mentorship Hero" fill className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#0B1F3A]/80" />
                    </div>

                    <div className="container mx-auto px-6 relative z-20 pt-10">
                        <div className="max-w-4xl space-y-10">
                            <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group">
                                <div className="p-2 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                Back to Control Center
                            </Link>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                                    <Sparkles className="w-4 h-4 text-[#1FA774]" />
                                    <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Verified Experts Only</span>
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-sans uppercase">
                                    Strategic <br /> <span className="text-gradient-salone brightness-125">Mentorship</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6">
                                    Connect with verified professionals who have already navigated the path you're on.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 flex items-center gap-6 border border-white/10 shadow-2xl">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-white shadow-lg">
                                        <BadgeCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white leading-none">50+</p>
                                        <p className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest mt-1 italic">Verified Leaders</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 flex items-center gap-6 border border-white/10 shadow-2xl">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] flex items-center justify-center text-[#1FA774] border border-[#1FA774]/20">
                                        <Star className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white leading-none">4.9</p>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1 italic">Avg. Member Rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-6 -mt-10 relative z-20">
                    {/* --- SMART FILTERS --- */}
                    <Card className="p-6 md:p-8 shadow-2xl bg-white border-none rounded-[3.5rem] flex flex-col md:flex-row gap-8 items-center border-b-4 border-slate-100">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#1E5EFF] transition-colors" />
                            <Input
                                className="pl-16 h-16 rounded-2xl border-slate-50 bg-slate-50 focus:bg-white focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] w-full text-base font-bold font-sans shadow-inner"
                                placeholder="Search by name, role, or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "rounded-[1.2rem] h-14 font-black text-[10px] uppercase tracking-widest whitespace-nowrap px-8 font-sans transition-all active:scale-95",
                                        selectedCategory === cat
                                            ? "bg-[#0B1F3A] text-white shadow-xl shadow-[#0B1F3A]/20"
                                            : "text-slate-400 bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* --- MENTORS GRID --- */}
                    <div className="mt-20">
                        <div className="flex items-center gap-4 mb-10 pl-2">
                            <div className="w-2 h-10 bg-slate-50 rounded-full" />
                            <div>
                                <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tight font-sans uppercase">Expert Network</h2>
                                <p className="text-sm font-bold text-slate-400 font-sans italic">Showing {filteredMentors.length} mentors matching your criteria</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredMentors.length > 0 ? (
                                filteredMentors.map((mentor) => (
                                    <motion.div
                                        key={mentor.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -12 }}
                                        onClick={() => handleMentorClick(mentor)}
                                        className="group cursor-pointer"
                                    >
                                        <Card className="p-10 rounded-[3.5rem] bg-white border-8 border-slate-50 hover:border-[#1FA774]/10 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group">
                                            {/* Status Badge */}
                                            <div className="absolute top-8 right-8 z-10">
                                                <Badge className={cn(
                                                    "rounded-full px-5 py-2 font-black font-sans text-[9px] uppercase tracking-[0.2em] border-none shadow-sm",
                                                    mentor.availability === "Free" ? "bg-[#1FA774] text-white" : "bg-[#0B1F3A] text-white"
                                                )}>
                                                    {mentor.availability}
                                                </Badge>
                                            </div>

                                            <div className="flex flex-col items-center text-center relative z-10">
                                                <div className="relative mb-8">
                                                    <Avatar className="w-32 h-32 border-[8px] border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                        <AvatarImage src={mentor.image_url} className="object-cover" />
                                                        <AvatarFallback className="font-black font-sans text-2xl bg-slate-100 text-[#0B1F3A]">{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-2 -right-2 bg-[#1FA774] rounded-2xl p-2.5 border-[5px] border-white shadow-xl">
                                                        <BadgeCheck className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-black font-sans text-[#0B1F3A] mb-1 group-hover:text-[#1E5EFF] transition-colors leading-tight">{mentor.name}</h3>
                                                <p className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.2em] mb-6">{mentor.role}</p>

                                                <div className="flex items-center gap-4 mb-8 bg-slate-50 px-6 py-3 rounded-2xl w-full justify-center">
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="w-4 h-4 text-[#1FA774]" />
                                                        <span className="text-xs font-black font-sans text-[#0B1F3A]">{mentor.experience}</span>
                                                    </div>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-[#1E5EFF]" />
                                                        <span className="text-xs font-black font-sans text-[#0B1F3A]">{mentor.location}</span>
                                                    </div>
                                                </div>

                                                <div className="w-full space-y-3 mb-10 text-left">
                                                    {mentor.support_types.slice(0, 2).map((type, i) => (
                                                        <div key={i} className="px-5 py-2.5 rounded-2xl bg-slate-50 text-[10px] font-black font-sans text-slate-500 flex items-center gap-3 border border-transparent group-hover:border-slate-100 transition-all">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#1FA774]" /> {type}
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button className="w-full h-16 rounded-[2rem] bg-slate-900 hover:bg-[#1E5EFF] text-white font-black font-sans uppercase tracking-widest text-[11px] transition-all border-none shadow-xl active:scale-95">
                                                    Book Strategic Session
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center space-y-6">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8 rotate-12">
                                        <Search className="w-10 h-10 text-slate-200" />
                                    </div>
                                    <h3 className="text-2xl font-black font-sans text-[#0B1F3A] uppercase tracking-tight">No experts found</h3>
                                    <p className="text-slate-400 font-bold font-sans italic max-w-sm mx-auto">Try broadening your search or switching categories.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {selectedMentor && (
                    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                        <DialogContent className="sm:max-w-[780px] p-0 overflow-hidden border-none rounded-[3.5rem] bg-white shadow-[0_50px_100px_-20px_rgba(11,31,58,0.3)] max-h-[90vh] overflow-y-auto">
                            <DialogTitle className="sr-only">Book Strategy with {selectedMentor.name}</DialogTitle>

                            {bookingStep === 1 && (
                                <div className="flex flex-col">
                                    <div className="h-44 bg-[#0B1F3A] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-50" />
                                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                        <div className="absolute -bottom-14 left-12">
                                            <Avatar className="w-40 h-40 border-[10px] border-white shadow-2xl">
                                                <AvatarImage src={selectedMentor.image_url} className="object-cover" />
                                            </Avatar>
                                        </div>
                                    </div>

                                    <div className="px-12 pt-20 pb-16 space-y-10">
                                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-50 pb-8">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter font-sans">{selectedMentor.name}</h2>
                                                    <Badge className="bg-[#1FA774] text-white font-black text-[9px] uppercase tracking-widest border-none px-4 py-1.5 rounded-full">Pro Expert</Badge>
                                                </div>
                                                <p className="text-xl font-black text-[#1E5EFF] font-sans italic">{selectedMentor.role}</p>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] font-sans">{selectedMentor.credibility}</p>
                                            </div>
                                            <div className="flex gap-8 bg-slate-50 p-6 rounded-[2rem]">
                                                <div className="text-center">
                                                    <p className="text-2xl font-black text-[#0B1F3A] leading-none mb-1">12+</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sessions</p>
                                                </div>
                                                <div className="w-px h-10 bg-slate-200" />
                                                <div className="text-center">
                                                    <p className="text-2xl font-black text-[#1FA774] leading-none mb-1">4.9</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trust</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                                        <Info className="w-4 h-4 text-[#1E5EFF]" /> PROFESSIONAL BRIEF
                                                    </h4>
                                                    <p className="text-base text-slate-600 leading-relaxed font-medium font-sans border-l-4 border-slate-100 pl-6 italic">
                                                        {selectedMentor.bio}
                                                    </p>
                                                </div>
                                                <div className="space-y-5">
                                                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">EXPERTISE FOCUS</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedMentor.support_types.map((t, i) => (
                                                            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border-2 border-slate-50 shadow-sm text-xs font-black text-[#0B1F3A]">
                                                                <CheckCircle2 className="w-4 h-4 text-[#1FA774]" />
                                                                {t}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="p-8 rounded-[3rem] bg-[#0B1F3A] text-white space-y-8 shadow-2xl relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FA774]/10 rounded-full blur-2xl" />
                                                    <div className="flex items-center justify-between relative z-10">
                                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model</h4>
                                                        <Badge className="bg-white/10 text-white font-black text-[9px] uppercase tracking-widest border-none px-4">{selectedMentor.availability}</Badge>
                                                    </div>

                                                    <div className="space-y-4 relative z-10">
                                                        <div className={`flex items-center gap-3 ${selectedMentor.availability === "Free" ? "text-[#1FA774]" : "text-[#4ADE80]"} font-black text-lg font-sans uppercase`}>
                                                            {selectedMentor.availability === "Free" ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                                            {selectedMentor.availability === "Free" ? "No Charge" : "Full Access"}
                                                        </div>
                                                        <p className="text-[11px] text-slate-400 leading-relaxed">Verified CareerPilot members get priority access to sessions at no personal cost thanks to our coalition partners.</p>
                                                    </div>

                                                    <Button
                                                        onClick={handleStartBooking}
                                                        className="w-full h-[64px] rounded-2xl bg-[#1FA774] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-emerald-500/10 transition-all active:scale-95"
                                                    >
                                                        Request Guidance Now
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div className="p-16 space-y-12 bg-slate-50/50">
                                    <div className="flex items-center gap-6 mb-4">
                                        <button onClick={() => setBookingStep(1)} className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1E5EFF] hover:border-[#1E5EFF] hover:shadow-xl transition-all active:scale-90">
                                            <ArrowLeft className="w-6 h-6" />
                                        </button>
                                        <div>
                                            <h3 className="text-3xl font-black text-[#0B1F3A] tracking-tighter font-sans uppercase">Strategic Objective</h3>
                                            <p className="text-base font-bold text-slate-400 font-sans italic">Choose your focus area for this meeting</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {["Career Strategy", "CV Engineering", "Mock Interview", "Scholarship Grants", "Business Start-Up"].map((t, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedTopic(t)}
                                                className={cn(
                                                    "p-8 rounded-[2.5rem] border-4 transition-all cursor-pointer group flex items-start gap-5 relative overflow-hidden",
                                                    selectedTopic === t ? "border-[#1E5EFF] bg-white shadow-2xl" : "border-white bg-white/60 hover:border-slate-100"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all",
                                                    selectedTopic === t ? "bg-[#1E5EFF] text-white shadow-xl shadow-[#1E5EFF]/20" : "bg-slate-50 text-slate-300"
                                                )}>
                                                    <Zap className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={cn("font-black text-base transition-colors font-sans", selectedTopic === t ? "text-[#1E5EFF]" : "text-[#0B1F3A]")}>{t}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">45 MINUTE TRACK</p>
                                                </div>
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all",
                                                    selectedTopic === t ? "border-[#1E5EFF] bg-[#1E5EFF]" : "border-slate-100"
                                                )}>
                                                    {selectedTopic === t && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <DialogFooter className="pt-8">
                                        <Button
                                            onClick={handleConfirmBooking}
                                            className="w-full h-[72px] rounded-[2rem] bg-[#0B1F3A] text-white font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl hover:bg-[#1E5EFF] transition-all gap-4 active:scale-95 group"
                                        >
                                            Confirm Strategic Request
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}

                            {bookingStep === 3 && (
                                <div className="p-20 text-center space-y-10 animate-in zoom-in-95 duration-700 bg-white">
                                    <div className="w-32 h-32 rounded-[3.5rem] bg-emerald-50 text-[#1FA774] flex items-center justify-center mx-auto shadow-[0_30px_60px_-15px_rgba(31,167,116,0.3)] rotate-12">
                                        <Smile className="w-16 h-16" />
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase font-sans">Request Broadcasted!</h3>
                                        <p className="text-xl text-slate-500 font-medium font-sans max-w-sm mx-auto leading-relaxed italic border-l-4 border-slate-50 pl-6">Mission control: your **{selectedTopic}** request is officially on **{selectedMentor.name.split(' ')[0]}'s** radar.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-[2rem] inline-flex items-center gap-4 border border-slate-100 shadow-inner">
                                        <Clock className="w-6 h-6 text-[#1E5EFF]" />
                                        <p className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest italic">Expected response na Salone clock: **24-48 hours**</p>
                                    </div>
                                    <div className="pt-10">
                                        <Button onClick={closeDialog} className="h-16 px-16 rounded-[2rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#1FA774] transition-all shadow-2xl active:scale-95">
                                            Return to Explorer
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    )
}

