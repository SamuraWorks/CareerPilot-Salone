import { User } from 'lucide-react'

// Types for the Logic Engine
export type ExperienceLevel = 'student' | 'entry' | 'mid' | 'senior' | 'executive'
export type JobType = 'corporate' | 'creative' | 'technical' | 'academic' | 'startup' | 'ngo'

export interface UserProfile {
    status: string // 'student' | 'employed' | 'looking'
    yearsExperience: number
    targetRole: string
    skills: string[]
    projectCount: number
    fullName?: string
    impact_metrics?: string
    leadership_experience?: string
    unique_hook?: string
    resumeData?: {
        impactMetric?: string
        leadershipAction?: string
        leadership?: string
        professionalHook?: string
    }
}

export interface LayoutStrategy {
    id: string
    name: string
    reasoning: string
    sectionOrder: string[]
    sidebarSections: string[]
    emphasis: 'education' | 'experience' | 'skills' | 'projects'
    density: 'compact' | 'standard' | 'verbose'
    theme: 'modern' | 'minimalist' | 'creative' | 'academic'
    showSidebar: boolean
}

const SECTION_IDS = {
    SUMMARY: 'summary',
    EXPERIENCE: 'experience',
    EDUCATION: 'education',
    SKILLS: 'skills',
    PROJECTS: 'projects',
    CERTIFICATIONS: 'certifications',
    LANGUAGES: 'languages',
    REFERENCES: 'references',
    CONTACT: 'contact'
}

/**
 * THE POLISHER
 * Maps passive verbs to high-impact power verbs.
 */
export function polishText(text: string): string {
    if (!text) return text

    const powerMap: Record<string, string> = {
        'helped': 'Collaborated on',
        'assisted': 'Supported the delivery of',
        'worked on': 'Architected',
        'led': 'Spearheaded',
        'managed': 'Orchestrated',
        'made': 'engineered',
        'did': 'Executed',
        'organized': 'Structured',
        'responsible for': 'Pioneered',
        'handled': 'Navigated',
        'look after': 'Curated'
    }

    let polished = text
    Object.entries(powerMap).forEach(([passive, active]) => {
        const regex = new RegExp(`\\b${passive}\\b`, 'gi')
        polished = polished.replace(regex, (match) => {
            // Preserve capitalization
            return match[0] === match[0].toUpperCase()
                ? active.charAt(0).toUpperCase() + active.slice(1)
                : active.toLowerCase()
        })
    })

    return polished
}

/**
 * THE REALISM FILTER
 * Detects inflated skill claims that lack evidence in projects or experience.
 */
export function applyRealismFilter(skills: string[], projects: any[], experience: any[]): string[] {
    const flagged: string[] = []
    if (!skills || skills.length === 0) return flagged

    const evidenceText = (
        projects.map(p => `${p.name} ${p.description}`).join(' ') +
        experience.map(e => `${e.role} ${e.company} ${e.description}`).join(' ')
    ).toLowerCase()

    skills.forEach(skill => {
        const skillLower = skill.toLowerCase()
        // If skill isn't mentioned in any description/title, flag it for verification
        if (!evidenceText.includes(skillLower)) {
            flagged.push(skill)
        }
    })

    return flagged
}

/**
 * THE LOGIC ENGINE
 * Determines the best CV strategy based on the 4-point decision tree in System Design.
 */
