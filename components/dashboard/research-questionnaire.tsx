"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Loader2, X, ChevronDown, ChevronUp } from "lucide-react"

const SECTORS = ["Technology", "Healthcare", "Education", "Agriculture", "Finance/Business", "Engineering", "Mining", "Creative Arts", "Other"]
const EDUCATION_LEVELS = ["WASSCE / High School", "Diploma / Certificate", "Bachelor's Degree", "Master's Degree", "PhD", "Other"]
const OPPORTUNITIES = ["Scholarships", "Internships", "Full-time Jobs", "Mentorship", "Training Programs"]

interface ResearchQuestionnaireProps {
    forceVisible?: boolean;
    onSaveSuccess?: (data: any) => void;
}

export function ResearchQuestionnaire({ forceVisible = false, onSaveSuccess }: ResearchQuestionnaireProps) {
    const { user, profile, updateProfile, refreshProfile } = useAuth()
    const [isVisible, setIsVisible] = useState(forceVisible)
    const [isExpanded, setIsExpanded] = useState(true)
    const [loading, setLoading] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        sector_interest: "",
        highest_education: "",
        skills: [] as string[],
        career_goals: "",
        opportunities_interest: [] as string[],
        wants_recommendations: true,
        feedback: ""
    })

    useEffect(() => {
        // Only show if research NOT completed and profile is relatively ready
        if (profile?.id && !profile.research_completed && !localStorage.getItem("research_skipped")) {
            setIsVisible(true)
            // Pre-fill some data if available
            setFormData(prev => ({
                ...prev,
                highest_education: profile.highest_education || "",
                career_goals: profile.career_goal || "",
                skills: profile.skills || []
            }))
        }
    }, [profile?.id, profile?.research_completed])


    const handleSkip = () => {
        setIsVisible(false)
        localStorage.setItem("research_skipped", "true")
        toast.info("Questionnaire skipped. You can find it later in settings.")
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            // 1. Identify context
            const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

            // If user.id is a UUID, it's a real Supabase user. Otherwise, it's likely an anon_id or secret ID.
            const targetProfileId = user?.id && isUUID(user.id) ? user.id : null;
            const targetAnonId = profile.anon_id || (user?.id && !isUUID(user.id) ? user.id : null);

            console.log("Saving research with:", { targetProfileId, targetAnonId });

            // 2. Save Entry
            const { error: entryError } = await supabase.from('research_entries').insert({
                profile_id: targetProfileId,
                anon_id: targetAnonId,
                ...formData,
                updated_at: new Date().toISOString()
            })

            if (entryError) {
                console.error("Research entry insert failed:", entryError);
                // We proceed to update the profile flag anyway so the user isn't stuck,
                // but we log it heavily.
            }

            // 3. Update Profile Data using standard helper
            // This marks it as completed and SYNCS the data they just provided to their profile
            await updateProfile({
                research_completed: true,
                career_goal: formData.career_goals,
                highest_education: formData.highest_education,
                interests: [formData.sector_interest, ...(profile.interests || [])].filter((v, i, a) => v && a.indexOf(v) === i)
            });

            toast.success("Thank you for your feedback!")
            setIsVisible(false)
            refreshProfile()

            // Notify parent to refresh AI using the data collected
            if (onSaveSuccess) {
                onSaveSuccess(formData);
            }

        } catch (err) {
            console.error("Save research critical exception:", err)
            toast.error("Failed to save. Please check your connection.")
        } finally {
            setLoading(false)
        }
    }

    const toggleOpportunity = (opp: string) => {
        setFormData(prev => {
            const exists = prev.opportunities_interest.includes(opp)
            return {
                ...prev,
                opportunities_interest: exists
                    ? prev.opportunities_interest.filter(o => o !== opp)
                    : [...prev.opportunities_interest, opp]
            }
        })
    }

    if (!isVisible) return null

    return (
        <Card className="border-l-4 border-l-emerald-500 shadow-md animate-in fade-in slide-in-from-top-4 mb-8 bg-slate-50/50">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-bold text-[#0B1F3A]">Help Us Improve Career Pilot 🇸🇱</CardTitle>
                        <CardDescription>Share your interests to get better recommendations. Takes 30 seconds.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleSkip(); }}>
                            <X className="w-4 h-4 text-slate-400" />
                        </Button>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="space-y-4 pt-2">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Primary Sector of Interest</Label>
                            <Select
                                value={formData.sector_interest}
                                onValueChange={(val) => setFormData({ ...formData, sector_interest: val })}
                            >
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Select a sector..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Highest Education</Label>
                            <Select
                                value={formData.highest_education}
                                onValueChange={(val) => setFormData({ ...formData, highest_education: val })}
                            >
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Current level..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {EDUCATION_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Goals */}
                    <div className="space-y-2">
                        <Label>Your Main Career Goal</Label>
                        <Input
                            placeholder="e.g. Become a Senior Developer in Freetown"
                            className="bg-white"
                            value={formData.career_goals}
                            onChange={(e) => setFormData({ ...formData, career_goals: e.target.value })}
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                        <Label>What are you looking for? (Select all that apply)</Label>
                        <div className="flex flex-wrap gap-2">
                            {OPPORTUNITIES.map(opp => (
                                <div
                                    key={opp}
                                    onClick={() => toggleOpportunity(opp)}
                                    className={`
                    cursor-pointer px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                    ${formData.opportunities_interest.includes(opp) ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'}
                  `}
                                >
                                    {opp}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Any suggestions for us? (Optional)</Label>
                        <Textarea
                            placeholder="How can we make this app better for you?"
                            className="bg-white h-20 resize-none"
                            value={formData.feedback}
                            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="recs"
                                checked={formData.wants_recommendations}
                                onCheckedChange={(c) => setFormData({ ...formData, wants_recommendations: c as boolean })}
                            />
                            <label htmlFor="recs" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Enable personalized updates
                            </label>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={handleSkip} disabled={loading}>
                                Skip for now
                            </Button>
                            <Button onClick={handleSave} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Save Feedback
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
