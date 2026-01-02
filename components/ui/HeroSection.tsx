
import Link from 'next/link';
import { ArrowRight, Brain, Briefcase, FileText, GraduationCap } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                                For Job Seekers in Freetown
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                <span className="block text-slate-900 dark:text-white">Stop Applying Blindly.</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 animate-gradient">
                                    Get Verified & Hired.
                                </span>
                            </h1>
                            <p className="mx-auto md:mx-0 max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
                                70% of CVs in Sierra Leone are ignored. We fix yours instantly, verify your skills, and put you directly in front of top employers.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/cv-builder"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Build Pro CV (Free)
                            </Link>
                            <Link
                                href="/career-test"
                                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800"
                            >
                                <Brain className="mr-2 h-4 w-4" />
                                Verify My Skills
                            </Link>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            320+ Candidates Hired this Month
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 group">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                            alt="Sierra Leonean professional in an interview"
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>

                        {/* Overlay Card */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">New Job Offer!</p>
                                    <p className="text-xs text-slate-500">Bank Clerk • Ecobank SL</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Matched
                                    </span>
                                </div>
                            </div>
                        </div>
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