export function calculateLayoutStrategy(profile: UserProfile): LayoutStrategy {
    const { yearsExperience, targetRole, skills, projectCount, status } = profile

    // Normalize inputs
    const roleLower = targetRole.toLowerCase()

    // Sector Detection
    const isTech = roleLower.includes('developer') || roleLower.includes('software') || roleLower.includes('engineer') || roleLower.includes('data') || roleLower.includes('it')
    const isCreative = roleLower.includes('design') || roleLower.includes('media') || roleLower.includes('art') || roleLower.includes('writer') || roleLower.includes('content') || roleLower.includes('marketing')
    const isAcademic = roleLower.includes('professor') || roleLower.includes('lecturer') || roleLower.includes('research') || roleLower.includes('teacher')
    const isNGO = roleLower.includes('ngo') || roleLower.includes('program officer') || roleLower.includes('coordinator') || roleLower.includes('humanitarian')
    const isFinance = roleLower.includes('bank') || roleLower.includes('accountant') || roleLower.includes('finance') || roleLower.includes('audit')

    // 1. Base Strategy Selection (Seniority First)

    // Scholar Route (Student / 0 exp)
    if (yearsExperience < 1 && status === 'student') {
        // Enforce Academic theme for most scholars unless clearly Creative/Tech
        // This ensures it looks different from the "Modern Professional"
        let theme: 'academic' | 'creative' | 'modern' | 'minimalist' = 'academic'
        if (isCreative) theme = 'creative'
        if (isTech) theme = 'modern'

        return {
            id: 'education-first',
            name: 'Scholar Strategy',
            reasoning: 'As a student or recent graduate, your academic achievements are your strongest asset. We position Education at the top to anchor your potential before highlighting projects and skills.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.EDUCATION,    // Moved to top
                SECTION_IDS.PROJECTS,     // Projects second
                SECTION_IDS.SKILLS,       // Skills third (moved from sidebar for emphasis if needed, but keeping in sidebar for now as per original design, checking below) -> Actually, let's keep consistent with valid layouts.
                SECTION_IDS.EXPERIENCE,   // Experience lower
                SECTION_IDS.CERTIFICATIONS
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,       // Key skills in sidebar
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'education',
            density: 'standard',      // Standard readability
            theme: theme,             // Distinct Theme
            showSidebar: true
        }
    }

    // Executive Route (3+ years exp)
    if (yearsExperience >= 3) {
        const theme = isCreative ? 'creative' : (isAcademic || isNGO ? 'academic' : 'minimalist')
        return {
            id: 'experience-heavy',
            name: 'Executive Standard',
            reasoning: 'With consistent experience, your work history is the "meat". We prioritize reverse-chronological experience and outcome metrics.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.CERTIFICATIONS
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'experience',
            density: 'standard',
            theme: theme,
            showSidebar: false
        }
    }

    // 2. Mid-Career / Hybrid Strategies (1-3 years exp)

    // Technical Hybrid
    if (isTech && skills.length > 5) {
        return {
            id: 'skill-hybrid',
            name: 'Technical Competency',
            reasoning: 'Technical roles prioritize what you can build. We use a hybrid layout that keeps your tech stack visible while highlighting key projects.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.PROJECTS,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.CERTIFICATIONS,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'skills',
            density: 'compact',
            theme: 'modern',
            showSidebar: true
        }
    }

    // NGO/Academic Verbose
    if (isAcademic || isNGO) {
        return {
            id: 'ngo-academic',
            name: 'Public Service Protocol',
            reasoning: 'NGOs and Academic institutions prefer thoroughness. We use a verbose layout to allow for detailed descriptions of duties, impact, and references.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.SKILLS,
                SECTION_IDS.REFERENCES
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'experience',
            density: 'verbose',
            theme: 'academic',
            showSidebar: false
        }
    }

    // Finance/Corporate Minimalist
    if (isFinance) {
        return {
            id: 'corporate-slim',
            name: 'Freetown Finance Standard',
            reasoning: 'Banking and corporate sectors value efficiency and conservatism. We use a high-density minimalist layout.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.CERTIFICATIONS
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'experience',
            density: 'standard',
            theme: 'minimalist',
            showSidebar: true
        }
    }

    // Medical/Healthcare Professional
    const isMedical = roleLower.includes('doctor') || roleLower.includes('nurse') || roleLower.includes('physician') ||
        roleLower.includes('medical') || roleLower.includes('health') || roleLower.includes('clinical') ||
        roleLower.includes('surgeon') || roleLower.includes('pharmacist') || roleLower.includes('midwife')

    if (isMedical) {
        return {
            id: 'clinical-professional',
            name: 'Clinical Professional',
            reasoning: 'Healthcare roles require clear demonstration of certifications, licenses, and clinical competencies. We prioritize credentials and patient care experience.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.CERTIFICATIONS,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.REFERENCES
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES
            ],
            emphasis: 'experience',
            density: 'standard',
            theme: 'academic',
            showSidebar: true
        }
    }

    // Engineering Professional (Civil, Mining, Mechanical, Electrical)
    const isEngineer = roleLower.includes('engineer') && !roleLower.includes('software') && !roleLower.includes('data')

    if (isEngineer) {
        return {
            id: 'engineering-professional',
            name: 'Engineering Professional',
            reasoning: 'Engineering roles demand technical project portfolios and professional certifications. We emphasize hands-on projects and safety/compliance credentials.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.PROJECTS,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.CERTIFICATIONS,
                SECTION_IDS.EDUCATION
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'projects',
            density: 'standard',
            theme: 'modern',
            showSidebar: true
        }
    }

    // Legal Professional
    const isLegal = roleLower.includes('lawyer') || roleLower.includes('attorney') || roleLower.includes('legal') ||
        roleLower.includes('barrister') || roleLower.includes('solicitor') || roleLower.includes('counsel')

    if (isLegal) {
        return {
            id: 'legal-professional',
            name: 'Legal Professional',
            reasoning: 'Legal careers require formal credentials and case experience. We use a traditional format emphasizing bar admission, practice areas, and notable cases.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.CERTIFICATIONS,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.REFERENCES
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.SKILLS,
                SECTION_IDS.LANGUAGES
            ],
            emphasis: 'experience',
            density: 'verbose',
            theme: 'academic',
            showSidebar: false
        }
    }

    // Hospitality & Service Industry
    const isHospitality = roleLower.includes('hotel') || roleLower.includes('hospitality') || roleLower.includes('restaurant') ||
        roleLower.includes('customer service') || roleLower.includes('front desk') || roleLower.includes('waiter') ||
        roleLower.includes('chef') || roleLower.includes('tourism') || roleLower.includes('reception')

    if (isHospitality) {
        return {
            id: 'service-professional',
            name: 'Service Professional',
            reasoning: 'Hospitality and service roles prioritize soft skills and customer interaction abilities. We use a skills-first layout to highlight interpersonal strengths.',
            sectionOrder: [
                SECTION_IDS.SUMMARY,
                SECTION_IDS.SKILLS,
                SECTION_IDS.EXPERIENCE,
                SECTION_IDS.EDUCATION,
                SECTION_IDS.CERTIFICATIONS
            ],
            sidebarSections: [
                SECTION_IDS.CONTACT,
                SECTION_IDS.LANGUAGES,
                SECTION_IDS.REFERENCES
            ],
            emphasis: 'skills',
            density: 'standard',
            theme: 'modern',
            showSidebar: true
        }
    }

    // Fallback / General Professional
    return {
        id: 'general-modern',
        name: 'Modern Professional',
        reasoning: 'A balanced, versatile layout suitable for most early-to-mid career roles in Sierra Leone.',
        sectionOrder: [
            SECTION_IDS.SUMMARY,
            SECTION_IDS.EXPERIENCE,
            SECTION_IDS.EDUCATION
        ],
        sidebarSections: [
            SECTION_IDS.CONTACT,
            SECTION_IDS.SKILLS,
            SECTION_IDS.LANGUAGES,
            SECTION_IDS.REFERENCES
        ],
        emphasis: 'experience',
        density: 'standard',
        theme: 'modern',
        showSidebar: true
    }
}
