"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle, MapPin, DollarSign, BookOpen, Sparkles, Compass, Zap, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from "@/components/dashboard-layout";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Types matching our AI Schema
interface RecommendedCareer {
    title: string;
    match_score: number;
    reason: string;
    salary_range: string;
    demand_level: string;
}

interface EducationPath {
    institution: string;
    program: string;
    type: string;
}

interface SkillPhase {
    phase: string;
    actions: string[];
}

interface CareerResult {
    summary: string;
    recommended_careers: RecommendedCareer[];
    education_path: EducationPath[];
    online_courses: string[];
    skill_roadmap: SkillPhase[];
}

interface StepProps {
    title: string;
    desc: string;
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
    loading?: boolean;
    isLast?: boolean;
    placeholder: string;
}

export default function CareerTestPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CareerResult | null>(null);
    const [formData, setFormData] = useState({
        skills: "",
        interests: "",
        education: "",
        goals: "",
        location: "Freetown"
    });

    const handleNext = () => setStep(s => s + 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return <ResultView result={result} onReset={() => setResult(null)} />;
    }

    return (
        <DashboardLayout>
            <div className="space-y-16 max-w-6xl mx-auto px-4 pb-24 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[400px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
                    <div className="relative z-20 w-full p-10 md:p-16 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#1FA774]" />
                            <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Psychometric Diagnostics</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-4xl xs:text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter font-sans uppercase">
                                Discovery <br /> <span className="text-gradient-salone brightness-125">Engine</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                                Complete our 4-step strategic analysis to align your talents with the Sierra Leonean economy.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="max-w-3xl mx-auto px-6">
                    <div className="mb-12 relative">
                        <div className="h-4 bg-slate-50 border border-slate-100 rounded-full overflow-hidden shadow-inner p-1">
                            <div
                                className="h-full bg-slate-50 rounded-full transition-all duration-1000 shadow-lg"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-center bg-white px-6 py-2 rounded-2xl border border-slate-50 shadow-sm">
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={cn("w-3 h-3 rounded-full transition-all duration-500", i <= step ? "bg-[#1FA774]" : "bg-slate-100")} />
                                ))}
                            </div>
                            <p className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-[0.3em] font-sans italic">Analysis Phase {step} / 4</p>
                        </div>
                    </div>

                    <Card className="p-8 md:p-12 lg:p-16 shadow-2xl bg-white border-none rounded-[2.5rem] md:rounded-[3.5rem] border-b-8 border-slate-50 hover:border-[#1FA774]/10 transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -z-10 group-hover:bg-[#1E5EFF]/5 transition-all" />
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <Step
                                    key="step1"
                                    title="Strategic Aptitude"
                                    desc="What clinical or creative skills do you possess? Don't be humble."
                                    value={formData.skills}
                                    onChange={(v) => setFormData({ ...formData, skills: v })}
                                    onNext={handleNext}
                                    placeholder="e.g. Mathematics, Hardware Repair, Persuasive Writing, Negotiation..."
                                />
                            )}
                            {step === 2 && (
                                <Step
                                    key="step2"
                                    title="Intrinsic Passions"
                                    desc="What activities do you enjoy doing, even without pay?"
                                    value={formData.interests}
                                    onChange={(v) => setFormData({ ...formData, interests: v })}
                                    onNext={handleNext}
                                    placeholder="e.g. Solving puzzles, teaching others, organizing events, coding..."
                                />
                            )}
                            {step === 3 && (
                                <Step
                                    key="step3"
                                    title="Academic Status"
                                    desc="Select your current or highest level of formal education."
                                    value={formData.education}
                                    onChange={(v) => setFormData({ ...formData, education: v })}
                                    onNext={handleNext}
                                    placeholder="e.g. SSS3 Graduate, University Finalist, Diploma holder..."
                                />
                            )}
                            {step === 4 && (
                                <Step
                                    key="step4"
                                    title="Legacy Objectives"
                                    desc="What is your ultimate career goal or target income in Salone?"
                                    value={formData.goals}
                                    onChange={(v) => setFormData({ ...formData, goals: v })}
                                    onNext={handleSubmit}
                                    loading={loading}
                                    isLast
                                    placeholder="e.g. Lead a tech firm in Freetown and earn enough for family property..."
                                />
                            )}
                        </AnimatePresence>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

