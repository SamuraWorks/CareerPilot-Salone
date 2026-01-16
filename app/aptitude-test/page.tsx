"use client"

import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    ChevronRight,
    ChevronLeft,
    Loader2,
    Award,
    Briefcase,
    TrendingUp,
    GraduationCap,
    Target,
    Zap,
    Sparkles,
    CheckCircle2,
    Lightbulb,
    ArrowRight,
    MapPin,
    BookOpen,
    ExternalLink,
    Calendar,
    ArrowUpRight,
    Download,
    ArrowLeft,
    X,
    LogOut
} from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { AICareerGuidance } from "@/components/ai-career-guidance"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"

const QUESTIONS = [
    // Realistic (R)
    { id: 1, text: "I enjoy building or repairing things with my hands.", type: "R" },
    { id: 2, text: "I prefer working outdoors, even in the sun or rain.", type: "R" },
    { id: 3, text: "I like working with heavy machinery or technical tools.", type: "R" },
    { id: 4, text: "I enjoy practical activities like farming, driving, or construction.", type: "R" },
    // Investigative (I)
    { id: 5, text: "I love solving complex math or logic puzzles.", type: "I" },
    { id: 6, text: "I enjoy conducting scientific experiments or research.", type: "I" },
    { id: 7, text: "I like finding out how complex systems or technologies work.", type: "I" },
    { id: 8, text: "I prefer working independently on difficult technical problems.", type: "I" },
    // Artistic (A)
    { id: 9, text: "I enjoy drawing, painting, or designing creative visuals.", type: "A" },
    { id: 10, text: "I like writing stories, poems, or news articles.", type: "A" },
    { id: 11, text: "I enjoy performing music, dance, or drama in front of others.", type: "A" },
    { id: 12, text: "I like expressing myself through fashion or media content.", type: "A" },
    // Social (S)
    { id: 13, text: "I enjoy helping people solve their personal problems.", type: "S" },
    { id: 14, text: "I like teaching others how to do something new.", type: "S" },
    { id: 15, text: "I enjoy working in teams to improve my community.", type: "S" },
    { id: 16, text: "I am a patient listener when someone is in distress.", type: "S" },
    // Enterprising (E)
    { id: 17, text: "I enjoy leading a team or starting a small project.", type: "E" },
    { id: 18, text: "I like persuading people to see my point of view.", type: "E" },
    { id: 19, text: "I enjoy the challenge of reaching business or sales targets.", type: "E" },
    { id: 20, text: "I am confident when speaking in public or managing others.", type: "E" },
    // Conventional (C)
    { id: 21, text: "I like keeping accurate records and documents organized.", type: "C" },
    { id: 22, text: "I enjoy working with numbers and managing budgets.", type: "C" },
    { id: 23, text: "I prefer having clear rules and structured environments.", type: "C" },
    { id: 24, text: "I am good at spotting errors in reports or spreadsheets.", type: "C" }
]

const RIASEC_NAMES = {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional"
}

