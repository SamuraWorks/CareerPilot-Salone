"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <div className="text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mb-6 border border-green-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Now live on WhatsApp & Web
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                            Your Personal <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                                Career Mentor
                            </span> <br />
                            in Your Pocket.
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                            Helping Sierra Leone's youth choose the right career, the right course, and discover real opportunities.
                            <span className="block mt-2 font-medium text-slate-900 dark:text-slate-200">
                                Zero data required on WhatsApp.
                            </span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="https://wa.me/23274000000" target="_blank">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-xl shadow-green-500/20 w-full sm:w-auto transition-transform hover:-translate-y-1">
                                    <MessageCircle className="mr-2 w-5 h-5 fill-current" />
                                    Chat on WhatsApp
                                </Button>
                            </Link>
                            <Link href="/cv-builder">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 w-full sm:w-auto hover:bg-slate-50">
                                    Build Free CV <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm font-medium text-slate-500">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }} />
                                ))}
                            </div>
                            <div>Trusted by 5,000+ students <br /> from FBC, IPAM & UNIMAK</div>
                        </div>
                    </div>

                    {/* Right Image/Visual */}
                    <div className="relative mx-auto lg:ml-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/50 bg-slate-100 rotate-1 hover:rotate-0 transition-transform duration-700">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <Image
                                src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=1000&auto=format&fit=crop"
                                alt="Salone student using mobile phone"
                                width={800}
                                height={1000}
                                className="object-cover w-full h-[600px]"
                                priority
                            />

                            {/* Floating Card 1 */}
                            <div className="absolute bottom-10 left-8 right-8 z-20">
                                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/20">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">🎓</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Career Matched!</h4>
                                            <p className="text-xs text-slate-500">Based on your interests</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-2">
                                        <div className="font-bold text-blue-700 text-sm">Recommended: Data Analyst</div>
                                        <div className="text-xs text-slate-500 mt-1">High Demand in Freetown • NLE 3,000+</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute top-12 -right-6 z-20 animate-bounce duration-[3000ms]">
                                <div className="bg-[#25D366] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold text-sm">
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    New Job Alert! 🔔
                                </div>
                            </div>
                        </div>

                        {/* Decorative Blobs */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-green-200/40 to-blue-200/40 blur-[100px] rounded-full" />
                    </div>

                </div>
            </div>
        </section>
    )
}
