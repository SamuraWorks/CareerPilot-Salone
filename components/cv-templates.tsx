import React from 'react'
import { User, Phone, Mail, MapPin, Briefcase, GraduationCap, BadgeCheck, Globe, Award } from 'lucide-react'
import { LayoutStrategy, polishText } from '@/lib/cv-logic-engine'

// --- Types ---
export interface CVData {
    personalInfo: any
    experience: any[]
    education: any[]
    skills: string
    verifiedSkills: string[]
    profilePhoto: string
    projects: any[]
    certifications: any[]
    languages: string
    references?: any[]
}

interface DynamicCVTemplateProps {
    data: CVData
    strategy: LayoutStrategy
    templateRef?: React.RefObject<HTMLDivElement | null>
}

// --- Section Components (Reusable) ---

const SectionHeader = ({ title, className, icon: Icon }: { title: string, className?: string, icon?: any }) => (
    <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-slate-300 pb-2 mb-4 flex items-center gap-2 ${className}`}>
        {Icon && <Icon className="w-3 h-3" />}
        {title}
    </h3>
)

const ContactSection = ({ data, vertical = true }: { data: any, vertical?: boolean }) => (
    <div className={`text-[11px] text-slate-600 font-bold ${vertical ? 'space-y-4' : 'flex flex-wrap gap-4'}`}>
        {data.phone && <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5" />{data.phone}</p>}
        {data.email && <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5 whitespace-nowrap" />{data.email}</p>}
        {data.location && <p className="flex items-center gap-3"><MapPin className="w-3.5 h-3.5" />{data.location}</p>}
        {data.linkedin && <p className="flex items-center gap-3"><Globe className="w-3.5 h-3.5" />{data.linkedin}</p>}
    </div>
)

const SkillsSection = ({ skills, verified, layout = 'tags' }: { skills: string, verified: string[], layout?: 'tags' | 'list' | 'bars' }) => {
    const list = skills.split(',').map(s => s.trim()).filter(Boolean)

    if (layout === 'list') {
        return (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {list.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                        {s}
                        {verified.includes(s) && <BadgeCheck className="w-3 h-3 text-blue-600" />}
                    </div>
                ))}
            </div>
        )
    }

    // Default 'tags'
    return (
        <div className="flex flex-wrap gap-2">
            {list.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                    {s}
                    {verified.includes(s) && <BadgeCheck className="w-3 h-3 text-blue-600" />}
                </span>
            ))}
        </div>
    )
}

const ExperienceSection = ({ items, density }: { items: any[], density: string }) => (
    <div className="space-y-6">
        {items.map(exp => exp.company && (
            <div key={exp.id} className="relative group">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-slate-900 text-sm uppercase">{exp.company}</h4>
                    <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest mb-2">{exp.position}</p>
                <p className={`text-[11px] text-slate-600 font-medium whitespace-pre-line ${density === 'compact' ? 'leading-tight' : 'leading-relaxed'}`}>
                    {polishText(exp.description)}
                </p>
            </div>
        ))}
    </div>
)

const EducationSection = ({ items }: { items: any[] }) => (
    <div className="space-y-6">
        {items.map(edu => edu.school && (
            <div key={edu.id} className="space-y-1">
                <h4 className="font-black text-slate-900 text-[11px] uppercase">{edu.degree} {edu.field}</h4>
                <p className="text-[10px] text-slate-600 font-bold">{edu.school}</p>
                <p className="text-[9px] text-slate-400 font-bold">{edu.startYear} - {edu.endYear}</p>
            </div>
        ))}
    </div>
)

const ProjectsSection = ({ items }: { items: any[] }) => (
    <div className="space-y-6">
        {items.map(p => p.name && (
            <div key={p.id} className="space-y-1">
                <h4 className="font-black text-slate-900 text-[11px] uppercase">{p.name}</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{polishText(p.description)}</p>
                {p.technologies && <p className="text-[9px] text-blue-500 font-bold uppercase">{p.technologies}</p>}
            </div>
        ))}
    </div>
)

const ReferencesSection = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-2 gap-6">
        {items.map(r => r.name && (
            <div key={r.id} className="space-y-1">
                <h4 className="font-black text-slate-900 text-[11px] uppercase">{r.name}</h4>
                <p className="text-[10px] text-slate-600 font-bold">{r.role} at {r.company}</p>
                <div className="text-[9px] text-slate-400 font-medium">
                    {r.phone && <p>{r.phone}</p>}
                    {r.email && <p>{r.email}</p>}
                </div>
            </div>
        ))}
    </div>
)

// --- The Renderer Router ---

const renderSection = (id: string, data: CVData, density: string) => {
    switch (id) {
        case 'summary':
            return data.personalInfo.summary ? (
                <div className="mb-8">
                    <SectionHeader title="Professional Profile" className="text-slate-900" icon={User} />
                    <p className="text-[12px] leading-relaxed text-slate-600 font-medium italic">{polishText(data.personalInfo.summary)}</p>
                </div>
            ) : null
        case 'experience':
            return data.experience.some(e => e.company) ? (
                <div className="mb-8">
                    <SectionHeader title="Work History" className="text-slate-900" icon={Briefcase} />
                    <ExperienceSection items={data.experience} density={density} />
                </div>
            ) : null
        case 'education':
            return data.education.some(e => e.school) ? (
                <div className="mb-8">
                    <SectionHeader title="Education" className="text-slate-900" icon={GraduationCap} />
                    <EducationSection items={data.education} />
                </div>
            ) : null
        case 'projects':
            return data.projects.some(p => p.name) ? (
                <div className="mb-8">
                    <SectionHeader title="Key Projects" className="text-slate-900" icon={Award} />
                    <ProjectsSection items={data.projects} />
                </div>
            ) : null
        case 'skills':
            // Only render here if it's in the MAIN section order. 
            // Often skills are sidebar, but for "Technical" strategy they might be main.
            return (
                <div className="mb-8">
                    <SectionHeader title="Technical Capacities" className="text-slate-900" icon={BadgeCheck} />
                    <SkillsSection skills={data.skills} verified={data.verifiedSkills} layout="list" />
                </div>
            )
        case 'certifications':
            return data.certifications.some(c => c.name) ? (
                <div className="mb-8">
                    <SectionHeader title="Certifications & Honors" className="text-slate-900" icon={Award} />
                    <div className="grid grid-cols-2 gap-4">
                        {data.certifications.map(c => (
                            <div key={c.id}>
                                <p className="text-[10px] font-black text-slate-800">{c.name}</p>
                                <p className="text-[9px] text-slate-500">{c.issuer} | {c.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null
        case 'references':
            return data.references && data.references.some(r => r.name) ? (
                <div className="mb-8">
                    <SectionHeader title="Professional References" className="text-slate-900" icon={User} />
                    <ReferencesSection items={data.references} />
                </div>
            ) : null
        default:
            return null
    }
}

const renderSidebarSection = (id: string, data: CVData) => {
    switch (id) {
        case 'contact':
            return (
                <div className="mb-8">
                    <SectionHeader title="Contact" className="text-slate-900 border-slate-300" />
                    <ContactSection data={data.personalInfo} />
                </div>
            )
        case 'skills':
            return (
                <div className="mb-8">
                    <SectionHeader title="Skills" className="text-slate-900 border-slate-300" />
                    <SkillsSection skills={data.skills} verified={data.verifiedSkills} />
                </div>
            )
        case 'languages':
            return data.languages ? (
                <div className="mb-8">
                    <SectionHeader title="Languages" className="text-slate-900 border-slate-300" />
                    <p className="text-[11px] font-bold text-slate-600">{data.languages}</p>
                </div>
            ) : null
        case 'certifications':
            return data.certifications.some(c => c.name) ? (
                <div className="mb-8">
                    <SectionHeader title="Certifications" className="text-slate-900 border-slate-300" />
                    <div className="space-y-3">
                        {data.certifications.map(c => (
                            <div key={c.id}>
                                <p className="text-[10px] font-black text-slate-800">{c.name}</p>
                                <p className="text-[9px] text-slate-500">{c.issuer} | {c.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null
        case 'references':
            return data.references && data.references.some(r => r.name) ? (
                <div className="mb-8">
                    <SectionHeader title="References" className="text-slate-900 border-slate-300" />
                    <div className="space-y-3">
                        {data.references.map(r => (
                            <div key={r.id}>
                                <p className="text-[10px] font-black text-slate-800">{r.name}</p>
                                <p className="text-[9px] text-slate-500 italic">{r.role} @ {r.company}</p>
                                <p className="text-[8px] text-slate-400">{r.email} | {r.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null
        default: return null
    }
}


// --- Shells ---

const ModernShell = ({ data, strategy, children }: any) => {
    // Sidebar on Left, Content Right
    return (
        <div className="flex w-full h-full bg-white">
            {/* Left Sidebar */}
            <div className="w-[32%] bg-[#F1F5F9] p-8 pt-10 flex flex-col min-h-full border-r border-slate-200">
                {/* Photo */}
                <div className="mb-10">
                    <div className="w-32 h-32 rounded-[2rem] border-[4px] border-white shadow-xl overflow-hidden bg-white mx-auto rotate-1">
                        {data.profilePhoto ? <img src={data.profilePhoto} className="w-full h-full object-cover" /> : <User className="w-12 h-12 m-auto mt-8 text-slate-300" />}
                    </div>
                </div>

                {/* Sidebar Sections */}
                {strategy.sidebarSections.map((sect: string) => (
                    <div key={sect}>{renderSidebarSection(sect, data)}</div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-12">
                {/* Header */}
                <div className="mb-12 border-l-4 border-[#0F172A] pl-6">
                    <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-2 text-[#0F172A] leading-none">{data.personalInfo.fullName || "YOUR NAME"}</h1>
                    <p className="text-lg text-blue-500 font-black tracking-[0.1em] uppercase italic">{data.personalInfo.title || "PROFESSIONAL TITLE"}</p>
                </div>

                {/* Dynamic Sections */}
                {children}
            </div>
        </div>
    )
}

const MinimalistShell = ({ data, strategy, children }: any) => {
    // Full width header, then 2 columns or single column
    return (
        <div className="p-12 bg-white h-full relative">
            <div className="flex gap-8 items-start border-b-4 border-emerald-500 pb-8 mb-10">
                {data.profilePhoto && (
                    <img src={data.profilePhoto} className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500" />
                )}
                <div>
                    <h1 className="text-5xl font-black text-slate-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
                    <p className="text-xl text-emerald-600 font-bold uppercase tracking-wide">{data.personalInfo.title || "Title"}</p>

                    <div className="mt-4 flex gap-4 text-xs text-slate-400 font-semibold">
                        <span>{data.personalInfo.email}</span>
                        <span>|</span>
                        <span>{data.personalInfo.phone}</span>
                        <span>|</span>
                        <span>{data.personalInfo.location}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="col-span-8">
                    {children}
                </div>

                {/* Right Sidebar (implied) */}
                <div className="col-span-4 space-y-8 border-l border-slate-100 pl-8">
                    {strategy.sidebarSections.map((sect: string) => (
                        // We reuse renderSidebarSection but styling might need tweak if we want to match Minimalist exactly
                        // For now reusing generic styles is fine
                        <div key={sect}>{renderSidebarSection(sect, data)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CreativeShell = ({ data, strategy, children }: any) => {
    // Orange header, sidebar left
    return (
        <div className="flex h-full bg-white">
            <div className="w-[35%] bg-slate-900 text-slate-300 p-8 pt-12 text-center">
                <div className="w-40 h-40 rounded-full border-4 border-slate-700 mx-auto mb-8 overflow-hidden">
                    {data.profilePhoto ? <img src={data.profilePhoto} className="w-full h-full object-cover" /> : <div className="bg-slate-800 w-full h-full" />}
                </div>

                <div className="text-left space-y-8">
                    {strategy.sidebarSections.map((sect: string) => {
                        // Custom styling for dark sidebar
                        if (sect === 'contact') {
                            return <div key={sect} className="text-xs space-y-2 opacity-80"><ContactSection data={data.personalInfo} vertical /></div>
                        }
                        if (sect === 'skills') {
                            return (
                                <div key={sect}>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#ECA87D] mb-4 border-b border-slate-700 pb-2">Skills</h3>
                                    <SkillsSection skills={data.skills} verified={data.verifiedSkills} />
                                </div>
                            )
                        }
                        return <div key={sect} className="opacity-60 text-xs">{renderSidebarSection(sect, data)}</div>
                    })}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="bg-[#ECA87D] p-12 pb-16 rounded-bl-[4rem]">
                    <h1 className="text-4xl font-black uppercase text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/80">{data.personalInfo.title}</p>
                </div>
                <div className="p-10 -mt-8 space-y-2">
                    {children}
                </div>
            </div>
        </div>
    )
}


// --- Main Export ---

export function DynamicCVTemplate({ data, strategy, templateRef }: DynamicCVTemplateProps) {

    // Choose Shell
    let Shell = ModernShell
    if (strategy.theme === 'minimalist') Shell = MinimalistShell
    if (strategy.theme === 'creative') Shell = CreativeShell
    if (strategy.theme === 'academic') Shell = MinimalistShell // Reuse minimalist for academic for now

    return (
        <div
            ref={templateRef}
            className="bg-white shadow-2xl overflow-hidden shrink-0 mx-auto"
            style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter', sans-serif" }}
        >
            <Shell data={data} strategy={strategy}>
                {strategy.sectionOrder.map(sectionId => (
                    <div key={sectionId}>
                        {renderSection(sectionId, data, strategy.density)}
                    </div>
                ))}
            </Shell>
        </div>
    )
}
