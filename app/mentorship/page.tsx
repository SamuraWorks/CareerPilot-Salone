"use client"

import * as React from "react"
import { Navigation } from "@/components/navigation"
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

// --- DATA MODEL ---
interface Mentor {
    id: string
    name: string
    role: string
    field: string
    experience: string
    location: "Sierra Leone" | "Diaspora" | "Global"
    education: "Undergraduate" | "Graduate" | "Professional"
    bio: string
    image_url: string
    support_types: string[]
    availability: "Free" | "Premium" | "Sponsored"
    credibility: string
    insights?: string[]
}

const MOCK_MENTORS: Mentor[] = [
    {
        id: 'sengeh',
        name: 'Dr. David Moinina Sengeh',
        role: 'Chief Minister',
        field: 'Technology',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Chief Minister and former Minister of Basic and Senior Secondary Education. MIT and Harvard alumnus. Advocate for innovation, digital skills, and youth inclusion.',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/David_Moinina_Sengeh_2020.jpg/440px-David_Moinina_Sengeh_2020.jpg',
        support_types: ['Career Strategy', 'Innovation', 'Education Reform'],
        availability: 'Sponsored',
        credibility: 'PhD (MIT), Chief Minister of SL',
        insights: [
            'Digital skills are the future of Sierra Leone\'s economy.',
            'Creativity and problem-solving are more important than just certificates.'
        ]
    },
    {
        id: 'akisawyerr',
        name: 'Yvonne Aki-Sawyerr OBE',
        role: 'Mayor of Freetown',
        field: 'Public Service',
        experience: '25+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Mayor of Freetown, specializing in urban transformation, job creation, and climate resilience. Dedicated to community empowerment.',
        image_url: 'https://yvonneakisawyerr.com/wp-content/uploads/2023/12/YAS-Mayor.jpg',
        support_types: ['Leadership', 'Community Impact', 'Entrepreneurship'],
        availability: 'Sponsored',
        credibility: 'Mayor, MSc (LSE)',
        insights: [
            'Data-driven development is key to urban transformation.',
            'Community engagement makes every project sustainable.'
        ]
    },
    {
        id: 'sannoh',
        name: 'Hon. Ibrahim Sannoh',
        role: 'Deputy Minister (MoCTI)',
        field: 'Technology',
        experience: '10+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Deputy Minister of Communication, Technology, and Innovation. Expert in digital services and policy reform.',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ibrahim_Sannoh.jpg/440px-Ibrahim_Sannoh.jpg',
        support_types: ['Tech Policy', 'Digital Innovation', 'Public Administration'],
        availability: 'Free',
        credibility: 'Deputy Minister, MoCTI',
        insights: [
            'Digital automation is the backbone of efficient government services.'
        ]
    },
    {
        id: 'bah',
        name: 'Hon. Salima Monorma Bah',
        role: 'Minister of Communication, Technology & Innovation',
        field: 'Technology',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Oversees Sierra Leone\'s tech ecosystem and digital economy. Leads national innovation and youth inclusion programs.',
        image_url: 'https://mocti.gov.sl/wp-content/uploads/2023/07/Hon.-Salima-Bah.jpg',
        support_types: ['Digital Economy', 'Tech Startups', 'National Innovation'],
        availability: 'Sponsored',
        credibility: 'Minister, MoCTI',
        insights: [
            'Our goal is to create a digital landscape where every pikin kin learn to earn.'
        ]
    },
    {
        id: 'remoe',
        name: 'Vickie Remoe',
        role: 'Media Entrepreneur',
        field: 'Media',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Host of The Vickie Remoe Show. Branding Expert and advocate for entrepreneurship and storytelling in Salone.',
        image_url: 'https://expomediasl.com/wp-content/uploads/2020/01/VickieRemoe_Media_Headshot.jpg',
        support_types: ['Branding', 'Media Careers', 'Storytelling'],
        availability: 'Free',
        credibility: 'Founder, VR&C Marketing',
        insights: [
            'Your brand is the story people tell about you when you are not in the room.',
            'Sierra Leone has so many stories that need to be told professionally.'
        ]
    },
    {
        id: '1',
        name: 'Dr. Samuel Wise',
        role: 'Senior Software Architect',
        field: 'Technology',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Focused on building scalable fintech systems and mentoring next-gen developers in Salone.',
        image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        support_types: ['Career Direction', 'CV Review', 'Interview Prep'],
        availability: 'Free',
        credibility: 'Ex-Lead at Orange Money Technology',
        insights: [
            'How to land your first tech job in Freetown.',
            'Why soft skills matter as much as coding.'
        ]
    }
]

