"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Search, BookOpen, GraduationCap, FileText, MessageSquare } from "lucide-react"

export default function UserGuidePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/help">
                            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Help Center
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold mt-4">CareerPilot Salone User Guide</h1>
                        <p className="text-muted-foreground text-lg mt-2">
                            Master the platform with this step-by-step guide to achieving your career goals.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Section 1: Getting Started */}
                        <section id="getting-started" className="scroll-mt-20">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <CardTitle>1. Getting Started</CardTitle>
                                    </div>
                                    <CardDescription>Setting up your account and profile for success</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pl-4 border-l-2 border-primary/20">
                                        <h4 className="font-semibold text-sm">Create an Account</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Click "Sign Up" in the top right. Enter your name, email, and a secure password.
                                            You'll be redirected to your dashboard immediately.
                                        </p>
                                    </div>
                                    <div className="pl-4 border-l-2 border-primary/20">
                                        <h4 className="font-semibold text-sm">Complete Your Profile</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Navigate to the "Profile" tab. Upload a professional photo, add your bio, and listed your core skills.
                                            This helps our AI recommend the best careers for you.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 2: Finding Careers */}
                        <section id="careers" className="scroll-mt-20">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <CardTitle>2. Finding Your Path</CardTitle>
                                    </div>
                                    <CardDescription>Exploring careers and educational opportunities</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pl-4 border-l-2 border-blue-100">
                                        <h4 className="font-semibold text-sm">Browse Careers</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Use the "Careers" page to search by industry (e.g., Technology, Healthcare).
                                            Click on any career card to see detailed salary ranges, required skills, and a "Where to Study" guide
                                            linking you to top Sierra Leonean universities.
                                        </p>
                                    </div>
                                    <div className="pl-4 border-l-2 border-blue-100">
                                        <h4 className="font-semibold text-sm">Check Universities</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Visit the "Universities" page to see official institutions like FBC, Njala, and UNIMAK.
                                            You can find their website links and popular course offerings directly.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 3: Opportunities */}
                        <section id="opportunities" className="scroll-mt-20">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <CardTitle>3. Seizing Opportunities</CardTitle>
                                    </div>
                                    <CardDescription>Applying for jobs and scholarships</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pl-4 border-l-2 border-green-100">
                                        <h4 className="font-semibold text-sm">Find Scholarships</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Our "Scholarships" page lists real-time opportunities like the Sierra Leone Grant-in-Aid
                                            and Chinese Government Scholarships. Check deadlines and verify eligibility before clicking "Apply".
                                        </p>
                                    </div>
                                    <div className="pl-4 border-l-2 border-green-100">
                                        <h4 className="font-semibold text-sm">Job Market</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            The "Jobs" board shows active listings from top employers. Filter by "Full-time" or "Internship"
                                            to find roles that match your experience level.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 4: Tools */}
                        <section id="tools" className="scroll-mt-20">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <CardTitle>4. Career Tools</CardTitle>
                                    </div>
                                    <CardDescription>Building your professional brand</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pl-4 border-l-2 border-purple-100">
                                        <h4 className="font-semibold text-sm">CV Builder</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Create a professional resume in minutes. Enter your personal info, education, and experience,
                                            and our tool will generate a polished PDF ready for download.
                                        </p>
                                    </div>
                                    <div className="pl-4 border-l-2 border-purple-100">
                                        <h4 className="font-semibold text-sm">Mentorship</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Connect with industry leaders. Browse mentor profiles and use the provided links to book
                                            a session or send an inquiry email.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 4: AI & WhatsApp */}
                        <section id="ai-help" className="scroll-mt-20">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <CardTitle>5. AI & WhatsApp Support</CardTitle>
                                    </div>
                                    <CardDescription>Get instant answers 24/7</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pl-4 border-l-2 border-orange-100">
                                        <h4 className="font-semibold text-sm">CareerPilot AI</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Look for the chat bubble in the bottom right corner. Ask our AI anything—from "How do I become a doctor?"
                                            to "Write a cover letter for a bankteller job."
                                        </p>
                                    </div>
                                    <div className="pl-4 border-l-2 border-orange-100">
                                        <h4 className="font-semibold text-sm">WhatsApp Bot</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Prefer WhatsApp? Click the WhatsApp icon in the dashboard to start a chat with our automated bot
                                            for quick updates on new jobs and scholarships.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="text-lg font-semibold mb-4">Ready to get started?</h3>
                        <div className="flex justify-center gap-4">
                            <Link href="/dashboard">
                                <Button>Go to Dashboard</Button>
                            </Link>
                            <Link href="/careers">
                                <Button variant="outline">Browse Careers</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
