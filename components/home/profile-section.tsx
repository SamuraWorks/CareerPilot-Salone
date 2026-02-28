"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, MapPin, GraduationCap, Target, CheckCircle2, Briefcase, Award, Globe, Calendar, Mail, Phone, Lightbulb } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"

export function ProfileSection() {
    const { loading } = useAuth()
  const { profile, updateProfile } = useProfile()
    const [saved, setSaved] = useState(false)
    const [isSyncing, setIsSyncing] = useState(false)

    // Local form state mapped from context
    // We strive to keep this in sync with global profile
    const handleChange = (field: string, value: string) => {
        // Map local field names to AuthContext/DB Profile structure
        const updates: any = {}

        switch (field) {
            case 'fullName': updates.fullName = value; break;
            case 'email': updates.email = value; break;
            case 'phone': updates.whatsappNumber = value; break;
            case 'location': updates.location = value; break;
            case 'stage': updates.status = value; break; // Approximating 'stage' to 'status'
            case 'interest': updates.interests = [value]; break; // Simple array wrap
            case 'education': updates.educationLevel = value; break;
            case 'school':
                updates.educationDetails = { ...profile.educationDetails, institution: value };
                break;
            case 'fieldOfStudy':
                updates.educationDetails = { ...profile.educationDetails, field: value };
                break;
            case 'graduationYear':
                updates.educationDetails = { ...profile.educationDetails, gradYear: value };
                break;
            case 'technicalSkills': updates.hardSkills = value.split(',').map(s => s.trim()); break; // CSV to Array
            case 'softSkills': updates.subjects = value.split(',').map(s => s.trim()); break; // Using 'subjects' as soft/other skills bucket
            case 'languages': updates.languages = value.split(',').map(s => s.trim()); break;

            // Resume Data mapping
            case 'experience':
                updates.resumeData = { ...profile.resumeData, recentRole: value };
                break;
            case 'internships':
                updates.resumeData = { ...profile.resumeData, topProject: value };
                break;

            case 'careerGoal': updates.careerGoal = value; break;
            case 'targetIndustry': updates.targetRole = value; break; // Approximate
            // Timeline and WorkEnvironment can go into workStyle
            case 'timeline':
                // No direct field
                break;
            case 'workEnvironment':
                updates.workStyle = { ...profile.workStyle, environment: [value] };
                break;
            case 'availability':
                // No direct field
                break;
        }

        updateProfile(updates)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    // Helper to get values safely from nested profile object
    const getValue = (field: string) => {
        if (loading) return "";
        switch (field) {
            case 'fullName': return profile.fullName || "";
            case 'email': return profile.email || "";
            case 'phone': return profile.whatsappNumber || "";
            case 'location': return profile.location || "";
            case 'stage': return profile.status || "";
            case 'interest': return profile.interests?.[0] || "";
            case 'education': return profile.educationLevel || "";
            case 'school': return profile.educationDetails?.institution || "";
            case 'fieldOfStudy': return profile.educationDetails?.field || "";
            case 'graduationYear': return profile.educationDetails?.gradYear || "";
            case 'technicalSkills': return profile.hardSkills?.join(', ') || "";
            case 'softSkills': return profile.subjects?.join(', ') || "";
            case 'languages': return profile.languages?.join(', ') || "";
            case 'experience': return profile.resumeData?.recentRole || "";
            case 'internships': return profile.resumeData?.topProject || "";
            case 'careerGoal': return profile.careerGoal || "";
            case 'targetIndustry': return profile.targetRole || "";
            case 'workEnvironment': return profile.workStyle?.environment?.[0] || "";
            default: return "";
        }
    }

    return (
        <section className="pt-32 pb-24 bg-white relative z-20">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-20 left-10 w-64 h-64 bg-slate-50 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-50 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Pro Profile</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Complete your details below to unlock personalized AI career guidance and auto-generated CVs.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Personal Details</h3>
                                <p className="text-sm text-slate-500">Your basic contact info</p>
                            </div>
                        </div>

                        <AnimatePresence>
                            {(saved || isSyncing) && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-100"
                                >
                                    {isSyncing ? (
                                        <Globe className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    )}
                                    {isSyncing ? "Syncing..." : "Saved"}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <input
                                type="text"
                                value={getValue('fullName')}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="e.g. Aminata Kamara"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">District / Location</label>
                            <select
                                value={getValue('location')}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 cursor-pointer appearance-none font-medium"
                            >
                                <option value="">Select District...</option>
                                <option value="Bo">Bo District</option>
                                <option value="Bombali">Bombali (Makeni)</option>
                                <option value="Bonthe">Bonthe</option>
                                <option value="Falaba">Falaba</option>
                                <option value="Kailahun">Kailahun</option>
                                <option value="Kambia">Kambia</option>
                                <option value="Karene">Karene</option>
                                <option value="Kenema">Kenema</option>
                                <option value="Koinadugu">Koinadugu</option>
                                <option value="Kono">Kono</option>
                                <option value="Moyamba">Moyamba</option>
                                <option value="Port Loko">Port Loko</option>
                                <option value="Pujehun">Pujehun</option>
                                <option value="Tonkolili">Tonkolili</option>
                                <option value="Western Area Rural">Western Area Rural</option>
                                <option value="Western Area Urban">Western Area Urban (Freetown)</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                                <input
                                    type="email"
                                    value={getValue('email')}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">WhatsApp Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                                <input
                                    type="tel"
                                    value={getValue('phone')}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="+232 ..."
                                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Current Stage</label>
                            <select
                                value={getValue('stage')}
                                onChange={(e) => handleChange('stage', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 cursor-pointer appearance-none font-medium"
                            >
                                <option value="">Select Stage...</option>
                                <option value="JSS">Junior Secondary (JSS)</option>
                                <option value="SSS">Senior Secondary (SSS)</option>
                                <option value="University">University Student</option>
                                <option value="Graduate">Recent Graduate</option>
                                <option value="Professional">Working Professional</option>
                                <option value="Entrepreneur">Entrepreneur</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Primary Interest</label>
                            <input
                                type="text"
                                value={getValue('interest')}
                                onChange={(e) => handleChange('interest', e.target.value)}
                                placeholder="e.g. Technology, Agriculture..."
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-slate-100 mb-12" />

                    {/* Education Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Education</h3>
                            <p className="text-sm text-slate-500">Your academic background</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Highest Level</label>
                            <select
                                value={getValue('education')}
                                onChange={(e) => handleChange('education', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 cursor-pointer appearance-none font-medium"
                            >
                                <option value="">Select Level...</option>
                                <option value="JSS">Junior Secondary School</option>
                                <option value="SSS">Senior Secondary School</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor's Degree</option>
                                <option value="Master">Master's Degree</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">School / University</label>
                            <input
                                type="text"
                                value={getValue('school')}
                                onChange={(e) => handleChange('school', e.target.value)}
                                placeholder="e.g. Fourah Bay College"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Field of Study</label>
                            <input
                                type="text"
                                value={getValue('fieldOfStudy')}
                                onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                                placeholder="e.g. Computer Science"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Graduation Year</label>
                            <input
                                type="text"
                                value={getValue('graduationYear')}
                                onChange={(e) => handleChange('graduationYear', e.target.value)}
                                placeholder="e.g. 2024"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-slate-100 mb-12" />

                    {/* Skills Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                            <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Skills & Experience</h3>
                            <p className="text-sm text-slate-500">Showcase your abilities</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700">Technical Skills</label>
                            <input
                                type="text"
                                value={getValue('technicalSkills')}
                                onChange={(e) => handleChange('technicalSkills', e.target.value)}
                                placeholder="e.g. Excel, Python, AutoCAD, Farming..."
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Soft Skills</label>
                            <input
                                type="text"
                                value={getValue('softSkills')}
                                onChange={(e) => handleChange('softSkills', e.target.value)}
                                placeholder="e.g. Leadership, Communication..."
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Languages</label>
                            <input
                                type="text"
                                value={getValue('languages')}
                                onChange={(e) => handleChange('languages', e.target.value)}
                                placeholder="e.g. English, Krio..."
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700">Work Experience / Internships</label>
                            <textarea
                                value={getValue('experience')}
                                onChange={(e) => handleChange('experience', e.target.value)}
                                placeholder="Describe your relevant work experience, internships, or volunteering..."
                                rows={4}
                                className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium resize-none"
                            />
                        </div>
                    </div>

                    <div className="h-px w-full bg-slate-100 mb-12" />

                    {/* Goal Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                            <Target className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Career Goals</h3>
                            <p className="text-sm text-slate-500">Where do you want to go?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Desired Role</label>
                            <input
                                type="text"
                                value={getValue('careerGoal')}
                                onChange={(e) => handleChange('careerGoal', e.target.value)}
                                placeholder="e.g. Software Engineer"
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Target Industry</label>
                            <select
                                value={getValue('targetIndustry')}
                                onChange={(e) => handleChange('targetIndustry', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-slate-900 cursor-pointer appearance-none font-medium"
                            >
                                <option value="">Select Industry...</option>
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Finance">Finance & Banking</option>
                                <option value="Government">Government & NGO</option>
                                <option value="Construction">Construction</option>
                                <option value="Tourism">Tourism & Hospitality</option>
                                <option value="Mining">Mining</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Work Environment</label>
                            <select
                                value={getValue('workEnvironment')}
                                onChange={(e) => handleChange('workEnvironment', e.target.value)}
                                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-slate-900 appearance-none cursor-pointer font-medium"
                            >
                                <option value="">Select Environment...</option>
                                <option value="Office">Office-based</option>
                                <option value="Remote">Remote/Work from Home</option>
                                <option value="Field">Field Work</option>
                                <option value="Hybrid">Hybrid (Mix)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12 pb-12">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={async () => {
                                if (!profile.email || !profile.fullName) {
                                    alert("Please provide at least your Name and Email to register.")
                                    return
                                }
                                setIsSyncing(true)
                                try {
                                    const res = await fetch('/api/register', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            fullName: profile.fullName,
                                            email: profile.email,
                                            phone: profile.whatsappNumber,
                                            location: profile.location,
                                            stage: profile.status,
                                            interest: profile.interests?.[0],
                                        })
                                    })
                                    if (res.ok) {
                                        const data = await res.json()
                                        alert(`Registration Successful!\n\nYour Secret Login ID is: ${data.secretId}\n\nWe have also sent this to your email. You can now login with this ID anytime.`)
                                        // Optionally redirect to dashboard if we sign them in
                                        // For now, prompt to login
                                        window.location.href = '/login'
                                    } else {
                                        const data = await res.json()
                                        alert("Registration failed: " + (data.error || "Please try again."))
                                    }
                                } catch (e) {
                                    console.error(e)
                                    alert("An error occurred.")
                                } finally {
                                    setIsSyncing(false)
                                }
                            }}
                            className="bg-slate-900 text-white font-bold uppercase tracking-wide py-4 px-12 rounded-full shadow-xl hover:bg-slate-800 transition-colors flex items-center gap-3 text-sm"
                        >
                            Finalize Profile Registration
                            <CheckCircle2 className="w-5 h-5" />
                        </motion.button>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