export default function MentorshipPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("All")
    const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(null)
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)

    // Booking Flow State
    const [bookingStep, setBookingStep] = React.useState(1) // 1: Profile, 2: Topic, 3: Success
    const [selectedTopic, setSelectedTopic] = React.useState("")

    const categories = ["All", "Technology", "Medical", "Law", "Healthcare", "Entrepreneurship", "Data & AI"]

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
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-primary/10">
            <Navigation />

            <main className="flex-1 pb-20">
                {/* --- PREMIUM HEADER --- */}
                <section className="relative pt-20 pb-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-4">
                            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors mb-6">
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Career Mentors</h1>
                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                                Learn from professionals who’ve walked the path you’re choosing. Human insight to power your career.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-6 -mt-8 relative z-20">
                    {/* --- SMART FILTERS --- */}
                    <Card className="p-4 md:p-6 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 border-none rounded-[2.5rem]">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-primary focus:border-primary w-full text-sm font-bold"
                                    placeholder="Search by name or role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                                {categories.map(cat => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "ghost"}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "rounded-xl h-12 font-bold text-[11px] uppercase tracking-widest whitespace-nowrap px-6",
                                            selectedCategory === cat ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 bg-slate-50 hover:bg-slate-100"
                                        )}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* --- AI INTELLIGENT MATCHING --- */}
                    <div className="mt-12 mb-16">
                        <div className="flex items-center gap-3 mb-6 bg-primary/5 p-4 rounded-3xl border border-primary/10 inline-flex">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">AI Strategic Match</h3>
                                <p className="text-xs text-slate-500 font-bold">Recommended for your "{selectedCategory === "All" ? "Career Path" : selectedCategory}" interest</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMentors.length > 0 ? (
                                filteredMentors.map((mentor) => (
                                    <motion.div
                                        key={mentor.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -8 }}
                                        onClick={() => handleMentorClick(mentor)}
                                        className="group cursor-pointer"
                                    >
                                        <Card className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-none shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all relative overflow-hidden">
                                            {/* Status Badge */}
                                            <div className="absolute top-6 right-6">
                                                <Badge className={cn(
                                                    "rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-widest border-none",
                                                    mentor.availability === "Free" ? "bg-emerald-500 text-white" :
                                                        mentor.availability === "Sponsored" ? "bg-blue-500 text-white" : "bg-slate-900 text-white"
                                                )}>
                                                    {mentor.availability === "Free" ? <Unlock className="w-3 h-3 mr-1.5 inline" /> : <Lock className="w-3 h-3 mr-1.5 inline" />}
                                                    {mentor.availability}
                                                </Badge>
                                            </div>

                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-6">
                                                    <Avatar className="w-24 h-24 border-[6px] border-slate-50 dark:border-slate-800 shadow-xl group-hover:scale-110 transition-transform">
                                                        <AvatarImage src={mentor.image_url} className="object-cover" />
                                                        <AvatarFallback className="font-black text-xl">{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 border-4 border-white dark:border-slate-900 shadow-lg">
                                                        <BadgeCheck className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{mentor.name}</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{mentor.role}</p>

                                                <div className="flex items-center gap-3 mb-6 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-2xl w-full justify-center">
                                                    <div className="flex items-center gap-1.5">
                                                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mentor.experience}</span>
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <div className="flex items-center gap-1.5">
                                                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{mentor.location}</span>
                                                    </div>
                                                </div>

                                                <div className="w-full space-y-2 mb-8 text-left">
                                                    {mentor.support_types.slice(0, 2).map((type, i) => (
                                                        <div key={i} className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {type}
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button className="w-full h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[11px] transition-all border-none">
                                                    View Profile & Book
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900">No mentors found</h3>
                                    <p className="text-slate-500 font-medium">Try adjusting your search or category filters.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- MENTOR INSIGHTS SECTION --- */}
                    <div className="mt-24 space-y-10 border-t border-slate-200 dark:border-white/5 pt-20">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-left">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Mentor Insights</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">Career myths, industry truths, and professional wisdom shared by our verified experts.</p>
                            </div>
                            <Button variant="ghost" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary gap-2 hover:bg-primary/5 p-0 sm:pb-3">
                                Read All Insights <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {MOCK_MENTORS.filter(m => m.insights).slice(0, 2).map((m, i) => (
                                <Card key={i} className="p-8 rounded-[3rem] bg-white dark:bg-slate-900 border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8">
                                        <MessageCircle className="w-12 h-12 text-slate-50 dark:text-slate-800 group-hover:text-primary/10 transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={m.image_url} />
                                        </Avatar>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white text-sm">{m.name}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.role}</p>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">"{m.insights![0]}"</h4>
                                    <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                                        Read Insight <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* --- MENTOR DIALOG (MULTI-STEP BOOKING FLOW) --- */}
            <AnimatePresence>
                {selectedMentor && (
                    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                        <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-none rounded-[3rem] bg-slate-50 dark:bg-slate-950 max-h-[90vh] overflow-y-auto">
                            <DialogTitle className="sr-only">Book a Mentorship Session with {selectedMentor.name}</DialogTitle>
                            <DialogDescription className="sr-only">
                                Connect with verified Sierra Leonean mentors to accelerate your career growth, review your CV, or prepare for interviews.
                            </DialogDescription>

                            {/* STEP 1: MENTOR PROFILE */}
                            {bookingStep === 1 && (
                                <div className="flex flex-col">
                                    <div className="h-40 bg-slate-900 relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-[#10b981]/20" />
                                        <div className="absolute -bottom-12 left-10">
                                            <Avatar className="w-32 h-32 border-[8px] border-slate-50 dark:border-slate-950 shadow-2xl">
                                                <AvatarImage src={selectedMentor.image_url} className="object-cover" />
                                            </Avatar>
                                        </div>
                                    </div>

                                    <div className="px-10 pt-16 pb-12 space-y-8">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{selectedMentor.name}</h2>
                                                    <Badge className="bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest border-none px-3 py-1">Verified</Badge>
                                                </div>
                                                <p className="text-lg font-bold text-primary">{selectedMentor.role}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{selectedMentor.credibility}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="text-center">
                                                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">12</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Stud.</p>
                                                </div>
                                                <div className="w-px h-8 bg-slate-200" />
                                                <div className="text-center">
                                                    <p className="text-xl font-black text-slate-900 dark:text-white leading-none">4.9</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rating</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Info className="w-3.5 h-3.5" /> Mentor Bio
                                                    </h4>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                        {selectedMentor.bio}
                                                    </p>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HOW I CAN HELP</h4>
                                                    <div className="space-y-2">
                                                        {selectedMentor.support_types.map((t, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="p-6 rounded-[2.5rem] bg-slate-900 text-white space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Model</h4>
                                                        <Badge className="bg-white/10 text-white font-black text-[9px] uppercase tracking-widest border-none">{selectedMentor.availability}</Badge>
                                                    </div>

                                                    {selectedMentor.availability === "Free" ? (
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
                                                                <Unlock className="w-5 h-5" /> 100% Free
                                                            </div>
                                                            <p className="text-[10px] text-slate-400">This mentor provides free sessions as part of their contribution to youth development in Salone.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-blue-400 font-bold text-sm">
                                                                <Lock className="w-5 h-5" /> Sponsored Access
                                                            </div>
                                                            <p className="text-[10px] text-slate-400">Sessions are paid by our NGO partners. Free for all verified platform users.</p>
                                                        </div>
                                                    )}

                                                    <Button
                                                        onClick={handleStartBooking}
                                                        className="w-full h-14 rounded-2xl bg-primary hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20"
                                                    >
                                                        Request Guidance
                                                    </Button>
                                                </div>

                                                <div className="flex items-center gap-4 px-2">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CURRENT BASE</p>
                                                        <p className="text-xs font-bold text-slate-700">{selectedMentor.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: TOPIC SELECTION */}
                            {bookingStep === 2 && (
                                <div className="p-10 space-y-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent" onClick={() => setBookingStep(1)}>
                                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                                        </Button>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select a Support Topic</h3>
                                            <p className="text-sm font-medium text-slate-500">What do you want to discuss with {selectedMentor.name}?</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["Career Clarity", "CV & Portfolio Review", "Interview Preparation", "Scholarship Guidance", "Industry Trends"].map((t, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedTopic(t)}
                                                className={cn(
                                                    "p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-start gap-4",
                                                    selectedTopic === t ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200 bg-white"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                                    selectedTopic === t ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                                )}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className={cn("font-black text-sm transition-colors", selectedTopic === t ? "text-primary" : "text-slate-900")}>{t}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">30 MIN SESSION</p>
                                                </div>
                                                <div className={cn(
                                                    "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                    selectedTopic === t ? "border-primary bg-primary" : "border-slate-200"
                                                )}>
                                                    {selectedTopic === t && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-slate-100 rounded-3xl p-6 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 mb-1">Schedule & Time</p>
                                            <p className="text-xs text-slate-500 font-medium">After choosing the topic, we will sync with {selectedMentor.name}'s calendar and email you the confirmed meeting link.</p>
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button
                                            onClick={handleConfirmBooking}
                                            className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-primary transition-all gap-2"
                                        >
                                            Confirm Request <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}

                            {/* STEP 3: SUCCESS */}
                            {bookingStep === 3 && (
                                <div className="p-16 text-center space-y-8 animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                                        <Smile className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black text-slate-900 tracking-tight">Request Sent!</h3>
                                        <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto">Awesome! Your request for a **{selectedTopic}** session has been sent to **{selectedMentor.name}**.</p>
                                    </div>
                                    <div className="bg-slate-100 p-6 rounded-3xl inline-flex items-center gap-4">
                                        <Clock className="w-5 h-5 text-slate-400" />
                                        <p className="text-xs font-bold text-slate-600">Expected response time: **24-48 hours**</p>
                                    </div>
                                    <div className="pt-6">
                                        <Button onClick={closeDialog} className="h-14 px-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px]">
                                            Done
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
