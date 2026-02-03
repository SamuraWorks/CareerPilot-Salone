"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, MapPin, GraduationCap, Target, CheckCircle2, Briefcase, Award, Globe, Calendar, ArrowRight, ArrowLeft, Check, Camera } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { saveProfileData } from "@/lib/profile/save-profile"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export interface UserProfile {
    full_name: string
    email: string
    location: string
    stage: string
    interest: string
    education: string
    school: string
    field_of_study: string
    graduation_year: string
    technical_skills: string
    soft_skills: string
    languages: string
    experience: string
    internships: string
    career_goal: string
    target_industry: string
    timeline: string
    work_environment: string
    availability: string
    avatar_url?: string
}

const TOTAL_STEPS = 6

export function ProfileWizard() {
    const router = useRouter()
    const { refreshProfile } = useAuth()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState<UserProfile>({
        full_name: "",
        email: "",
        location: "",
        stage: "",
        interest: "",
        education: "",
        school: "",
        field_of_study: "",
        graduation_year: "",
        technical_skills: "",
        soft_skills: "",
        languages: "",
        experience: "",
        internships: "",
        career_goal: "",
        target_industry: "",
        timeline: "",
        work_environment: "",
        availability: "",
        avatar_url: ""
    })

    const handleChange = (field: keyof UserProfile, value: string) => {
        setData(prev => ({ ...prev, [field]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Image size should be less than 2MB")
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setData(prev => ({ ...prev, avatar_url: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(data.full_name && data.email && data.location && data.stage && data.interest)
            case 2:
                return !!(data.education && data.school)
            case 3:
                return !!(data.technical_skills || data.soft_skills || data.languages)
            case 4:
                return true // Experience is optional
            case 5:
                return !!(data.career_goal && data.target_industry)
            case 6:
                return true // Review step
            default:
                return false
        }
    }

    const handleNext = () => {
        if (validateStep(currentStep) && currentStep < TOTAL_STEPS) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const { completeOnboarding } = useAuth()

    const handleSave = async () => {
        setIsSubmitting(true)

        // Map Wizard Data to UserProfile for Context
        const userProfile: any = {
            ...data,
            full_name: data.full_name,
            email: data.email,
            location: data.location,
            status: data.stage,
            interests: data.interest.split(',').map(s => s.trim()).filter(Boolean),
            skills: [
                ...data.technical_skills.split(',').map(s => s.trim()).filter(Boolean),
                ...data.soft_skills.split(',').map(s => s.trim()).filter(Boolean)
            ],
            education_level: data.education,
            education_details: {
                institution: data.school,
                field: data.field_of_study,
                grad_year: data.graduation_year
            },
            career_goal: data.career_goal,
            target_industry: data.target_industry,
            preferred_language: data.languages,
            avatar_url: data.avatar_url || ""
        }

        try {
            // Call Onboarding (handles API / Registration / State)
            await completeOnboarding(userProfile)

            // Redirect on success
            router.push('/dashboard?onboarding=complete')

        } catch (err: any) {
            console.error("Save failed:", err)
            setIsSubmitting(false)
            // Show the actual error message if possible
            const message = err.message || "Failed to save profile. Please try again."
            alert(message)
        }
    }

    const progress = (currentStep / TOTAL_STEPS) * 100

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 md:py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Header */}
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col gap-6 mb-8">
                        {/* Logo */}
                        <div className="flex justify-center md:justify-start">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden">
                                <img src="/images/core/logo.png" alt="CareerPilot" className="w-10 h-10 object-cover scale-110" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h1 className="text-xl md:text-3xl font-black text-slate-900">Complete Your Profile</h1>
                            <span className="text-xs md:text-sm font-bold text-slate-500 shrink-0">Step {currentStep} of {TOTAL_STEPS}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3 md:mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Step Indicators */}
                    <div className="flex justify-between">
                        {['Basic', 'Education', 'Skills', 'Experience', 'Goals', 'Review'].map((label, index) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${index + 1 < currentStep
                                    ? 'bg-emerald-500 text-white'
                                    : index + 1 === currentStep
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {index + 1 < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className="text-xs font-bold text-slate-600 hidden sm:block">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-xl p-5 md:p-8 mb-6"
                >
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div key="step1" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Let's start with the basics</h2>
                                    <p className="text-sm text-slate-500">Tell us who you are and where you're based</p>
                                </div>

                                <div className="flex flex-col items-center gap-4 mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center transition-all group-hover:border-blue-500">
                                            {data.avatar_url ? (
                                                <img src={data.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-10 h-10 text-slate-300" />
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            <Camera className="w-4 h-4 text-white" />
                                        </label>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Picture (Max 2MB)</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => handleChange('full_name', e.target.value)}
                                            placeholder="e.g. Aminata Kamara"
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="e.g. yourname@example.com"
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">We'll send your Secret ID to this email.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">District / Location *</label>
                                        <select
                                            value={data.location}
                                            onChange={(e) => handleChange('location', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select District...</option>
                                            <option value="Bo">Bo District</option>
                                            <option value="Bombali">Bombali District</option>
                                            <option value="Bonthe">Bonthe District</option>
                                            <option value="Falaba">Falaba District</option>
                                            <option value="Kailahun">Kailahun District</option>
                                            <option value="Kambia">Kambia District</option>
                                            <option value="Karene">Karene District</option>
                                            <option value="Kenema">Kenema District</option>
                                            <option value="Koinadugu">Koinadugu District</option>
                                            <option value="Kono">Kono District</option>
                                            <option value="Moyamba">Moyamba District</option>
                                            <option value="Port Loko">Port Loko District</option>
                                            <option value="Pujehun">Pujehun District</option>
                                            <option value="Tonkolili">Tonkolili District</option>
                                            <option value="Western Area Rural">Western Area Rural</option>
                                            <option value="Western Area Urban">Western Area Urban</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Current Stage *</label>
                                        <select
                                            value={data.stage}
                                            onChange={(e) => handleChange('stage', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select Stage...</option>
                                            <option value="JSS">Junior Secondary (JSS)</option>
                                            <option value="SSS">Senior Secondary (SSS)</option>
                                            <option value="University">University Student</option>
                                            <option value="Graduate">Recent Graduate</option>
                                            <option value="Professional">Working Professional</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Primary Interest *</label>
                                        <input
                                            type="text"
                                            value={data.interest}
                                            onChange={(e) => handleChange('interest', e.target.value)}
                                            placeholder="e.g. Technology, Healthcare, Business..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div key="step2" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Your Education Background</h2>
                                    <p className="text-sm text-slate-500">Share your academic journey</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Highest Level Completed *</label>
                                        <select
                                            value={data.education}
                                            onChange={(e) => handleChange('education', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select Level...</option>
                                            <option value="JSS">Junior Secondary School</option>
                                            <option value="SSS">Senior Secondary School</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="Bachelor">Bachelor's Degree</option>
                                            <option value="Master">Master's Degree</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">School / University *</label>
                                        <input
                                            type="text"
                                            value={data.school}
                                            onChange={(e) => handleChange('school', e.target.value)}
                                            placeholder="e.g. Fourah Bay College"
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Field of Study / Major</label>
                                        <input
                                            type="text"
                                            value={data.field_of_study}
                                            onChange={(e) => handleChange('field_of_study', e.target.value)}
                                            placeholder="e.g. Computer Science, Business..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Graduation Year</label>
                                        <input
                                            type="text"
                                            value={data.graduation_year}
                                            onChange={(e) => handleChange('graduation_year', e.target.value)}
                                            placeholder="e.g. 2024 or Expected 2026"
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div key="step3" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Skills & Languages</h2>
                                    <p className="text-sm text-slate-500">What can you do? What languages do you speak?</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Technical Skills</label>
                                        <input
                                            type="text"
                                            value={data.technical_skills}
                                            onChange={(e) => handleChange('technical_skills', e.target.value)}
                                            placeholder="e.g. Microsoft Excel, Python, AutoCAD..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Soft Skills</label>
                                        <input
                                            type="text"
                                            value={data.soft_skills}
                                            onChange={(e) => handleChange('soft_skills', e.target.value)}
                                            placeholder="e.g. Leadership, Communication, Teamwork..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Languages</label>
                                        <input
                                            type="text"
                                            value={data.languages}
                                            onChange={(e) => handleChange('languages', e.target.value)}
                                            placeholder="e.g. English, Krio, French..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div key="step4" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Work Experience</h2>
                                    <p className="text-sm text-slate-500">Share your professional background (optional)</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Work Experience</label>
                                        <textarea
                                            value={data.experience}
                                            onChange={(e) => handleChange('experience', e.target.value)}
                                            placeholder="Briefly describe your work experience..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Internships / Volunteer Work</label>
                                        <textarea
                                            value={data.internships}
                                            onChange={(e) => handleChange('internships', e.target.value)}
                                            placeholder="List any internships, volunteer work..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 5 && (
                            <motion.div key="step5" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Career Goals</h2>
                                    <p className="text-sm text-slate-500">Where do you want to go?</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Desired Career Path *</label>
                                        <input
                                            type="text"
                                            value={data.career_goal}
                                            onChange={(e) => handleChange('career_goal', e.target.value)}
                                            placeholder="e.g. Software Developer, Nurse..."
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Target Industry *</label>
                                        <select
                                            value={data.target_industry}
                                            onChange={(e) => handleChange('target_industry', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select Industry...</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Education">Education</option>
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Finance">Finance & Banking</option>
                                            <option value="Government">Government & NGO</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Timeline to Start Career</label>
                                        <select
                                            value={data.timeline}
                                            onChange={(e) => handleChange('timeline', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select Timeline...</option>
                                            <option value="Immediate">Immediately (0-3 months)</option>
                                            <option value="Short">Short-term (3-6 months)</option>
                                            <option value="Medium">Medium-term (6-12 months)</option>
                                            <option value="Long">Long-term (1+ years)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Work Preference</label>
                                        <select
                                            value={data.availability}
                                            onChange={(e) => handleChange('availability', e.target.value)}
                                            className="w-full px-4 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                        >
                                            <option value="">Select Preference...</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Flexible">Flexible/Open</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 6 && (
                            <motion.div key="step6" className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Review Your Profile</h2>
                                    <p className="text-sm text-slate-500">Everything looks good? Save to update your profile and CV!</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                                    <div className="flex items-center gap-4 border-b border-slate-200 pb-4 mb-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                                            {data.avatar_url ? (
                                                <img src={data.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                                    <User className="w-8 h-8 text-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 leading-tight">{data.full_name || "Final Sweep"}</h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider uppercase">{data.career_goal || "Career Explorer"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Basic Info</h3>
                                        <p className="text-sm font-medium text-slate-900">{data.full_name} • {data.location} • {data.stage}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Education</h3>
                                        <p className="text-sm font-medium text-slate-900">{data.education} at {data.school}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Career Goal</h3>
                                        <p className="text-sm font-medium text-slate-900">{data.career_goal} in {data.target_industry}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-blue-900 mb-1">Ready to save?</h4>
                                        <p className="text-xs text-blue-700">Your profile will be saved and used to generate personalized career recommendations and CV templates.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    {currentStep > 1 && (
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                            className="flex-1 h-12 rounded-xl border-2 font-bold"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                    )}

                    {currentStep < TOTAL_STEPS ? (
                        <Button
                            onClick={handleNext}
                            disabled={!validateStep(currentStep)}
                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 font-bold disabled:opacity-50"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 font-bold"
                        >
                            {isSubmitting ? 'Saving...' : 'Save & Update Profile'}
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
