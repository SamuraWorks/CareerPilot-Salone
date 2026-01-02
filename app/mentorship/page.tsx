"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarCheck, Loader2, Mail } from "lucide-react"

interface Mentor {
    id: string
    name: string
    profession: string
    bio: string
    image_url: string
    calendly_link: string
    contact_email?: string
}

const MOCK_MENTORS: Mentor[] = [
    {
        id: '1',
        name: 'Dr. Samuel Wise',
        profession: 'Software Engineer',
        bio: 'Senior Technical Analyst with 10+ years of experience in building scalable systems in Sierra Leone.',
        image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        calendly_link: 'https://calendly.com',
        contact_email: 'samuel@example.com'
    },
    {
        id: '2',
        name: 'Aminata Kamara',
        profession: 'Medical Doctor',
        bio: 'Public Health Specialist focusing on community health initiatives in Freetown.',
        image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        calendly_link: '',
        contact_email: 'aminata@example.com'
    },
    {
        id: '3',
        name: 'Ibrahim Bah',
        profession: 'Entrepreneur',
        bio: 'Founder of TechSalone, helping startups grow and find investment.',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        calendly_link: 'https://calendly.com',
        contact_email: 'ibrahim@example.com'
    },
    {
        id: '4',
        name: 'Nurse Hawa Conteh',
        profession: 'Senior Nurse',
        bio: 'Over 15 years of experience in maternal health and nursing education at COMAHS.',
        image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        calendly_link: '',
        contact_email: 'hawa@example.com'
    },
    {
        id: '5',
        name: 'Barrister Abu Bakarr',
        profession: 'Legal Practitioner',
        bio: 'Expert in Sierra Leonean Law, offering guidance for aspiring law students and junior practitioners.',
        image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        calendly_link: 'https://calendly.com',
        contact_email: 'abu@example.com'
    },
    {
        id: '6',
        name: 'Musa Bangura',
        profession: 'Agricultural Scientist',
        bio: 'Specialist in sustainable farming and agricultural value chains na Sierra Leone.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        calendly_link: '',
        contact_email: 'musa@example.com'
    }
]

export default function MentorshipPage() {
    const [mentors, setMentors] = useState<Mentor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // State for email draft
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        async function fetchMentors() {
            try {
                setLoading(true)
                // Mock network delay
                await new Promise(resolve => setTimeout(resolve, 800))
                setMentors(MOCK_MENTORS)
            } catch (err) {
                console.error("Error fetching mentors:", err)
                setError("Failed to load mentors.")
            } finally {
                setLoading(false)
            }
        }

        fetchMentors()
    }, [])

    const handleSendEmail = () => {
        if (!selectedMentor || !selectedMentor.contact_email) return

        const subject = `Mentorship Request from CareerPilot User`
        const body = `Dear ${selectedMentor.name},\n\n${message}\n\nI found your profile on CareerPilot Salone and would truly appreciate your guidance.\n\nBest regards.`

        // Open default mail client
        window.location.href = `mailto:${selectedMentor.contact_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Find a Mentor</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Connect with experienced professionals in Sierra Leone who can guide your career path.
                        </p>
                    </div>

                    {loading && (
                        <div className="flex justify-center p-10">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    )}

                    {error && <div className="text-center text-destructive">{error}</div>}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mentors.map((mentor) => (
                                <Card key={mentor.id} className="p-6 text-center hover:shadow-lg transition-transform hover:-translate-y-1">
                                    <div className="flex justify-center mb-4">
                                        <Avatar className="w-24 h-24 border-4 border-primary/10">
                                            <AvatarImage src={mentor.image_url} alt={mentor.name} className="object-cover" />
                                            <AvatarFallback>{mentor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                                    <p className="text-primary font-medium mb-3">{mentor.profession}</p>

                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                        {mentor.bio}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {/* Direct Booking if available */}
                                        {mentor.calendly_link && (
                                            <Button className="w-full gap-2" onClick={() => window.open(mentor.calendly_link, '_blank')}>
                                                <CalendarCheck className="w-4 h-4" />
                                                Book Session
                                            </Button>
                                        )}

                                        {/* Email Request via Dialog */}
                                        {mentor.contact_email && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="w-full gap-2" onClick={() => {
                                                        setSelectedMentor(mentor)
                                                        setMessage(`I am an aspiring ${mentor.profession.split(' ')[0]} and verified user of CareerPilot Salone...`)
                                                    }}>
                                                        <Mail className="w-4 h-4" />
                                                        Request via Email
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Request Mentorship</DialogTitle>
                                                        <DialogDescription>
                                                            Send a professional request to {mentor.name}. The system will open your email client.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="message">Your Message</Label>
                                                            <Textarea
                                                                id="message"
                                                                value={message}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                                rows={6}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleSendEmail}>Send Request</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
