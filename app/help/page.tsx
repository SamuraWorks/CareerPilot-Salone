import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, MessageCircle, Mail, Video, HelpCircle, Sparkles, Search, MapPin, Briefcase, Clock, ExternalLink, Bookmark, Loader2, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* PREMIUM HERO HEADER */}
          <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[300px] flex items-center shadow-2xl group mb-12">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="Help Center"
                fill
                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-4xl p-10 md:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Resource Hub</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-poppins">
                How can we <span className="text-[#F4C430]">Help</span> you?
              </h1>
              <p className="text-lg text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                Access guides, tutorials, and support to help you navigate your career path with confidence.
              </p>
            </div>
          </section>

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

            <Link href="https://youtu.be/SMkLYy0U_60?si=2ADARDhfnPzcTby3" target="_blank" rel="noopener noreferrer">
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