function Step({ title, desc, value, onChange, onNext, loading, isLast, placeholder }: StepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8"
        >
            <div className="space-y-4">
                <div className="w-16 h-2 bg-slate-50 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase font-sans">{title}</h2>
                <p className="text-lg text-slate-400 font-medium italic font-sans">{desc}</p>
            </div>

            <textarea
                className="w-full p-8 rounded-[2.5rem] border-4 border-slate-50 bg-slate-50 focus:bg-white focus:border-[#1E5EFF] focus:ring-[20px] focus:ring-[#1E5EFF]/5 transition-all outline-none min-h-[220px] text-xl font-bold font-sans resize-none shadow-inner text-[#0B1F3A]"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
            />

            <div className="flex justify-end pt-4">
                <Button
                    size="lg"
                    onClick={onNext}
                    disabled={!value || loading}
                    className="h-[72px] px-12 rounded-[2rem] bg-[#0B1F3A] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl active:scale-95 transition-all group"
                >
                    {loading ? (
                        <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Diagnostic Active...</>
                    ) : (
                        <>{isLast ? 'Generate Blueprint' : 'Advance Stage'} <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                </Button>
            </div>
        </motion.div>
    )
}

function ResultView({ result, onReset }: { result: CareerResult, onReset: () => void }) {
    return (
        <div className="min-h-screen bg-white py-20 px-4">
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/10 border border-[#1FA774]/20 rounded-full">
                        <Zap className="w-4 h-4 text-[#1FA774]" />
                        <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Matrix Generation Complete</span>
                    </div>
                    <h1 className="text-4xl xs:text-5xl md:text-8xl font-black text-[#0B1F3A] tracking-tighter font-sans uppercase leading-none">Your Career <br /> <span className="text-gradient-salone brightness-110">Genetic Blueprint</span></h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium italic font-sans max-w-3xl mx-auto leading-relaxed border-l-8 border-slate-50 pl-10 border-transparent italic">"{result.summary}"</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {result.recommended_careers.map((career: RecommendedCareer, i: number) => (
                        <Card key={i} className="p-10 rounded-[3.5rem] bg-white border-8 border-slate-50 hover:border-[#1E5EFF]/10 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-full bg-slate-50 group-hover:bg-[#1FA774] transition-all" />
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#1E5EFF]/5 flex items-center justify-center text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-all">
                                        <Briefcase className="w-7 h-7" />
                                    </div>
                                    <Badge className="bg-[#1FA774] text-white font-black text-[9px] uppercase tracking-widest px-3 py-1.5 border-none shadow-lg">
                                        {career.match_score}% High Match
                                    </Badge>
                                </div>
                                <h3 className="text-2xl font-black text-[#0B1F3A] mb-4 font-sans leading-tight underline decoration-[#1FA774]/20 group-hover:decoration-[#1E5EFF] transition-all">{career.title}</h3>
                                <p className="text-xs font-bold text-slate-400 italic mb-8 flex-1">{career.reason}</p>

                                <div className="space-y-4 pt-6 border-t border-slate-50">
                                    <div className="flex items-center text-[#0B1F3A] font-black text-[10px] uppercase tracking-widest">
                                        <Zap className="w-4 h-4 mr-3 text-[#1FA774]" /> SLE {career.salary_range}
                                    </div>
                                    <div className="flex items-center text-[#0B1F3A] font-black text-[10px] uppercase tracking-widest">
                                        <Compass className="w-4 h-4 mr-3 text-[#1E5EFF]" /> Demand: {career.demand_level}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="p-12 md:p-20 bg-[#0B1F3A] text-white rounded-[4rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1FA774]/10 rounded-full blur-[120px] -z-10 group-hover:bg-[#1E5EFF]/10 transition-all duration-700" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tighter italic">Foundational <br /> <span className="text-[#1FA774]">Institutions</span></h3>
                            <p className="text-slate-400 font-bold font-sans text-sm italic">Where you can acquire these critical professional skills in Salone</p>
                        </div>
                        <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform">
                            <BookOpen className="w-10 h-10 text-[#1FA774]" />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 relative z-10">
                        {result.education_path.map((edu: EducationPath, i: number) => (
                            <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-[#1FA774]/30 backdrop-blur-md transition-all group/edu">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#1FA774]/20 flex items-center justify-center text-[#1FA774] shrink-0">
                                        <Brain className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-black text-xl text-white font-sans leading-tight">{edu.institution}</h4>
                                        <p className="text-[#1FA774] font-black italic text-[11px] uppercase tracking-widest leading-none">{edu.program}</p>
                                        <div className="pt-4 flex items-center gap-3">
                                            <Badge className="bg-white/10 text-white font-black text-[9px] uppercase tracking-widest border-none px-3">{edu.type}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="text-center pt-8">
                    <Button onClick={onReset} variant="ghost" size="lg" className="h-16 px-12 rounded-2xl text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-[#0B1F3A] hover:bg-slate-50 transition-all gap-3">
                        <ArrowLeft className="w-4 h-4" /> Reset Cognitive Process
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Briefcase(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
}
