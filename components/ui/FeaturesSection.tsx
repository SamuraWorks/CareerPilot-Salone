import { Brain, FileText, GraduationCap, Briefcase, Zap, Users } from 'lucide-react';

const FEATURES = [
    {
        icon: Brain,
        title: "AI Career Guidance",
        desc: "Not sure what to do? Our AI analyzes your skills and interests to recommend the perfect career path in Sierra Leone.",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
        icon: FileText,
        title: "Smart CV Builder",
        desc: "Create a professional, ATS-friendly CV in minutes. Download as PDF and share directly on WhatsApp.",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        icon: GraduationCap,
        title: "Local Roadmap",
        desc: "Get a step-by-step plan: which courses to take at FBC, IPAM, or UNIMAK to reach your goals.",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/20"
    },
    {
        icon: Briefcase,
        title: "Job Matching",
        desc: "Don't just look for jobs—let the jobs find you. We match you with opportunities based on your skills.",
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/20"
    }
];

export function FeaturesSection() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything You Need to Succeed</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We combine advanced AI with deep local knowledge of the Sierra Leone job market.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className="group relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 transition-all hover:-translate-y-1">
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
