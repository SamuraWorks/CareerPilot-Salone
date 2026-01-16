"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, MessageCircle, Mail, Video, HelpCircle } from "lucide-react"
import Image from "next/image"

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Image Section */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-12 shadow-xl">
            <Image src="/help-center-learning.jpg" alt="Help Center" fill className="object-cover" />
            <div className="absolute inset-0 bg-slate-900/20" /> {/* Subtle dimming to pop the glass box */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-slate-900/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl text-center max-w-2xl w-full">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Help Center</h1>
                <p className="text-lg text-white/90 font-medium">Get the support you need to make the most of <br className="hidden md:block" /> CareerPilot Salone</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/faq">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">FAQ</h3>
                  <p className="text-muted-foreground text-sm">
                    Find answers to frequently asked questions about our platform
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/user-guide">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">User Guide</h3>
                  <p className="text-muted-foreground text-sm">
                    Step-by-step instructions on using CareerPilot features
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/video-tutorials">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
                  <p className="text-muted-foreground text-sm">Watch video guides to learn how to use the platform</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Getting Started */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>New to CareerPilot Salone? Here's how to begin your career journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Your Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Sign up with your email address to access all features of the platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Complete Your Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Add your skills, interests, and career preferences to get personalized recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Explore Careers</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse through our career database and discover opportunities that match your profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Build Your CV</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our CV builder to create a professional resume that stands out to employers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Follow Your Roadmap</h4>
                    <p className="text-sm text-muted-foreground">
                      Start working through your personalized career roadmap to reach your goals.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Our support team is here to assist you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Send us an email and we'll respond within 24-48 hours
                    </p>
                    <a href="mailto:info@careerpilot.sl" className="text-sm text-primary hover:underline">
                      info@careerpilot.sl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Live Chat</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Chat with our support team during business hours
                    </p>
                    <Button size="sm" variant="outline">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