export default function CareerTestPage() {
    const [step, setStep] = useState(0) // 0: Start, 1: Quiz, 2: Loading, 3: Results
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [scores, setScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
    const [results, setResults] = useState<any>(null)
    const [topType, setTopType] = useState<string>("")
    const [userContext, setUserContext] = useState<any>(null)
    const { user } = useAuth()
    const [isDownloading, setIsDownloading] = useState(false)
    const resultsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedData = localStorage.getItem("userOnboarding")
        if (savedData) {
            setUserContext(JSON.parse(savedData))
        }
    }, [])

    const handleAnswer = (value: number) => {
        const q = QUESTIONS[currentQuestion]
        const updatedScores = { ...scores, [q.type]: scores[q.type] + value }
        setScores(updatedScores)

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            getAIResults(updatedScores)
        }
    }

    const getAIResults = async (finalScores: Record<string, number>) => {
        setStep(2) // Loading state

        const sortedTypes = Object.entries(finalScores).sort((a, b) => b[1] - a[1])
        const top = sortedTypes[0][0]
        setTopType(top)

        const input = {
            skills: userContext?.subjects?.join(", ") || "General Skills",
            interests: `${RIASEC_NAMES[top as keyof typeof RIASEC_NAMES]} interests`,
            education: userContext?.educationLevel || "Secondary School",
            location: "Sierra Leone",
            career_goal: userContext?.careerGoal || "Professional Growth"
        }

        try {
            const response = await fetch("/api/match-careers", {
                method: "POST",
                body: JSON.stringify(input)
            })
            const data = await response.json()
            setResults(data.career_test_result)
            setStep(3)

            // Save to LocalStorage
            localStorage.setItem("latestCareerTestResult", JSON.stringify({
                riasec_score: finalScores,
                top_type: top,
                recommendations: data.career_test_result.careers,
                summary: data.career_test_result.summary,
                created_at: new Date().toISOString()
            }))
            console.log("Results saved to LocalStorage")
        } catch (error) {
            console.error("Failed to fetch results", error)
            toast.error("Network error. Please try again.")
            setStep(0) // Reset on error
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

                {/* PREMIUM HERO HEADER */}
                <section className="relative rounded-3xl overflow-hidden bg-primary min-h-[400px] flex items-center shadow-lg group border-b-8 border-emerald-500">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/salone_education.png"
                            alt="Aptitude Test Hero"
                            fill
                            className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/80" />
                    </div>

                    <div className="relative z-20 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-6 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-md">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide">Neural Aptitude Protocol</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight font-sans">
                                Aptitude Test
                            </h1>
                            <p className="text-lg md:text-xl text-slate-200 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-emerald-500 pl-4">
                                Our strategic psychometric engine maps your personality to the Sierra Leonean professional landscape with surgical precision.
                            </p>

                            {step === 0 && (
                                <div className="pt-4">
                                    <Button
                                        onClick={() => setStep(1)}
                                        className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-primary text-white gap-4 text-sm font-bold uppercase tracking-wide shadow-xl active:scale-95 group transition-all"
                                    >
                                        Initialize Assessment
                                        <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform text-white" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wide group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Base
                        </Link>
                    </div>
                </section>

                <div className="mt-8">
                    {step === 1 && (
                        <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500">// Sequential Progress</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-slate-900 font-sans leading-none">{currentQuestion + 1}</span>
                                            <span className="text-xl font-medium text-slate-400 font-sans">of {QUESTIONS.length}</span>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <Badge className="bg-primary/5 text-primary border border-primary/10 font-bold uppercase tracking-wide text-[10px] px-3 py-1 rounded-full">
                                            {RIASEC_NAMES[QUESTIONS[currentQuestion].type as keyof typeof RIASEC_NAMES]} Sector Calibration
                                        </Badge>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to terminate the protocol? Data will be purged.")) {
                                                        setStep(0);
                                                        setCurrentQuestion(0);
                                                        setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
                                                    }
                                                }}
                                                className="text-slate-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-wide h-8"
                                            >
                                                <LogOut className="w-3.5 h-3.5 mr-2" />
                                                Terminate Test
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                                    <div
                                        className="h-full bg-slate-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <Card className="p-12 md:p-16 shadow-xl rounded-[3rem] border-none bg-slate-50 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-0 transition-transform">
                                    <Sparkles className="w-64 h-64 text-primary" />
                                </div>

                                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-12 text-center leading-tight tracking-tight font-sans max-w-2xl mx-auto">
                                    "{QUESTIONS[currentQuestion].text}"
                                </h3>

                                <div className="grid gap-3 max-w-lg mx-auto relative z-10">
                                    {[
                                        { label: "Absolutely True", value: 4, color: "bg-primary text-white hover:bg-emerald-600 shadow-xl" },
                                        { label: "Mostly True", value: 3, color: "bg-white text-slate-900 border border-slate-200 hover:border-primary hover:text-primary" },
                                        { label: "Somewhat / Maybe", value: 2, color: "bg-white text-slate-700 border border-slate-200 hover:border-slate-300" },
                                        { label: "Not Really", value: 1, color: "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50" },
                                        { label: "Not At All", value: 0, color: "bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white" }
                                    ].map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(option.value)}
                                            className={`w-full h-16 rounded-2xl font-bold uppercase tracking-wide text-xs transition-all active:scale-[0.98] flex items-center justify-center ${option.color}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-40 space-y-12 animate-in fade-in duration-1000">
                            <div className="relative inline-block">
                                <div className="w-40 h-40 border-[12px] border-[#1FA774]/10 border-t-[#1FA774] rounded-full animate-spin mx-auto" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-16 h-16 text-[#1E5EFF] animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none font-sans">Synthesizing Profile...</h2>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.4em] italic border-t border-slate-100 pt-6 max-w-md mx-auto">Cross-referencing {QUESTIONS.length} neural data points with Salone market vectors</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && results && (
                        <div id="results" ref={resultsRef} className="space-y-24 animate-in fade-in zoom-in-95 duration-1000 pb-20">
                            <div className="text-center space-y-8">
                                <div className="inline-flex items-center gap-4 bg-emerald-50 text-[#1FA774] px-10 py-4 rounded-full border border-emerald-100 mb-4 shadow-xl shadow-emerald-500/10">
                                    <CheckCircle2 className="w-8 h-8" />
                                    <span className="font-black uppercase tracking-[0.3em] text-xs italic">Neural Mapping Complete</span>
                                </div>
                                <h2 className="text-6xl md:text-9xl font-black text-[#0B1F3A] tracking-tighter leading-none font-sans uppercase italic">Top Matches.</h2>
                                <p className="text-slate-400 font-bold text-xl max-w-4xl mx-auto italic leading-relaxed border-l-8 border-[#1FA774] pl-10 text-left">
                                    {results.summary}
                                </p>
                            </div>

                            <div className="grid gap-16">
                                {results.careers.map((career: any) => (
                                    <Card key={career.rank} className="group overflow-hidden rounded-[4rem] border-none shadow-2xl hover:shadow-[#1E5EFF]/10 transition-all duration-700 bg-white relative">
                                        <div className="absolute inset-0 z-0 opacity-[0.02] grayscale pointer-events-none">
                                            <Image src="/images/dashboard/technical-skills.png" alt="Success" fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                                            <div className="p-12 lg:w-2/5 space-y-10 bg-slate-50/50">
                                                <div className="space-y-6">
                                                    <Badge className="bg-[#1E5EFF] text-white border-none font-black text-[10px] px-6 py-2 rounded-full uppercase tracking-widest italic leading-none">Sector Rank #{career.rank}</Badge>
                                                    <h3 className="text-4xl md:text-5xl font-black text-[#0B1F3A] leading-[1] tracking-tighter uppercase font-sans italic">{career.career_name}</h3>
                                                    <div className="flex flex-wrap gap-3">
                                                        <Badge variant="outline" className="border-[#1FA774]/20 text-[#1FA774] font-black uppercase text-[10px] bg-[#1FA774]/5 px-4 py-2 italic rounded-lg">
                                                            {career.demand_level} Demand
                                                        </Badge>
                                                        <Badge variant="outline" className="border-[#1E5EFF]/20 text-[#1E5EFF] font-black uppercase text-[10px] bg-[#1E5EFF]/5 px-4 py-2 italic rounded-lg">
                                                            Est. {career.entry_salary}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-white rounded-[2.5rem] border-l-8 border-[#1FA774] shadow-sm relative overflow-hidden group-hover:border-[#1E5EFF] transition-colors italic">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                                        <Lightbulb className="w-16 h-16" />
                                                    </div>
                                                    <p className="text-slate-500 font-bold text-lg leading-relaxed relative z-10">
                                                        "{career.why_it_fits}"
                                                    </p>
                                                </div>

                                                <div className="space-y-6">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic">// Core Competency Cluster</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {career.required_skills.map((skill: string) => (
                                                            <span key={skill} className="bg-white text-[#0B1F3A] px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm italic hover:bg-[#0B1F3A] hover:text-white transition-all">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-12 lg:w-3/5 space-y-12">
                                                <div className="grid md:grid-cols-2 gap-12">
                                                    <div className="space-y-6">
                                                        <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                                                            <GraduationCap className="w-5 h-5 text-[#1FA774]" /> Academic Hubs
                                                        </h4>
                                                        <div className="space-y-4">
                                                            {career.recommended_universities.map((uni: string) => (
                                                                <div key={uni} className="flex items-center gap-4 p-4 rounded-3xl bg-[#1E5EFF]/5 border border-[#1E5EFF]/10 group/item">
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#1E5EFF] animate-pulse" />
                                                                    <span className="font-black text-[11px] text-[#1E5EFF] uppercase tracking-tighter truncate italic">{uni}</span>
                                                                </div>
                                                            ))}
                                                            {career.recommended_training.map((train: string) => (
                                                                <div key={train} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                                                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                                                    <span className="font-black text-[11px] text-slate-500 uppercase tracking-tighter truncate italic">{train}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                                                            <Briefcase className="w-5 h-5 text-[#1E5EFF]" /> Tactical Roles
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {career.job_roles.map((role: string) => (
                                                                <div key={role} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100 group/role hover:bg-[#0B1F3A] transition-all duration-300">
                                                                    <span className="font-black text-[11px] text-[#0B1F3A] group-hover/role:text-white uppercase tracking-tight italic">{role}</span>
                                                                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/role:text-[#1FA774] transition-all" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-12 border-t border-slate-50">
                                                    <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 italic">
                                                        <Target className="w-5 h-5 text-[#1FA774]" /> Execution Roadmap
                                                    </h4>
                                                    <div className="grid md:grid-cols-3 gap-8 relative">
                                                        <div className="absolute top-3 left-0 w-full h-[3px] bg-slate-50 hidden md:block" />
                                                        {[
                                                            { time: "Week 01", items: career.skill_roadmap["1_week"] },
                                                            { time: "Month 01", items: career.skill_roadmap["1_month"] },
                                                            { time: "Month 03", items: career.skill_roadmap["3_months"] }
                                                        ].map((point, pIdx) => (
                                                            <div key={pIdx} className="relative space-y-4">
                                                                <div className="w-6 h-6 bg-white border-[6px] border-[#1FA774] rounded-full relative z-10 shadow-xl" />
                                                                <div>
                                                                    <p className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest mb-2 italic">{point.time}</p>
                                                                    <ul className="space-y-2">
                                                                        {point.items.map((it: string, itIdx: number) => (
                                                                            <li key={itIdx} className="text-xs font-bold text-slate-500 leading-tight italic">// {it}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#0B1F3A] p-10 flex flex-col sm:flex-row items-center justify-between gap-8 overflow-hidden relative">
                                            <div className="absolute top-0 right-0 h-full opacity-10 flex items-center pr-12 rotate-12">
                                                <Award className="w-40 h-40 text-white" />
                                            </div>
                                            <div className="relative z-10 space-y-2">
                                                <p className="text-white font-black text-3xl italic uppercase tracking-tighter font-sans leading-none">Activate this career path?</p>
                                                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] italic">Synthesize professional dossier for this vector</p>
                                            </div>
                                            <Link href={`/cv-builder?career=${encodeURIComponent(career.career_name)}`} className="w-full sm:w-auto relative z-10">
                                                <Button className="w-full bg-[#1FA774] text-white hover:bg-[#1E5EFF] font-black uppercase tracking-widest text-xs px-12 h-16 rounded-3xl shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 italic text-center">
                                                    Build Strategic CV
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <AICareerGuidance
                                userContext={{
                                    strengths: results?.careers[0]?.required_skills?.slice(0, 3) || ["Practical Skill", "Adaptability"],
                                    interests: [RIASEC_NAMES[topType as keyof typeof RIASEC_NAMES] || "General Discovery"],
                                    location: "Sierra Leone",
                                    education: userContext?.educationLevel || "Secondary School"
                                }}
                                guidance={{
                                    careerPaths: results.careers.map((c: any) => ({ title: c.career_name })),
                                    whyItFits: results.careers.slice(0, 3).map((c: any) => c.why_it_fits),
                                    nextSteps: results.next_steps,
                                    localOpportunities: ["Strategic Internships in Freetown", "Tech Upskilling na Orange Digital Center"]
                                }}
                                onFollowUp={() => window.dispatchEvent(new CustomEvent('openCareerAdvisor'))}
                                onSave={() => toast.success("Tactical career plan archived to profile!")}
                                onViewResources={() => window.location.href = "/universities"}
                            />

                            <div className="flex flex-col items-center gap-10 pt-10">
                                <div className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 shadow-2xl max-w-3xl text-center space-y-10 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FA774]/5 rounded-full blur-[100px]" />
                                    <h4 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tighter italic font-sans relative z-10 leading-none">Immediate <br /><span className="text-[#1FA774]">Tactical Next Steps:</span></h4>
                                    <div className="space-y-6 relative z-10">
                                        {results.next_steps.map((step: string, sIdx: number) => (
                                            <div key={sIdx} className="flex items-center gap-6 bg-white p-6 rounded-[2rem] text-left border border-slate-100 shadow-sm hover:shadow-xl transition-all group/step">
                                                <div className="w-10 h-10 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center font-black text-sm italic group-hover/step:bg-[#1FA774] transition-colors">{sIdx + 1}</div>
                                                <span className="font-bold text-slate-600 italic text-lg">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                                        <Button
                                            variant="outline"
                                            onClick={async () => {
                                                if (!resultsRef.current) {
                                                    toast.error("Results data purge detected")
                                                    return
                                                }
                                                setIsDownloading(true)
                                                try {
                                                    await new Promise(resolve => setTimeout(resolve, 100))
                                                    const canvas = await html2canvas(resultsRef.current, {
                                                        scale: 1.5,
                                                        useCORS: true,
                                                        logging: false,
                                                        allowTaint: true,
                                                        backgroundColor: '#ffffff'
                                                    })
                                                    const imgData = canvas.toDataURL('image/jpeg', 0.9)
                                                    const pdf = new jsPDF('p', 'mm', 'a4')
                                                    const pdfWidth = pdf.internal.pageSize.getWidth()
                                                    const pdfHeight = pdf.internal.pageSize.getHeight()
                                                    const imgWidth = canvas.width
                                                    const imgHeight = canvas.height
                                                    const ratio = imgWidth / pdfWidth
                                                    const totalPdfHeight = imgHeight / ratio

                                                    let heightLeft = totalPdfHeight
                                                    let position = 0

                                                    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight)
                                                    heightLeft -= pdfHeight

                                                    while (heightLeft > 0) {
                                                        position -= pdfHeight
                                                        pdf.addPage()
                                                        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight)
                                                        heightLeft -= pdfHeight
                                                    }

                                                    pdf.save('CareerPilot_Strategic_Report.pdf')
                                                    toast.success("Dossier exported to PDF!")
                                                } catch (err) {
                                                    console.error("PDF Export Failure:", err)
                                                    toast.error("Export failed. Manual capture recommended.")
                                                } finally {
                                                    setIsDownloading(false)
                                                }
                                            }}
                                            disabled={isDownloading}
                                            className="h-20 px-10 gap-4 font-black uppercase tracking-widest text-[10px] rounded-3xl border-4 border-slate-200 hover:border-[#1E5EFF] hover:text-[#1E5EFF] transition-all italic bg-white"
                                        >
                                            {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                                            Export Results Dossier
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => window.location.reload()}
                                            className="h-20 px-10 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-[#0B1F3A] transition-all italic"
                                        >
                                            Calibrate Neural Engine
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </DashboardLayout>
    )
}
