
import Link from 'next/link';
import { ArrowRight, Briefcase, FileText, GraduationCap, UserCircle } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-4 max-w-3xl">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-poppins text-slate-900">
                            Build Your Future in <br />
                            <span className="text-gradient-salone animate-gradient">
                                Sierra Leone
                            </span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl font-inter font-medium leading-relaxed">
                            The first AI-powered career guidance platform tailored for Salone. Get personalized career advice, build a pro CV, and find jobs in Freetown, Bo, Makeni and beyond.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/onboarding"
                            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#1F7A4D] px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-green-600/20 transition-all hover:bg-[#16643d] hover:scale-[1.02] active:scale-95"
                        >
                            <UserCircle className="mr-3 h-5 w-5" />
                            Let's Get to Know You
                        </Link>
                        <Link
                            href="/careers"
                            className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 text-sm font-black uppercase tracking-widest text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-95"
                        >
                            <Briefcase className="mr-3 h-5 w-5" />
                            Explore Careers
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        Over 5,000 students guided in Freetown, Bo & Makeni
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-float delay-100"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl mix-blend-multiply animate-float delay-700"></div>
            </div>
        </section>
    );
}
