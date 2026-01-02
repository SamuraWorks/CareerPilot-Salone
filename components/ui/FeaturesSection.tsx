import { Brain, FileText, GraduationCap, Briefcase, Zap, Users } from 'lucide-react';

const FEATURES = [
    {
        icon: FileText,
        title: "Pro CV Builder",
        desc: "The only CV builder designed for Sierra Leonean employers. ATS-friendly, professional, and instantly downloadable.",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        icon: Zap,
        title: "Verified Skills",
        desc: "Prove you know Excel, English, or Customer Service. Take a quick test and get a verification badge employers trust.",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/20"
    },
    {
        icon: Briefcase,
        title: "Direct Job Matches",
        desc: "Stop searching. We match your verified profile directly with open roles at top companies in Freetown.",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
        icon: Brain,
        title: "Career Roadmap",
        desc: "Not job-ready yet? Get a personalized learning plan to build the skills employers are asking for right now.",
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
