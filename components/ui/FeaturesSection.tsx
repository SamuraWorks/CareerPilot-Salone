import { MessageCircle, Brain, Target, Zap, Globe, Users, Trophy } from 'lucide-react';

export function FeaturesSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold uppercase tracking-wider text-xs mb-6">
                        The Solution
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
                        Your Personal Career Mentor <br className="hidden md:block" /> in Your Pocket
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        CareerPilot Salone acts like a personal mentor, providing data-backed guidance exactly when you need it.
                        From choosing a path to landing the job.
                    </p>
                </div>

                {/* 3 Core Functions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                            <Brain className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Discover Your Path</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Discover the right career path based on who you are. Our AI analyzes your interests to find your perfect fit in Salone.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <Target className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Step-by-Step Guidance</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Get a clear roadmap: what to study at FBC/IPAM, which skills to learn online, and where to get certified.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Real Opportunities</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Connect to real jobs, internships, and scholarships. Receive alerts the moment an opportunity matches your profile.
                        </p>
                    </div>
                </div>

                {/* WhatsApp Section */}
                <div className="bg-[#25D366]/5 rounded-[3rem] p-8 md:p-16 mb-32 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider mb-6">
                                <MessageCircle className="w-3 h-3 fill-current" />
                                Game Changer
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">
                                Why WhatsApp Changes Everything
                            </h2>
                            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                                Most youths in Sierra Leone have limited data and no laptop, but they use WhatsApp daily. CareerPilot works where you are.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-1">
                                        <Globe className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Inclusive & Accessible</h4>
                                        <p className="text-slate-600">Works perfectly even with low data or poor connectivity.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-1">
                                        <Zap className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Zero Learning Curve</h4>
                                        <p className="text-slate-600">No new apps to learn. Just chat like you do with friends.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 flex justify-center">
                            <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-4 border-slate-800 ring-4 ring-slate-100">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20" />
                                <div className="w-full h-full bg-[#E5DDD5] rounded-[2.2rem] overflow-hidden flex flex-col relative">
                                    <div className="bg-[#075E54] p-4 pt-10 text-white flex items-center gap-3 shadow-md z-10">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <Brain className="w-5 h-5" />
                                        </div>
                                        <div className="font-bold">CareerPilot AI</div>
                                    </div>
                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm">
                                            Hello! 👋 I'm CareerPilot. I can help you find a job or choose a course. What are you interested in?
                                        </div>
                                        <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] ml-auto text-sm">
                                            I like computers and solving problems.
                                        </div>
                                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm">
                                            That's great! You might be interested in <strong>Software Engineering</strong>.
                                            <br /><br />
                                            Would you like to see roadmap for this?
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/90 backdrop-blur pb-6">
                                        <div className="h-10 bg-white rounded-full border border-slate-200 flex items-center px-4 text-slate-400 text-sm">
                                            Type a message...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">
                            Transforming Lives, <br /> One Career at a Time
                        </h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-red-50 rounded-2xl border-l-4 border-red-500">
                                <h4 className="font-bold text-red-900 mb-2">Before CareerPilot</h4>
                                <ul className="space-y-2 text-red-800/80 text-sm font-medium">
                                    <li>• Confusion about career options</li>
                                    <li>• Wrong course choices & wasted money</li>
                                    <li>• Missed job opportunities</li>
                                    <li>• Loss of confidence</li>
                                </ul>
                            </div>
                            <div className="flex justify-center">
                                <div className="h-8 w-0.5 bg-slate-200 my-2"></div>
                            </div>
                            <div className="p-6 bg-green-50 rounded-2xl border-l-4 border-green-500 shadow-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-green-900">After CareerPilot</h4>
                                    <Trophy className="w-4 h-4 text-green-600" />
                                </div>
                                <ul className="space-y-2 text-green-800/80 text-sm font-medium">
                                    <li>• Clarity on career direction</li>
                                    <li>• Clear step-by-step roadmap</li>
                                    <li>• Relevant skills development</li>
                                    <li>• Access to real jobs & alerts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col h-full justify-center text-center">
                            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed opacity-90 mb-8">
                                "From 'I don't know what to do' to 'I know exactly my next step' — that's the CareerPilot Salone difference."
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl">
                                    SJ
                                </div>
                                <div className="text-left">
                                    <div className="font-bold">Samuel Johnson</div>
                                    <div className="text-slate-400 text-sm">Year 3 Student, IPAM</div>
                                </div>
                            </div>
                        </div>
                        {/* Abstract Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-[80px] opacity-20" />
                    </div>
                </div>

            </div>
        </section>
    );
}
