
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle, MapPin, DollarSign, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                    <p className="text-right text-sm text-slate-500 mt-2">Step {step} of 4</p>
                </div>

                <Card className="p-8 shadow-xl border-0">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <Step
                                key="step1"
                                title="What are you good at?"
                                desc="List your skills, talents, or subjects you excel in."
                                value={formData.skills}
                                onChange={(v) => setFormData({ ...formData, skills: v })}
                                onNext={handleNext}
                                placeholder="e.g. Mathematics, Fixing Electronics, Writing, Persuading people..."
                            />
                        )}
                        {step === 2 && (
                            <Step
                                key="step2"
                                title="What do you enjoy?"
                                desc="What hobbies or activities make you lose track of time?"
                                value={formData.interests}
                                onChange={(v) => setFormData({ ...formData, interests: v })}
                                onNext={handleNext}
                                placeholder="e.g. Gaming, helping friends with problems, cooking, coding..."
                            />
                        )}
                        {step === 3 && (
                            <Step
                                key="step3"
                                title="Current Education"
                                desc="What is your highest level of education or current status?"
                                value={formData.education}
                                onChange={(v) => setFormData({ ...formData, education: v })}
                                onNext={handleNext}
                                placeholder="e.g. SSS3 Graduate, University Student, JSS..."
                            />
                        )}
                        {step === 4 && (
                            <Step
                                key="step4"
                                title="Career Goals"
                                desc="Do you have any specific dreams or salary expectations?"
                                value={formData.goals}
                                onChange={(v) => setFormData({ ...formData, goals: v })}
                                onNext={handleSubmit}
                                loading={loading}
                                isLast
                                placeholder="e.g. I want to work in technology and earn enough to support family..."
                            />
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
}

function Step({ title, desc, value, onChange, onNext, loading, isLast, placeholder }: StepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-slate-500">{desc}</p>
            </div>

            <textarea
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none min-h-[150px] text-lg resize-none dark:bg-slate-900 dark:border-slate-800"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
            />

            <div className="flex justify-end">
                <Button
                    size="lg"
                    onClick={onNext}
                    disabled={!value || loading}
                    className="rounded-full px-8 h-12 text-md"
                >
                    {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                    ) : (
                        <>{isLast ? 'Get Results' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                </Button>
            </div>
        </motion.div>
    )
}

function ResultView({ result, onReset }: { result: CareerResult, onReset: () => void }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 text-green-700 mb-4">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold">Your Career Blueprint</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">{result.summary}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {result.recommended_careers.map((career: RecommendedCareer, i: number) => (
                        <Card key={i} className="p-6 border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold">{career.title}</h3>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                                    {career.match_score}% Match
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">{career.reason}</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center text-slate-700">
                                    <DollarSign className="w-4 h-4 mr-2" /> {career.salary_range}
                                </div>
                                <div className="flex items-center text-slate-700">
                                    <MapPin className="w-4 h-4 mr-2" /> Demand: {career.demand_level}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="p-8 bg-slate-900 text-white rounded-3xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <BookOpen className="mr-3" /> Recommended Education
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {result.education_path.map((edu: EducationPath, i: number) => (
                            <div key={i} className="p-4 bg-white/10 rounded-xl">
                                <div className="font-bold text-lg">{edu.institution}</div>
                                <div className="text-slate-300">{edu.program}</div>
                                <div className="text-xs mt-2 uppercase tracking-wider opacity-70">{edu.type}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="text-center pt-8">
                    <Button onClick={onReset} variant="outline" size="lg">Start Over</Button>
                </div>
            </div>
        </div>
    )
}
