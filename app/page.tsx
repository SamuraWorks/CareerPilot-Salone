import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import {
  ArrowRight,
  Target,
  BookOpen,
  FileText,
  TrendingUp,
  MessageSquare,
  Briefcase,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-career-guidance.jpg"
              alt="Career guidance hero"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/80 to-accent/70" />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse delay-500" />

            {/* Floating icons */}
            <div className="absolute top-32 right-1/4 animate-bounce delay-300 opacity-30">
              <Target className="w-12 h-12 text-white" />
            </div>
            <div className="absolute bottom-32 left-1/4 animate-bounce delay-700 opacity-30">
              <Award className="w-12 h-12 text-white" />
            </div>
            <div className="absolute top-1/3 right-1/3 animate-bounce delay-1000 opacity-30">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 animate-fade-in text-white">
                Navigate Your Career Path in <span className="text-secondary-foreground bg-secondary/90 px-3 rounded-lg">Sierra Leone</span>
              </h1>
              <p className="text-xl text-white/90 text-balance mb-8 leading-relaxed animate-fade-in-delay">
                Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to
                achieve your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow bg-white text-primary hover:bg-white/90">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/careers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30"
                  >
                    Explore Careers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 grid grid-cols-12 gap-4 rotate-12">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full" />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Build Your Career</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
                CareerPilot Salone provides comprehensive tools to help you discover, plan, and pursue your ideal career
                path.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI Career Guidance</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Chat with our AI to discover careers that match your skills and interests in Sierra Leone.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Career Recommendations</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Get personalized career suggestions based on your skills, interests, and goals.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50 bg-gradient-to-br from-background to-secondary/5">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Job Matching</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Find jobs, internships, and training programs that match your profile.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50 bg-gradient-to-br from-background to-secondary/5">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">CV Builder</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create professional CVs with our easy-to-use builder and templates.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 bg-gradient-to-br from-background to-accent/5">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Career Roadmaps</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Follow step-by-step learning paths to reach your career objectives.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-all hover:scale-110 hover:rotate-6 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Monitor your learning journey and celebrate milestones along the way.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 animate-gradient" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Thousands of Successful Users</h2>
              <p className="text-muted-foreground text-lg">Making an impact across Sierra Leone</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group p-8 rounded-xl hover:bg-primary/10 transition-all duration-300 hover:shadow-lg cursor-pointer border border-transparent hover:border-primary/20">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  50+
                </div>
                <div className="text-muted-foreground font-medium">Career Paths Available</div>
                <p className="text-sm text-muted-foreground/60 mt-2">From tech to education</p>
              </div>

              <div className="group p-8 rounded-xl hover:bg-secondary/10 transition-all duration-300 hover:shadow-lg cursor-pointer border border-transparent hover:border-secondary/20">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform">
                  1000+
                </div>
                <div className="text-muted-foreground font-medium">Active Users</div>
                <p className="text-sm text-muted-foreground/60 mt-2">Building their futures</p>
              </div>

              <div className="group p-8 rounded-xl hover:bg-accent/10 transition-all duration-300 hover:shadow-lg cursor-pointer border border-transparent hover:border-accent/20">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                  95%
                </div>
                <div className="text-muted-foreground font-medium">Success Rate</div>
                <p className="text-sm text-muted-foreground/60 mt-2">Achieving career goals</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CareerPilot Salone?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Tailored for Sierra Leone</h3>
                  <p className="text-sm text-muted-foreground">
                    Career guidance specific to the Sierra Leone job market and opportunities
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Free to Use</h3>
                  <p className="text-sm text-muted-foreground">
                    All core features available at no cost to help every Sierra Leonean succeed
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Get intelligent career recommendations based on your unique profile
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Complete Career Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Everything you need from exploration to job applications in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Start Your Career Journey?</h2>
            <p className="text-xl mb-8 opacity-90 text-balance">
              Join thousands of Sierra Leoneans who are building successful careers with CareerPilot Salone.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 shadow-2xl hover:shadow-3xl transition-shadow hover:scale-105"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
