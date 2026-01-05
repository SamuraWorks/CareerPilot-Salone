
import Link from 'next/link';
import { ArrowRight, Brain, Briefcase, FileText, GraduationCap } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-4 max-w-3xl">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            <span className="block text-slate-900 dark:text-white">Build Your Future in</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-gradient">
                                Sierra Leone
                            </span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
                            The first AI-powered career guidance platform tailored for Salone. Get personalized career advice, build a pro CV, and find jobs in Freetown and beyond.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/career-test"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                            <Brain className="mr-2 h-4 w-4" />
                            Take Career Test
                        </Link>
                        <Link
                            href="/cv-builder"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Build Free CV
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
