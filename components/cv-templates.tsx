// Professional CV Templates for CareerPilot Salone
import React from 'react'
import { User, Phone, Mail, MapPin, Briefcase, GraduationCap, BadgeCheck } from 'lucide-react'

interface CVData {
    personalInfo: any
    experience: any[]
    education: any[]
    skills: string
    verifiedSkills: string[]
    profilePhoto: string
    projects: any[]
    certifications: any[]
    languages: string
}

interface CVTemplateProps {
    data: CVData
    templateRef?: React.RefObject<HTMLDivElement | null>
}

// Template 1: Modern Professional (Blue/Navy)
export function ModernProfessionalTemplate({ data, templateRef }: CVTemplateProps) {
    const { personalInfo, experience, education, skills, verifiedSkills, profilePhoto } = data

    return (
        <div
            ref={templateRef}
            className="bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col font-sans shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", width: '210mm', minHeight: '297mm' }}
        >
            {/* Header Section */}
            <div className="flex w-full">
                <div className="w-[32%] bg-[#F1F5F9]" />
                <div className="flex-1 bg-[#0F172A] text-white p-12 py-16 flex flex-col justify-center">
                    <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-2">{personalInfo.fullName || "YOUR NAME"}</h1>
                    <p className="text-lg text-blue-400 font-black tracking-[0.1em] uppercase italic">{personalInfo.title || "PROFESSIONAL TITLE"}</p>
                </div>
            </div>

            <div className="flex flex-1 relative min-h-0">
                {/* Profile Photo */}
                <div className="absolute top-[-90px] left-[16%] -translate-x-1/2 z-20">
                    <div className="w-48 h-48 rounded-[3rem] border-[8px] border-white shadow-2xl overflow-hidden bg-slate-100 flex items-center justify-center rotate-3">
                        {profilePhoto ? <img src={profilePhoto} className="w-full h-full object-cover" alt="Profile" /> : <User className="w-20 h-20 text-slate-300" />}
                    </div>
                </div>

                {/* Left Sidebar */}
                <div className="w-[32%] bg-[#F1F5F9] p-8 pt-32 flex flex-col gap-10">
                    {/* Contact */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-300 pb-2">Contact</h3>
                        <div className="space-y-4 text-[11px] text-slate-600 font-bold">
                            {personalInfo.phone && <p className="flex items-center gap-3"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</p>}
                            {personalInfo.email && <p className="flex items-center gap-3"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</p>}
                            {personalInfo.location && <p className="flex items-center gap-3"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</p>}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-300 pb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.split(',').map((s, i) => s.trim() && (
                                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                                    {s.trim()}
                                    {verifiedSkills.includes(s.trim()) && <BadgeCheck className="w-3 h-3 text-blue-600" />}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    {education.some(e => e.school) && (
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-300 pb-2">Education</h3>
                            <div className="space-y-6">
                                {education.map(edu => edu.school && (
                                    <div key={edu.id} className="space-y-2">
                                        <h4 className="font-black text-slate-900 text-[11px] uppercase">{edu.degree} {edu.field}</h4>
                                        <p className="text-[10px] text-slate-600 font-bold">{edu.school}</p>
                                        <p className="text-[9px] text-slate-400 font-bold">{edu.startYear} - {edu.endYear}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white p-12 md:pl-16 relative">
                    <div className="absolute left-[20px] top-[40px] bottom-40 w-[2px] bg-slate-100" />

                    {/* Summary */}
                    {personalInfo.summary && (
                        <div className="mb-12 relative pl-10">
                            <div className="absolute left-[-29px] top-0 w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center z-10"><User className="w-5 h-5 text-slate-400" /></div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Professional Summary</h2>
                            <p className="text-[13px] leading-relaxed text-slate-500 font-medium italic">{personalInfo.summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.some(e => e.company) && (
                        <div className="mb-12 relative pl-10">
                            <div className="absolute left-[-29px] top-0 w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center z-10"><Briefcase className="w-5 h-5 text-slate-400" /></div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Work Experience</h2>
                            <div className="space-y-10">
                                {experience.map(exp => exp.company && (
                                    <div key={exp.id} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-black text-slate-900 text-sm uppercase">{exp.company}</h4>
                                            <span className="text-[10px] font-black text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <p className="text-[11px] font-black text-blue-600 uppercase italic tracking-widest">{exp.position}</p>
                                        <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Template 2: Clean Minimalist (Green accent)
export function CleanMinimalistTemplate({ data, templateRef }: CVTemplateProps) {
    const { personalInfo, experience, education, skills, verifiedSkills, profilePhoto } = data

    return (
        <div
            ref={templateRef}
            className="bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 font-sans shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", width: '210mm', minHeight: '297mm', padding: '48px' }}
        >
            {/* Header with Photo */}
            <div className="flex gap-8 items-start border-b-4 border-[#1FA774] pb-8 mb-10">
                <div className="shrink-0">
                    {profilePhoto ? (
                        <img src={profilePhoto} className="w-32 h-32 rounded-full object-cover border-4 border-[#1FA774] shadow-lg" alt="Profile" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-[#1FA774] flex items-center justify-center">
                            <User className="w-16 h-16 text-slate-300" />
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-5xl font-black text-[#0B1F3A] mb-2">{personalInfo.fullName || "Your Name"}</h1>
                    <p className="text-xl text-[#1FA774] font-bold uppercase tracking-wide mb-6">{personalInfo.title || "Professional Title"}</p>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                        {personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{personalInfo.phone}</span>}
                        {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4" />{personalInfo.email}</span>}
                        {personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{personalInfo.location}</span>}
                    </div>
                </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
                <div className="mb-10">
                    <h2 className="text-lg font-black uppercase text-[#0B1F3A] mb-4 flex items-center gap-3">
                        <div className="h-1 w-12 bg-[#1FA774]" />
                        Professional Summary
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed pl-[60px]">{personalInfo.summary}</p>
                </div>
            )}

            <div className="grid grid-cols-3 gap-10">
                {/* Left Column */}
                <div className="col-span-2 space-y-10">
                    {/* Experience */}
                    {experience.some(e => e.company) && (
                        <div>
                            <h2 className="text-lg font-black uppercase text-[#0B1F3A] mb-6 flex items-center gap-3">
                                <div className="h-1 w-12 bg-[#1FA774]" />
                                Experience
                            </h2>
                            <div className="space-y-8 pl-[60px]">
                                {experience.map(exp => exp.company && (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-base font-black text-[#0B1F3A]">{exp.position}</h3>
                                            <span className="text-xs text-slate-400 font-bold">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <p className="text-sm text-[#1FA774] font-bold mb-2">{exp.company}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.some(e => e.school) && (
                        <div>
                            <h2 className="text-lg font-black uppercase text-[#0B1F3A] mb-6 flex items-center gap-3">
                                <div className="h-1 w-12 bg-[#1FA774]" />
                                Education
                            </h2>
                            <div className="space-y-6 pl-[60px]">
                                {education.map(edu => edu.school && (
                                    <div key={edu.id}>
                                        <h3 className="text-base font-black text-[#0B1F3A]">{edu.degree} in {edu.field}</h3>
                                        <p className="text-sm text-[#1FA774] font-bold">{edu.school}</p>
                                        <p className="text-xs text-slate-400 font-bold">{edu.startYear} - {edu.endYear}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Skills */}
                <div>
                    <h2 className="text-lg font-black uppercase text-[#0B1F3A] mb-6">Skills</h2>
                    <div className="space-y-3">
                        {skills.split(',').map((s, i) => s.trim() && (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#1FA774]" />
                                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    {s.trim()}
                                    {verifiedSkills.includes(s.trim()) && <BadgeCheck className="w-4 h-4 text-blue-600" />}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Template 3: Creative Orange (Sidebar + Header Shape)
export function CreativeOrangeTemplate({ data, templateRef }: CVTemplateProps) {
    const { personalInfo, experience, education, skills, verifiedSkills, profilePhoto } = data
    const skillList = skills ? skills.split(',').map(s => s.trim()).filter(s => s) : []

    return (
        <div
            ref={templateRef}
            className="bg-white shadow-2xl overflow-hidden flex font-sans shrink-0"
            style={{ fontFamily: "'Inter', sans-serif", width: '210mm', minHeight: '297mm' }}
        >
            {/* Left Sidebar - Grey */}
            <div className="w-[35%] bg-[#E5E7EB] flex flex-col p-8 pt-12 items-center text-center">
                {/* Photo */}
                <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-xl overflow-hidden mb-8 shrink-0 bg-white">
                    {profilePhoto ? <img src={profilePhoto} className="w-full h-full object-cover" alt="Profile" /> : <User className="w-20 h-20 m-auto mt-8 text-slate-300" />}
                </div>

                {/* Summary (Sidebar) */}
                {personalInfo.summary && (
                    <div className="mb-10 w-full text-left">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-4 border-b-2 border-slate-300 pb-2">Profile</h3>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">{personalInfo.summary}</p>
                    </div>
                )}

                {/* Tech Skills (Sidebar) - showing as bars */}
                {skillList.length > 0 && (
                    <div className="w-full text-left mb-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 border-b-2 border-slate-300 pb-2">Proficiency</h3>
                        <div className="space-y-4">
                            {skillList.slice(0, 6).map((skill, i) => (
                                <div key={i}>
                                    <p className="text-[10px] font-bold text-slate-700 mb-1 flex justify-between items-center">
                                        {skill}
                                        {verifiedSkills.includes(skill) && <BadgeCheck className="w-3 h-3 text-[#ECA87D]" />}
                                    </p>
                                    <div className="h-1.5 w-full bg-slate-300 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#ECA87D]" style={{ width: `${Math.random() * 30 + 70}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main - White */}
            <div className="flex-1 flex flex-col">
                {/* Orange Header */}
                <div className="bg-[#ECA87D] p-10 py-12 rounded-bl-[4rem] mb-10 text-slate-900 relative">
                    <h1 className="text-4xl font-black uppercase tracking-wider mb-2 text-[#0B1F3A]">{personalInfo.fullName || "YOUR NAME"}</h1>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white mix-blend-hard-light mb-6">{personalInfo.title || "Professional Role"}</p>

                    <div className="flex flex-col gap-1 text-[11px] font-black uppercase tracking-widest text-[#0B1F3A]/60">
                        {personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>}
                        {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {personalInfo.email}</span>}
                        {personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>}
                    </div>
                </div>

                <div className="px-10 pr-12 space-y-12">
                    {/* Skills (Main) - Bullet points */}
                    {skillList.length > 6 && (
                        <div>
                            <h3 className="text-lg font-black uppercase text-[#0B1F3A] mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-[#ECA87D]" /> Capabilities
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {skillList.slice(6).map((skill, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ECA87D]" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.some(e => e.company) && (
                        <div>
                            <h3 className="text-lg font-black uppercase text-[#0B1F3A] mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-[#ECA87D]" /> Experience
                            </h3>
                            <div className="space-y-8 border-l-[3px] border-slate-100 pl-8 ml-2">
                                {experience.map(exp => exp.company && (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#ECA87D] border-4 border-white shadow-sm" />
                                        <h4 className="font-black text-sm uppercase text-[#0B1F3A]">{exp.position}</h4>
                                        <p className="text-xs font-bold text-[#ECA87D] mb-2 uppercase tracking-wide">{exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.some(e => e.school) && (
                        <div>
                            <h3 className="text-lg font-black uppercase text-[#0B1F3A] mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-[#ECA87D]" /> Education
                            </h3>
                            <div className="space-y-6">
                                {education.map(edu => edu.school && (
                                    <div key={edu.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50">
                                        <h4 className="font-black text-sm uppercase text-[#0B1F3A]">{edu.school}</h4>
                                        <p className="text-xs font-bold text-slate-500 mb-1">{edu.degree} in {edu.field}</p>
                                        <p className="text-[10px] text-[#ECA87D] font-black tracking-widest uppercase">{edu.startYear} - {edu.endYear}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export const CV_TEMPLATES = [
    {
        id: 'modern-professional',
        name: 'Modern Professional',
        description: 'Bold navy header with sidebar layout. Perfect for tech and creative roles.',
        component: ModernProfessionalTemplate,
        preview: '/templates/modern-professional.png'
    },
    {
        id: 'clean-minimalist',
        name: 'Clean Minimalist',
        description: 'Green accents with clean sections. Ideal for corporate and professional positions.',
        component: CleanMinimalistTemplate,
        preview: 'templates/clean-minimalist.png'
    },
    {
        id: 'creative-orange',
        name: 'Creative Orange',
        description: 'Distinctive layout with orange header and sidebar. Great for designers and creatives.',
        component: CreativeOrangeTemplate,
        preview: '/templates/creative-orange.png'
    }
]
